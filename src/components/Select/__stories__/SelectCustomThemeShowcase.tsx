import React from 'react';

import {Showcase} from '../../../demo/Showcase';
import {ShowcaseItem} from '../../../demo/ShowcaseItem';
import {Flex} from '../../layout/Flex/Flex';
import {Select} from '../Select';

import './SelectCustom.scss';

const options = Array.from({length: 4}, (_, i) => `V${i}`).map((value) => ({
    value,
    content: value,
}));

const value = ['V0', 'V1', 'V2', 'V3'];

export const CustomThemeShowcase = () => (
    <Showcase title="Custom theme for Select">
        <ShowcaseItem title="Default">
            <Flex direction="column" gap="4">
                <Select multiple options={options} placeholder="placeholder" />
                <Select multiple options={options} value={value} />
                <Select multiple options={options} value={value} disabled />
                <Select multiple options={options} value={value} error={'error'} />
            </Flex>
        </ShowcaseItem>
        <ShowcaseItem title="Custom">
            <Flex direction="column" gap="4" className="custom-theme">
                <Select multiple options={options} placeholder="placeholder" />
                <Select multiple options={options} value={value} />
                <Select multiple options={options} value={value} disabled />
                <Select multiple options={options} value={value} error={'error'} />
            </Flex>
        </ShowcaseItem>
    </Showcase>
);
