import {Showcase} from '../Showcase';

import {TextPanel} from './TextPanel';

const main = [
    {
        name: 'font-family-sans',
        title: 'Sans',
        description: 'Default font family for all text.',
    },
    {
        name: 'font-family-monospace',
        title: 'Monospace',
        description: 'Code blocks, snippets, IDs.',
    },
];

const variantGroups = [
    {
        name: 'text-body-font-family',
        title: 'Body',
        description: 'Controls body-* text variants font',
    },
    {
        name: 'text-caption-font-family',
        title: 'Caption',
        description: 'Controls caption-* text variants font',
    },
    {
        name: 'text-header-font-family',
        title: 'Header',
        description: 'Controls header-* text variants font',
    },
    {
        name: 'text-subheader-font-family',
        title: 'Subheader',
        description: 'Controls subheader-* text variants font',
    },
    {
        name: 'text-display-font-family',
        title: 'Display',
        description: 'Controls display-* text variants font',
    },
    {
        name: 'text-code-font-family',
        title: 'Code',
        description: 'Controls code-* and code-inline-* text variants font',
    },
];

export const RenderFonts = () => (
    <Showcase title="Fonts">
        <TextPanel title="Main" description="" items={main} />
        <TextPanel
            title="Variants"
            description="Font family for each text variant group"
            items={variantGroups}
        />
    </Showcase>
);
