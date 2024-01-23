import React from 'react';

import {Flex} from '../../layout/Flex/Flex';
import {Select} from '../Select';

import './SelectCustom.scss';

const options = Array.from({length: 4}, (_, i) => `V${i}`).map((value) => ({
    value,
    content: value,
}));

const value = ['V0', 'V1', 'V2', 'V3'];

export const CustomThemeShowcase = () => (
    <Flex gap="4">
        <Flex direction="column" gap="4">
            <h3>Default</h3>
            <Select multiple options={options} placeholder="placeholder" />
            <Select multiple options={options} value={value} />
            <Select multiple options={options} value={value} disabled />
            <Select multiple options={options} value={value} error={'error'} />
        </Flex>
        <Flex direction="column" gap="4" className="custom-theme">
            <h3>Custom</h3>
            <Select multiple options={options} placeholder="placeholder" />
            <Select multiple options={options} value={value} />
            <Select multiple options={options} value={value} disabled />
            <Select multiple options={options} value={value} error={'error'} />
        </Flex>
    </Flex>
);
