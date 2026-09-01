import {finalToolEvent, findCost, normalizeUsage, textFromContent} from './shared.mjs';

export function command({repo, model, effort, prompt}) {
  const args = [
    '--print', prompt, '--output-format', 'stream-json', '--verbose', '--no-session-persistence',
    '--permission-mode', 'plan', '--setting-sources', 'project', '--strict-mcp-config', '--mcp-config', '{"mcpServers":{}}',
  ];
  if (model) args.push('--model', model);
  if (effort) args.push('--effort', effort);
  return {executable: 'claude', args, cwd: repo};
}

export function normalize(events) {
  let response = '';
  let usage = normalizeUsage();
  let reportedCostUsd = null;
  const trace = [];
  const toolCalls = new Map();
  const hostErrors = [];
  for (const event of events) {
    if (event.type === 'assistant') {
      const content = event.message?.content ?? [];
      const text = textFromContent(content);
      if (text) response += `${response ? '\n' : ''}${text}`;
      for (const part of content) {
        if (part?.type === 'tool_use') {
          const toolCall = finalToolEvent(part.name, part.input, null, null, {status: null, exitCode: null});
          trace.push(toolCall);
          if (part.id) toolCalls.set(part.id, toolCall);
        }
      }
    }
    if (event.type === 'user') {
      const content = event.message?.content ?? [];
      for (const part of content) {
        if (part?.type !== 'tool_result') continue;
        const toolCall = toolCalls.get(part.tool_use_id);
        if (!toolCall) continue;
        const output = textFromContent(part.content);
        toolCall.output = output || part.content || null;
        toolCall.status = part.is_error ? 'error' : 'completed';
      }
    }
    if (event.type === 'result') {
      if (typeof event.result === 'string' && event.result) response = event.result;
      if (event.usage) usage = claudeUsage(event.usage);
      if (event.is_error || event.subtype === 'error') hostErrors.push(event.result ?? event.error ?? 'Unknown Claude error');
    }
    if (event.type === 'error') hostErrors.push(event.error?.message ?? event.message ?? 'Unknown Claude error');
    const cost = findCost(event);
    if (cost !== null) reportedCostUsd = cost;
  }
  return {response, usage, reportedCostUsd, trace, hostErrors};
}

function claudeUsage(raw) {
  const usage = normalizeUsage(raw);
  // Anthropic reports uncached, cache-read, and cache-creation input as disjoint counters.
  const knownInput = [usage.input, usage.cachedInput, usage.cacheCreationInput]
    .filter((value) => value !== null);
  const input = knownInput.length
    ? knownInput.reduce((total, value) => total + value, 0)
    : null;
  const total = input === null && usage.output === null
    ? null
    : (input ?? 0) + (usage.output ?? 0);
  return {...usage, input, total};
}
