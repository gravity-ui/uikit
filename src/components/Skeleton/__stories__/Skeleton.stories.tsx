import React from 'react';

import {Meta, Story} from '@storybook/react';

import {Skeleton, SkeletonProps} from '../Skeleton';

import {SkeletonShowcase} from './SkeletonShowcase';

export default {
    title: 'Components/Skeleton',
    component: Skeleton,
} as Meta;

const DefaultTemplate: Story<SkeletonProps> = (args) => <Skeleton {...args} />;
export const Default = DefaultTemplate.bind({});

const ShowcaseTemplate: Story = () => <SkeletonShowcase />;
export const Showcase = ShowcaseTemplate.bind({});
