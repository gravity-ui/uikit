import type {Meta, StoryFn} from '@storybook/react-webpack5';

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
AnimationsGradient.storyName = 'Animations/Gradient';
AnimationsGradient.args = {...Default.args, animation: 'gradient'};

export const AnimationsPulse = DefaultTemplate.bind({});
AnimationsPulse.storyName = 'Animations/Pulse';
AnimationsPulse.args = {...Default.args, animation: 'pulse'};

export const AnimationsNone = DefaultTemplate.bind({});
AnimationsNone.storyName = 'Animations/None';
AnimationsNone.args = {...Default.args, animation: 'none'};

const ShowcaseTemplate: StoryFn = () => <SkeletonShowcase />;
export const Showcase = ShowcaseTemplate.bind({});
