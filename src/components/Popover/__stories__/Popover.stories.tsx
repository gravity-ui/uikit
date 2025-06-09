import type {Meta, StoryObj} from '@storybook/react-webpack5';
import {action} from 'storybook/actions';

import {Button} from '../../Button';
import {Link} from '../../Link';
import {Flex} from '../../layout';
import {Popover} from '../Popover';

const meta: Meta<typeof Popover> = {
    title: 'Components/Overlays/Popover',
    component: Popover,
    parameters: {
        layout: 'centered',
    },
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
    render: (args) => (
        <Popover {...args}>
            <Button>Anchor</Button>
        </Popover>
    ),
    args: {
        content: <div style={{padding: 10}}>Content</div>,
        onOpenChange: action('onOpenChange'),
    },
};

export const Delay: Story = {
    render: (args) => (
        <Flex gap={3} justifyContent="center" wrap>
            <Popover {...args} openDelay={1000}>
                <Button>Open Delay: 1000ms</Button>
            </Popover>
            <Popover {...args} closeDelay={2000}>
                <Button>Close Delay: 2000ms</Button>
            </Popover>
        </Flex>
    ),
    args: {
        ...Default.args,
    },
};

export const OnlyClick: Story = {
    ...Default,
    args: {
        ...Default.args,
        trigger: 'click',
    },
};

export const Disabled: Story = {
    ...Default,
    args: {
        ...Default.args,
        disabled: true,
    },
};

export const SafePolygon: Story = {
    ...Default,
    args: {
        ...Default.args,
        openDelay: 0,
        closeDelay: 0,
        offset: 50,
        enableSafePolygon: true,
    },
};

export const FocusManagement: Story = {
    render: (args) => (
        <Flex gap={3} justifyContent="center" wrap>
            <Popover {...args}>
                <Button>Default</Button>
            </Popover>
            <Popover {...args} modal>
                <Button>Modal (Focus container + trap)</Button>
            </Popover>
            <Popover {...args} initialFocus={0}>
                <Button>Focus first tabbable</Button>
            </Popover>
            <Popover {...args} initialFocus={1}>
                <Button>Focus second tabbable</Button>
            </Popover>
        </Flex>
    ),
    args: {
        ...Default.args,
        content: (
            <div style={{padding: 10}}>
                Content with <Link href="#">Link</Link> and <Button>Button</Button>
            </div>
        ),
    },
};
