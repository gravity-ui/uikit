import {Showcase} from '../Showcase';

import {TextPanel} from './TextPanel';

const body = [
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
    {
        name: 'text-body-short',
        title: 'Body Short',
    },
];

const caption = [
    {
        name: 'text-caption-1',
        title: 'Caption 1',
    },
    {
        name: 'text-caption-2',
        title: 'Caption 2',
    },
];

const header = [
    {
        name: 'text-header-1',
        title: 'Header 1',
    },
    {
        name: 'text-header-2',
        title: 'Header 2',
    },
];

const subheader = [
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
];

const display = [
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
];

const code = [
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
];

const codeInline = [
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
];

export const RenderVariants = () => (
    <Showcase title="Variants">
        <TextPanel title="Body" description="" items={body} variant />
        <TextPanel title="Caption" description="" items={caption} variant />
        <TextPanel title="Header" description="" items={header} variant />
        <TextPanel title="Subheader" description="" items={subheader} variant />
        <TextPanel title="Display" description="" items={display} variant />
        <TextPanel title="Code" description="" items={code} variant />
        <TextPanel title="Code Inline" description="" items={codeInline} variant />
    </Showcase>
);
