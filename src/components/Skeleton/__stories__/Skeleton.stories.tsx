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

export const AnimationsGradient = DefaultTemplate.bind({});
AnimationsGradient.name = 'Animations/Gradient';
AnimationsGradient.args = {animation: 'gradient'};

export const AnimationsPulse = DefaultTemplate.bind({});
AnimationsPulse.name = 'Animations/Pulse';
AnimationsPulse.args = {animation: 'pulse'};

export const AnimationsNone = DefaultTemplate.bind({});
AnimationsNone.name = 'Animations/None';
AnimationsNone.args = {animation: 'none'};

const ShowcaseTemplate: StoryFn = () => <SkeletonShowcase />;
export const Showcase = ShowcaseTemplate.bind({});
