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

const AnimationsTemplate: StoryFn = () => (
    <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
        <div>
            <div style={{marginBottom: '8px'}}>Gradient animation (default)</div>
            <Skeleton style={{height: 30}} animation="gradient" />
        </div>
        <div>
            <div style={{marginBottom: '8px'}}>Pulse animation</div>
            <Skeleton style={{height: 30}} animation="pulse" />
        </div>
        <div>
            <div style={{marginBottom: '8px'}}>No animation</div>
            <Skeleton style={{height: 30}} animation="none" />
        </div>
    </div>
);
export const Animations = AnimationsTemplate.bind({});

const ShowcaseTemplate: StoryFn = () => <SkeletonShowcase />;
export const Showcase = ShowcaseTemplate.bind({});
