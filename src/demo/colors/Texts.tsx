import {Showcase} from '../Showcase';

import {ColorPanel} from './ColorPanel';

const main = [
    {
        name: 'text-primary',
        title: 'Primary',
        description: 'Primary text on the page. It is default for headers, paragraphs, buttons.',
    },
    {
        name: 'text-complementary',
        title: 'Complementary',
        description: 'Complementary text on the page. Controls, notes, etc.',
    },
    {
        name: 'text-secondary',
        title: 'Secondary',
        description: 'Secondary text on the page. Captions, definitions, nonessential information.',
    },
    {
        name: 'text-hint',
        title: 'Hint',
        description: 'Control hint.',
    },
];

const semantic = [
    {
        name: 'text-info',
        title: 'Info',
        description: 'Info text.',
    },
    {
        name: 'text-info-heavy',
        title: 'Info Heavy',
        description: 'Info text with underlay.',
    },
    {
        name: 'text-positive',
        title: 'Positive',
        description: 'Positive text.',
    },
    {
        name: 'text-positive-heavy',
        title: 'Positive Heavy',
        description: 'Positive text with underlay.',
    },
    {
        name: 'text-warning',
        title: 'Warning',
        description: 'Warning text.',
    },
    {
        name: 'text-warning-heavy',
        title: 'Warning Heavy',
        description: 'Warning text with underlay.',
    },
    {
        name: 'text-danger',
        title: 'Danger',
        description: 'Danger text.',
    },
    {
        name: 'text-danger-heavy',
        title: 'Danger Heavy',
        description: 'Danger text with underlay.',
    },
    {
        name: 'text-utility',
        title: 'Utility',
        description: 'For emphasizing, without semantic.',
    },
    {
        name: 'text-utility-heavy',
        title: 'Utility Heavy',
        description: 'Utility text with underlay.',
    },
    {
        name: 'text-misc',
        title: 'Misc',
        description: 'For emphasizing, without semantic.',
    },
    {
        name: 'text-misc-heavy',
        title: 'Misc Heavy',
        description: 'Misc text with underlay.',
    },
];

const brand = [
    {
        name: 'text-brand',
        title: 'Brand',
        description: 'Brand text.',
    },
    {
        name: 'text-link',
        title: 'Link',
        description: 'Links.',
    },
    {
        name: 'text-link-hover',
        title: 'Link Hover',
        description: 'Hover for Link.',
    },
    {
        name: 'text-link-visited',
        title: 'Link Visited',
        description: 'Visited Link.',
    },
    {
        name: 'text-link-visited-hover',
        title: 'Link Visited Hover',
        description: 'Hover for Visited Link.',
    },
];

const alwaysDark = [
    {
        name: 'text-dark-primary',
        title: 'Dark Primary',
        description: 'Primary text over light background.',
    },
    {
        name: 'text-dark-complementary',
        title: 'Dark Complementary',
        description: 'Complementary text over light background.',
    },
    {
        name: 'text-dark-secondary',
        title: 'Dark Secondary',
        description: 'Secondary text over light background.',
    },
    {
        name: 'text-dark-hint',
        title: 'Dark Hint',
        description: 'Minimal contrast.',
    },
];

const alwaysLight = [
    {
        name: 'text-light-primary',
        title: 'Light Primary',
        description: 'Primary text over dark background.',
    },
    {
        name: 'text-light-complementary',
        title: 'Light Complementary',
        description: 'Complementary text over dark background.',
    },
    {
        name: 'text-light-secondary',
        title: 'Light Secondary',
        description: 'Secondary text over dark background.',
    },
    {
        name: 'text-light-hint',
        title: 'Light Hint',
        description: 'Minimal contrast.',
    },
];

const inverted = [
    {
        name: 'text-inverted-primary',
        title: 'Inverted Primary',
        description: 'Primary text.',
    },
    {
        name: 'text-inverted-complementary',
        title: 'Inverted Complementary',
        description: 'Complementary text.',
    },
    {
        name: 'text-inverted-secondary',
        title: 'Inverted Secondary',
        description: 'Secondary text.',
    },
    {
        name: 'text-inverted-hint',
        title: 'Inverted Hint',
        description: 'Minimal contrast.',
    },
];

export const RenderTexts = () => (
    <Showcase title="Texts" description="Everything you need for writing texts.">
        <ColorPanel title="Main" description="Majority of all texts." colors={main} />
        <ColorPanel title="Semantic" description="Texts with semantic meaning." colors={semantic} />
        <ColorPanel title="Brand" description="Links and usernames." colors={brand} />
        <ColorPanel
            title="Always dark"
            description="Dark text in both themes."
            colors={alwaysDark}
            boxBorders={true}
        />
        <ColorPanel
            title="Always light"
            description="Texts over special backgrounds (blue, red, etc.)."
            colors={alwaysLight}
            boxBorders={true}
        />
        <ColorPanel
            title="Main inversion"
            description="Use with backgrounds that flip contrast (from low to high and vice versa)."
            colors={inverted}
            boxBorders={true}
        />
    </Showcase>
);
