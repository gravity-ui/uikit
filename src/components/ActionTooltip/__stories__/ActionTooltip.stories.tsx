import {Bold, FloppyDisk, Italic, Link, Strikethrough, Underline} from '@gravity-ui/icons';
import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Button} from '../../Button';
import {Icon} from '../../Icon';
import {TooltipDelayGroup} from '../../Tooltip';
import {Flex} from '../../layout';
import {ActionTooltip} from '../ActionTooltip';

const meta: Meta<typeof ActionTooltip> = {
    title: 'Components/Overlays/ActionTooltip',
    component: ActionTooltip,
    parameters: {
        layout: 'centered',
        a11y: {
            context: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'button-name',
                        // We set aria-attributes dynamically
                        enabled: false,
                    },
                ],
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof ActionTooltip>;

export const Default: Story = {
    render: (args) => {
        return (
            <ActionTooltip {...args}>
                <Button>
                    <Icon data={FloppyDisk} size={16} />
                </Button>
            </ActionTooltip>
        );
    },
    args: {
        title: 'Save',
    },
};

export const Hotkey: Story = {
    ...Default,
    args: {
        ...Default.args,
        hotkey: 'mod+s',
    },
};

export const Description: Story = {
    ...Default,
    args: {
        ...Default.args,
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    },
};

const TOOLBAR_ACTIONS = [
    {title: 'Bold', hotkey: 'mod+b', icon: Bold},
    {title: 'Italic', hotkey: 'mod+i', icon: Italic},
    {title: 'Underline', hotkey: 'mod+u', icon: Underline},
    {title: 'Strikethrough', hotkey: 'mod+shift+x', icon: Strikethrough},
    {title: 'Link', hotkey: 'mod+k', icon: Link},
];

export const DelayGroup: Story = {
    render: (args) => (
        <TooltipDelayGroup>
            <Flex gap={1}>
                {TOOLBAR_ACTIONS.map(({title, hotkey, icon}) => (
                    <ActionTooltip {...args} key={title} title={title} hotkey={hotkey}>
                        <Button view="flat">
                            <Icon data={icon} size={16} />
                        </Button>
                    </ActionTooltip>
                ))}
            </Flex>
        </TooltipDelayGroup>
    ),
    args: {
        title: 'Action',
    },
};
