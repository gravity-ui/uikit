#!/usr/bin/env node
/**
 * Generates static star history charts (light + dark SVG) for a GitHub repository.
 *
 * GitHub restricted the stargazers API (June 2026) to repository admins and
 * collaborators, which broke third-party live chart embeds (star-history.com).
 * This script uses the repository's own credentials (GITHUB_TOKEN in Actions)
 * to fetch star timestamps via GraphQL and render the chart locally.
 *
 * Usage:
 *   GITHUB_TOKEN=<token> node .github/scripts/star-history.mjs [--repo owner/name] [--out dir]
 *
 * Options:
 *   --repo owner/name   Repository to chart (default: $GITHUB_REPOSITORY or gravity-ui/uikit)
 *   --out dir           Output directory (default: star-history-out)
 *   --from-json file    Render from a previously dumped JSON instead of fetching
 *
 * Output:
 *   <out>/star-history-light.svg
 *   <out>/star-history-dark.svg
 *   <out>/star-history.json (fetched data, for debugging and offline re-render)
 */

import fs from 'node:fs';
import path from 'node:path';

const WIDTH = 800;
const HEIGHT = 400;
const MARGIN = {top: 64, right: 108, bottom: 40, left: 56};
const MAX_POINTS = 240;

const THEMES = {
    light: {
        line: '#bd8e4b',
        areaFrom: 'rgba(255, 190, 92, 0.25)',
        areaTo: 'rgba(255, 190, 92, 0)',
        grid: 'rgba(0, 0, 0, 0.07)',
        baseline: 'rgba(0, 0, 0, 0.15)',
        textPrimary: 'rgba(0, 0, 0, 0.85)',
        textSecondary: 'rgba(0, 0, 0, 0.5)',
    },
    dark: {
        line: '#bc8a2e',
        areaFrom: 'rgba(255, 190, 92, 0.18)',
        areaTo: 'rgba(255, 190, 92, 0)',
        grid: 'rgba(255, 255, 255, 0.1)',
        baseline: 'rgba(255, 255, 255, 0.2)',
        textPrimary: 'rgba(255, 255, 255, 0.85)',
        textSecondary: 'rgba(255, 255, 255, 0.5)',
    },
};

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

/** Collapses raw ISO timestamps into a per-day cumulative series: [isoDay, total][]. */
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

function downsample(series, maxPoints) {
    if (series.length <= maxPoints) return series;
    const result = [];
    for (let i = 0; i < maxPoints - 1; i++) {
        result.push(series[Math.floor((i * series.length) / (maxPoints - 1))]);
    }
    result.push(series[series.length - 1]);
    return result;
}

function niceCeil(value) {
    const power = 10 ** Math.floor(Math.log10(Math.max(value, 1)));
    for (const step of [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]) {
        if (value <= step * power) return step * power;
    }
    return 10 * power;
}

function yTicks(yMax) {
    const step = yMax / 4;
    return [0, step, step * 2, step * 3, yMax];
}

/** Year boundaries for long ranges, otherwise several evenly spaced dates. */
function xTicks(minTime, maxTime) {
    const spanDays = (maxTime - minTime) / 86400000;
    const ticks = [];
    if (spanDays > 3 * 365) {
        const firstYear = new Date(minTime).getUTCFullYear() + 1;
        const lastYear = new Date(maxTime).getUTCFullYear();
        for (let year = firstYear; year <= lastYear; year++) {
            ticks.push({time: Date.UTC(year, 0, 1), label: String(year)});
        }
    } else {
        const format = new Intl.DateTimeFormat('en', {
            month: 'short',
            year: spanDays > 300 ? '2-digit' : undefined,
            timeZone: 'UTC',
        });
        for (let i = 0; i <= 4; i++) {
            const time = minTime + ((maxTime - minTime) * i) / 4;
            ticks.push({time, label: format.format(new Date(time))});
        }
    }
    return ticks;
}

const formatCount = (n) => new Intl.NumberFormat('en-US').format(n);

/** Turns the series into plot geometry: scales, path coordinates and the end-point anchor. */
function preparePlot({series, total, updatedAt}) {
    const plotW = WIDTH - MARGIN.left - MARGIN.right;
    const plotH = HEIGHT - MARGIN.top - MARGIN.bottom;
    const baselineY = MARGIN.top + plotH;

    const points = downsample(series, MAX_POINTS).map(([day, count]) => [Date.parse(day), count]);
    // Hold the final value until the generation date so the line reaches "today".
    const updatedTime = Date.parse(updatedAt);
    if (points.length > 0 && updatedTime > points[points.length - 1][0]) {
        points.push([updatedTime, total]);
    }

    const minTime = points.length ? points[0][0] : updatedTime - 86400000;
    const maxTime = points.length ? points[points.length - 1][0] : updatedTime;
    const yMax = niceCeil(Math.max(total, 4));

    const x = (time) => MARGIN.left + ((time - minTime) / Math.max(maxTime - minTime, 1)) * plotW;
    const y = (count) => baselineY - (count / yMax) * plotH;

    const coords = points.map(([time, count]) => `${x(time).toFixed(1)},${y(count).toFixed(1)}`);
    const linePath = coords.length ? `M${coords.join('L')}` : '';
    const areaPath = coords.length
        ? `${linePath}L${x(maxTime).toFixed(1)},${baselineY}L${x(minTime).toFixed(1)},${baselineY}Z`
        : '';

    return {
        plotW,
        baselineY,
        minTime,
        maxTime,
        yMax,
        x,
        y,
        linePath,
        areaPath,
        updatedTime,
        endX: coords.length ? x(maxTime) : MARGIN.left,
        endY: coords.length ? y(total) : baselineY,
    };
}

function renderGrid({yMax, y, plotW}, theme) {
    return yTicks(yMax)
        .slice(1)
        .map((tick) => {
            const ty = y(tick).toFixed(1);
            return (
                `<line x1="${MARGIN.left}" y1="${ty}" x2="${MARGIN.left + plotW}" y2="${ty}" stroke="${theme.grid}"/>` +
                `<text x="${MARGIN.left - 8}" y="${ty}" dy="4" text-anchor="end" class="tick">${formatCount(tick)}</text>`
            );
        })
        .join('\n    ');
}

function renderXLabels({minTime, maxTime, x, baselineY}) {
    return xTicks(minTime, maxTime)
        .map(
            (tick) =>
                `<text x="${x(tick.time).toFixed(1)}" y="${baselineY + 24}" text-anchor="middle" class="tick">${tick.label}</text>`,
        )
        .join('\n    ');
}

function renderSvg({repo, series, total, updatedAt, theme}) {
    const t = THEMES[theme];
    const plot = preparePlot({series, total, updatedAt});
    const {plotW, baselineY, linePath, areaPath, endX, endY} = plot;

    const gridLines = renderGrid(plot, t);
    const xLabels = renderXLabels(plot);
    const updatedLabel = new Intl.DateTimeFormat('en', {
        dateStyle: 'medium',
        timeZone: 'UTC',
    }).format(new Date(plot.updatedTime));

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" width="${WIDTH}" height="${HEIGHT}" role="img" aria-label="Star history of ${repo}: ${formatCount(total)} stars">
  <style>
    text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; }
    .title { font-size: 16px; font-weight: 600; fill: ${t.textPrimary}; }
    .subtitle { font-size: 12px; fill: ${t.textSecondary}; }
    .tick { font-size: 12px; fill: ${t.textSecondary}; }
    .end-count { font-size: 18px; font-weight: 600; fill: ${t.textPrimary}; }
    .end-caption { font-size: 12px; fill: ${t.textSecondary}; }
  </style>
  <defs>
    <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${t.areaFrom}"/>
      <stop offset="1" stop-color="${t.areaTo}"/>
    </linearGradient>
  </defs>
  <text x="${MARGIN.left}" y="28" class="title">${repo} — GitHub stars</text>
  <text x="${MARGIN.left}" y="46" class="subtitle">Updated ${updatedLabel}</text>
  <g>
    ${gridLines}
  </g>
  <line x1="${MARGIN.left}" y1="${baselineY}" x2="${MARGIN.left + plotW}" y2="${baselineY}" stroke="${t.baseline}"/>
  <g>
    ${xLabels}
  </g>
  <path d="${areaPath}" fill="url(#area)"/>
  <path d="${linePath}" fill="none" stroke="${t.line}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
  <circle cx="${endX.toFixed(1)}" cy="${endY.toFixed(1)}" r="4" fill="${t.line}"/>
  <text x="${(endX + 12).toFixed(1)}" y="${endY.toFixed(1)}" dy="2" class="end-count">${formatCount(total)}</text>
  <text x="${(endX + 12).toFixed(1)}" y="${(endY + 18).toFixed(1)}" class="end-caption">stars ★</text>
</svg>
`;
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
        console.log(`Fetching star history for ${args.repo}...`);
        const {stargazerCount, dates} = await fetchStarDates(args.repo, token);
        console.log(`Fetched ${dates.length} star timestamps (stargazerCount: ${stargazerCount})`);
        data = {
            repo: args.repo,
            updatedAt: new Date().toISOString(),
            total: stargazerCount,
            series: toDailyCumulative(dates),
        };
    }

    fs.mkdirSync(args.out, {recursive: true});
    fs.writeFileSync(path.join(args.out, 'star-history.json'), JSON.stringify(data, null, 2));
    for (const theme of Object.keys(THEMES)) {
        const svg = renderSvg({...data, theme});
        const file = path.join(args.out, `star-history-${theme}.svg`);
        fs.writeFileSync(file, svg);
        console.log(`Wrote ${file}`);
    }
}

main().catch((error) => {
    console.error(error?.stack ?? error);
    process.exit(1);
});
