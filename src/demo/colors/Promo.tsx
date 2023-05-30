import React from 'react';

import {Showcase} from '../Showcase';

import {ColorPanel} from './ColorPanel';

const base = [
    {
        name: 'promo-base-silver',
        title: 'Silver',
        description: '',
    },
    {
        name: 'promo-base-gold',
        title: 'Gold',
        description: '',
    },
    {
        name: 'promo-base-asphalt',
        title: 'Asphalt',
        description: '',
    },
    {
        name: 'promo-base-tomato',
        title: 'Tomato',
        description: '',
    },
    {
        name: 'promo-base-copper',
        title: 'Copper',
        description: '',
    },
    {
        name: 'promo-base-mint',
        title: 'Mint',
        description: '',
    },
    {
        name: 'promo-base-sky',
        title: 'Sky',
        description: '',
    },
    {
        name: 'promo-base-neon',
        title: 'Neon',
        description: '',
    },
];

const highlight = [
    {
        name: 'promo-highlight-silver',
        title: 'Silver',
        description: '',
    },
    {
        name: 'promo-highlight-gold',
        title: 'Gold',
        description: '',
    },
    {
        name: 'promo-highlight-asphalt',
        title: 'Asphalt',
        description: '',
    },
    {
        name: 'promo-highlight-tomato',
        title: 'Tomato',
        description: '',
    },
    {
        name: 'promo-highlight-copper',
        title: 'Copper',
        description: '',
    },
    {
        name: 'promo-highlight-mint',
        title: 'Mint',
        description: '',
    },
    {
        name: 'promo-highlight-sky',
        title: 'Sky',
        description: '',
    },
    {
        name: 'promo-highlight-neon',
        title: 'Neon',
        description: '',
    },
];

const accent = [
    {
        name: 'promo-accent-silver',
        title: 'Silver',
        description: '',
    },
    {
        name: 'promo-accent-gold',
        title: 'Gold',
        description: '',
    },
    {
        name: 'promo-accent-asphalt',
        title: 'Asphalt',
        description: '',
    },
    {
        name: 'promo-accent-tomato',
        title: 'Tomato',
        description: '',
    },
    {
        name: 'promo-accent-copper',
        title: 'Copper',
        description: '',
    },
    {
        name: 'promo-accent-mint',
        title: 'Mint',
        description: '',
    },
    {
        name: 'promo-accent-sky',
        title: 'Sky',
        description: '',
    },
    {
        name: 'promo-accent-neon',
        title: 'Neon',
        description: '',
    },
];

const accentHover = [
    {
        name: 'promo-accent-hover-silver',
        title: 'Silver',
        description: '',
    },
    {
        name: 'promo-accent-hover-gold',
        title: 'Gold',
        description: '',
    },
    {
        name: 'promo-accent-hover-asphalt',
        title: 'Asphalt',
        description: '',
    },
    {
        name: 'promo-accent-hover-tomato',
        title: 'Tomato',
        description: '',
    },
    {
        name: 'promo-accent-hover-copper',
        title: 'Copper',
        description: '',
    },
    {
        name: 'promo-accent-hover-mint',
        title: 'Mint',
        description: '',
    },
    {
        name: 'promo-accent-hover-sky',
        title: 'Sky',
        description: '',
    },
    {
        name: 'promo-accent-hover-neon',
        title: 'Neon',
        description: '',
    },
];

const text = [
    {
        name: 'promo-text-silver',
        title: 'Silver',
        description: '',
    },
    {
        name: 'promo-text-gold',
        title: 'Gold',
        description: '',
    },
    {
        name: 'promo-text-asphalt',
        title: 'Asphalt',
        description: '',
    },
    {
        name: 'promo-text-tomato',
        title: 'Tomato',
        description: '',
    },
    {
        name: 'promo-text-copper',
        title: 'Copper',
        description: '',
    },
    {
        name: 'promo-text-mint',
        title: 'Mint',
        description: '',
    },
    {
        name: 'promo-text-sky',
        title: 'Sky',
        description: '',
    },
    {
        name: 'promo-text-neon',
        title: 'Neon',
        description: '',
    },
];

export const RenderPromo = () => (
    <Showcase title="Promo" description="Experimental palette.">
        <ColorPanel title="Base" description="Large underlays and blocks." colors={base} />
        <ColorPanel
            title="Highlight"
            description="Highlight text or slightly fill background."
            colors={highlight}
        />
        <ColorPanel
            title="Accent"
            description="Almost Base but for smaller objects. Only light theme."
            colors={accent}
        />
        <ColorPanel
            title="Accent Hover"
            description="Hover for Accent. Only light theme."
            colors={accentHover}
        />
        <ColorPanel
            title="Text"
            description="Texts in different styles. Only light theme."
            colors={text}
        />
    </Showcase>
);
