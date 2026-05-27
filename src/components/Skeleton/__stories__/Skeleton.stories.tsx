import * as React from 'react';

import type {Meta, StoryFn, StoryObj} from '@storybook/react-webpack5';

import {Showcase} from '../../../demo/Showcase';
import {ShowcaseItem} from '../../../demo/ShowcaseItem';
import {Text} from '../../Text';
import type {TextProps} from '../../Text';
import {Flex} from '../../layout';
import {Skeleton} from '../Skeleton';
import type {SkeletonProps, SkeletonSize} from '../Skeleton';

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
export const SkeletonShowcaseStory = ShowcaseTemplate.bind({});
SkeletonShowcaseStory.storyName = 'Showcase';

type Story = StoryObj<typeof Skeleton>;

const SKELETON_SIZES: SkeletonSize[] = ['xs', 's', 'm', 'l', 'xl'];

export const Sizes: Story = {
    name: 'Sizes',
    render: () => (
        <React.Fragment>
            <Showcase title="Rounded (default)">
                {SKELETON_SIZES.map((size) => (
                    <ShowcaseItem key={size} title={size}>
                        <Skeleton size={size} style={{width: 200}} />
                    </ShowcaseItem>
                ))}
            </Showcase>
            <Showcase title="Sharp">
                {SKELETON_SIZES.map((size) => (
                    <ShowcaseItem key={size} title={size}>
                        <Skeleton size={size} shape="sharp" style={{width: 200}} />
                    </ShowcaseItem>
                ))}
            </Showcase>
            <Showcase title="Square">
                {SKELETON_SIZES.map((size) => (
                    <ShowcaseItem key={size} title={size}>
                        <Skeleton size={size} shape="square" />
                    </ShowcaseItem>
                ))}
            </Showcase>
            <Showcase title="Circle">
                {SKELETON_SIZES.map((size) => (
                    <ShowcaseItem key={size} title={size}>
                        <Skeleton size={size} shape="circle" />
                    </ShowcaseItem>
                ))}
            </Showcase>
        </React.Fragment>
    ),
};

const TEXT_VARIANTS_SUBSET: NonNullable<TextProps['variant']>[] = [
    'display-1',
    'header-1',
    'subheader-1',
    'body-1',
    'caption-1',
    'code-1',
];

export const TextShape: Story = {
    name: 'Text variant',
    render: () => (
        <React.Fragment>
            <Showcase title="Single line — inherits from wrapping Text" direction="column">
                {TEXT_VARIANTS_SUBSET.map((variant) => (
                    <ShowcaseItem key={variant} title={variant}>
                        <Flex alignItems="center" gap={6}>
                            <Text variant={variant}>
                                <Skeleton isText style={{width: 200}} />
                            </Text>
                            <Text variant={variant}>placeholder text</Text>
                        </Flex>
                    </ShowcaseItem>
                ))}
            </Showcase>
            <Showcase title="Multiline">
                <ShowcaseItem title="body-1 × 3">
                    <Text variant="body-1">
                        <Skeleton isText style={{width: 400}} />
                        <Skeleton isText style={{width: 400}} />
                        <Skeleton isText style={{width: 400}} />
                    </Text>
                </ShowcaseItem>
                <ShowcaseItem title="body-2 × 5 (with shorter last line)">
                    <Text variant="body-2">
                        <Skeleton isText style={{width: 360}} />
                        <Skeleton isText style={{width: 360}} />
                        <Skeleton isText style={{width: 360}} />
                        <Skeleton isText style={{width: 360}} />
                        <Skeleton isText style={{width: 180}} />
                    </Text>
                </ShowcaseItem>
                <ShowcaseItem title="header-1 × 2 + body-1 × 4 (mixed)">
                    <Flex direction="column" gap={2}>
                        <Text variant="header-1">
                            <Skeleton isText style={{width: 280}} />
                            <Skeleton isText style={{width: 280}} />
                        </Text>
                        <Text variant="body-1">
                            <Skeleton isText style={{width: 400}} />
                            <Skeleton isText style={{width: 400}} />
                            <Skeleton isText style={{width: 400}} />
                            <Skeleton isText style={{width: 300}} />
                        </Text>
                    </Flex>
                </ShowcaseItem>
            </Showcase>
        </React.Fragment>
    ),
};
