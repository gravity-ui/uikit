import React from 'react';

import type {Meta, Story} from '@storybook/react';

import {Select} from '..';
import type {SelectProps} from '..';

import {SelectShowcase} from './SelectShowcase';

export default {
    title: 'Components/Select',
    component: Select,
} as Meta;

const DefaultTemplate: Story<SelectProps> = (args) => (
    <Select {...args}>
        <Select.Option value="val1" content="Value1" />
        <Select.Option value="val2" content="Value2" />
        <Select.Option value="val3" content="Value3" />
        <Select.Option value="val4" content="Value4" />
    </Select>
);
const ShowcaseTemplate: Story<SelectProps> = (args: SelectProps) => <SelectShowcase {...args} />;
export const Default = DefaultTemplate.bind({});
export const Showcase = ShowcaseTemplate.bind({});

Showcase.args = {
    view: 'normal',
    size: 'm',
    multiple: false,
    filterable: false,
    disabled: false,
    placeholder: 'Values',
    label: '',
};
