import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Showcase} from '../../../demo/Showcase';
import {Radio} from '../Radio';

import {RadioShowcase} from './RadioShowcase';

export default {
    title: 'Components/Inputs/Radio',
    component: Radio,
} as Meta;

type Story = StoryObj<typeof Radio>;

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

export const Size: Story = {
    render: (args) => (
        <Showcase>
            <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                <Radio {...args} size="m">
                    Size m
                </Radio>
                <Radio {...args} size="l">
                    Size l
                </Radio>
                <Radio {...args} size="xl">
                    Size xl
                </Radio>
            </div>
        </Showcase>
    ),
};

export const Fonts: Story = {
    render: (args) => (
        <Showcase>
            <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                <Radio {...args} size="m" style={{fontFamily: 'Arial'}}>
                    Arial
                </Radio>
                <Radio {...args} size="m" style={{fontFamily: 'Times New Roman'}}>
                    Times New Roman
                </Radio>
                <Radio {...args} size="m" style={{fontFamily: 'Inter'}}>
                    Inter
                </Radio>
                <Radio {...args} size="m" style={{fontFamily: 'Georgia'}}>
                    Georgia
                </Radio>
                <Radio {...args} size="m" style={{fontFamily: 'Verdana'}}>
                    Verdana
                </Radio>
                <Radio {...args} size="m" style={{fontFamily: 'Impact'}}>
                    Impact
                </Radio>
            </div>
        </Showcase>
    ),
};

export const Disabled: Story = {
    render: (args) => (
        <Showcase>
            <Radio {...args} disabled checked={false}>
                Unchecked
            </Radio>
            <Radio {...args} disabled checked>
                Checked
            </Radio>
        </Showcase>
    ),
};

export const ShowcaseStory: Story = {
    render: () => <RadioShowcase />,
    name: 'Showcase',
};
