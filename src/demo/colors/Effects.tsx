import React from 'react';
import {Showcase} from '../Showcase';
import {ColorPanel} from './ColorPanel';

const misc = [
    {
        name: 'sfx-veil',
        title: 'Veil',
        description: 'Popup backdrop.',
    },
    {
        name: 'sfx-shadow',
        title: 'Shadow',
        description: 'Shadow for everything that might have it.',
    },
    {
        name: 'sfx-shadow-light',
        title: 'Shadow Light',
        description: 'Shadow for card size m.',
    },
    {
        name: 'sfx-shadow-heavy',
        title: 'Shadow Heavy',
        description: 'Heavy shadows. DEPRECATED.',
    },
    {
        name: 'sfx-fade',
        title: 'Fade',
        description: 'Enlighten while loading.',
    },
];

export const RenderEffects = () => (
    <Showcase title="Effects" description="Shadows, blackouts, etc.">
        <ColorPanel title="Other" description="" colors={misc} boxBorders={true} />
    </Showcase>
);
