import React from 'react';
import {Showcase} from '../Showcase';
import {ColorPanel} from './ColorPanel';

const generic = [
    {
        name: 'line-generic',
        title: 'Generic',
        description:
            'Обводка у кнопок, разделитель, обводка базовых блоков. Большая часть всех линий.',
    },
    {
        name: 'line-generic-hover',
        title: 'Generic Hover',
        description: 'Ховер для Generic.',
    },
    {
        name: 'line-generic-active',
        title: 'Generic Active',
        description: 'Активное состояние для Generic.',
    },
    {
        name: 'line-generic-accent',
        title: 'Generic Accent',
        description: 'Обводка у чекбоксов, радиобоксов, свитчей.',
    },
    {
        name: 'line-generic-accent-hover',
        title: 'Generic Accent Hover',
        description: 'Ховер для Generic Accent.',
    },
    {
        name: 'line-solid',
        title: 'Solid',
        description:
            'Обводки и разделители без прозрачности (если возникают артефакты при наложении).',
    },
    {
        name: 'line-selection-hover',
        title: 'Selection Hover',
        description: 'Для карточек: ховер при наведении.',
    },
    {
        name: 'line-selection-active',
        title: 'Selection Active',
        description: 'Для карточек: выбранный вариант.',
    },
    {
        name: 'line-link',
        title: 'Link',
        description: 'Обводка для кнопок-ссылок',
    },
];

const semantic = [
    {
        name: 'line-info',
        title: 'Info',
        description: 'Блоки-информеры.',
    },
    {
        name: 'line-positive',
        title: 'Positive',
        description: 'Для позитивных по жизни блоков.',
    },
    {
        name: 'line-warning',
        title: 'Warning',
        description: 'Блоки с предупреждениями.',
    },
    {
        name: 'line-danger',
        title: 'Danger',
        description: 'Блоки с плохими новостями.',
    },
    {
        name: 'line-misc',
        title: 'Misc',
        description: 'Когда не подходят другие варианты.',
    },
    {
        name: 'line-hint',
        title: 'Hint',
        description: 'Обводка для подсказок.',
    },
];

const alwaysLight = [
    {
        name: 'line-light',
        title: 'Light',
        description: 'Для разделителей и обводок поверх темного фона.',
    },
];

export const RenderLines = () => (
    <Showcase title="Линии" description="Обводки, разделители, рамки">
        <ColorPanel
            title="Базовые линии"
            description="Простые блоки, ховеры, подсветка выбранного"
            colors={generic}
        />
        <ColorPanel
            title="Семантически-окрашенные линии"
            description="Обводки для инфоблоков и похожих элементов"
            colors={semantic}
        />
        <ColorPanel
            title="Всегда светлые линии"
            description="Разделители, обводки и все остальное"
            colors={alwaysLight}
            boxBorders={true}
        />
    </Showcase>
);
