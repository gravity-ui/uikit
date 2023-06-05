import React from 'react';

import type {Meta, Story} from '@storybook/react';

import {Skeleton} from '../Skeleton';
import type {SkeletonProps} from '../Skeleton';

import {SkeletonShowcase} from './SkeletonShowcase';

export default {
    title: 'Components/Skeleton',
    component: Skeleton,
} as Meta;

const DefaultTemplate: Story<SkeletonProps> = (args) => <Skeleton {...args} />;
export const Default = DefaultTemplate.bind({});

const ShowcaseTemplate: Story = () => <SkeletonShowcase />;
export const Showcase = ShowcaseTemplate.bind({});
