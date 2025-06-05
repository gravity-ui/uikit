import type {Meta, StoryObj} from '@storybook/react-webpack5';
import {action} from 'storybook/actions';

import {Showcase} from '../../../demo/Showcase';
import {ShowcaseItem} from '../../../demo/ShowcaseItem';
import {RadioGroup} from '../RadioGroup';

import {RadioGroupShowcase} from './RadioGroupShowcase';

export default {
    title: 'Components/Inputs/RadioGroup',
    component: RadioGroup,
} as Meta;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
    args: {
        options: [
            {value: 'Value 1', content: 'Value 1'},
            {value: 'Value 2', content: 'Value 2'},
            {value: 'Value 3', content: 'Value 3'},
        ],
        defaultValue: 'Value 1',
        onUpdate: action('onUpdate'),
        onFocus: action('onFocus'),
        onBlur: action('onBlur'),
    },
};

export const Size: Story = {
    render: (args) => (
        <Showcase>
            <ShowcaseItem title="Size m">
                <RadioGroup {...args} size="m" />
            </ShowcaseItem>
            <ShowcaseItem title="Size l">
                <RadioGroup {...args} size="l" />
            </ShowcaseItem>
            <ShowcaseItem title="Size xl">
                <RadioGroup {...args} size="xl" />
            </ShowcaseItem>
        </Showcase>
    ),
    args: {
        ...Default.args,
    },
};

export const Disabled: Story = {
    args: {
        ...Default.args,
        disabled: true,
    },
};

export const Direction: Story = {
    args: {
        ...Default.args,
    },
    render: (args) => {
        return (
            <Showcase>
                <ShowcaseItem title="Horizontal">
                    <RadioGroup {...args} direction="horizontal" />
                </ShowcaseItem>
                <ShowcaseItem title="Vertical">
                    <RadioGroup {...args} direction="vertical" />
                </ShowcaseItem>
            </Showcase>
        );
    },
};

export const ShowcaseStory: Story = {
    render: () => <RadioGroupShowcase />,
    name: 'Showcase',
};
