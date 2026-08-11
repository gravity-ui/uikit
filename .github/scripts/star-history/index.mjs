#!/usr/bin/env node
// Generates the static star history charts (light + dark SVG) shown in the README.
//
// GitHub restricted the stargazers API (June 2026) to repository admins and
// collaborators, which broke third-party live chart embeds such as
// star-history.com. This script uses the repository's own credentials
// (GITHUB_TOKEN in Actions) to fetch star timestamps and renders the chart with
// @gravity-ui/charts, the charting library of this very design system.
//
// Rendering happens in headless Chromium: the library draws imperatively with
// d3-selection and lays out its axes from measured text, so there is no static
// rendering path. See render.mjs.
//
// Usage:
//   GITHUB_TOKEN=<token> node .github/scripts/star-history/index.mjs [options]
//
// Options:
//   --repo owner/name   Repository to chart (default: $GITHUB_REPOSITORY or gravity-ui/uikit)
//   --out dir           Output directory (default: star-history-out)
//   --from-json file    Render from a previously dumped JSON instead of fetching
//
// Output:
//   <out>/star-history-light.svg
//   <out>/star-history-dark.svg
//   <out>/star-history.json (fetched data, for debugging and offline re-render)

import fs from 'node:fs';
import path from 'node:path';

import {renderCharts} from './render.mjs';

const THEMES = ['light', 'dark'];
const MAX_POINTS = 240;

function parseArgs(argv) {
    const args = {
        repo: process.env.GITHUB_REPOSITORY || 'gravity-ui/uikit',
        out: 'star-history-out',
        fromJson: null,
    };
    for (let i = 2; i < argv.length; i++) {
        if (argv[i] === '--repo') args.repo = argv[++i];
        else if (argv[i] === '--out') args.out = argv[++i];
        else if (argv[i] === '--from-json') args.fromJson = argv[++i];
        else throw new Error(`Unknown argument: ${argv[i]}`);
    }
    if (!/^[\w.-]+\/[\w.-]+$/.test(args.repo)) {
        throw new Error(`Invalid --repo value: ${args.repo} (expected owner/name)`);
    }
    return args;
}

async function fetchStarDates(repo, token) {
    const [owner, name] = repo.split('/');
    const query = `
        query ($owner: String!, $name: String!, $cursor: String) {
            repository(owner: $owner, name: $name) {
                stargazerCount
                stargazers(first: 100, after: $cursor, orderBy: {field: STARRED_AT, direction: ASC}) {
                    pageInfo {
                        hasNextPage
                        endCursor
                    }
                    edges {
                        starredAt
                    }
                }
            }
        }
    `;
    const dates = [];
    let cursor = null;
    let stargazerCount = 0;
    let guard = 0;
    do {
        const response = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                Authorization: `bearer ${token}`,
                'Content-Type': 'application/json',
                'User-Agent': 'gravity-ui-star-history',
            },
            body: JSON.stringify({query, variables: {owner, name, cursor}}),
        });
        if (!response.ok) {
            throw new Error(
                `GitHub API responded with ${response.status}: ${await response.text()}`,
            );
        }
        const {data, errors} = await response.json();
        if (errors) {
            throw new Error(`GraphQL errors: ${JSON.stringify(errors)}`);
        }
        if (!data.repository) {
            throw new Error(`Repository ${repo} not found or not accessible with this token`);
        }
        stargazerCount = data.repository.stargazerCount;
        const {pageInfo, edges} = data.repository.stargazers;
        for (const edge of edges) {
            dates.push(edge.starredAt);
        }
        cursor = pageInfo.hasNextPage ? pageInfo.endCursor : null;
        if (++guard > Math.ceil(stargazerCount / 100) + 10) {
            throw new Error('Pagination guard tripped: too many pages fetched');
        }
    } while (cursor);

    if (stargazerCount > 0 && dates.length === 0) {
        throw new Error(
            'Stargazer timestamps are empty while stargazerCount > 0. ' +
                'GitHub restricts star data to repository admins and collaborators — ' +
                'the provided token has no access to it.',
        );
    }
    return {stargazerCount, dates};
}

// Collapses raw ISO timestamps into a per-day cumulative series: [isoDay, total][].
function toDailyCumulative(dates) {
    const perDay = new Map();
    for (const iso of dates) {
        const day = iso.slice(0, 10);
        perDay.set(day, (perDay.get(day) || 0) + 1);
    }
    const days = [...perDay.keys()].sort();
    const series = [];
    let total = 0;
    for (const day of days) {
        total += perDay.get(day);
        series.push([day, total]);
    }
    return series;
}

// Keeps the published SVG small; the shape of a five-year curve survives it.
function downsample(series, maxPoints) {
    if (series.length <= maxPoints) return series;
    const result = [];
    for (let i = 0; i < maxPoints - 1; i++) {
        result.push(series[Math.floor((i * series.length) / (maxPoints - 1))]);
    }
    result.push(series[series.length - 1]);
    return result;
}

async function main() {
    const args = parseArgs(process.argv);
    let data;

    if (args.fromJson) {
        data = JSON.parse(fs.readFileSync(args.fromJson, 'utf8'));
    } else {
        const token = process.env.GITHUB_TOKEN;
        if (!token) {
            throw new Error('GITHUB_TOKEN environment variable is required');
        }
        console.info(`Fetching star history for ${args.repo}...`);
        const {stargazerCount, dates} = await fetchStarDates(args.repo, token);
        console.info(`Fetched ${dates.length} star timestamps (stargazerCount: ${stargazerCount})`);
        data = {
            repo: args.repo,
            updatedAt: new Date().toISOString(),
            total: stargazerCount,
            series: toDailyCumulative(dates),
        };
    }

    fs.mkdirSync(args.out, {recursive: true});
    fs.writeFileSync(path.join(args.out, 'star-history.json'), JSON.stringify(data, null, 2));

    const charts = await renderCharts({
        repo: data.repo,
        series: downsample(data.series, MAX_POINTS),
        total: data.total,
        updatedAt: data.updatedAt,
        themes: THEMES,
    });

    for (const [theme, svg] of Object.entries(charts)) {
        const file = path.join(args.out, `star-history-${theme}.svg`);
        fs.writeFileSync(file, svg);
        console.info(`Wrote ${file}`);
    }
}

main().catch((error) => {
    console.error(error?.stack ?? error);
    process.exit(1);
});
