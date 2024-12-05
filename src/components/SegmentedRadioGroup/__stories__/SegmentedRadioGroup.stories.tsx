import type {Meta, StoryObj} from '@storybook/react';

import {Showcase} from '../../../demo/Showcase';
import {ShowcaseItem} from '../../../demo/ShowcaseItem';
import {SegmentedRadioGroup} from '../SegmentedRadioGroup';

import {SegmentedRadioGroupShowcase} from './SegmentedRadioGroupShowcase';

export default {
    title: 'Components/Inputs/SegmentedRadioGroup',
    component: SegmentedRadioGroup,
} as Meta;

type Story = StoryObj<typeof SegmentedRadioGroup>;

export const Default: Story = {
    args: {
        children: [
            <SegmentedRadioGroup.Option key="Value 1" value="Value 1" content="Value 1" />,
            <SegmentedRadioGroup.Option key="Value 2" value="Value 2" content="Value 2" />,
            <SegmentedRadioGroup.Option key="Value 3" value="Value 3" content="Value 3" />,
        ],
    },
};

export const Size: Story = {
    render: (args) => (
        <Showcase>
            <ShowcaseItem title="Size s">
                <SegmentedRadioGroup {...args} size="s" />
            </ShowcaseItem>
            <ShowcaseItem title="Size m">
                <SegmentedRadioGroup {...args} size="m" />
            </ShowcaseItem>
            <ShowcaseItem title="Size l">
                <SegmentedRadioGroup {...args} size="l" />
            </ShowcaseItem>
            <ShowcaseItem title="Size xl">
                <SegmentedRadioGroup {...args} size="xl" />
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

export const ShowcaseStory: Story = {
    render: () => <SegmentedRadioGroupShowcase />,
    name: 'Showcase',
};
