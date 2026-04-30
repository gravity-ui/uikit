import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {AVATAR_SIZES} from '../../../Avatar/constants';
import type {AvatarShape} from '../../../Avatar/types/main';
import {Text} from '../../../Text';
import {Flex} from '../../../layout';
import {SkeletonAvatar} from '../SkeletonAvatar';

const AVATAR_SIZE_VALUES = Object.keys(AVATAR_SIZES) as Array<keyof typeof AVATAR_SIZES>;
const AVATAR_SHAPE_VALUES: AvatarShape[] = ['circle', 'square'];
const ANIMATION_VALUES = ['gradient', 'pulse', 'none'];

export default {
    title: 'Components/Feedback/Skeleton/SkeletonAvatar',
    component: SkeletonAvatar,
    args: {
        size: 'm',
        shape: 'circle',
        animation: 'gradient',
    },
    argTypes: {
        size: {control: {type: 'select'}, options: AVATAR_SIZE_VALUES},
        shape: {control: {type: 'select'}, options: AVATAR_SHAPE_VALUES},
        animation: {control: {type: 'select'}, options: ANIMATION_VALUES},
    },
} as Meta<typeof SkeletonAvatar>;

type Story = StoryObj<typeof SkeletonAvatar>;

export const Default: Story = {
    render: (args) => <SkeletonAvatar {...args} />,
};

export const Showcase: Story = {
    parameters: {controls: {disable: true}},
    render: (args) => (
        <Flex direction="column" gap={6}>
            {AVATAR_SHAPE_VALUES.map((shape) => (
                <div key={shape}>
                    <Text
                        variant="caption-1"
                        color="secondary"
                        style={{display: 'block', marginBottom: 8}}
                    >
                        shape: {shape}
                    </Text>
                    <Flex gap={3} alignItems="flex-end" wrap>
                        {AVATAR_SIZE_VALUES.map((size) => (
                            <Flex key={size} direction="column" alignItems="center" gap={1}>
                                <SkeletonAvatar {...args} size={size} shape={shape} />
                                <Text variant="caption-1" color="secondary">
                                    {size}
                                </Text>
                            </Flex>
                        ))}
                    </Flex>
                </div>
            ))}
        </Flex>
    ),
};
