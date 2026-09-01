# Repository overview eval

For standalone usage, artifact details, comparison interpretation, and customization, read
[`README.md`](README.md). This file is the concise execution contract for an agent.

Use this eval to measure how efficiently an agent discovers a repository's applications,
architecture, technology stack, and invariants. The eval starts a fresh child session so its token
usage is attributable to the scenario rather than to the conversation that launched it.

## Run it

1. Work from the root of the repository being evaluated.
2. Identify the current host as `codex`, `claude`, or `opencode`. If you know the exact model and
   effort/variant, pass them as well; keeping them fixed is necessary for a meaningful comparison.
3. Run one smoke attempt:

   ```bash
   node .agents/evals/repository-overview/run.mjs --host <host> --repo . \
     [--model <model>] [--effort <effort>]
   ```

4. For a benchmark, use three attempts:

   ```bash
   node .agents/evals/repository-overview/run.mjs --host <host> --repo . \
     --model <model> --effort <effort> --repeat 3
   ```

5. Report the artifact directory printed by the command. Do not invent missing token or cost data;
   `null` means that the host did not expose it.

Each attempt times out after ten minutes by default; use `--timeout-ms` only when a large repository
needs a different bound.

The child session is configured for read-only/planning work. The runner also compares Git state
before and after the attempts and fails if the repository changes.

## Compare harness revisions

After changing `AGENTS.md`, `CLAUDE.md`, skills, or another harness surface, run the same benchmark
again with the same host, model, effort, and scenario. Then compare the two artifact directories:

```bash
node .agents/evals/repository-overview/compare.mjs \
  --baseline .agents/evals/repository-overview/.eval-artifacts/runs/<baseline> \
  --candidate .agents/evals/repository-overview/.eval-artifacts/runs/<candidate>
```

The comparison reports answer and navigation scores, tokens, cost, duration, tool calls, and the
ordered paths from each attempt. It also writes a deterministic assessment with confidence,
evidence-backed findings, and prioritized improvement opportunities. Cross-host, cross-model,
cross-effort, cross-CLI-version, or cross-runner-version results remain visible but are classified
as `inconclusive` because the change cannot be attributed to the harness alone.

## Copy it to another repository

Copy the entire eval directory to `.agents/evals/repository-overview` and add
`/.agents/evals/repository-overview/.eval-artifacts/` to the target repository's root `.gitignore`.
The eval has no package dependencies and requires only Node.js 20 or newer plus the CLI being
evaluated. Generated history stays inside the ignored `.eval-artifacts/` subdirectory, while the
eval definition and scripts can be committed.

To estimate dollar cost when a host does not report it, add the explicitly chosen model rates to
`prices.json`. Never fetch current prices during a run: a versioned local rate makes old and new
results reproducible.

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
