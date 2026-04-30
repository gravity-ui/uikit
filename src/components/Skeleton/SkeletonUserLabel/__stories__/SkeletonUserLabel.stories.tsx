import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Text} from '../../../Text';
import type {UserLabelSize} from '../../../UserLabel/types';
import {Flex} from '../../../layout';
import {SkeletonUserLabel} from '../SkeletonUserLabel';

const USER_LABEL_SIZE_VALUES: UserLabelSize[] = ['3xs', '2xs', 'xs', 's', 'm', 'l', 'xl'];
const ANIMATION_VALUES = ['gradient', 'pulse', 'none'];

export default {
    title: 'Components/Feedback/Skeleton/SkeletonUserLabel',
    component: SkeletonUserLabel,
    args: {
        size: 's',
        width: 120,
        animation: 'gradient',
    },
    argTypes: {
        size: {control: {type: 'select'}, options: USER_LABEL_SIZE_VALUES},
        width: {control: {type: 'number'}},
        animation: {control: {type: 'select'}, options: ANIMATION_VALUES},
    },
} as Meta<typeof SkeletonUserLabel>;

type Story = StoryObj<typeof SkeletonUserLabel>;

export const Default: Story = {
    render: (args) => <SkeletonUserLabel {...args} />,
};

export const Showcase: Story = {
    parameters: {controls: {disable: true}},
    render: (args) => (
        <Flex gap={3} alignItems="flex-end" wrap>
            {USER_LABEL_SIZE_VALUES.map((size) => (
                <Flex key={size} direction="column" alignItems="center" gap={1}>
                    <SkeletonUserLabel {...args} size={size} />
                    <Text variant="caption-1" color="secondary">
                        {size}
                    </Text>
                </Flex>
            ))}
        </Flex>
    ),
};
