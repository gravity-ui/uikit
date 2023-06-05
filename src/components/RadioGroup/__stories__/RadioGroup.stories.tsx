import React from 'react';

import type {Meta, Story} from '@storybook/react';

import {ShowcaseItem} from '../../../demo/ShowcaseItem';
import {RadioGroup} from '../RadioGroup';
import type {RadioGroupOption, RadioGroupProps} from '../RadioGroup';

import {RadioGroupShowcase} from './RadioGroupShowcase';

export default {
    title: 'Components/RadioGroup',
    component: RadioGroup,
} as Meta;

const options: RadioGroupOption[] = [
    {value: 'Value 1', content: 'Value 1'},
    {value: 'Value 2', content: 'Value 2'},
    {value: 'Value 3', content: 'Value 3'},
];

const DefaultTemplate: Story<RadioGroupProps> = (args) => {
    const [value, setValue] = React.useState<string>(options[0].value);
    return <RadioGroup {...args} value={value} onUpdate={setValue} />;
};
export const Default = DefaultTemplate.bind({});
Default.args = {
    options,
};

export const Direction: Story<RadioGroupProps> = (args) => {
    const [value, setValue] = React.useState(args.options?.[0].value);

    return (
        <React.Fragment>
            <ShowcaseItem title="horizontal">
                <RadioGroup
                    {...args}
                    name="group1"
                    direction="horizontal"
                    value={value}
                    onUpdate={setValue}
                />
            </ShowcaseItem>
            <ShowcaseItem title="vertical">
                <RadioGroup
                    {...args}
                    name="group2"
                    direction="vertical"
                    options={options}
                    value={value}
                    onUpdate={setValue}
                />
            </ShowcaseItem>
        </React.Fragment>
    );
};
Direction.args = {
    options,
};

const ShowcaseTemplate: Story = () => <RadioGroupShowcase />;
export const Showcase = ShowcaseTemplate.bind({});
