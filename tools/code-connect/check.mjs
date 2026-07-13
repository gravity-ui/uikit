import fs from 'node:fs';

import {analyzeCodeConnect, formatGithubAnnotation, renderGithubSummary} from './check-core.mjs';

const result = analyzeCodeConnect();

for (const diagnostic of result.diagnostics) {
    console.error(
        `${diagnostic.file}:${diagnostic.line}:${diagnostic.column} [${diagnostic.code}] ${diagnostic.message}`,
    );
    if (process.env.GITHUB_ACTIONS) {
        console.error(formatGithubAnnotation(diagnostic));
    }
}

console.info(
    `Code Connect coverage: ${result.coverage.connected}/${result.coverage.total} public component folders`,
);
if (result.coverage.missing.length > 0) {
    console.info(`Missing templates (informational): ${result.coverage.missing.join(', ')}`);
}

if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, renderGithubSummary(result));
}

if (result.diagnostics.length > 0) {
    process.exitCode = 1;
}
