import {existsSync, readdirSync, readFileSync, statSync} from 'node:fs';
import {relative, resolve, sep} from 'node:path';

export function parseJsonLines(raw) {
  const events = [];
  const malformed = [];
  for (const [index, line] of raw.split(/\r?\n/).entries()) {
    if (!line.trim()) continue;
    try {
      events.push(JSON.parse(line));
    } catch {
      malformed.push({line: index + 1, text: line});
    }
  }
  return {events, malformed};
}

export function textFromContent(content) {
  if (typeof content === 'string') return content;
  if (!Array.isArray(content)) return '';
  return content
    .filter((part) => part && (part.type === 'text' || part.type === 'output_text'))
    .map((part) => part.text ?? part.content ?? '')
    .join('\n');
}

export function normalizeUsage(value = {}) {
  const cache = value.cache ?? {};
  const input = number(value.input_tokens ?? value.inputTokens ?? value.input ?? value.prompt_tokens);
  const cachedInput = number(
    value.cached_input_tokens
      ?? value.cache_read_input_tokens
      ?? value.cacheReadInputTokens
      ?? cache.read
      ?? value.cached,
  );
  const cacheCreationInput = number(
    value.cache_creation_input_tokens
      ?? value.cache_write_input_tokens
      ?? value.cacheCreationInputTokens
      ?? cache.write,
  );
  const output = number(value.output_tokens ?? value.outputTokens ?? value.output ?? value.completion_tokens);
  const reasoning = number(
    value.reasoning_tokens
      ?? value.reasoning_output_tokens
      ?? value.reasoningTokens
      ?? value.reasoning,
  );
  const explicitTotal = number(value.total_tokens ?? value.totalTokens ?? value.total);
  return {
    input,
    cachedInput,
    cacheCreationInput,
    output,
    reasoning,
    total: explicitTotal ?? sumKnown(input, output),
  };
}

export function addUsage(left, right) {
  return {
    input: addKnown(left.input, right.input),
    cachedInput: addKnown(left.cachedInput, right.cachedInput),
    cacheCreationInput: addKnown(left.cacheCreationInput, right.cacheCreationInput),
    output: addKnown(left.output, right.output),
    reasoning: addKnown(left.reasoning, right.reasoning),
    total: addKnown(left.total, right.total),
  };
}

export function findCost(value) {
  if (!value || typeof value !== 'object') return null;
  const direct = number(value.total_cost_usd ?? value.cost_usd ?? value.costUSD ?? value.cost);
  if (direct !== null) return direct;
  for (const child of Object.values(value)) {
    if (child && typeof child === 'object') {
      const found = findCost(child);
      if (found !== null) return found;
    }
  }
  return null;
}

export function finalToolEvent(name, input, output, timestamp = null, metadata = {}) {
  return {type: 'tool', name: name || 'unknown', input: input ?? null, output: output ?? null, timestamp, ...metadata};
}

export function listRepositoryFiles(repoRoot, excludedRoots = []) {
  const files = [];
  const ignored = new Set(['.git', 'node_modules', '.eval-artifacts']);
  const excluded = excludedRoots.map((path) => resolve(path));
  function walk(dir) {
    for (const entry of readdirSync(dir, {withFileTypes: true})) {
      if (ignored.has(entry.name)) continue;
      const absolute = resolve(dir, entry.name);
      if (excluded.some((root) => absolute === root || absolute.startsWith(`${root}${sep}`))) continue;
      const rel = relative(repoRoot, absolute).split(sep).join('/');
      if (entry.isDirectory()) walk(absolute);
      else if (entry.isFile() || entry.isSymbolicLink()) files.push(rel);
    }
  }
  walk(repoRoot);
  return files.sort();
}

export function referencedPaths(events, repoRoot, inventory) {
  const found = [];
  const seen = new Set();
  const basenameIndex = new Map();
  for (const file of inventory) {
    const base = file.split('/').at(-1);
    if (!basenameIndex.has(base)) basenameIndex.set(base, []);
    basenameIndex.get(base).push(file);
  }

  for (const [eventIndex, event] of events.entries()) {
    const strings = collectStrings(event.input);
    for (const value of strings) {
      const normalized = value.replaceAll('\\', '/');
      for (const token of normalized.split(/[\s'"`=,:;()[\]{}<>|]+/)) {
        const cleaned = token.replace(/^[.][/]/, '').replace(/[?#].*$/, '').replace(/\/+$/, '');
        if (!cleaned) continue;
        const absolute = resolve(repoRoot, cleaned);
        if (absolute.startsWith(`${resolve(repoRoot)}${sep}`) && existsSync(absolute)) {
          try {
            if (statSync(absolute).isFile()) add(relative(repoRoot, absolute).split(sep).join('/'), eventIndex, event.name);
          } catch {
            // A path may disappear between the existence and stat checks; ignore it.
          }
        }
        const matches = basenameIndex.get(cleaned);
        if (matches?.length === 1) add(matches[0], eventIndex, event.name);
      }
    }
  }
  return found;

  function add(path, eventIndex, tool) {
    const key = `${eventIndex}:${path}`;
    if (seen.has(key)) return;
    seen.add(key);
    found.push({path, eventIndex, tool});
  }
}

export function evaluateAssertions(assertions, response, paths, inventory, context = {}) {
  return assertions.map((assertion) => {
    const base = {id: assertion.id, group: assertion.group ?? 'quality', description: assertion.description};
    if (assertion.type === 'answer-regex') {
      const passed = new RegExp(assertion.pattern, assertion.flags ?? 'iu').test(response);
      return {...base, passed, skipped: false, evidence: passed ? `Matched /${assertion.pattern}/` : 'Pattern was not found'};
    }
    if (assertion.type === 'answer-existing-paths') {
      const mentioned = inventory.filter((file) => response.includes(file));
      const minimum = assertion.minimum ?? 1;
      return {
        ...base,
        passed: mentioned.length >= minimum,
        skipped: false,
        evidence: mentioned.length ? mentioned.join(', ') : 'No repository paths were cited',
      };
    }
    if (assertion.type === 'trace-path-if-present') {
      const candidates = inventory.filter((file) => assertion.patterns.some((pattern) => new RegExp(pattern, 'iu').test(file)));
      if (!candidates.length) return {...base, passed: true, skipped: true, evidence: 'No matching file exists in this repository'};
      const visited = paths.filter(({path}) => candidates.includes(path)).map(({path}) => path);
      return {
        ...base,
        passed: visited.length > 0,
        skipped: false,
        evidence: visited.length ? [...new Set(visited)].join(', ') : `Expected one of: ${candidates.join(', ')}`,
      };
    }
    if (assertion.type === 'trace-path-not-seen') {
      const visited = paths.filter(({path}) => assertion.patterns.some((pattern) => new RegExp(pattern, 'iu').test(path))).map(({path}) => path);
      return {
        ...base,
        passed: visited.length === 0,
        skipped: false,
        evidence: visited.length ? `Unexpected paths: ${[...new Set(visited)].join(', ')}` : 'No forbidden paths were observed',
      };
    }
    if (assertion.type === 'max-tool-calls') {
      const actual = context.toolCalls ?? 0;
      return {...base, passed: actual <= assertion.maximum, skipped: false, evidence: `${actual} tool calls; maximum ${assertion.maximum}`};
    }
    if (assertion.type === 'max-failed-tool-calls') {
      const actual = context.failedToolCalls ?? 0;
      return {...base, passed: actual <= assertion.maximum, skipped: false, evidence: `${actual} failed tool calls; maximum ${assertion.maximum}`};
    }
    if (assertion.type === 'max-path-revisits') {
      const sequence = paths.map(({path}) => path);
      const actual = sequence.length - new Set(sequence).size;
      return {...base, passed: actual <= assertion.maximum, skipped: false, evidence: `${actual} path revisits; maximum ${assertion.maximum}`};
    }
    throw new Error(`Unsupported assertion type: ${assertion.type}`);
  });
}

export function assertionScores(assertions) {
  const score = (group) => {
    const applicable = assertions.filter((item) => !item.skipped && item.group === group);
    if (!applicable.length) return null;
    return applicable.filter((item) => item.passed).length / applicable.length;
  };
  return {quality: score('quality'), route: score('route')};
}

export function estimateCost(usage, host, model, catalog) {
  const entry = catalog?.models?.[`${host}/${model}`] ?? catalog?.models?.[model];
  if (!entry) return null;
  const input = usage.input ?? 0;
  const cached = Math.min(usage.cachedInput ?? 0, input);
  const cacheCreation = Math.min(usage.cacheCreationInput ?? 0, Math.max(0, input - cached));
  const uncached = Math.max(0, input - cached - cacheCreation);
  const output = usage.output ?? 0;
  return (
    uncached * (entry.inputPerMillion ?? 0)
    + cached * (entry.cachedInputPerMillion ?? entry.inputPerMillion ?? 0)
    + cacheCreation * (entry.cacheCreationInputPerMillion ?? entry.inputPerMillion ?? 0)
    + output * (entry.outputPerMillion ?? 0)
  ) / 1_000_000;
}

export function median(values) {
  const known = values.filter((value) => typeof value === 'number' && Number.isFinite(value)).sort((a, b) => a - b);
  if (!known.length) return null;
  const middle = Math.floor(known.length / 2);
  return known.length % 2 ? known[middle] : (known[middle - 1] + known[middle]) / 2;
}

export function summarize(values) {
  const known = values.filter((value) => typeof value === 'number' && Number.isFinite(value));
  if (!known.length) return {median: null, min: null, max: null};
  return {median: median(known), min: Math.min(...known), max: Math.max(...known)};
}

export function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

export function timestamp() {
  return new Date().toISOString().replaceAll(':', '-');
}

export function parseArgs(args, booleanFlags = []) {
  const out = {};
  const flags = new Set(booleanFlags);
  for (let index = 0; index < args.length; index++) {
    const arg = args[index];
    if (arg === '--help' || arg === '-h') {
      out.help = true;
    } else if (arg.startsWith('--')) {
      const name = arg.slice(2);
      const key = name.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
      if (flags.has(name)) {
        out[key] = true;
        continue;
      }
      const value = args[++index];
      if (value === undefined || value.startsWith('--')) throw new Error(`${arg} requires a value`);
      out[key] = value;
    } else {
      throw new Error(`Unexpected argument: ${arg}`);
    }
  }
  return out;
}

export function format(value) {
  return value === null || value === undefined ? 'n/a' : Number.isInteger(value) ? String(value) : value.toFixed(4);
}

export function formatPercent(value) {
  return value === null || value === undefined ? 'n/a' : `${(value * 100).toFixed(1)}%`;
}

function collectStrings(value, out = []) {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach((child) => collectStrings(child, out));
  else if (value && typeof value === 'object') Object.values(value).forEach((child) => collectStrings(child, out));
  return out;
}

function number(value) {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function addKnown(left, right) {
  if (left === null && right === null) return null;
  return (left ?? 0) + (right ?? 0);
}

function sumKnown(...values) {
  const known = values.filter((value) => value !== null);
  return known.length ? known.reduce((total, value) => total + value, 0) : null;
}
