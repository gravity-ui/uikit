import React from 'react';
import {Meta, Story} from '@storybook/react';
import {RadioButton, RadioButtonProps, RadioButtonOption} from '../RadioButton';
import {RadioButtonShowcase} from './RadioButtonShowcase';

export default {
    title: 'Components/RadioButton',
    component: RadioButton,
} as Meta;

const options: RadioButtonOption[] = [
    {value: 'Value 1', content: 'Value 1'},
    {value: 'Value 2', content: 'Value 2'},
    {value: 'Value 3', content: 'Value 3'},
];

const DefaultTemplate: Story<RadioButtonProps> = (args) => <RadioButton {...args} />;
export const Default = DefaultTemplate.bind({});
Default.args = {
    value: options[0].value,
    options,
};

const ShowcaseTemplate: Story = () => <RadioButtonShowcase />;
export const Showcase = ShowcaseTemplate.bind({});
