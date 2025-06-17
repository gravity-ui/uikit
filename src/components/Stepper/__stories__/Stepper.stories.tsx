import {Gear} from '@gravity-ui/icons';
import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Text} from '../../Text';
import {Tooltip} from '../../Tooltip';
import {Stepper} from '../Stepper';

import {StepperInteractiveShowcase, StepperSizeShowcase} from './StepperShowcase';

export default {
    title: 'Components/Navigation/Stepper',
    component: Stepper,
    parameters: {
        a11y: {
            context: '#storybook-root',
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
    render: () => {
        return <StepperSizeShowcase />;
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
                <Stepper.Item icon={Gear}>Step 1</Stepper.Item>
                <Stepper.Item view="error" icon={Gear}>
                    Step 2
                </Stepper.Item>
                <Stepper.Item view="success" icon={Gear}>
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
        return <StepperInteractiveShowcase {...args} />;
    },
} satisfies Story;

export const WithFloatingElements = {
    render: (args) => {
        return (
            <Stepper {...args}>
                <Tooltip content="fancy step with tooltip">
                    <Stepper.Item>Step 1</Stepper.Item>
                </Tooltip>
                <Stepper.Item view="error">Step 2</Stepper.Item>
                <Stepper.Item view="success">Step 3</Stepper.Item>
                <Stepper.Item>Step 4 with very long title</Stepper.Item>
            </Stepper>
        );
    },
} satisfies Story;
