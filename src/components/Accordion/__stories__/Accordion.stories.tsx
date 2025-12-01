import * as React from 'react';

import {Check} from '@gravity-ui/icons';
import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Button} from '../../Button';
import {Icon} from '../../Icon';
import {Text} from '../../Text';
import {Flex} from '../../layout/index';
import {Accordion} from '../Accordion';
import type {AccordionProps} from '../types';

export default {
    title: 'Components/Data Display/Accordion',
    component: Accordion,
    parameters: {
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: false,
                    },
                ],
            },
        },
    },
    argTypes: {
        size: {
            control: 'select',
            options: ['m', 'l', 'xl'],
            description: 'Size of the accordion',
        },
        view: {
            control: 'select',
            options: ['solid', 'top-bottom'],
            description: 'Visual appearance of the accordion',
        },
        arrowPosition: {
            control: 'select',
            options: ['start', 'end'],
            description: 'Position of the arrow indicator',
        },
        multiple: {
            control: 'boolean',
            description: 'Allow multiple items to be expanded simultaneously',
        },
    },
} as Meta<AccordionProps>;

type Story = StoryObj<AccordionProps>;

export const Default: Story = {
    args: {
        size: 'm',
        view: 'solid',
        arrowPosition: 'end',
        multiple: false,
    },
    render: (args) => (
        <Accordion {...args}>
            <Accordion.Item summary="Accordion header 1" qa={'item1'}>
                Content of the first accordion item.
            </Accordion.Item>
            <Accordion.Item summary="Accordion header 2">
                Content of the second accordion item.
            </Accordion.Item>
            <Accordion.Item summary="Accordion header 3">
                Content of the third accordion item.
            </Accordion.Item>
        </Accordion>
    ),
};

export const Playground: Story = {
    args: {
        size: 'm',
        view: 'solid',
        arrowPosition: 'end',
    },
    render: (args) => (
        <React.Fragment>
            <Accordion {...args} defaultValue={'settings'}>
                <Accordion.Item summary="Settings" value="settings">
                    <Flex direction="column" gap={2}>
                        Configure various application settings here.
                        <Button size="s">Save Settings</Button>
                    </Flex>
                </Accordion.Item>
                <Accordion.Item summary="Notifications" value="notifications">
                    Manage notification preferences and settings.
                </Accordion.Item>
                <Accordion.Item summary="Security" value="security">
                    Security and privacy configuration options.
                </Accordion.Item>
            </Accordion>
        </React.Fragment>
    ),
};

export const Disabled: Story = {
    args: {
        size: 'm',
        view: 'solid',
        arrowPosition: 'end',
        multiple: false,
        defaultValue: 'item1',
    },
    render: (args) => (
        <Accordion {...args}>
            <Accordion.Item summary="First Item" value="item1">
                Content of the first accordion item.
            </Accordion.Item>
            <Accordion.Item summary="Second Item (Disabled)" value="item2" disabled>
                Content of the second accordion item.
            </Accordion.Item>
            <Accordion.Item summary="Third Item" value="item3">
                Content of the third accordion item.
            </Accordion.Item>
        </Accordion>
    ),
};

export const Size: Story = {
    args: {
        view: 'solid',
        arrowPosition: 'end',
        multiple: false,
    },
    render: (args) => {
        return (
            <Flex direction="column" gap={4}>
                <Text variant="body-3">Size M</Text>
                <Accordion {...args} size="m">
                    <Accordion.Item summary="Settings Configuration">
                        <Text>Configure your application settings and preferences.</Text>
                    </Accordion.Item>
                    <Accordion.Item summary="User Management">
                        <Text>Manage users, roles, and permissions.</Text>
                    </Accordion.Item>
                </Accordion>

                <Text variant="body-3">Size L</Text>
                <Accordion {...args} size="l">
                    <Accordion.Item summary="Settings Configuration">
                        <Text>Configure your application settings and preferences.</Text>
                    </Accordion.Item>
                    <Accordion.Item summary="User Management">
                        <Text>Manage users, roles, and permissions.</Text>
                    </Accordion.Item>
                </Accordion>

                <Text variant="body-3">Size XL</Text>
                <Accordion {...args} size="xl">
                    <Accordion.Item summary="Settings Configuration">
                        <Text>Configure your application settings and preferences.</Text>
                    </Accordion.Item>
                    <Accordion.Item summary="User Management">
                        <Text>Manage users, roles, and permissions.</Text>
                    </Accordion.Item>
                </Accordion>
            </Flex>
        );
    },
};

export const Multiple: Story = {
    args: {},
    render: () => {
        return (
            <Accordion view={'solid'} multiple>
                <Accordion.Item summary="Item 1">Item 1</Accordion.Item>
                <Accordion.Item summary="Item 2">Item 2</Accordion.Item>
                <Accordion.Item summary="Item 3">Item 3</Accordion.Item>
                <Accordion.Item summary="Item 4">Item 4</Accordion.Item>
            </Accordion>
        );
    },
};

export const View: Story = {
    args: {
        arrowPosition: 'end',
        multiple: false,
    },
    render: (args) => {
        return (
            <Flex direction={'row'} gap={10}>
                <Accordion {...args} view={'solid'} size={'l'}>
                    <Accordion.Item summary="Item 1">Item 1</Accordion.Item>
                    <Accordion.Item summary="Item 2">Item 2</Accordion.Item>
                    <Accordion.Item summary="Item 3">Item 3</Accordion.Item>
                    <Accordion.Item summary="Item 4">Item 4</Accordion.Item>
                </Accordion>
                <Accordion {...args} view={'top-bottom'} size={'l'}>
                    <Accordion.Item summary="Item 1">Item 1</Accordion.Item>
                    <Accordion.Item summary="Item 2">Item 2</Accordion.Item>
                    <Accordion.Item summary="Item 3">Item 3</Accordion.Item>
                    <Accordion.Item summary="Item 4">Item 4</Accordion.Item>
                </Accordion>
            </Flex>
        );
    },
};

export const WithCustomSummary: Story = {
    args: {
        size: 'm',
        view: 'solid',
        arrowPosition: 'end',
        multiple: false,
    },
    render: (args) => (
        <Accordion {...args}>
            <Accordion.Item value="custom1" keepMounted={false} aria-level={3}>
                <Accordion.Summary>
                    {(props) => {
                        return (
                            <Button {...props} view={'flat'} width={'max'}>
                                <Icon data={Check} size={14} />
                                Custom Summary Button
                            </Button>
                        );
                    }}
                </Accordion.Summary>
                <Text>Content with custom summary using Accordion.Summary component.</Text>
            </Accordion.Item>
            <Accordion.Item summary="Regular Summary" value="regular">
                <Text>Content with regular summary prop.</Text>
            </Accordion.Item>
        </Accordion>
    ),
};
