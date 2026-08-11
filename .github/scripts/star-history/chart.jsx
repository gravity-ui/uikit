import {Chart} from '@gravity-ui/charts';
import {ThemeProvider} from '@gravity-ui/uikit';
import {createRoot} from 'react-dom/client';

import '@gravity-ui/uikit/styles/styles.css';

// Amber steps from the uikit token ramp. Both clear the palette validator against
// their own surface: sufficient chroma, inside the lightness band, and separable
// under the common colour vision deficiencies.
const SERIES_COLOR = {light: '#bd8e4b', dark: '#bc8a2e'};

// The same fill reads heavier against a dark surface, so the themes differ.
const AREA_OPACITY = {light: 0.25, dark: 0.16};

// Rendered into a live page rather than through renderToStaticMarkup: the chart
// draws its shapes imperatively with d3-selection and lays out the axes from
// measured text, so it needs a real layout engine. See render.mjs.
export function renderChart(container, {repo, series, total, updatedAt, theme}) {
    // ChartTitle has no subtitle and its HTML mode renders outside the SVG, which
    // the extraction step would drop; both facts go on the one line available.
    const count = new Intl.NumberFormat('en-US').format(total);
    const date = new Intl.DateTimeFormat('en', {dateStyle: 'medium', timeZone: 'UTC'}).format(
        new Date(updatedAt),
    );

    const data = {
        title: {text: `${repo} — ${count} GitHub stars · updated ${date}`},
        legend: {enabled: false},
        series: {
            data: [
                {
                    type: 'area',
                    name: 'Stars',
                    color: SERIES_COLOR[theme],
                    opacity: AREA_OPACITY[theme],
                    data: series.map(([day, value]) => ({x: Date.parse(day), y: value})),
                },
            ],
        },
        xAxis: {type: 'datetime'},
        yAxis: [{title: {text: ''}}],
    };

    createRoot(container).render(
        <ThemeProvider theme={theme} scoped>
            <Chart data={data} />
        </ThemeProvider>,
    );
}
