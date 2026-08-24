import * as React from 'react';

import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Showcase} from '../../../demo/Showcase';
import {ShowcaseItem} from '../../../demo/ShowcaseItem';
import {Loader} from '../Loader';

export default {
    title: 'Components/Feedback/Loader',
    component: Loader,
} as Meta;

type Story = StoryObj<typeof Loader>;

const defaultDecorators = [
    (Story) => (
        <Showcase>
            <Story />
        </Showcase>
    ),
] satisfies Story['decorators'];

export const Default: Story = {};

export const Size: Story = {
    decorators: defaultDecorators,
    render: (args) => (
        <React.Fragment>
            <ShowcaseItem title="Size s">
                <Loader {...args} size="s" />
            </ShowcaseItem>
            <ShowcaseItem title="Size m">
                <Loader {...args} size="m" />
            </ShowcaseItem>
            <ShowcaseItem title="Size l">
                <Loader {...args} size="l" />
            </ShowcaseItem>
        </React.Fragment>
    ),
};
