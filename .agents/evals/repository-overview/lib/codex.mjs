import {finalToolEvent, findCost, normalizeUsage, textFromContent} from './shared.mjs';

export function command({repo, model, effort, prompt}) {
  const args = [
    '--ask-for-approval', 'on-request', 'exec', '--json', '--ephemeral', '--sandbox', 'read-only',
    '--ignore-user-config', '--ignore-rules', '--cd', repo,
    '--config', 'approvals_reviewer="auto_review"',
    '--config', 'web_search="disabled"',
  ];
  if (model) args.push('--model', model);
  if (effort) args.push('--config', `model_reasoning_effort=${JSON.stringify(effort)}`);
  args.push(prompt);
  return {executable: 'codex', args};
}

export function normalize(events) {
  let response = '';
  let usage = normalizeUsage();
  let reportedCostUsd = null;
  const trace = [];
  const hostErrors = [];
  for (const event of events) {
    const item = event.item ?? {};
    if (event.type === 'item.completed' && item.type === 'agent_message') {
      response = item.text ?? textFromContent(item.content) ?? response;
    }
    if (event.type === 'item.completed') {
      if (['command_execution', 'mcp_tool_call', 'tool_call'].includes(item.type)) {
        trace.push(finalToolEvent(
          item.name ?? item.type,
          item.command ?? item.arguments ?? item.input,
          item.aggregated_output ?? item.output,
          null,
          {status: item.status ?? null, exitCode: item.exit_code ?? null},
        ));
      }
    }
    if (event.type === 'item.completed' && item.type === 'error') hostErrors.push(item.message ?? 'Unknown Codex error');
    if (event.type === 'turn.completed' && event.usage) usage = normalizeUsage(event.usage);
    const cost = findCost(event);
    if (cost !== null) reportedCostUsd = cost;
  }
  return {response, usage, reportedCostUsd, trace, hostErrors};
}
