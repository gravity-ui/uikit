import {Showcase} from '../Showcase';

import {ColorPanel} from './ColorPanel';

const generic = [
    {
        name: 'line-generic',
        title: 'Generic',
        description: 'Button borders, dividers, basic block borders. Almost all lines.',
    },
    {
        name: 'line-generic-hover',
        title: 'Generic Hover',
        description: 'Hover for Generic.',
    },
    {
        name: 'line-generic-active',
        title: 'Generic Active',
        description: 'Active state for Generic.',
    },
    {
        name: 'line-generic-accent',
        title: 'Generic Accent',
        description: 'Control borders.',
    },
    {
        name: 'line-generic-accent-hover',
        title: 'Generic Accent Hover',
        description: 'Hover for Generic Accent.',
    },
    {
        name: 'line-generic-solid',
        title: 'Solid',
        description: 'Generic without transparency (to avoid collision artefacts).',
    },
];

const semantic = [
    {
        name: 'line-info',
        title: 'Info',
        description: 'Info blocks.',
    },
    {
        name: 'line-positive',
        title: 'Positive',
        description: 'Positive blocks.',
    },
    {
        name: 'line-warning',
        title: 'Warning',
        description: 'Warning blocks.',
    },
    {
        name: 'line-danger',
        title: 'Danger',
        description: 'Danger blocks. Blocks with negative context.',
    },
    {
        name: 'line-utility',
        title: 'Utility',
        description: 'Utility blocks.',
    },
    {
        name: 'line-misc',
        title: 'Misc',
        description: 'Uncategorized blocks.',
    },
];

const alwaysLight = [
    {
        name: 'line-light',
        title: 'Light',
        description: 'Dividers and borders over dark background.',
    },
];

export const RenderLines = () => (
    <Showcase title="Lines" description="Strokes, dividers, borders">
        <ColorPanel
            title="General"
            description="General blocks. Active and selected elements."
            colors={generic}
        />
        <ColorPanel
            title="Semantic"
            description="Blocks with semantic meaning."
            colors={semantic}
        />
        <ColorPanel
            title="Always light"
            description="Dividers, strokes and other."
            colors={alwaysLight}
            boxBorders={true}
        />
    </Showcase>
);
