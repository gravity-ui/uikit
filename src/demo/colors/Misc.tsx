import {Showcase} from '../Showcase';

import {ColorPanel} from './ColorPanel';

const scroll = [
    {
        name: 'scroll-track',
        title: 'Scroll Track',
        description: 'Scroll background.',
    },
    {
        name: 'scroll-handle',
        title: 'Scroll Handle',
        description: 'The handle to move the scroll.',
    },
    {
        name: 'scroll-handle-hover',
        title: 'Scroll Handle Hover',
        description: 'Hover state for scroll handle.',
    },
    {
        name: 'scroll-corner',
        title: 'Scroll Corner',
        description: 'A corner where horizontal and vertical scrolls meet.',
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

export const RenderMisc = () => (
    <Showcase title="Misc" description="Technical colors: scrolls, axes, tooltips.">
        <ColorPanel title="Scroll" description="Scroll colors." colors={scroll} />
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
