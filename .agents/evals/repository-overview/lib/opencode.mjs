import {addUsage, finalToolEvent, findCost, normalizeUsage} from './shared.mjs';

export function command({repo, model, effort, prompt}) {
  const args = ['run', prompt, '--format', 'json', '--pure', '--agent', 'plan', '--dir', repo];
  if (model) args.push('--model', model);
  if (effort) args.push('--variant', effort);
  return {executable: 'opencode', args};
}

export function normalize(events) {
  let response = '';
  let usage = normalizeUsage();
  let reportedCostUsd = null;
  const trace = [];
  const hostErrors = [];
  for (const event of events) {
    const part = event.part ?? event.data?.part ?? {};
    if ((event.type === 'text' || part.type === 'text') && typeof (part.text ?? event.text) === 'string') {
      response += part.text ?? event.text;
    }
    if (event.type === 'tool_use' || part.type === 'tool') {
      trace.push(finalToolEvent(
        part.tool ?? part.name ?? event.name,
        part.state?.input ?? part.input ?? event.input,
        part.state?.output ?? part.output,
        null,
        {status: part.state?.status ?? null, exitCode: null},
      ));
      if (part.state?.status === 'error') hostErrors.push(part.state.error ?? `OpenCode tool ${part.tool ?? part.name} failed`);
    }
    if (event.type === 'error') hostErrors.push(event.error?.message ?? event.message ?? 'Unknown OpenCode error');
    if (event.type === 'step_finish' || part.type === 'step-finish') {
      usage = addUsage(usage, normalizeUsage(part.tokens ?? event.tokens ?? event.usage));
      const cost = findCost(part);
      if (cost !== null) reportedCostUsd = (reportedCostUsd ?? 0) + cost;
    }
  }
  return {response, usage, reportedCostUsd, trace, hostErrors};
}
