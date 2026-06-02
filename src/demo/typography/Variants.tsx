import * as React from 'react';

import {SegmentedRadioGroup} from '../../components';
import {Showcase} from '../Showcase';

import {TextPanel} from './TextPanel';

interface TypographyVariantItem {
    name: string;
    title: string;
}

interface TypographyVariantGroup {
    value: string;
    title: string;
    description: string;
    items: TypographyVariantItem[];
}

const variantGroups: TypographyVariantGroup[] = [
    {
        value: 'body',
        title: 'Body',
        description: 'Used for all types of text.',
        items: [
            {
                name: 'text-body-1',
                title: 'Body 1',
            },
            {
                name: 'text-body-2',
                title: 'Body 2',
            },
            {
                name: 'text-body-3',
                title: 'Body 3',
            },
        ],
    },
    {
        value: 'caption',
        title: 'Caption',
        description:
            'The smallest fonts of all available fonts. Used as styles for captions, footnotes, and any additional information.',
        items: [
            {
                name: 'text-caption-1',
                title: 'Caption 1',
            },
            {
                name: 'text-caption-2',
                title: 'Caption 2',
            },
        ],
    },
    {
        value: 'header',
        title: 'Header',
        description: 'Used for page and section headings.',
        items: [
            {
                name: 'text-header-1',
                title: 'Header 1',
            },
            {
                name: 'text-header-2',
                title: 'Header 2',
            },
        ],
    },
    {
        value: 'subheader',
        title: 'Subheader',
        description: 'Used for headings inside blocks and compact sections.',
        items: [
            {
                name: 'text-subheader-1',
                title: 'Subheader 1',
            },
            {
                name: 'text-subheader-2',
                title: 'Subheader 2',
            },
            {
                name: 'text-subheader-3',
                title: 'Subheader 3',
            },
        ],
    },
    {
        value: 'display',
        title: 'Display',
        description: 'Used for the largest expressive titles and promo text.',
        items: [
            {
                name: 'text-display-1',
                title: 'Display 1',
            },
            {
                name: 'text-display-2',
                title: 'Display 2',
            },
            {
                name: 'text-display-3',
                title: 'Display 3',
            },
            {
                name: 'text-display-4',
                title: 'Display 4',
            },
        ],
    },
    {
        value: 'code',
        title: 'Code',
        description: 'Used for code blocks, snippets, IDs, and technical values.',
        items: [
            {
                name: 'text-code-1',
                title: 'Code 1',
            },
            {
                name: 'text-code-2',
                title: 'Code 2',
            },
            {
                name: 'text-code-3',
                title: 'Code 3',
            },
        ],
    },
    {
        value: 'code-inline',
        title: 'Code Inline',
        description: 'Used for short inline code fragments inside regular text.',
        items: [
            {
                name: 'text-code-inline-1',
                title: 'Code Inline 1',
            },
            {
                name: 'text-code-inline-2',
                title: 'Code Inline 2',
            },
            {
                name: 'text-code-inline-3',
                title: 'Code Inline 3',
            },
        ],
    },
];

const options = variantGroups.map(({value, title}) => ({value, content: title}));

export const RenderVariants = () => {
    const [activeGroup, setActiveGroup] = React.useState(variantGroups[0].value);
    const selectedGroup =
        variantGroups.find(({value}) => value === activeGroup) ?? variantGroups[0];

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
                variant
            />
        </Showcase>
    );
};
