import React from 'react';
import {Showcase} from '../Showcase';
import {ColorPanel} from './ColorPanel';

const basic = [
    {
        name: 'base-background',
        title: 'Background',
        description: 'Фон страницы.',
    },
    {
        name: 'base-generic',
        title: 'Generic',
        description: 'Простая серая подложка — для кнопок и объектов покрупнее.',
    },
    {
        name: 'base-generic-hover',
        title: 'Generic Hover',
        description: 'Ховер для Base / Generic.',
    },
    {
        name: 'base-generic-medium',
        title: 'Generic Medium',
        description: 'Для нейтральных информационных блоков со средним контрастом.',
    },
    {
        name: 'base-generic-medium-hover',
        title: 'Generic Medium Hover',
        description: 'Ховер для Generic Medium.',
    },
    {
        name: 'base-generic-accent',
        title: 'Generic Accent',
        description: 'Фон для элементов управления. Чекбокс, радиобокс, свитч и т.п.',
    },
    {
        name: 'base-generic-accent-disabled',
        title: 'Generic Accent Disabled',
        description:
            'Фон для задисейбленных элементов управления. Чекбокс, радиобокс, свитч и т.п.',
    },
    {
        name: 'base-generic-ultralight',
        title: 'Generic Ultralight',
        description:
            'Фон для блоков, где нужен минимальный контраст. (Не рекомендуется к использованию)',
    },
    {
        name: 'base-simple-hover',
        title: 'Simple Hover',
        description: 'Ховер для объектов без собственного фона (работает поверх светлых фонов).',
    },
    {
        name: 'base-simple-hover-solid',
        title: 'Simple Hover Solid',
        description: 'Ховер для объектов без собственного фона (работает поверх светлых фонов).',
    },
    {
        name: 'base-selection',
        title: 'Selection',
        description: 'Подсветка выделенных объектов в меню, календаре и т.д.',
    },
    {
        name: 'base-selection-hover',
        title: 'Selection Hover',
        description: 'Ховер для Base / Selection.',
    },
    {
        name: 'base-selection-solid',
        title: 'Selection Solid',
        description: 'Подсветка выделенных объектов в меню, календаре и т.д.',
    },
    {
        name: 'base-selection-hover-solid',
        title: 'Selection Hover Solid',
        description: 'Ховер для Selection Solid',
    },
];

const specials = [
    {
        name: 'base-special',
        title: 'Special',
        description: 'Кнопки, тултипы, фоны.',
    },
    {
        name: 'base-special-hover',
        title: 'Special Hover',
        description: 'Ховер для синих кнопок.',
    },
    {
        name: 'base-action',
        title: 'Action',
        description: 'Желтая яндексовая кнопка.',
    },
    {
        name: 'base-action-hover',
        title: 'Action Hover',
        description: 'Ховер желтой кнопки.',
    },
];

const semantic = [
    {
        name: 'base-info',
        title: 'Info',
        description: 'Фон поясняющих блоков.',
    },
    {
        name: 'base-info-hover',
        title: 'Info Hover',
        description: 'Ховер для Info.',
    },
    {
        name: 'base-positive',
        title: 'Positive',
        description: 'Фон для блоков с положительным смыслом.',
    },
    {
        name: 'base-positive-hover',
        title: 'Positive Hover',
        description: 'Ховер для Positive.',
    },
    {
        name: 'base-warning',
        title: 'Warning.',
        description: 'Фон для предупреждающих блоков',
    },
    {
        name: 'base-warning-hover',
        title: 'Warning Hover',
        description: 'Ховер для Warning.',
    },
    {
        name: 'base-danger',
        title: 'Danger',
        description: 'Фон для блоков с негативным смыслом.',
    },
    {
        name: 'base-danger-hover',
        title: 'Danger Hover',
        description: 'Ховер для Danger.',
    },
    {
        name: 'base-misc',
        title: 'Misc',
        description: 'Блоки в состоянии, не характеризуемом предыдущими вариантами.',
    },
    {
        name: 'base-misc-hover',
        title: 'Misc Hover',
        description: 'Ховер для Misc.',
    },
    {
        name: 'base-neutral',
        title: 'Neutral',
        description: 'Для нейтральных информационных блоков.',
    },
    {
        name: 'base-neutral-hover',
        title: 'Neutral Hover',
        description: 'Ховер для Neutral.',
    },
];

const semanticMedium = [
    {
        name: 'base-positive-medium',
        title: 'Positive Medium',
        description: 'Фон блоков с положительным смыслом, средний акцент.',
    },
    {
        name: 'base-positive-medium-hover',
        title: 'Positive Medium Hover',
        description: 'Ховер для Positive Medium',
    },
];

const semanticHeavy = [
    {
        name: 'base-info-heavy',
        title: 'Info Heavy',
        description: 'Фон поясняющих блоков, сильный акцент.',
    },
    {
        name: 'base-positive-heavy',
        title: 'Positive Heavy',
        description: 'Фон блоков с положительным смыслом, сильный акцент.',
    },
    {
        name: 'base-warning-heavy',
        title: 'Warning Heavy',
        description: 'Фон предупреждающих блоков, сильный акцент.',
    },
    {
        name: 'base-warning-heavy-hover',
        title: 'Warning Heavy Hover',
        description: 'Ховер для Warning Heavy',
    },
    {
        name: 'base-danger-heavy',
        title: 'Danger Heavy',
        description: 'Фон блоков с негативным смыслом, сильный акцент.',
    },
    {
        name: 'base-danger-heavy-hover',
        title: 'Danger Heavy Hover',
        description: 'Ховер для Danger Heavy',
    },
    {
        name: 'base-misc-heavy',
        title: 'Misc Heavy',
        description:
            'Блоки в состоянии, не характеризуемом предыдущими вариантами, сильный акцент.',
    },
    {
        name: 'base-misc-heavy-hover',
        title: 'Misc Heavy Hover',
        description: 'Ховер для Misc Heavy',
    },
];

const alwaysLight = [
    {
        name: 'base-light',
        title: 'Light',
        description: 'Для блоков поверх темных фонов. Кнопки и т.п.',
    },
    {
        name: 'base-light-hover',
        title: 'Light Hover',
        description: 'Ховер для Light.',
    },
    {
        name: 'base-light-simple-hover',
        title: 'Light Simple Hover',
        description: 'Ховер для объектов без собственного фона (поверх темного фона).',
    },
    {
        name: 'base-light-disabled',
        title: 'Light Disabled',
        description: 'Фон для задисейбленных кнопок',
    },
    {
        name: 'base-light-accent-disabled',
        title: 'Light Accent Disabled',
        description: 'Фон активных элементов в задизейбленном состоянии',
    },
];

const floats = [
    {
        name: 'base-float',
        title: 'Float',
        description: 'Фон raised-кнопок, попапов и всего такого.',
    },
    {
        name: 'base-float-hover',
        title: 'Float Hover',
        description: 'Ховер для Float BG.',
    },
    {
        name: 'base-float-heavy',
        title: 'Float Heavy',
        description: 'Для более контрастных объектов (тултипы у боковой навигации).',
    },
    {
        name: 'base-float-accent',
        title: 'Float Accent',
        description: 'Фон raised-кнопок, выпадающих меню и всего такого.',
    },
    {
        name: 'base-float-accent-hover',
        title: 'Float Accent Hover',
        description: 'Ховер raised-элементов поверх диалога',
    },
];

export const RenderBackgrounds = () => (
    <Showcase title="Заливки и подложки" description="Блоки, зоны и фоны">
        <ColorPanel
            title="Подложки базовых элементов страницы"
            description="Простые блоки, ховеры, подсветка избранного"
            colors={basic}
            boxBorders={true}
        />
        <ColorPanel
            title="Для поддержки бренда Яндекса"
            description="Синяя и желтая кнопка, синие тултипы, и любые синие фоны с интерфейсом"
            colors={specials}
            boxBorders={true}
        />
        <ColorPanel
            title="Семантически-окрашенный набор"
            description="Цветные блоки, стейты и т.п."
            colors={semantic}
        />
        <ColorPanel
            title="Слегка усиленный семантически-окрашенный набор"
            description="Аналогично предыдущей пачке, но цвета более выражены"
            colors={semanticMedium}
        />
        <ColorPanel
            title="Усиленный семантически-окрашенный набор"
            description="Аналогично предыдущей пачке, но цвета еще более выражены"
            colors={semanticHeavy}
        />
        <ColorPanel
            title="Всегда светлые"
            description="Подложки и контролы поверх темных фонов"
            colors={alwaysLight}
            boxBorders={true}
        />
        <ColorPanel
            title="Фоны"
            description="Фоны попапов, парящих кнопок, объектов, расположенных над другими объектами и т.п."
            colors={floats}
            boxBorders={true}
        />
    </Showcase>
);
