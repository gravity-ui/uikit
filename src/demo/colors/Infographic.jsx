import React from 'react';
import {Showcase} from '../Showcase';
import {ColorPanel} from './ColorPanel';

const lite = [
    {
        name: 'infographics-info-light',
        title: 'Info Light',
        description: 'Инфо.',
    },
    {
        name: 'infographics-positive-light',
        title: 'Positive Light',
        description: 'Положительное.',
    },
    {
        name: 'infographics-warning-light',
        title: 'Warning Light',
        description: 'Предупреждающее.',
    },
    {
        name: 'infographics-danger-light',
        title: 'Danger Light',
        description: 'Опасное.',
    },
    {
        name: 'infographics-misc-light',
        title: 'Misc Light',
        description: 'Когда другое не подходит.',
    },
    {
        name: 'infographics-neutral-light',
        title: 'Neutral Light',
        description: 'Незаполненное, пустое.',
    },
];

const medium = [
    {
        name: 'infographics-info-medium',
        title: 'Info Medium',
        description: 'Инфо.',
    },
    {
        name: 'infographics-positive-medium',
        title: 'Positive Medium',
        description: 'Положительное.',
    },
    {
        name: 'infographics-warning-medium',
        title: 'Warning Medium',
        description: 'Предупреждающее.',
    },
    {
        name: 'infographics-danger-medium',
        title: 'Danger Medium',
        description: 'Опасное.',
    },
    {
        name: 'infographics-misc-medium',
        title: 'Misc Medium',
        description: 'Когда другое не подходит.',
    },
    {
        name: 'infographics-neutral-medium',
        title: 'Neutral Medium',
        description: 'Незаполненное, пустое.',
    },
];

const heavy = [
    {
        name: 'infographics-info-heavy',
        title: 'Info Heavy',
        description: 'Инфо.',
    },
    {
        name: 'infographics-positive-heavy',
        title: 'Positive Heavy',
        description: 'Положительное.',
    },
    {
        name: 'infographics-warning-heavy',
        title: 'Warning Heavy',
        description: 'Предупреждающее.',
    },
    {
        name: 'infographics-danger-heavy',
        title: 'Danger Heavy',
        description: 'Опасное.',
    },
    {
        name: 'infographics-misc-heavy',
        title: 'Misc Heavy',
        description: 'Когда другое не подходит.',
    },
    {
        name: 'infographics-neutral-heavy',
        title: 'Neutral Heavy',
        description: 'Незаполненное, пустое.',
    },
];

const axis = [
    {
        name: 'infographics-axis',
        title: 'Axis',
        descriotioni: 'Оси графиков',
    },
];

const tooltip = [
    {
        name: 'infographics-tooltip-bg',
        title: 'Chart Tooltip BG',
        description: 'Основной фон тултипов',
    },
];

export const RenderInfographic = () => (
    <Showcase title="Инфографика" description="Графики, диаграммы, индикаторы">
        <ColorPanel
            title="Ненасыщенные цвета"
            description="Подходят для заливок, которым не нужен большой контраст"
            colors={lite}
        />
        <ColorPanel
            title="Умеренные цвета"
            description="Для элементов, которым нужен умеренный контраст (например, барчарты)"
            colors={medium}
        />
        <ColorPanel
            title="Насыщенные цвета"
            description="Для случаев, когда требуется максимальный контраст. Статусы, маленькие элементы, точки, отметки"
            colors={heavy}
        />
        <ColorPanel
            title="Оси"
            description="Оси и направляющие для графиков и диаграмм"
            colors={axis}
        />
        <ColorPanel
            title="Тултипы"
            description="Для сохранения контекста, тултип с легкой прозрачностью"
            colors={tooltip}
            boxBorders={true}
        />
    </Showcase>
);
