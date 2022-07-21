import React from 'react';
import {Showcase} from '../Showcase';
import {ColorPanel} from './ColorPanel';

const basic = [
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
        name: 'text-positive',
        title: 'Positive',
        description: 'Positive text.',
    },
    {
        name: 'text-warning-medium',
        title: 'Warning Medium',
        description: 'Warning text without underlay.',
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
        name: 'text-utility',
        title: 'Utility',
        description: 'For emphasizing, without semantic.',
    },
    {
        name: 'text-misc',
        title: 'Misc',
        description: 'For emphasizing, without semantic.',
    },
];

const specials = [
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
    {
        name: 'text-yandex-red',
        title: 'Yandex Red',
        description: "Username's first letter.",
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
        <ColorPanel title="Main palette" description="Majority of all texts." colors={basic} />
        <ColorPanel
            title="Semantic palette"
            description="Texts with semantic meaning."
            colors={semantic}
        />
        <ColorPanel title="Specific" description="Links and usernames." colors={specials} />
        <ColorPanel
            title="Extra: always dark"
            description="Dark text in both themes."
            colors={alwaysDark}
            boxBorders={true}
        />
        <ColorPanel
            title="Extra: always light"
            description="Texts over special backgrounds (blue, red, etc.)."
            colors={alwaysLight}
            boxBorders={true}
        />
        <ColorPanel
            title="Extra: main color inversion"
            description="Use with backgrounds that flip contrast (from low to high and vice versa)."
            colors={inverted}
            boxBorders={true}
        />
    </Showcase>
);
