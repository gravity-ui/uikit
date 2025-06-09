import type {Meta, StoryObj} from '@storybook/react-webpack5';
import {action} from 'storybook/actions';

import {Button} from '../../Button';
import {Flex} from '../../layout';
import {Tooltip} from '../Tooltip';

const meta: Meta<typeof Tooltip> = {
    title: 'Components/Overlays/Tooltip',
    component: Tooltip,
    parameters: {
        layout: 'centered',
    },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
    render: (args) => {
        return (
            <Tooltip {...args}>
                <Button>Anchor</Button>
            </Tooltip>
        );
    },
    args: {
        content: 'Content',
        onOpenChange: action('onOpenChange'),
    },
};

export const Delay: Story = {
    render: (args) => (
        <Flex gap={3} justifyContent="center" wrap>
            <Tooltip {...args} openDelay={500}>
                <Button>Open Delay: 500ms</Button>
            </Tooltip>
            <Tooltip {...args} closeDelay={500}>
                <Button>Close Delay: 500ms</Button>
            </Tooltip>
        </Flex>
    ),
    args: {
        ...Default.args,
    },
};

export const OnlyFocus: Story = {
    ...Default,
    args: {
        ...Default.args,
        trigger: 'focus',
    },
};

export const Disabled: Story = {
    ...Default,
    args: {
        ...Default.args,
        disabled: true,
    },
};

export const LongText: Story = {
    ...Default,
    args: {
        ...Default.args,
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
};
