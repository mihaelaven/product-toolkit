const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const workflow = JSON.parse(fs.readFileSync(path.join(__dirname,'../workflows/02-feedback-triage/triage-orchestrator.json'),'utf8'));
const now = Date.parse('2026-11-06T12:00:00Z');
const cfg = {review_channel_id:'CEXAMPLE001',approver_user_ids:'UEXAMPLE001',linear_team_id:'00000000-0000-4000-8000-000000000001',feedback_db_id:'00000000-0000-4000-8000-000000000002',enable_writes:true};
const proposal = {action:'create_issue',title:'Export error',body:'An empty report returns an error. Expected: a CSV containing headers.',priority:2};
function run(name,input,records={}) {
  const code = workflow.nodes.find(n=>n.name===name).parameters.jsCode;
  class Clock extends Date { constructor(...args){super(...(args.length?args:[now]));} static now(){return now;} }
  return JSON.parse(JSON.stringify(vm.runInNewContext('(function(){'+code+'})()', {
    Date:Clock,$json:input,$:name=>({first:()=>({json:records[name]})})
  })[0].json));
}
function build(config=cfg,output=proposal) {
  return run('Build approval message',{output},{Config:config,'Normalize message':{text:'Fictional test feedback'}});
}
function response(patch={}) {
  return {approved:true,respondedAt:'2026-11-06T12:00:00Z',responder:{id:'UEXAMPLE001',source:'slack'},channel:'CEXAMPLE001',messageId:'1793966400.001',...patch};
}
function guard(data,prepared=build()) {
  return run('Validate approval',{data},{'Build approval message':prepared});
}
test('approval node uses native interactive identity capture and defaults business writes off',()=>{
  const n=workflow.nodes.find(n=>n.name==='Wait for authenticated Slack approval');
  assert.equal(n.parameters.operation,'sendAndWait');
  assert.equal(n.parameters.responseType,'approval');
  assert.equal(n.parameters.captureResponder,true);
  assert.match(n.parameters.approvers,/approverIds/);
  assert.equal(n.parameters.approvalOptions.values.approvalType,'double');
  assert.equal(workflow.active,false);
  const settings=workflow.nodes.find(n=>n.name==='Config').parameters.assignments.assignments;
  assert.equal(settings.find(s=>s.name==='enable_writes').value,false);
  assert.ok(!JSON.stringify(workflow).includes('$execution.resumeUrl'));
  assert.ok(!workflow.nodes.some(n=>n.name==='Ask for edits'||n.type==='n8n-nodes-base.wait'));
});
test('builder rejects an empty or placeholder reviewer list and destination',()=>{
  for(const id of ['', 'YOUR_SLACK_APPROVER_USER_ID','UEXAMPLE001,invalid'])
    assert.throws(()=>build({...cfg,approver_user_ids:id}),/approver/);
  assert.throws(()=>build({...cfg,linear_team_id:'YOUR_TEAM'}),/destination/);
});
test('builder shows the complete proposed body and destination, escaping mention markup',()=>{
  const p=build(cfg,{...proposal,body:'Review <@UEXAMPLE002> & <https://example.com|link>'});
  assert.ok(p.message.includes('&lt;@UEXAMPLE002&gt; &amp;'));
  assert.ok(p.message.includes(cfg.linear_team_id));
  assert.ok(p.message.includes(p.proposal.title));
  assert.throws(()=>build(cfg,{...proposal,body:'a'.repeat(2001)}),/shorter proposal/);
  assert.throws(()=>build(cfg,{...proposal,action:'delete_issue'}),/Invalid proposal/);
  assert.throws(()=>build(cfg,{...proposal,body:'<'.repeat(1000)}),/too long/);
});
test('authorized approval passes only with writes explicitly enabled',()=>{
  assert.equal(guard(response()).gate_status,'approved');
  assert.equal(guard(response(),build({...cfg,enable_writes:false})).gate_status,'dry_run');
  assert.equal(guard(response({approved:false})).gate_status,'rejected');
});
test('missing identity, unlisted reviewer, wrong channel and link-style response fail closed',()=>{
  for(const data of [response({responder:undefined}),response({responder:{id:'UEXAMPLE999',source:'slack'}}),
    response({responder:{id:'UEXAMPLE001',source:'web'}}),response({channel:'CEXAMPLE999'}),
    response({messageId:undefined}),{approved:true,respondedAt:'2026-11-06T12:00:00Z'}])
    assert.equal(guard(data).gate_status,'unauthorized');
});
test('timeout, query-only and string decisions never approve',()=>{
  for(const data of [undefined,{},response({approved:'true'}),response({approved:1}),{query:{decision:'approve'}}])
    assert.equal(guard(data).gate_status,'timeout_or_invalid');
});
test('expired, future and pre-proposal timestamps fail closed',()=>{
  for(const data of [response({respondedAt:'2026-11-06T11:59:59Z'}),response({respondedAt:'2026-11-07T12:00:00Z'}),response({respondedAt:'invalid'})])
    assert.equal(guard(data).gate_status,'expired');
  assert.equal(guard(response(),{...build(),issuedAt:'2026-11-03T12:00:00Z'}).gate_status,'expired');
});
test('final write uses only the frozen reviewed proposal and blocks every other outcome',()=>{
  const prepared=build();
  const final=run('Final proposal',guard(response(),prepared),{'Build approval message':prepared});
  assert.equal(final.body,proposal.body);
  assert.equal(final.destination_id,cfg.linear_team_id);
  assert.equal(final.approved_by,'UEXAMPLE001');
  for(const gate_status of ['dry_run','rejected','unauthorized','expired','timeout_or_invalid'])
    assert.throws(()=>run('Final proposal',{gate_status},{'Build approval message':prepared}),/blocked/);
});
