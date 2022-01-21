import React from 'react';
import {Showcase} from '../Showcase';
import {ColorPanel} from './ColorPanel';

const lite = [
    {
        name: 'infographics-info-light',
        title: 'Info Light',
        description: 'Info.',
    },
    {
        name: 'infographics-positive-light',
        title: 'Positive Light',
        description: 'Positive.',
    },
    {
        name: 'infographics-warning-light',
        title: 'Warning Light',
        description: 'Warning.',
    },
    {
        name: 'infographics-danger-light',
        title: 'Danger Light',
        description: 'Danger.',
    },
    {
        name: 'infographics-misc-light',
        title: 'Misc Light',
        description: 'Uncategorized.',
    },
    {
        name: 'infographics-neutral-light',
        title: 'Neutral Light',
        description: 'Not filled, empty.',
    },
];

const medium = [
    {
        name: 'infographics-info-medium',
        title: 'Info Medium',
        description: 'Info.',
    },
    {
        name: 'infographics-positive-medium',
        title: 'Positive Medium',
        description: 'Positive.',
    },
    {
        name: 'infographics-warning-medium',
        title: 'Warning Medium',
        description: 'Warning.',
    },
    {
        name: 'infographics-danger-medium',
        title: 'Danger Medium',
        description: 'Danger.',
    },
    {
        name: 'infographics-misc-medium',
        title: 'Misc Medium',
        description: 'Uncategorized.',
    },
    {
        name: 'infographics-neutral-medium',
        title: 'Neutral Medium',
        description: 'Not filled, empty.',
    },
];

const heavy = [
    {
        name: 'infographics-info-heavy',
        title: 'Info Heavy',
        description: 'Info.',
    },
    {
        name: 'infographics-positive-heavy',
        title: 'Positive Heavy',
        description: 'Positive.',
    },
    {
        name: 'infographics-warning-heavy',
        title: 'Warning Heavy',
        description: 'Warning.',
    },
    {
        name: 'infographics-danger-heavy',
        title: 'Danger Heavy',
        description: 'Danger.',
    },
    {
        name: 'infographics-misc-heavy',
        title: 'Misc Heavy',
        description: 'Uncategorized.',
    },
    {
        name: 'infographics-neutral-heavy',
        title: 'Neutral Heavy',
        description: 'Not filled, empty.',
    },
];

const axis = [
    {
        name: 'infographics-axis',
        title: 'Axis',
        description: 'Graph axis',
    },
];

const tooltip = [
    {
        name: 'infographics-tooltip-bg',
        title: 'Chart Tooltip BG',
        description: 'Main background for tooltips.',
    },
];

export const RenderInfographic = () => (
    <Showcase title="Infographic" description="Graphs, diagrams, indicators.">
        <ColorPanel title="Light colors" description="Light contrast." colors={lite} />
        <ColorPanel
            title="Medium colors"
            description="Medium contrast. For example, bar charts."
            colors={medium}
        />
        <ColorPanel
            title="Heavy colors"
            description="Heavy contrast. Statuses, small elements, dots, marks."
            colors={heavy}
        />
        <ColorPanel
            title="Axes"
            description="Axes and guides for graphs and diagrams."
            colors={axis}
        />
        <ColorPanel
            title="Tooltips"
            description="Tooltip with tiny transparency."
            colors={tooltip}
            boxBorders={true}
        />
    </Showcase>
);
