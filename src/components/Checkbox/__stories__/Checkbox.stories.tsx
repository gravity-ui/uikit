import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Showcase} from '../../../demo/Showcase';
import {Checkbox} from '../Checkbox';

import {CheckboxShowcase} from './CheckboxShowcase';

export default {
    title: 'Components/Inputs/Checkbox',
    component: Checkbox,
} as Meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
    args: {
        content: 'Label',
    },
};

export const Checked: Story = {
    args: {
        ...Default.args,
        checked: true,
    },
};

export const Indeterminate: Story = {
    args: {
        ...Default.args,
        indeterminate: true,
    },
};

export const Size: Story = {
    render: (args) => (
        <Showcase>
            <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                <Checkbox {...args} size="m">
                    Size m
                </Checkbox>
                <Checkbox {...args} size="l">
                    Size l
                </Checkbox>
                <Checkbox {...args} size="xl">
                    Size xl
                </Checkbox>
            </div>
        </Showcase>
    ),
};

export const Disabled: Story = {
    render: (args) => (
        <Showcase>
            <Checkbox {...args} disabled checked={false}>
                Unchecked
            </Checkbox>
            <Checkbox {...args} disabled checked>
                Checked
            </Checkbox>
            <Checkbox {...args} disabled indeterminate>
                Indeterminate
            </Checkbox>
        </Showcase>
    ),
};

export const ShowcaseStory: Story = {
    render: () => <CheckboxShowcase />,
    name: 'Showcase',
};
