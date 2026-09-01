#!/usr/bin/env node

import {spawn, spawnSync} from 'node:child_process';
import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, resolve, sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import * as codex from './lib/codex.mjs';
import * as claude from './lib/claude.mjs';
import * as opencode from './lib/opencode.mjs';
import {
  assertionScores,
  estimateCost,
  evaluateAssertions,
  format,
  listRepositoryFiles,
  parseArgs,
  parseJsonLines,
  readJson,
  referencedPaths,
  summarize,
  timestamp,
} from './lib/shared.mjs';

const evalRoot = dirname(fileURLToPath(import.meta.url));
const adapters = {codex, claude, opencode};
const runnerVersion = 4;

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) return printHelp();

  const host = options.host ?? detectHost();
  if (!adapters[host]) throw new Error(`Unsupported host ${JSON.stringify(host)}. Use codex, claude, or opencode.`);
  const repo = resolve(options.repo ?? process.cwd());
  const scenarioPath = resolve(options.scenario ?? resolve(evalRoot, 'scenario.json'));
  const scenario = readJson(scenarioPath);
  const repeat = positiveInteger(options.repeat ?? 1, '--repeat');
  const timeoutMs = positiveInteger(options.timeoutMs ?? 600_000, '--timeout-ms');
  const prices = readJson(resolve(options.prices ?? resolve(evalRoot, 'prices.json')));
  const runId = `${timestamp()}-${host}`;
  const artifactRoot = resolve(evalRoot, '.eval-artifacts');
  const outputDir = resolve(options.output ?? resolve(artifactRoot, 'runs', runId));
  const excludedRoots = [artifactRoot];
  if (evalRoot.startsWith(`${repo}${sep}`)) excludedRoots.push(evalRoot);
  const inventory = listRepositoryFiles(repo, excludedRoots);
  const before = repositoryState(repo);
  const cliVersion = commandVersion(adapters[host].command({repo, model: options.model, effort: options.effort, prompt: ''}).executable);
  const attempts = [];

  createFreshDirectory(outputDir, '--output');
  mkdirSync(resolve(outputDir, 'attempts'));
  for (let index = 1; index <= repeat; index++) {
    const attemptDir = resolve(outputDir, 'attempts', String(index));
    mkdirSync(attemptDir, {recursive: true});
    process.stderr.write(`repository-overview: ${host} attempt ${index}/${repeat}\n`);
    attempts.push(await runAttempt({
      adapter: adapters[host], host, repo, scenario, prices, options, inventory, attemptDir, index, timeoutMs,
    }));
  }

  const after = repositoryState(repo);
  const result = {
    schemaVersion: 1,
    eval: {id: scenario.id, version: scenario.version, prompt: scenario.prompt},
    environment: {
      host,
      model: options.model ?? 'default',
      effort: options.effort ?? null,
      cliVersion,
      runnerVersion,
      nodeVersion: process.version,
      repo,
      git: before,
    },
    repeat,
    mutationDetected: JSON.stringify(before) !== JSON.stringify(after),
    attempts,
    aggregate: aggregate(attempts),
    createdAt: new Date().toISOString(),
  };
  writeFileSync(resolve(outputDir, 'result.json'), `${JSON.stringify(result, null, 2)}\n`);
  writeFileSync(resolve(outputDir, 'report.md'), renderReport(result));
  process.stdout.write(`${outputDir}\n`);
  if (result.mutationDetected || attempts.some((attempt) => !attempt.success)) process.exitCode = 1;
}

function createFreshDirectory(path, optionName) {
  mkdirSync(dirname(path), {recursive: true});
  try {
    mkdirSync(path);
  } catch (error) {
    if (error.code === 'EEXIST') throw new Error(`${optionName} already exists: ${path}`);
    throw error;
  }
}

async function runAttempt({adapter, host, repo, scenario, prices, options, inventory, attemptDir, index, timeoutMs}) {
  const invocation = adapter.command({repo, model: options.model, effort: options.effort, prompt: scenario.prompt});
  const started = Date.now();
  const completed = await execute(invocation, timeoutMs);
  const durationMs = Date.now() - started;
  writeFileSync(resolve(attemptDir, 'raw.jsonl'), completed.stdout);
  writeFileSync(resolve(attemptDir, 'stderr.log'), completed.stderr);

  const {events, malformed} = parseJsonLines(completed.stdout);
  const normalized = adapter.normalize(events);
  const paths = referencedPaths(normalized.trace, repo, inventory);
  const failedToolCalls = normalized.trace.filter((event) => (
    event.status === 'failed'
      || event.status === 'error'
      || (typeof event.exitCode === 'number' && event.exitCode !== 0)
  )).length;
  const hostErrors = normalized.hostErrors ?? [];
  const assertions = evaluateAssertions(scenario.assertions, normalized.response, paths, inventory, {
    toolCalls: normalized.trace.length,
    failedToolCalls,
  });
  const scores = assertionScores(assertions);
  const estimatedCostUsd = estimateCost(normalized.usage, host, options.model ?? 'default', prices);
  const success = completed.code === 0 && !completed.timedOut && Boolean(normalized.response.trim());
  const metrics = {
    durationMs,
    usage: normalized.usage,
    cost: {reportedUsd: normalized.reportedCostUsd, estimatedUsd: estimatedCostUsd},
    toolCalls: normalized.trace.length,
    failedToolCalls,
    hostErrorCount: hostErrors.length,
    referencedPathCount: new Set(paths.map(({path}) => path)).size,
    malformedJsonLines: malformed.length,
    timedOut: completed.timedOut,
  };
  const trace = {events: normalized.trace, referencedPaths: paths};

  writeFileSync(resolve(attemptDir, 'response.md'), normalized.response);
  writeFileSync(resolve(attemptDir, 'trace.json'), `${JSON.stringify(trace, null, 2)}\n`);
  writeFileSync(resolve(attemptDir, 'metrics.json'), `${JSON.stringify(metrics, null, 2)}\n`);
  return {
    index,
    success,
    degraded: hostErrors.length > 0 || malformed.length > 0,
    exitCode: completed.code,
    signal: completed.signal,
    responsePath: `attempts/${index}/response.md`,
    tracePath: `attempts/${index}/trace.json`,
    rawPath: `attempts/${index}/raw.jsonl`,
    metrics,
    scores,
    pathSequence: paths.map(({path}) => path),
    hostErrors,
    assertions,
    parseWarnings: malformed,
  };
}

function execute({executable, args, cwd}, timeoutMs) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(executable, args, {cwd, env: process.env, stdio: ['ignore', 'pipe', 'pipe']});
    let stdout = '';
    let stderr = '';
    let timedOut = false;
    let killTimeout;
    const timeout = setTimeout(() => {
      timedOut = true;
      child.kill('SIGTERM');
      killTimeout = setTimeout(() => child.kill('SIGKILL'), 5_000);
    }, timeoutMs);
    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');
    child.stdout.on('data', (chunk) => { stdout += chunk; });
    child.stderr.on('data', (chunk) => { stderr += chunk; process.stderr.write(chunk); });
    child.on('error', (error) => { clearTimeout(timeout); reject(error); });
    child.on('close', (code, signal) => {
      clearTimeout(timeout);
      clearTimeout(killTimeout);
      resolvePromise({stdout, stderr, code, signal, timedOut});
    });
  });
}

function aggregate(attempts) {
  const metric = (get) => summarize(attempts.map(get));
  return {
    successfulAttempts: attempts.filter(({success}) => success).length,
    totalTokens: metric((attempt) => attempt.metrics.usage.total),
    inputTokens: metric((attempt) => attempt.metrics.usage.input),
    cachedInputTokens: metric((attempt) => attempt.metrics.usage.cachedInput),
    uncachedInputTokens: metric((attempt) => {
      const input = attempt.metrics.usage.input;
      return input === null ? null : Math.max(0, input - (attempt.metrics.usage.cachedInput ?? 0));
    }),
    outputTokens: metric((attempt) => attempt.metrics.usage.output),
    reasoningTokens: metric((attempt) => attempt.metrics.usage.reasoning),
    reportedCostUsd: metric((attempt) => attempt.metrics.cost.reportedUsd),
    estimatedCostUsd: metric((attempt) => attempt.metrics.cost.estimatedUsd),
    durationMs: metric((attempt) => attempt.metrics.durationMs),
    toolCalls: metric((attempt) => attempt.metrics.toolCalls),
    failedToolCalls: metric((attempt) => attempt.metrics.failedToolCalls),
    hostErrors: metric((attempt) => attempt.metrics.hostErrorCount),
    qualityScore: metric((attempt) => attempt.scores.quality),
    routeScore: metric((attempt) => attempt.scores.route),
    paths: aggregatePaths(attempts),
    pathSequences: attempts.map((attempt) => attempt.pathSequence),
  };
}

function aggregatePaths(attempts) {
  const counts = new Map();
  for (const attempt of attempts) {
    for (const path of new Set(attempt.pathSequence)) counts.set(path, (counts.get(path) ?? 0) + 1);
  }
  return Object.fromEntries([...counts.entries()].sort(([left], [right]) => left.localeCompare(right)).map(([path, count]) => [
    path,
    {attempts: count, rate: count / attempts.length},
  ]));
}

function repositoryState(repo) {
  const run = (args) => {
    const result = spawnSync('git', ['-C', repo, ...args], {encoding: 'utf8'});
    return result.status === 0 ? result.stdout.trim() : null;
  };
  return {commit: run(['rev-parse', 'HEAD']), status: run(['status', '--short'])};
}

function commandVersion(executable) {
  const result = spawnSync(executable, ['--version'], {encoding: 'utf8'});
  return result.status === 0 ? result.stdout.trim() || result.stderr.trim() : null;
}

function detectHost() {
  if (process.env.CODEX_THREAD_ID || process.env.CODEX_SANDBOX) return 'codex';
  if (process.env.CLAUDE_CODE_ENTRYPOINT || process.env.CLAUDECODE) return 'claude';
  if (process.env.OPENCODE) return 'opencode';
  const installed = Object.keys(adapters).filter((host) => {
    const executable = adapters[host].command({repo: process.cwd(), prompt: ''}).executable;
    return spawnSync(executable, ['--version'], {stdio: 'ignore'}).status === 0;
  });
  if (installed.length === 1) return installed[0];
  throw new Error(`Cannot choose a host automatically (${installed.join(', ') || 'none'} detected); pass --host.`);
}

function positiveInteger(value, flag) {
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < 1) throw new Error(`${flag} must be a positive integer`);
  return parsed;
}

function renderReport(result) {
  const a = result.aggregate;
  const money = a.reportedCostUsd.median ?? a.estimatedCostUsd.median;
  const attempts = result.attempts.map((attempt) => (
    `| ${attempt.index} | ${attempt.success ? 'yes' : 'no'} | ${attempt.degraded ? 'yes' : 'no'} | ${format(attempt.metrics.usage.total)} | ${format(attempt.metrics.durationMs)} | ${format(attempt.scores.quality)} | ${format(attempt.scores.route)} |`
  )).join('\n');
  const paths = result.attempts.map((attempt) => (
    `### Attempt ${attempt.index}\n\n${attempt.pathSequence.length ? attempt.pathSequence.map((path, index) => `${index + 1}. \`${path}\``).join('\n') : '_No repository paths detected._'}`
  )).join('\n\n');
  return `# Repository overview eval\n\n` +
    `- Host: \`${result.environment.host}\`\n` +
    `- Model: \`${result.environment.model}\`\n` +
    `- CLI: \`${result.environment.cliVersion ?? 'unknown'}\`\n` +
    `- Successful attempts: ${a.successfulAttempts}/${result.repeat}\n` +
    `- Median tokens: ${format(a.totalTokens.median)}\n` +
    `- Median cost (USD): ${format(money)}\n` +
    `- Repository mutation detected: ${result.mutationDetected ? 'yes' : 'no'}\n\n` +
    `| Attempt | Success | Degraded | Tokens | Duration ms | Quality | Route |\n` +
    `|---:|:---:|:---:|---:|---:|---:|---:|\n${attempts}\n\n` +
    `## Observed path sequences\n\n${paths}\n`;
}

function printHelp() {
  process.stdout.write(`Usage: node run.mjs [options]\n\n` +
    `  --host <codex|claude|opencode>\n` +
    `  --repo <path>             Repository to inspect (default: cwd)\n` +
    `  --model <id>              Host-specific model id\n` +
    `  --effort <value>          Host-specific effort/variant\n` +
    `  --repeat <n>              Attempts (default: 1; use 3 for benchmark)\n` +
    `  --timeout-ms <n>          Per-attempt timeout (default: 600000)\n` +
    `  --scenario <path>         Scenario JSON\n` +
    `  --prices <path>           Explicit model price catalog\n` +
    `  --output <path>           Artifact directory\n`);
}

main().catch((error) => {
  process.stderr.write(`repository-overview: ${error.message}\n`);
  process.exitCode = 1;
});
