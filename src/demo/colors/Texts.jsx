import React from 'react';
import {Showcase} from '../Showcase';
import {ColorPanel} from './ColorPanel';

const basic = [
    {
        name: 'text-primary',
        title: 'Primary',
        description:
            'Основной текст на странице. Вариант по умолчанию для заголовков, абзацев и текста в кнопках. Есть альфа для адекватного рендера на подкрашенных фонах.',
    },
    {
        name: 'text-complementary',
        title: 'Complementary',
        description: 'Вспомогательный текст. Контролы, сноски, правая колонка на сайте.',
    },
    {
        name: 'text-secondary',
        title: 'Secondary',
        description:
            'Второстепенный текст. Подписи, расшифровки. Информация, которую не обязательно читать каждый раз.',
    },
    {
        name: 'text-hint',
        title: 'Hint',
        description: 'Подсказка в инпуте.',
    },
];

const colorful = [
    {
        name: 'text-info',
        title: 'Info',
        description: 'Для поясняющих надписей или в поясняющих блоках.',
    },
    {
        name: 'text-positive',
        title: 'Positive',
        description: 'Для положительно окрашенных случаев.',
    },
    {
        name: 'text-warning-medium',
        title: 'Warning Medium',
        description: 'Для предупреждающих текстов без подложки.',
    },
    {
        name: 'text-warning-heavy',
        title: 'Warning Heavy',
        description: 'Для предупреждающих текстов с подложкой.',
    },
    {
        name: 'text-danger',
        title: 'Danger',
        description: 'Для важных предупреждений.',
    },
    {
        name: 'text-utility',
        title: 'Utility',
        description: 'Для случаев когда требуется выделить цветом, без «светофорной» семантики',
    },
    {
        name: 'text-misc',
        title: 'Misc',
        description: 'Для случаев когда требуется выделить цветом, без «светофорной» семантики.',
    },
];

const specials = [
    {
        name: 'text-link',
        title: 'Link',
        description: 'Ссылки',
    },
    {
        name: 'text-link-hover',
        title: 'Link hover',
        description: 'Ссылки при наведении курсора',
    },
    {
        name: 'text-yandex-red',
        title: 'Yandex Red',
        description: 'Первая буква логина.',
    },
];

const alwaysDark = [
    {
        name: 'text-dark-primary',
        title: 'Dark Primary',
        description: 'Основной текст поверх светлых фонов.',
    },
    {
        name: 'text-dark-complementary',
        title: 'Dark Complementary',
        description: 'Вспомогательный текст.',
    },
    {
        name: 'text-dark-secondary',
        title: 'Dark Secondary',
        description: 'Второстепенный текст.',
    },
];

const alwaysLight = [
    {
        name: 'text-light-primary',
        title: 'Light Primary',
        description: 'Основной цвет поверх темных фонов.',
    },
    {
        name: 'text-light-complementary',
        title: 'Light Complementary',
        description: 'Вспомогательные элементы.',
    },
    {
        name: 'text-light-secondary',
        title: 'Light Secondary',
        description: 'Второстепенные элементы.',
    },
    {
        name: 'text-light-hint',
        title: 'Light Hint',
        description: 'Минимальный контраст.',
    },
];

const inverted = [
    {
        name: 'text-inverted-primary',
        title: 'Inverted Primary',
        description: 'Основной текст.',
    },
    {
        name: 'text-inverted-complementary',
        title: 'Inverted Complementary',
        description: 'Вспомогательный текст.',
    },
    {
        name: 'text-inverted-secondary',
        title: 'Inverted Secondary',
        description: 'Второстепенный текст.',
    },
    {
        name: 'text-inverted-hint',
        title: 'Inverted Hint',
        description: 'Минимальный контраст.',
    },
];

export const RenderTexts = () => (
    <Showcase title="Тексты" description="Все что нужно для написания простыней">
        <ColorPanel
            title="Основной набор"
            description="Большая часть всех текстов"
            colors={basic}
        />
        <ColorPanel
            title="Семантический набор"
            description="Цветные подписи, семантически-окрашенные блоки, предупреждения и т.д. Если нужно показать опасность или успех, нужные цвета в этой секции."
            colors={colorful}
        />
        <ColorPanel title="Частные случаи" description="Ссылки и логины." colors={specials} />
        <ColorPanel
            title="Дополнительно: всегда темное"
            description="Для редких кейсов, когда нужен темный текст в обеих темах."
            colors={alwaysDark}
            boxBorders={true}
        />
        <ColorPanel
            title="Дополнительно: всегда светлое"
            description="Используется поверх нестандартных фонов (синий и т.п.)"
            colors={alwaysLight}
            boxBorders={true}
        />
        <ColorPanel
            title="Дополнительно: инверсия основного цвета"
            description="Используется редко. Назначение — поверх фонов, которые переворачивают контрастность (высокая-низкая) в другой теме."
            colors={inverted}
            boxBorders={true}
        />
    </Showcase>
);
