import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Skeleton} from '../Skeleton';
import type {SkeletonProps} from '../Skeleton';

import {SkeletonShowcase} from './SkeletonShowcase';

export default {
    title: 'Components/Feedback/Skeleton',
    component: Skeleton,
} as Meta;

const DefaultTemplate: StoryFn<SkeletonProps> = (args) => <Skeleton {...args} />;
export const Default = DefaultTemplate.bind({});

Default.args = {
    style: {height: 30},
};

const ShowcaseTemplate: StoryFn = () => <SkeletonShowcase />;
export const Showcase = ShowcaseTemplate.bind({});
