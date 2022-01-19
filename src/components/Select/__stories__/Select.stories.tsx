import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Select, SelectProps} from '../';

export default {
    title: 'Components/Select',
    component: Select,
} as Meta;

const DefaultTemplate: Story<SelectProps> = (args) => <Select {...args} />;
export const Default = DefaultTemplate.bind({});
