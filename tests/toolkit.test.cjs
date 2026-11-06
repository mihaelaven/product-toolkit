// Run with: node --test tests/toolkit.test.cjs
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const json = p => JSON.parse(read(p));
const between = (text, a, b) => {
  const start = text.indexOf(a), end = text.indexOf(b, start + a.length);
  assert.ok(start >= 0 && end > start, `Missing source boundary: ${a} / ${b}`);
  return text.slice(start, end);
};

test('Call Task Hub extracts the dated fixture and excludes negative promises', () => {
  const source = read('apps/call-task-hub/index.html');
  const ctx = vm.createContext({});
  vm.runInContext(between(source, 'const pad =', 'function sampleState()') +
    between(source, 'const nextWeekday =', 'async function extractWithClaude'), ctx);
  ctx.input = json('examples/call-task-hub.json');
  const actual = JSON.parse(vm.runInContext('JSON.stringify(extractByKeywords(input.transcript, input.date, input.me))', ctx));
  assert.deepEqual(actual.items.map(({type, owner, due, text}) => ({type, owner, due, text})), ctx.input.expected);
});

test('Call Task Hub resolves next weekday and keeps decisions undated', () => {
  const source = read('apps/call-task-hub/index.html');
  const ctx = vm.createContext({});
  vm.runInContext(between(source, 'const pad =', 'function sampleState()') +
    between(source, 'const nextWeekday =', 'async function extractWithClaude'), ctx);
  const actual = JSON.parse(vm.runInContext(`JSON.stringify(extractByKeywords("Sam: I'll send the brief by next Thursday.\\nMaya: We decided to ship tomorrow.", '2026-11-06', 'Maya'))`, ctx));
  assert.equal(actual.items[0].due, '2026-11-19');
  assert.equal(actual.items[1].due, null);
});

function planner(state) {
  const source = read('apps/capacity-timeline-planner/index.html');
  const ctx = vm.createContext({state});
  // Evaluate the actual scheduling helpers without rendering or duplicating the algorithm.
  vm.runInContext(between(source, 'const EPS =', '// Sample team and projects.') +
    'const personById = id => state.people.find(x => x.id === id);\n' +
    between(source, 'function startMs()', 'function topEntry('), ctx);
  return vm.runInContext('simulate()', ctx);
}
test('one person-week finishes in the first week at full capacity', () => {
  assert.equal(planner(json('examples/capacity-timeline-planner.json')).res.export.finish, 0);
});
test('shared person is not double-booked and lower priority work waits', () => {
  const state = json('examples/capacity-timeline-planner.json');
  state.projects.push({...state.projects[0], id:'second'});
  const actual = planner(state);
  assert.equal(actual.res.export.finish, 0);
  assert.equal(actual.res.second.finish, 1);
  assert.ok(actual.used.fe1.every((used, w) => used <= actual.cap.fe1[w] + 1e-6));
});
test('dependencies and monthly leave delay completion', () => {
  const state = json('examples/capacity-timeline-planner.json');
  state.people.push({id:'fe2', name:'Maya', role:'fe', off:{}});
  state.projects.push({...state.projects[0], id:'second', after:'export', assign:{fe:['fe2']}});
  assert.equal(planner(state).res.second.finish, 1);
  state.people[0].off = {'2026-11':5};
  assert.equal(planner(state).res.export.finish, 1);
});
test('unassigned work stays blocked instead of receiving invented capacity', () => {
  const state = json('examples/capacity-timeline-planner.json');
  state.projects[0].assign.fe = [];
  const actual = planner(state).res.export;
  assert.equal(actual.finish, null);
  assert.ok(actual.needs.has('fe'));
});

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
