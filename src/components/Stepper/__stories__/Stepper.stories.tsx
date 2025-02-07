import {Cloud, CreditCard, Rocket} from '@gravity-ui/icons';
import type {Meta, StoryObj} from '@storybook/react';

import {Icon} from '../../Icon';
import {Text} from '../../Text';
import {Flex} from '../../layout';
import {Stepper} from '../Stepper';

import {StepperShowcase} from './StepperShowcase';

export default {
    title: 'Components/Navigation/Stepper',
    component: Stepper,
    parameters: {
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: false, // actual color contrast may differ in particular usage
                    },
                    {
                        id: 'duplicate-id',
                        enabled: false,
                        selector: 'defs', // one may use same id in different <defs>
                    },
                ],
            },
        },
    },
} as Meta;

type Story = StoryObj<typeof Stepper>;

export const Default = {
    render: (args) => {
        return (
            <Stepper {...args}>
                <Stepper.Item>Step 1</Stepper.Item>
                <Stepper.Item>Step 2</Stepper.Item>
                <Stepper.Item>Step 3</Stepper.Item>
                <Stepper.Item>Step 4 with very long title</Stepper.Item>
            </Stepper>
        );
    },
} satisfies Story;

export const View = {
    render: (args) => {
        return (
            <Stepper {...args}>
                <Stepper.Item>Step 1</Stepper.Item>
                <Stepper.Item view="error">Step 2</Stepper.Item>
                <Stepper.Item view="error">Step 3</Stepper.Item>
                <Stepper.Item view="success">Step 4 with very long title</Stepper.Item>
            </Stepper>
        );
    },
} satisfies Story;

export const Size = {
    render: (args) => {
        return (
            <Flex direction="column" gap={4}>
                <Stepper {...args} size="s">
                    <Stepper.Item>Step 1</Stepper.Item>
                    <Stepper.Item>Step 2</Stepper.Item>
                    <Stepper.Item>Step 3</Stepper.Item>
                </Stepper>

                <Stepper {...args} size="m">
                    <Stepper.Item>Step 1</Stepper.Item>
                    <Stepper.Item>Step 2</Stepper.Item>
                    <Stepper.Item>Step 3</Stepper.Item>
                </Stepper>

                <Stepper {...args} size="l">
                    <Stepper.Item>Step 1</Stepper.Item>
                    <Stepper.Item>Step 2</Stepper.Item>
                    <Stepper.Item>Step 3</Stepper.Item>
                </Stepper>
            </Flex>
        );
    },
} satisfies Story;

export const Disabled = {
    render: (args) => {
        return (
            <Stepper {...args}>
                <Stepper.Item>Step 1</Stepper.Item>
                <Stepper.Item disabled>Step 2</Stepper.Item>
                <Stepper.Item disabled>Step 3</Stepper.Item>
                <Stepper.Item disabled>Step 4 with very long title</Stepper.Item>
            </Stepper>
        );
    },
} satisfies Story;

export const CustomIcons = {
    render: (args) => {
        return (
            <Stepper {...args}>
                <Stepper.Item icon={<Icon data={Rocket} />}>Step 1</Stepper.Item>
                <Stepper.Item view="error" icon={<Icon data={CreditCard} />}>
                    Step 2
                </Stepper.Item>
                <Stepper.Item view="success" icon={<Icon data={Cloud} />}>
                    Step 3
                </Stepper.Item>
                <Stepper.Item>Step 4 with very long title</Stepper.Item>
            </Stepper>
        );
    },
} satisfies Story;

const Separator = () => {
    return <Text color="secondary">{'->'}</Text>;
};

export const CustomSeparator = {
    render: (args) => {
        return (
            <Stepper {...args} separator={<Separator />}>
                <Stepper.Item>Step 1</Stepper.Item>
                <Stepper.Item view="error">Step 2</Stepper.Item>
                <Stepper.Item view="success">Step 3</Stepper.Item>
                <Stepper.Item>Step 4 with very long title</Stepper.Item>
            </Stepper>
        );
    },
} satisfies Story;

export const InteractiveShowcase = {
    render: (args) => {
        return <StepperShowcase {...args} />;
    },
} satisfies Story;
