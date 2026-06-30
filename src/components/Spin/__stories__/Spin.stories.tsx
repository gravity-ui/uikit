import * as React from 'react';

import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Showcase} from '../../../demo/Showcase';
import {ShowcaseItem} from '../../../demo/ShowcaseItem';
import {Spin} from '../Spin';

export default {
    title: 'Components/Feedback/Spin',
    component: Spin,
} as Meta;

type Story = StoryObj<typeof Spin>;

const defaultDecorators = [
    (Story) => (
        <Showcase>
            <Story />
        </Showcase>
    ),
] satisfies Story['decorators'];

const customColorDecorator = (Story: React.ComponentType) => (
    <React.Fragment>
        <style>
            {`.custom-spin {
                --g-spin-color: #ff3d64;
            }`}
        </style>
        <Story />
    </React.Fragment>
);

export const Default: Story = {};

export const Size: Story = {
    decorators: defaultDecorators,
    render: (args) => (
        <React.Fragment>
            <ShowcaseItem title="Size xs">
                <Spin {...args} size="xs" />
            </ShowcaseItem>
            <ShowcaseItem title="Size s">
                <Spin {...args} size="s" />
            </ShowcaseItem>
            <ShowcaseItem title="Size m">
                <Spin {...args} size="m" />
            </ShowcaseItem>
            <ShowcaseItem title="Size l">
                <Spin {...args} size="l" />
            </ShowcaseItem>
            <ShowcaseItem title="Size xl">
                <Spin {...args} size="xl" />
            </ShowcaseItem>
        </React.Fragment>
    ),
};

export const Custom: Story = {
    decorators: [...defaultDecorators, customColorDecorator],

    render: (args) => (
        <ShowcaseItem title="Custom color">
            <Spin {...args} className="custom-spin" />
        </ShowcaseItem>
    ),
};
