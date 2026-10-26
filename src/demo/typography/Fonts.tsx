import * as React from 'react';

import {SegmentedRadioGroup} from '../../components';
import {Showcase} from '../Showcase';

import {TextPanel} from './TextPanel';

const fontGroups = [
    {
        value: 'main',
        title: 'Main',
        description: 'Base font families used across Gravity UI.',
        items: [
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
        ],
    },
    {
        value: 'variants',
        title: 'Variants',
        description: 'Font family for each text variant group.',
        items: [
            {
                name: 'text-body-font-family',
                title: 'Body',
                description: 'Controls body-* text variants font.',
            },
            {
                name: 'text-caption-font-family',
                title: 'Caption',
                description: 'Controls caption-* text variants font.',
            },
            {
                name: 'text-header-font-family',
                title: 'Header',
                description: 'Controls header-* text variants font.',
            },
            {
                name: 'text-subheader-font-family',
                title: 'Subheader',
                description: 'Controls subheader-* text variants font.',
            },
            {
                name: 'text-display-font-family',
                title: 'Display',
                description: 'Controls display-* text variants font.',
            },
            {
                name: 'text-code-font-family',
                title: 'Code',
                description: 'Controls code-* and code-inline-* text variants font.',
            },
        ],
    },
];

const options = fontGroups.map(({value, title}) => ({value, content: title}));

export const RenderFonts = () => {
    const [activeGroup, setActiveGroup] = React.useState(fontGroups[0].value);
    const selectedGroup = fontGroups.find(({value}) => value === activeGroup) ?? fontGroups[0];

    return (
        <Showcase direction="column">
            <SegmentedRadioGroup<string>
                value={activeGroup}
                onUpdate={setActiveGroup}
                options={options}
            />
            <TextPanel
                title={selectedGroup.title}
                description={selectedGroup.description}
                items={selectedGroup.items}
                mode="font"
            />
        </Showcase>
    );
};
