import React from 'react';

import type {StoryObj} from '@storybook/react';

import {Showcase} from '../../../demo/Showcase';
import {ColorsGrid} from '../ColorsGrid';
import type {Color} from '../utils';

import {ColorsGridShowcase} from './ColorsGridShowcase';

export default {
    title: 'Components/Inputs/ColorsGrid',
    component: ColorsGrid,
};

type Story = StoryObj<typeof ColorsGrid>;

const colors: Color[] = [
    null,
    'rgba(255, 255, 0, 0.45)',
    '#FFB9DD',
    '#FF91A1',
    '#8AD554',
    '#70C1AF',
    '#DAE0E7',
    '#FF7E00',
    '#ED65A9',
    '#BA74B3',
    '#E8B0A4',
    '#52A6C5',
];

export const Default: Story = {
    args: {colors},
    render: (args) => <ColorsGridShowcase {...args} />,
};

export const Size: Story = {
    args: {colors},
    render: (args) => (
        <Showcase>
            <ColorsGrid {...args} size="s" />
            <ColorsGrid {...args} size="m" />
            <ColorsGrid {...args} size="l" />
        </Showcase>
    ),
};
