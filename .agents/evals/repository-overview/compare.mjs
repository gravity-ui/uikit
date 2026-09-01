#!/usr/bin/env node

import {existsSync, mkdirSync, writeFileSync} from 'node:fs';
import {basename, dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {format, formatPercent, median, parseArgs, readJson, timestamp} from './lib/shared.mjs';

const evalRoot = dirname(fileURLToPath(import.meta.url));

function main() {
  const options = parseArgs(process.argv.slice(2), ['fail-on-regression']);
  if (options.help || !options.baseline || !options.candidate) return printHelp(options.help ? 0 : 1);
  const baselineDir = resolve(options.baseline);
  const candidateDir = resolve(options.candidate);
  const baseline = readJson(resolve(baselineDir, 'result.json'));
  const candidate = readJson(resolve(candidateDir, 'result.json'));
  const threshold = percentage(options.threshold ?? '5');
  const incompatibilities = compatible(baseline, candidate);
  const dimensions = {
    qualityScore: scoreDelta(baseline, candidate, 'qualityScore'),
    routeScore: scoreDelta(baseline, candidate, 'routeScore'),
    totalTokens: efficiencyDelta(baseline, candidate, 'totalTokens', threshold),
    uncachedInputTokens: efficiencyDelta(baseline, candidate, 'uncachedInputTokens', threshold),
    cachedInputTokens: valueDelta(baseline, candidate, 'cachedInputTokens'),
    reportedCostUsd: efficiencyDelta(baseline, candidate, 'reportedCostUsd', threshold),
    estimatedCostUsd: efficiencyDelta(baseline, candidate, 'estimatedCostUsd', threshold),
    durationMs: efficiencyDelta(baseline, candidate, 'durationMs', threshold),
    toolCalls: efficiencyDelta(baseline, candidate, 'toolCalls', threshold),
    failedToolCalls: efficiencyDelta(baseline, candidate, 'failedToolCalls', threshold),
    hostErrors: efficiencyDelta(baseline, candidate, 'hostErrors', threshold),
  };
  const metricStatus = classify(dimensions, incompatibilities);
  const navigation = compareNavigation(baseline, candidate);
  const assessment = analyze({baseline, candidate, dimensions, incompatibilities, navigation, status: metricStatus, threshold});
  const status = assessment.experiment.validity === 'invalid' ? 'inconclusive' : metricStatus;
  const comparison = {
    schemaVersion: 2,
    status,
    metricStatus,
    thresholdPercent: threshold * 100,
    incompatibilities,
    baseline: baselineDir,
    candidate: candidateDir,
    dimensions,
    navigation,
    assessment,
    createdAt: new Date().toISOString(),
  };
  const output = options.output
    ? resolve(options.output)
    : defaultComparisonOutput(baselineDir, candidateDir);
  const markdownOutput = output.endsWith('.json') ? output.replace(/\.json$/u, '.md') : `${output}.md`;
  createFreshOutput(output, markdownOutput);
  writeFileSync(output, `${JSON.stringify(comparison, null, 2)}\n`);
  writeFileSync(markdownOutput, render(comparison));
  process.stdout.write(`${status}: ${output}\n`);
  if (options.failOnRegression && ['regressed', 'mixed'].includes(status)) process.exitCode = 1;
}

function defaultComparisonOutput(baselineDir, candidateDir) {
  const runsDir = dirname(candidateDir);
  const artifactRoot = basename(runsDir) === 'runs'
    ? dirname(runsDir)
    : resolve(evalRoot, '.eval-artifacts');
  const comparisonId = `${timestamp()}-${basename(baselineDir)}-vs-${basename(candidateDir)}`;
  return resolve(artifactRoot, 'comparisons', comparisonId, 'comparison.json');
}

function createFreshOutput(output, markdownOutput) {
  if (existsSync(output) || existsSync(markdownOutput)) throw new Error(`Output already exists: ${existsSync(output) ? output : markdownOutput}`);
  mkdirSync(dirname(output), {recursive: true});
}

function compareNavigation(baseline, candidate) {
  const left = Object.keys(baseline.aggregate?.paths ?? {});
  const right = Object.keys(candidate.aggregate?.paths ?? {});
  return {
    addedPaths: right.filter((path) => !left.includes(path)),
    removedPaths: left.filter((path) => !right.includes(path)),
    baselineSequences: baseline.aggregate?.pathSequences ?? [],
    candidateSequences: candidate.aggregate?.pathSequences ?? [],
    baselineRevisits: revisitSummary(baseline.aggregate?.pathSequences ?? []),
    candidateRevisits: revisitSummary(candidate.aggregate?.pathSequences ?? []),
  };
}

function revisitSummary(sequences) {
  const attempts = sequences.map((sequence) => {
    const counts = new Map();
    sequence.forEach((path) => counts.set(path, (counts.get(path) ?? 0) + 1));
    const repeatedPaths = [...counts.entries()]
      .filter(([, count]) => count > 1)
      .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
      .map(([path, count]) => ({path, count}));
    return {totalPathReferences: sequence.length, uniquePaths: counts.size, revisits: sequence.length - counts.size, repeatedPaths};
  });
  return {medianRevisits: median(attempts.map(({revisits}) => revisits)), attempts};
}

function compatible(left, right) {
  const checks = [
    ['eval.id', left.eval?.id, right.eval?.id],
    ['eval.version', left.eval?.version, right.eval?.version],
    ['eval.prompt', left.eval?.prompt, right.eval?.prompt],
    ['host', left.environment?.host, right.environment?.host],
    ['model', left.environment?.model, right.environment?.model],
    ['effort', left.environment?.effort, right.environment?.effort],
    ['cliVersion', left.environment?.cliVersion, right.environment?.cliVersion],
    ['runnerVersion', left.environment?.runnerVersion, right.environment?.runnerVersion],
  ];
  return checks.filter(([, a, b]) => a !== b).map(([field, a, b]) => ({field, baseline: a, candidate: b}));
}

function scoreDelta(left, right, name) {
  const a = left.aggregate?.[name]?.median ?? null;
  const b = right.aggregate?.[name]?.median ?? null;
  if (a === null || b === null) return {baseline: a, candidate: b, relative: null, signal: 'unavailable'};
  const delta = b - a;
  return {baseline: a, candidate: b, relative: a === 0 ? null : delta / a, signal: delta > 0 ? 'better' : delta < 0 ? 'worse' : 'same'};
}

function efficiencyDelta(left, right, name, threshold) {
  const a = left.aggregate?.[name]?.median ?? null;
  const b = right.aggregate?.[name]?.median ?? null;
  return compareEfficiency(a, b, threshold);
}

function valueDelta(left, right, name) {
  const a = left.aggregate?.[name]?.median ?? null;
  const b = right.aggregate?.[name]?.median ?? null;
  if (a === null || b === null || a === 0) return {baseline: a, candidate: b, relative: null, signal: 'informational'};
  return {baseline: a, candidate: b, relative: (b - a) / a, signal: 'informational'};
}

function compareEfficiency(a, b, threshold) {
  if (a === null || b === null) return {baseline: a, candidate: b, relative: null, signal: 'unavailable'};
  if (a === 0) return {baseline: a, candidate: b, relative: null, signal: b === 0 ? 'same' : 'worse'};
  const relative = (b - a) / a;
  const signal = relative <= -threshold ? 'better' : relative >= threshold ? 'worse' : 'same';
  return {baseline: a, candidate: b, relative, signal};
}

function classify(dimensions, incompatibilities) {
  if (incompatibilities.length) return 'inconclusive';
  const primary = ['qualityScore', 'routeScore', 'totalTokens', 'reportedCostUsd', 'estimatedCostUsd', 'durationMs', 'toolCalls'];
  const signals = primary.map((name) => dimensions[name].signal);
  const better = signals.includes('better');
  const worse = signals.includes('worse');
  if (better && worse) return 'mixed';
  if (better) return 'improved';
  if (worse) return 'regressed';
  return 'inconclusive';
}

function analyze({baseline, candidate, dimensions, incompatibilities, navigation, status, threshold}) {
  const harnessFindings = [];
  const harnessRecommendations = [];
  const experimentFindings = [];
  const experimentRecommendations = [];
  const addHarnessRecommendation = (item) => {
    if (!harnessRecommendations.some(({id}) => id === item.id)) harnessRecommendations.push(item);
  };
  const addExperimentRecommendation = (item) => {
    if (!experimentRecommendations.some(({id}) => id === item.id)) experimentRecommendations.push(item);
  };
  const baselineRuns = runSummary(baseline);
  const candidateRuns = runSummary(candidate);
  const minimumSuccessfulRuns = Math.min(baselineRuns.successful, candidateRuns.successful);
  const compatible = incompatibilities.length === 0;
  const invalidExperiment = !compatible
    || baselineRuns.total !== candidateRuns.total
    || baselineRuns.successful !== baselineRuns.total
    || candidateRuns.successful !== candidateRuns.total;

  harnessFindings.push({
    severity: status === 'regressed' ? 'high' : status === 'mixed' ? 'medium' : 'info',
    title: invalidExperiment ? 'The metric movement is descriptive only' : verdictTitle(status),
    evidence: verdictEvidence(dimensions, threshold),
  });

  if (!compatible) {
    experimentFindings.push({severity: 'high', title: 'The environments are not comparable', evidence: `Mismatches: ${incompatibilities.map(({field}) => field).join(', ')}.`});
    addExperimentRecommendation({
      id: 'align-environment', priority: 'high', category: 'experiment',
      title: 'Align the benchmark environment',
      action: `Rerun both sides with identical scenario, host, model, effort, CLI, and runner versions. Mismatches: ${incompatibilities.map(({field}) => field).join(', ')}.`,
      expectedImpact: 'Makes the result attributable to the harness change.',
    });
  }
  if (baselineRuns.total !== candidateRuns.total) {
    experimentFindings.push({severity: 'high', title: 'Attempt counts are unbalanced', evidence: `Baseline: ${baselineRuns.total}; candidate: ${candidateRuns.total}.`});
  }
  if (baselineRuns.successful !== baselineRuns.total || candidateRuns.successful !== candidateRuns.total) {
    experimentFindings.push({
      severity: 'high',
      title: 'Some attempts were unsuccessful or degraded',
      evidence: `Successful attempts: baseline ${baselineRuns.successful}/${baselineRuns.total}, candidate ${candidateRuns.successful}/${candidateRuns.total}.`,
    });
    addExperimentRecommendation({
      id: 'rerun-failures', priority: 'high', category: 'experiment', title: 'Rerun after eliminating host failures',
      action: 'Inspect hostErrors, fix transient CLI or provider failures, then collect the same number of successful attempts for both sides.',
      expectedImpact: 'Prevents failed runs from contaminating the harness comparison.',
    });
  }
  if (minimumSuccessfulRuns < 3 || baselineRuns.total !== candidateRuns.total) {
    experimentFindings.push({severity: 'medium', title: 'Variance is not measured reliably', evidence: `Successful attempts: baseline ${baselineRuns.successful}, candidate ${candidateRuns.successful}.`});
    addExperimentRecommendation({
      id: 'repeat-three', priority: 'high', category: 'experiment', title: 'Use three successful attempts per side',
      action: 'Run both baseline and candidate with --repeat 3 and compare their medians and ranges.',
      expectedImpact: 'Reduces the chance of treating normal model variance as a harness improvement.',
    });
  }
  if (baseline.environment?.model === 'default' || candidate.environment?.model === 'default'
    || baseline.environment?.effort === null || candidate.environment?.effort === null) {
    experimentFindings.push({severity: 'medium', title: 'Model configuration is not fully pinned', evidence: `Model/effort: ${candidate.environment?.model ?? 'unknown'}/${candidate.environment?.effort ?? 'default'}.`});
    addExperimentRecommendation({
      id: 'pin-model', priority: 'high', category: 'experiment', title: 'Pin model and effort',
      action: 'Pass explicit --model and --effort values to every benchmark run.',
      expectedImpact: 'Prevents a moving default model or effort setting from contaminating the comparison.',
    });
  }

  const candidateRevisits = navigation.candidateRevisits.medianRevisits ?? 0;
  const topRepeated = topRepeatedPaths(navigation.candidateRevisits);
  if (candidateRevisits > 0) {
    harnessFindings.push({
      severity: candidateRevisits >= 5 ? 'medium' : 'info',
      title: 'The candidate revisits repository paths',
      evidence: `Median revisits: ${candidateRevisits}. Most repeated: ${topRepeated.length ? topRepeated.map(({path, count}) => `${path} ×${count}`).join(', ') : 'n/a'}.`,
    });
    addHarnessRecommendation({
      id: 'reduce-revisits', priority: candidateRevisits >= 5 ? 'high' : 'medium', category: 'navigation',
      title: 'Add a repository-overview navigation map to the harness',
      action: `Point the agent to the minimum authoritative sources and ask it to batch independent reads. Start with the repeatedly visited paths: ${topRepeated.map(({path}) => path).join(', ') || 'the paths listed in the trace'}.`,
      expectedImpact: 'Reduces repeated tool output, context growth, and token consumption.',
    });
  }

  const hostErrors = dimensions.hostErrors.candidate;
  const failedTools = dimensions.failedToolCalls.candidate;
  if ((failedTools ?? 0) > 0) {
    harnessFindings.push({severity: 'high', title: 'The candidate made failed tool calls', evidence: `${failedTools} failed tool calls at the median.`});
    addHarnessRecommendation({
      id: 'remove-tool-errors', priority: 'high', category: 'navigation', title: 'Prevent invalid repository operations',
      action: 'Use the trace to find failed reads or commands, then make path discovery and supported commands clearer in the harness.',
      expectedImpact: 'Avoids wasted turns caused by preventable navigation errors.',
    });
  }
  if ((hostErrors ?? 0) > 0) {
    experimentFindings.push({severity: 'high', title: 'The host reported execution errors', evidence: `${hostErrors} host errors at the median.`});
    addExperimentRecommendation({
      id: 'remove-host-errors', priority: 'high', category: 'experiment', title: 'Stabilize the host before comparing harnesses',
      action: 'Inspect hostErrors and remove unsupported flags or transient provider failures before rerunning both sides.',
      expectedImpact: 'Makes the measured difference attributable to the harness rather than the runtime.',
    });
  }

  if (bothScoresPerfect(baseline, candidate)) {
    harnessFindings.push({severity: 'medium', title: 'The assertions did not discriminate between runs', evidence: 'Quality and route scores are 1.0 for both baseline and candidate.'});
    addHarnessRecommendation({
      id: 'stronger-assertions', priority: 'medium', category: 'eval', title: 'Add repository-specific facts and route budgets',
      action: 'Assert key facts, required authoritative documents, maximum tool calls, failed reads, and excessive path revisits—not only headings and citations.',
      expectedImpact: 'Makes a perfect score represent a genuinely accurate and efficient answer.',
    });
  }

  if (dimensions.reportedCostUsd.candidate === null && dimensions.estimatedCostUsd.candidate === null) {
    addExperimentRecommendation({
      id: 'configure-price', priority: 'low', category: 'experiment', title: 'Configure reproducible cost estimation if dollars matter',
      action: 'Pin the model and add its reviewed rates to prices.json; keep null when no reliable rate is available.',
      expectedImpact: 'Adds a comparable dollar metric without silently inventing prices.',
    });
  }

  const cacheDelta = dimensions.cachedInputTokens.relative;
  if (typeof cacheDelta === 'number' && Math.abs(cacheDelta) >= threshold) {
    experimentFindings.push({severity: 'medium', title: 'Prompt caching changed materially', evidence: `Cached input changed by ${formatPercent(cacheDelta)}; uncached input changed by ${formatPercent(dimensions.uncachedInputTokens.relative)}.`});
    addExperimentRecommendation({
      id: 'control-cache', priority: 'medium', category: 'experiment', title: 'Treat cache warming as an external variable',
      action: 'Run baseline and candidate in alternating order or in equally cold/warm conditions, and inspect cached versus uncached input separately.',
      expectedImpact: 'Avoids attributing provider cache effects to harness quality.',
    });
  }

  return {
    harness: {
      verdict: invalidExperiment ? 'inconclusive' : status,
      headline: invalidExperiment ? verdictTitle('inconclusive') : verdictTitle(status),
      confidence: invalidExperiment || minimumSuccessfulRuns < 3 ? 'low' : 'medium',
      findings: harnessFindings,
      recommendations: harnessRecommendations.sort((left, right) => priorityRank(left.priority) - priorityRank(right.priority)),
    },
    experiment: {
      validity: invalidExperiment ? 'invalid' : minimumSuccessfulRuns < 3 ? 'limited' : 'valid',
      findings: experimentFindings,
      recommendations: experimentRecommendations.sort((left, right) => priorityRank(left.priority) - priorityRank(right.priority)),
    },
  };
}

function runSummary(result) {
  const attempts = result.attempts ?? [];
  const total = attempts.length || result.repeat || 0;
  const successful = attempts.length
    ? attempts.filter((attempt) => attempt.success !== false && attempt.metrics?.degraded !== true && (attempt.metrics?.hostErrorCount ?? 0) === 0).length
    : result.aggregate?.successfulAttempts ?? total;
  return {total, successful};
}

function verdictTitle(status) {
  return ({
    improved: 'The candidate is a measurable improvement',
    regressed: 'The candidate is a measurable regression',
    mixed: 'The candidate has mixed trade-offs',
    inconclusive: 'No reliable improvement was demonstrated',
  })[status];
}

function verdictEvidence(dimensions, threshold) {
  const primary = new Set(['qualityScore', 'routeScore', 'totalTokens', 'reportedCostUsd', 'estimatedCostUsd', 'durationMs', 'toolCalls']);
  const changed = Object.entries(dimensions)
    .filter(([name]) => primary.has(name))
    .filter(([, value]) => ['better', 'worse'].includes(value.signal))
    .map(([name, value]) => `${name} ${formatPercent(value.relative)} (${value.signal})`);
  return changed.length ? changed.join('; ') : `No primary metric moved beyond the ${(threshold * 100).toFixed(1)}% threshold.`;
}

function topRepeatedPaths(summary) {
  const totals = new Map();
  for (const attempt of summary.attempts) {
    for (const {path, count} of attempt.repeatedPaths) totals.set(path, Math.max(totals.get(path) ?? 0, count));
  }
  return [...totals.entries()].sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0])).slice(0, 5).map(([path, count]) => ({path, count}));
}

function bothScoresPerfect(left, right) {
  return left.aggregate?.qualityScore?.median === 1 && right.aggregate?.qualityScore?.median === 1
    && left.aggregate?.routeScore?.median === 1 && right.aggregate?.routeScore?.median === 1;
}

function priorityRank(priority) {
  return ({high: 0, medium: 1, low: 2})[priority] ?? 3;
}

function percentage(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) throw new Error('--threshold must be a non-negative percentage');
  return parsed / 100;
}

function render(comparison) {
  const rows = Object.entries(comparison.dimensions).map(([name, value]) => (
    `| ${name} | ${format(value.baseline)} | ${format(value.candidate)} | ${formatPercent(value.relative)} | ${value.signal} |`
  )).join('\n');
  const incompatible = comparison.incompatibilities.length
    ? `\n## Incompatibilities\n\n${comparison.incompatibilities.map((item) => `- ${item.field}: \`${item.baseline}\` vs \`${item.candidate}\``).join('\n')}\n`
    : '';
  const navigation = `\n## Navigation changes\n\n` +
    `- Added paths: ${pathList(comparison.navigation.addedPaths)}\n` +
    `- Removed paths: ${pathList(comparison.navigation.removedPaths)}\n` +
    `\n### Baseline sequences\n\n${sequences(comparison.navigation.baselineSequences)}\n` +
    `\n### Candidate sequences\n\n${sequences(comparison.navigation.candidateSequences)}\n`;
  const harness = comparison.assessment.harness;
  const experiment = comparison.assessment.experiment;
  const assessment = `\n## Harness assessment\n\n` +
    `**${harness.headline}.** Confidence: ${harness.confidence}.\n\n` +
    renderFindings(harness.findings) +
    `\n\n### Harness improvement opportunities\n\n` +
    renderRecommendations(harness.recommendations) +
    `\n\n## Experiment validity\n\n**${experiment.validity}.**\n\n` +
    renderFindings(experiment.findings) +
    `\n\n### Experiment setup recommendations\n\n` +
    renderRecommendations(experiment.recommendations) + '\n';
  return `# Harness comparison\n\n**${comparison.status}**\n\n` +
    `| Metric | Baseline | Candidate | Delta | Signal |\n|---|---:|---:|---:|---|\n${rows}\n${assessment}${navigation}${incompatible}`;
}

function renderFindings(findings) {
  return findings.length
    ? findings.map((finding) => `- **${finding.title}:** ${finding.evidence}`).join('\n')
    : '_No findings._';
}

function renderRecommendations(recommendations) {
  return recommendations.length
    ? recommendations.map((item, index) => `${index + 1}. **[${item.priority}] ${item.title}.** ${item.action} Expected impact: ${item.expectedImpact}`).join('\n')
    : '_No recommendations._';
}

function pathList(paths) {
  return paths.length ? paths.map((path) => `\`${path}\``).join(', ') : 'none';
}

function sequences(items) {
  if (!items.length) return '_No paths detected._';
  return items.map((paths, index) => `${index + 1}. ${pathList(paths)}`).join('\n');
}

function printHelp(code) {
  process.stdout.write(`Usage: node compare.mjs --baseline <run-dir> --candidate <run-dir> [--threshold 5] [--fail-on-regression] [--output file.json]\n`);
  process.exitCode = code;
}

try {
  main();
} catch (error) {
  process.stderr.write(`repository-overview compare: ${error.message}\n`);
  process.exitCode = 1;
}
