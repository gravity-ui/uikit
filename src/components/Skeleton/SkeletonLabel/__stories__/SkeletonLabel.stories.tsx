import type {Meta, StoryObj} from '@storybook/react-webpack5';

import type {LabelProps} from '../../../Label';
import {Text} from '../../../Text';
import {Flex} from '../../../layout';
import {SkeletonLabel} from '../SkeletonLabel';

const LABEL_SIZE_VALUES: Array<NonNullable<LabelProps['size']>> = ['xxs', 'xs', 's', 'm'];
const ANIMATION_VALUES = ['gradient', 'pulse', 'none'];

export default {
    title: 'Components/Feedback/Skeleton/SkeletonLabel',
    component: SkeletonLabel,
    args: {
        size: 'xs',
        width: 80,
        animation: 'gradient',
    },
    argTypes: {
        size: {control: {type: 'select'}, options: LABEL_SIZE_VALUES},
        width: {control: {type: 'number'}},
        animation: {control: {type: 'select'}, options: ANIMATION_VALUES},
    },
} as Meta<typeof SkeletonLabel>;

type Story = StoryObj<typeof SkeletonLabel>;

export const Default: Story = {
    render: (args) => <SkeletonLabel {...args} />,
};

export const Showcase: Story = {
    parameters: {controls: {disable: true}},
    render: (args) => (
        <Flex gap={3} alignItems="flex-end" wrap>
            {LABEL_SIZE_VALUES.map((size) => (
                <Flex key={size} direction="column" alignItems="center" gap={1}>
                    <SkeletonLabel {...args} size={size} />
                    <Text variant="caption-1" color="secondary">
                        {size}
                    </Text>
                </Flex>
            ))}
        </Flex>
    ),
};
