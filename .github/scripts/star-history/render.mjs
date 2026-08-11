import path from 'node:path';
import {fileURLToPath} from 'node:url';

import esbuild from 'esbuild';
import {chromium} from 'playwright';

const HERE = path.dirname(fileURLToPath(import.meta.url));

const WIDTH = 800;
const HEIGHT = 400;

// The chart lays itself out from measured text and then freezes the result into
// coordinates, so the font used while rendering has to be one a README reader
// actually resolves. A system stack keeps the drift to a few pixels per label.
const FONT_STACK = `-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif`;

// Everything that carries the chart's appearance. @gravity-ui/charts styles its
// shapes through CSS classes that resolve to uikit theme variables, so an SVG
// lifted out of the page is colourless until these are written onto the elements.
const PRESENTATION_PROPS = [
    'fill',
    'fill-opacity',
    'fill-rule',
    'stroke',
    'stroke-width',
    'stroke-opacity',
    'stroke-dasharray',
    'stroke-linecap',
    'stroke-linejoin',
    'stop-color',
    'stop-opacity',
    'opacity',
    'font-family',
    'font-size',
    'font-weight',
    'font-style',
    'text-anchor',
    'dominant-baseline',
    'letter-spacing',
    'paint-order',
];

async function bundleChart() {
    const result = await esbuild.build({
        entryPoints: [path.join(HERE, 'chart.jsx')],
        absWorkingDir: HERE,
        bundle: true,
        // Nothing is written; esbuild still needs a target directory to name the
        // JS and CSS outputs it hands back in memory.
        write: false,
        outdir: path.join(HERE, 'dist'),
        format: 'iife',
        globalName: 'StarHistoryChart',
        jsx: 'automatic',
        target: 'chrome120',
        define: {'process.env.NODE_ENV': '"production"'},
        loader: {
            '.css': 'css',
            '.svg': 'dataurl',
            '.png': 'dataurl',
            '.woff': 'dataurl',
            '.woff2': 'dataurl',
        },
    });

    const find = (extension) => result.outputFiles.find((file) => file.path.endsWith(extension));
    return {js: find('.js')?.text ?? '', css: find('.css')?.text ?? ''};
}

// Poll until the markup stops changing: the component debounces its resize
// handling by 200ms and draws in an effect, so the first paint is not the last.
async function waitForStableChart(page) {
    let previous = 0;
    for (let attempt = 0; attempt < 40; attempt++) {
        const current = await page.evaluate(
            () => document.querySelector('#root svg')?.outerHTML.length ?? 0,
        );
        if (current > 0 && current === previous) return;
        previous = current;
        await page.waitForTimeout(250);
    }
    throw new Error('Chart did not settle within 10 seconds');
}

// Runs inside the page, so it has to be self-contained: page.evaluate serialises
// the function and it cannot reach anything in this module's scope.
function extractSvg({props, label, width, height}) {
    const root = document.querySelector('#root svg');
    if (!root) throw new Error('No SVG produced');

    // Definitions are never painted, so their computed display is `none`; keeping
    // them is the difference between a clipped chart and an empty one.
    const isDefinition = (element) =>
        element.closest('defs, clipPath, linearGradient, radialGradient, pattern, mask, marker');

    const prune = () => {
        for (const element of [...root.querySelectorAll('*')]) {
            if (isDefinition(element)) continue;
            const style = getComputedStyle(element);
            if (style.display === 'none' || style.visibility === 'hidden') element.remove();
        }
    };

    // Only what differs from the inherited value is written out. Repeating the
    // whole whitelist on every element makes the file 3.4 times bigger, and
    // getComputedStyle().cssText is empty by specification, so there is no
    // shortcut through it.
    const inlineStyles = (element, inherited) => {
        const style = getComputedStyle(element);
        const own = [];
        const next = {...inherited};
        for (const prop of props) {
            const value = style.getPropertyValue(prop);
            if (!value) continue;
            next[prop] = value;
            if (value !== inherited[prop]) own.push(`${prop}:${value}`);
        }
        if (own.length) element.setAttribute('style', own.join(';'));
        else element.removeAttribute('style');
        element.removeAttribute('class');
        for (const child of element.children) inlineStyles(child, next);
    };

    const finalise = () => {
        root.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        root.setAttribute('width', String(width));
        root.setAttribute('height', String(height));
        root.setAttribute('viewBox', `0 0 ${width} ${height}`);
        root.setAttribute('role', 'img');
        root.setAttribute('aria-label', label);
    };

    prune();
    inlineStyles(root, {});
    finalise();

    return new XMLSerializer().serializeToString(root);
}

// Renders one SVG per theme. Returns a map of theme name to markup.
export async function renderCharts({repo, series, total, updatedAt, themes}) {
    const {js, css} = await bundleChart();
    const browser = await chromium.launch();
    const results = {};

    try {
        for (const theme of themes) {
            const page = await browser.newPage({viewport: {width: WIDTH, height: HEIGHT}});
            // ThemeProvider wraps the chart in a div of its own that has no height,
            // which collapses the percentage sizing the component sizes itself from.
            await page.setContent(
                `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style>` +
                    `<style>` +
                    // The font goes on the document, not just the theme root: the
                    // library measures label widths in a probe element outside it,
                    // and a mismatch there truncates the widest label with an ellipsis.
                    `html,body{margin:0;padding:0;font-family:${FONT_STACK}}` +
                    `:root,html,body,.g-root{--g-font-family-sans:${FONT_STACK};--g-font-family-monospace:${FONT_STACK}}` +
                    `#root{width:${WIDTH}px;height:${HEIGHT}px}` +
                    `#root>div,.g-root{width:100%;height:100%}` +
                    `</style></head><body><div id="root"></div></body></html>`,
            );
            await page.addScriptTag({content: js});
            await page.evaluate(
                ([data]) =>
                    window.StarHistoryChart.renderChart(document.getElementById('root'), data),
                [{repo, series, total, updatedAt, theme}],
            );
            await page.waitForSelector('#root svg', {timeout: 30000});
            await waitForStableChart(page);

            const svg = await page.evaluate(extractSvg, {
                props: PRESENTATION_PROPS,
                label: `Star history of ${repo}: ${total} stars`,
                width: WIDTH,
                height: HEIGHT,
            });

            // The jsdom failure mode reaches this far: a structurally valid document
            // whose geometry is all NaN. Refuse to publish one.
            if (svg.includes('NaN')) {
                throw new Error(`Rendered ${theme} chart contains NaN coordinates`);
            }

            results[theme] = `${svg}\n`;
            await page.close();
        }
    } finally {
        await browser.close();
    }

    return results;
}
