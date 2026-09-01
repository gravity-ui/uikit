# Repository overview eval

A portable, dependency-free benchmark for measuring how an agent learns and explains a repository.
Copy this entire directory into another repository and run it there; no reference to the original
`skills-dev` checkout is required.

The eval asks a fresh agent session to explain:

- applications and packages;
- architecture;
- technology stack;
- developer invariants.

It records the answer, token usage, cost when available, duration, tool calls, failed operations,
and the ordered repository paths observed in tool inputs. `compare.mjs` then classifies the result
and generates a deterministic assessment. Harness improvements are reported separately from
experiment setup recommendations, so benchmark hygiene is not presented as a change to `AGENTS.md`.

## Requirements

- Node.js 20 or newer.
- At least one supported CLI, already authenticated: Codex CLI, Claude Code, or OpenCode.
- A Git repository when mutation detection is required.

The eval has no npm dependencies and does not need `npm install`.

## Copy to another repository

1. Copy this directory to `.agents/evals/repository-overview` in the target repository, creating
   `.agents/evals` when needed.
2. Add `/.agents/evals/repository-overview/.eval-artifacts/` to the target repository's root
   `.gitignore`.

Runs and comparisons are written to the nested
`.agents/evals/repository-overview/.eval-artifacts/` directory, keeping the complete harness under
`.agents` while leaving generated results uncommitted.

## Quick start for an agent

From the target repository root, tell the agent:

> Run `.agents/evals/repository-overview/EVAL.md` for this repository.

The agent should choose its current host and report the artifact directory printed by the runner.

## Run it directly

Smoke test with one attempt:

```bash
node .agents/evals/repository-overview/run.mjs \
  --host codex \
  --repo . \
  --model <model-id> \
  --effort <effort>
```

Use `--host claude` or `--host opencode` for another CLI. Model identifiers and effort/variant
values are passed through to the selected host.

Benchmark with three attempts:

```bash
node .agents/evals/repository-overview/run.mjs \
  --host codex \
  --repo . \
  --model <model-id> \
  --effort <effort> \
  --repeat 3
```

Keep host, model, effort, CLI version, runner version, and scenario identical between baseline and
candidate. Otherwise the comparison is descriptive but classified as `inconclusive`.

Run `node .agents/evals/repository-overview/run.mjs --help` for all options. Each attempt has a
ten-minute timeout by default.

## Artifacts

Every invocation writes a timestamped directory inside the portable eval directory:

```text
.agents/evals/repository-overview/.eval-artifacts/
├── runs/
│   └── <timestamp>-<host>/
│       ├── result.json
│       ├── report.md
│       └── attempts/
│           └── <number>/
│               ├── metrics.json
│               ├── raw.jsonl
│               ├── response.md
│               ├── stderr.log
│               └── trace.json
└── comparisons/
    └── <timestamp>-<baseline>-vs-<candidate>/
        ├── comparison.json
        └── comparison.md
```

- `raw.jsonl` is the original host event stream. Keep it: parser fixes can be validated against it.
- `trace.json` contains normalized tool calls and observed repository paths, not private
  chain-of-thought.
- `metrics.json` contains usage, cost, timing, failed calls, and parser health for one attempt.
- `result.json` is the machine-readable aggregate consumed by `compare.mjs`; its format is
  documented by [`artifact.schema.json`](artifact.schema.json) for external validators and
  integrations. The runner does not validate it at runtime so the portable eval stays
  dependency-free.
- `report.md` is the human-readable run summary.

Add `/.agents/evals/repository-overview/.eval-artifacts/` to the target repository's root
`.gitignore`. This keeps generated history beside the eval without committing it.

## Compare baseline and candidate

After changing `AGENTS.md`, `CLAUDE.md`, skills, or another harness surface, rerun the same benchmark:

```bash
node .agents/evals/repository-overview/compare.mjs \
  --baseline .agents/evals/repository-overview/.eval-artifacts/runs/<baseline> \
  --candidate .agents/evals/repository-overview/.eval-artifacts/runs/<candidate>
```

Each invocation creates a new directory under
`.agents/evals/repository-overview/.eval-artifacts/comparisons/`, so comparing the same runs again
preserves both reports. Each report includes:

- `improved`, `regressed`, `mixed`, or `inconclusive` status;
- metric deltas using a 5% materiality threshold by default;
- added and removed paths plus per-attempt path sequences;
- repeated-path analysis;
- a harness verdict with concrete navigation and instruction improvements;
- a separate experiment-validity verdict for repeat count, failed runs, model pinning, caching, and
  other benchmark conditions.

Change the threshold with `--threshold <percent>`. Add `--fail-on-regression` only when the eval is
stable enough to act as a CI gate.

## Configure cost

Some hosts report cost directly. For other hosts, add reviewed per-million-token rates to
`prices.json`:

```json
{
  "models": {
    "codex/example-model": {
      "inputPerMillion": 1,
      "cachedInputPerMillion": 0.1,
      "cacheCreationInputPerMillion": 1.25,
      "outputPerMillion": 5
    }
  }
}
```

Pin the exact model used by the run. Unknown cost remains `null`; the runner never downloads or
guesses current prices.

## Adapt assertions to a repository

The portable `scenario.json` checks the four required answer areas, citations to real files, and
basic README/manifest navigation. For a stronger signal, add repository-specific assertions for:

- facts that must appear in a correct overview;
- authoritative architecture and invariant documents;
- paths that should not be used as sources;
- tool-call and path-revisit budgets.

Increment `scenario.version` whenever the prompt or assertions change. Do not compare different
scenario versions as evidence of a harness improvement.

Assertions use `group: "quality"` for answer correctness and `group: "route"` for navigation. The
supported types are:

| Type | Configuration | Checks |
|---|---|---|
| `answer-regex` | `pattern`, optional `flags` | The final answer contains an expected fact or section. |
| `answer-existing-paths` | `minimum` | The answer cites at least this many real repository files. |
| `trace-path-if-present` | `patterns` | The trace uses a matching path when such a file exists. |
| `trace-path-not-seen` | `patterns` | The trace avoids matching paths. |
| `max-tool-calls` | `maximum` | The run stays within a tool-call budget. |
| `max-failed-tool-calls` | `maximum` | Failed tool calls stay within budget. |
| `max-path-revisits` | `maximum` | Repeated references to already visited paths stay within budget. |

Patterns are JavaScript regular expressions stored as JSON strings. See `scenario.json` for complete
examples of the common answer and route assertions.

## Interpretation limits

- One attempt is a smoke test, not evidence of improvement. Prefer three or more attempts.
- Prompt caching can change uncached tokens and cost between consecutive runs. Inspect cached and
  uncached input separately and alternate baseline/candidate order when cache effects matter.
- A host may inject `AGENTS.md` or equivalent instructions without a visible tool call. The trace
  records observable tool activity, not every piece of context supplied by the host.
- Generic deterministic assertions cannot prove every architectural statement correct. Add
  repository-specific facts or perform human review for high-stakes comparisons.
- Planning/read-only modes differ between hosts. The runner records Git state before and after and
  fails when it detects repository changes.
