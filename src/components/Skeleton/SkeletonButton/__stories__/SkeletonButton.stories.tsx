import type {Meta, StoryObj} from '@storybook/react-webpack5';

import type {ButtonPin, ButtonSize} from '../../../Button';
import {Text} from '../../../Text';
import {Flex} from '../../../layout';
import {SkeletonButton} from '../SkeletonButton';

const BUTTON_SIZE_VALUES: ButtonSize[] = ['xs', 's', 'm', 'l', 'xl'];
const PIN_VALUES: ButtonPin[] = ['round-round', 'brick-brick', 'circle-circle'];
const ANIMATION_VALUES = ['gradient', 'pulse', 'none'];

export default {
    title: 'Components/Feedback/Skeleton/SkeletonButton',
    component: SkeletonButton,
    args: {
        size: 'm',
        width: 100,
        pin: 'round-round',
        animation: 'gradient',
    },
    argTypes: {
        size: {control: {type: 'select'}, options: BUTTON_SIZE_VALUES},
        width: {control: {type: 'number'}},
        pin: {control: {type: 'select'}, options: PIN_VALUES},
        animation: {control: {type: 'select'}, options: ANIMATION_VALUES},
    },
} as Meta<typeof SkeletonButton>;

type Story = StoryObj<typeof SkeletonButton>;

export const Default: Story = {
    render: (args) => <SkeletonButton {...args} />,
};

export const Showcase: Story = {
    parameters: {controls: {disable: true}},
    render: (args) => (
        <Flex direction="column" gap={6}>
            {PIN_VALUES.map((pin) => (
                <div key={pin}>
                    <Text
                        variant="caption-1"
                        color="secondary"
                        style={{display: 'block', marginBottom: 8}}
                    >
                        pin: {pin}
                    </Text>
                    <Flex gap={3} alignItems="flex-end" wrap>
                        {BUTTON_SIZE_VALUES.map((size) => (
                            <Flex key={size} direction="column" alignItems="center" gap={1}>
                                <SkeletonButton {...args} size={size} pin={pin} />
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
