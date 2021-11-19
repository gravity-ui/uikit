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
    <Showcase
        title="Промо"
        description="Экспериментальная палитра для задач, связанных с коммуникационным дизайном"
    >
        <ColorPanel title="Base" description="Большие подложки и блоки" colors={base} />
        <ColorPanel
            title="Highlight"
            description="Подсветка в тексте и подложки, не требующие хорошей заметности"
            colors={highlight}
        />
        <ColorPanel
            title="Accent"
            description="Почти Base, но для более мелких объектов, кнопок и т.д., которым в темной теме потребуется более контрастный цвет, чем большим блокам. Пока только светлая тема"
            colors={accent}
        />
        <ColorPanel
            title="Accent Hover"
            description="Ховер для Accent. Пока только светлая тема"
            colors={accentHover}
        />
        <ColorPanel
            title="Text"
            description="Тексты разных стилей. Пока только светлая тема"
            colors={text}
        />
    </Showcase>
);
