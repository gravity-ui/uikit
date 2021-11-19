import React from 'react';
import {Showcase} from '../Showcase';
import {ColorPanel} from './ColorPanel';

const misc = [
    {
        name: 'sfx-veil',
        title: 'Veil',
        description: 'Затемнение при появлении попапа',
    },
    {
        name: 'sfx-shadow',
        title: 'Shadow',
        description: 'Тень у всего, что может её отбрасывать',
    },
    {
        name: 'sfx-shadow-heavy',
        title: 'Shadow Heavy',
        description: 'Упитанные старые тени, постепенно от них избавляемся',
    },
    {
        name: 'sfx-fade',
        title: 'Fade',
        description: 'Высветление при загрузке (например, у чартов в даталенсе).',
    },
];

export const RenderEffects = () => (
    <Showcase title="Спецэффекты" description="Тени, затемнения и т.п.">
        <ColorPanel
            title="Разное"
            description="Простые блоки, ховеры, подсветка избранного"
            colors={misc}
            boxBorders={true}
        />
    </Showcase>
);
