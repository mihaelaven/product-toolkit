// Run with: node --test tests/toolkit.test.cjs
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const json = p => JSON.parse(read(p));
const shipped = json('workflows/01-shipped-digest/weekly-shipped-digest.json');
function formatDigest(issues) {
  const code = shipped.nodes.find(n => n.name === 'Group by project and format').parameters.jsCode;
  const fn = vm.runInNewContext('(function(){' + code + '})', {
    $: () => ({first:() => ({json:{team_key:'TEAM', timezone:'UTC'}})}),
    $input:{first:() => ({json:{data:{issues:{nodes:issues}}}})},
    $now:{setZone:() => ({toFormat:() => '6 Nov 2026'})}
  });
  return fn()[0].json;
}
test('shipped digest handles an empty week', () => {
  const actual = formatDigest([]);
  assert.equal(actual.count, 0);
  assert.match(actual.slack_text, /Nothing moved to Done/);
});
test('shipped digest preserves issue identities and groups by project', () => {
  const issue = (identifier, project) => ({identifier, title:identifier+' title', url:'https://example.com/'+identifier, project:{name:project}, assignee:{name:'Sam'}});
  const actual = formatDigest([issue('TEAM-1','Exports'), issue('TEAM-2','Exports'), issue('TEAM-3','Billing')]);
  assert.equal(actual.count, 3);
  assert.equal(actual.projects, 2);
  assert.equal(actual.notion_children.filter(b => b.type === 'bulleted_list_item').length, 3);
  for (const id of ['TEAM-1','TEAM-2','TEAM-3']) assert.ok(actual.slack_text.includes(id));
});

test('workflow edges point to nodes present in the same export', () => {
  for (const p of ['workflows/01-shipped-digest/weekly-shipped-digest.json',
    ...['orchestrator','bug-specialist','request-specialist'].map(n => 'workflows/02-feedback-triage/triage-'+n+'.json')]) {
    const wf = json(p), names = new Set(wf.nodes.map(n => n.name));
    assert.equal(names.size, wf.nodes.length);
    for (const [from, ports] of Object.entries(wf.connections)) {
      assert.ok(names.has(from));
      for (const outputs of Object.values(ports)) for (const edges of outputs)
        for (const e of edges) assert.ok(names.has(e.node), `${p}: ${e.node}`);
    }
  }
});
test('triage writes cannot be reached from triggers when native approval node is removed', () => {
  const wf = json('workflows/02-feedback-triage/triage-orchestrator.json');
  const writes = wf.nodes.filter(n => /^(Linear:|Notion:)/.test(n.name)).map(n => n.name);
  assert.equal(writes.length, 3);
  const walk = block => {
    const seen = new Set(), queue = wf.nodes.filter(n => /slackTrigger|manualTrigger/.test(n.type)).map(n => n.name);
    while (queue.length) {
      const from = queue.shift();
      if (seen.has(from) || from === block) continue;
      seen.add(from);
      for (const edges of wf.connections[from]?.main ?? []) for (const e of edges) queue.push(e.node);
    }
    return seen;
  };
  for (const name of writes) {
    assert.ok(walk(null).has(name), `Write is disconnected: ${name}`);
    assert.ok(!walk('Wait for authenticated Slack approval').has(name), `Approval bypass: ${name}`);
    assert.ok(!walk('Validate approval').has(name), `Authorization bypass: ${name}`);
  }
  const ids = new Set(['bug-specialist','request-specialist'].map(n => json('workflows/02-feedback-triage/triage-'+n+'.json').id));
  for (const node of wf.nodes.filter(n => n.type.endsWith('.toolWorkflow')))
    assert.ok(ids.has(node.parameters.workflowId.value));
});

