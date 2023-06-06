import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {RadioButton} from '../RadioButton';
import type {RadioButtonOption, RadioButtonProps} from '../RadioButton';

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

const DefaultTemplate: StoryFn<RadioButtonProps> = (args) => {
    const [value, setValue] = React.useState<string>(options[0].value);
    return <RadioButton {...args} value={value} onUpdate={setValue} />;
};
export const Default = DefaultTemplate.bind({});
Default.args = {
    options,
};

const ShowcaseTemplate: StoryFn = () => <RadioButtonShowcase />;
export const Showcase = ShowcaseTemplate.bind({});
