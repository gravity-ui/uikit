import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {AVATAR_SIZES} from '../../../Avatar/constants';
import {Text} from '../../../Text';
import {Flex} from '../../../layout';
import {SkeletonUser} from '../SkeletonUser';

const AVATAR_SIZE_VALUES = Object.keys(AVATAR_SIZES) as Array<keyof typeof AVATAR_SIZES>;
const ANIMATION_VALUES = ['gradient', 'pulse', 'none'];

export default {
    title: 'Components/Feedback/Skeleton/SkeletonUser',
    component: SkeletonUser,
    args: {
        size: 'm',
        animation: 'gradient',
    },
    argTypes: {
        size: {control: {type: 'select'}, options: AVATAR_SIZE_VALUES},
        animation: {control: {type: 'select'}, options: ANIMATION_VALUES},
    },
} as Meta<typeof SkeletonUser>;

type Story = StoryObj<typeof SkeletonUser>;

export const Default: Story = {
    render: (args) => (
        <div style={{width: 280}}>
            <SkeletonUser {...args} />
        </div>
    ),
};

export const Showcase: Story = {
    parameters: {controls: {disable: true}},
    render: (args) => (
        <Flex direction="column" gap={4} style={{width: 280}}>
            {AVATAR_SIZE_VALUES.map((size) => (
                <Flex key={size} direction="column" gap={1}>
                    <Text variant="caption-1" color="secondary">
                        {size}
                    </Text>
                    <SkeletonUser {...args} size={size} />
                </Flex>
            ))}
        </Flex>
    ),
};
