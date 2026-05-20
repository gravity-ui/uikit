import * as React from 'react';

import {faker} from '@faker-js/faker/locale/en';
import type {Meta, StoryFn, StoryObj} from '@storybook/react-webpack5';

import {Showcase} from '../../../demo/Showcase';
import {ShowcaseItem} from '../../../demo/ShowcaseItem';
import {Avatar} from '../../Avatar';
import type {AvatarSize} from '../../Avatar';
import {Button} from '../../Button';
import type {ButtonSize} from '../../Button';
import {Label} from '../../Label';
import type {LabelProps} from '../../Label';
import {Text} from '../../Text';
import type {TextProps} from '../../Text';
import {Flex} from '../../layout';
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
export const SkeletonShowcaseStory = ShowcaseTemplate.bind({});
SkeletonShowcaseStory.storyName = 'Showcase';

type Story = StoryObj<typeof Skeleton>;

const AVATAR_SIZES: AvatarSize[] = ['3xs', '2xs', 'xs', 's', 'm', 'l', 'xl'];

const imgUrl = faker.image.urlLoremFlickr({category: 'cats'});

const BUTTON_SIZES: ButtonSize[] = ['xs', 's', 'm', 'l', 'xl'];

const LABEL_SIZES: NonNullable<LabelProps['size']>[] = ['xxs', 'xs', 's', 'm'];

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
                                <Skeleton variant="text" style={{width: 200}} />
                            </Text>
                            <Text variant={variant}>placeholder text</Text>
                        </Flex>
                    </ShowcaseItem>
                ))}
            </Showcase>
            <Showcase title="Multiline">
                <ShowcaseItem title="body-1 × 3">
                    <Text variant="body-1">
                        <Skeleton variant="text" style={{width: 400}} />
                        <Skeleton variant="text" style={{width: 400}} />
                        <Skeleton variant="text" style={{width: 400}} />
                    </Text>
                </ShowcaseItem>
                <ShowcaseItem title="body-2 × 5 (with shorter last line)">
                    <Text variant="body-2">
                        <Skeleton variant="text" style={{width: 360}} />
                        <Skeleton variant="text" style={{width: 360}} />
                        <Skeleton variant="text" style={{width: 360}} />
                        <Skeleton variant="text" style={{width: 360}} />
                        <Skeleton variant="text" style={{width: 180}} />
                    </Text>
                </ShowcaseItem>
                <ShowcaseItem title="header-1 × 2 + body-1 × 4 (mixed)">
                    <Flex direction="column" gap={2}>
                        <Text variant="header-1">
                            <Skeleton variant="text" style={{width: 280}} />
                            <Skeleton variant="text" style={{width: 280}} />
                        </Text>
                        <Text variant="body-1">
                            <Skeleton variant="text" style={{width: 400}} />
                            <Skeleton variant="text" style={{width: 400}} />
                            <Skeleton variant="text" style={{width: 400}} />
                            <Skeleton variant="text" style={{width: 300}} />
                        </Text>
                    </Flex>
                </ShowcaseItem>
            </Showcase>
        </React.Fragment>
    ),
};

export const Children: Story = {
    name: 'Children',
    render: () => (
        <React.Fragment>
            <Showcase title="Avatar Circle">
                {AVATAR_SIZES.map((size) => (
                    <ShowcaseItem key={size} title={size}>
                        <Flex direction="column" gap={1} alignItems="flex-start">
                            <Skeleton variant="circle">
                                <Avatar size={size} shape="circle" text="" aria-label="avatar" />
                            </Skeleton>
                            <Avatar
                                size={size}
                                shape="circle"
                                imgUrl={imgUrl}
                                alt="Sample avatar"
                                aria-label="avatar"
                            />
                        </Flex>
                    </ShowcaseItem>
                ))}
            </Showcase>
            <Showcase title="Avatar Square">
                {AVATAR_SIZES.map((size) => (
                    <ShowcaseItem key={size} title={size}>
                        <Flex direction="column" gap={1} alignItems="flex-start">
                            <Skeleton>
                                <Avatar size={size} shape="square" text="" aria-label="avatar" />
                            </Skeleton>
                            <Avatar
                                size={size}
                                shape="square"
                                imgUrl={imgUrl}
                                alt="Sample avatar"
                                aria-label="avatar"
                            />
                        </Flex>
                    </ShowcaseItem>
                ))}
            </Showcase>
            <Showcase title="Button">
                {BUTTON_SIZES.map((size) => (
                    <ShowcaseItem key={size} title={size}>
                        <Flex direction="column" gap={1} alignItems="flex-start">
                            <Skeleton>
                                <Button size={size}>Real</Button>
                            </Skeleton>
                            <Button size={size}>Real</Button>
                        </Flex>
                    </ShowcaseItem>
                ))}
            </Showcase>
            <Showcase title="Label">
                {LABEL_SIZES.map((size) => (
                    <ShowcaseItem key={size} title={size}>
                        <Flex direction="column" gap={1} alignItems="flex-start">
                            <Skeleton>
                                <Label size={size}>Label</Label>
                            </Skeleton>
                            <Label size={size}>Label</Label>
                        </Flex>
                    </ShowcaseItem>
                ))}
            </Showcase>
        </React.Fragment>
    ),
};
