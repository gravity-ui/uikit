import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Select, SelectProps} from '../';
import {SelectShowcase} from './SelectShowcase';

export default {
    title: 'Components/Select',
    component: Select,
} as Meta;

const DefaultTemplate: Story<SelectProps> = (args) => <SelectShowcase {...args} />;

export const Default = DefaultTemplate.bind({});

Default.args = {
    view: 'normal',
    size: 'm',
    multiple: false,
    controlWidth: 'auto',
    label: '',
    placeholder: '',
} as SelectProps;
