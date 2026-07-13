import * as React from 'react';

import type {Meta, StoryObj} from '@storybook/react-webpack5';
import {action} from 'storybook/actions';

import {Alert} from '../../Alert';
import {Button} from '../../Button';
import {Text} from '../../Text';
import {Flex} from '../../layout';
import {Popover as LegacyPopover} from '../../legacy/Popover';
import {Popover} from '../Popover';

const meta: Meta = {
    title: 'Components/Overlays/Popover/Legacy vs New',
    parameters: {
        layout: 'centered',
    },
};

export default meta;

type Story = StoryObj;

function Column({label, children}: {label: string; children: React.ReactNode}) {
    return (
        <Flex direction="column" alignItems="center" gap={2}>
            <div style={{fontWeight: 'bold'}}>{label}</div>
            {children}
        </Flex>
    );
}

export const Default: Story = {
    render: () => (
        <Flex gap={8} alignItems="center">
            <Column label="Legacy">
                <LegacyPopover title="Title" content="Some text" theme="info">
                    <Button>Hover me</Button>
                </LegacyPopover>
            </Column>
            <Column label="New">
                <Popover
                    content={
                        <Alert
                            theme="clear"
                            title="Title"
                            // title is set and theme !== "announcement" → dim the message
                            message={<Text color="secondary">Some text</Text>}
                        />
                    }
                    hasArrow
                    placement={['right', 'bottom']}
                    onOpenChange={action('onOpenChange')}
                >
                    <Button>Hover me</Button>
                </Popover>
            </Column>
        </Flex>
    ),
};

export const WithActionsAndClose: Story = {
    render: () => (
        <Flex gap={8} alignItems="center">
            <Column label="Legacy">
                <LegacyPopover
                    title="Update available"
                    content="A new version is ready to install."
                    tooltipActionButton={{text: 'Update', onClick: action('legacy: update')}}
                    tooltipCancelButton={{text: 'Dismiss', onClick: action('legacy: dismiss')}}
                    hasClose
                    onCloseClick={action('legacy: close')}
                    theme="info"
                    placement={['right', 'bottom']}
                >
                    <Button>Hover me</Button>
                </LegacyPopover>
            </Column>
            <Column label="New">
                <Popover
                    content={
                        <Alert
                            theme="clear"
                            title="Update available"
                            // title is set and theme was "info" (!== "announcement") → dim the message
                            message={
                                <Text color="secondary">A new version is ready to install.</Text>
                            }
                            // `{text, handler}` descriptors can't carry a per-button `view` —
                            // use the `<Alert.Actions>` children form to match the legacy
                            // "info" theme's button views (action: normal, cancel: flat).
                            actions={
                                <Alert.Actions>
                                    <Alert.Action view="normal" onClick={action('new: update')}>
                                        Update
                                    </Alert.Action>
                                    <Alert.Action view="flat" onClick={action('new: dismiss')}>
                                        Dismiss
                                    </Alert.Action>
                                </Alert.Actions>
                            }
                            onClose={action('new: close')}
                        />
                    }
                    hasArrow
                    placement={['right', 'bottom']}
                >
                    <Button>Hover me</Button>
                </Popover>
            </Column>
        </Flex>
    ),
};

export const Themes: Story = {
    render: () => (
        <Flex gap={8} wrap justifyContent="center">
            <Column label="Legacy: info">
                <LegacyPopover
                    content="Info tooltip"
                    theme="info"
                    placement="bottom"
                    tooltipActionButton={{text: 'Action', onClick: action('legacy info: action')}}
                    tooltipCancelButton={{text: 'Cancel', onClick: action('legacy info: cancel')}}
                >
                    <Button>info</Button>
                </LegacyPopover>
            </Column>
            <Column label="New: clear (closest match)">
                <Popover
                    content={
                        <Alert
                            theme="clear"
                            message="Info tooltip"
                            // legacy "info" theme button views: action=normal, cancel=flat
                            actions={
                                <Alert.Actions>
                                    <Alert.Action
                                        view="normal"
                                        onClick={action('new info: action')}
                                    >
                                        Action
                                    </Alert.Action>
                                    <Alert.Action view="flat" onClick={action('new info: cancel')}>
                                        Cancel
                                    </Alert.Action>
                                </Alert.Actions>
                            }
                        />
                    }
                    hasArrow
                    placement="bottom"
                >
                    <Button>clear</Button>
                </Popover>
            </Column>
            <Column label="Legacy: special">
                <LegacyPopover
                    content="Special tooltip"
                    theme="special"
                    placement="bottom"
                    tooltipActionButton={{
                        text: 'Action',
                        onClick: action('legacy special: action'),
                    }}
                    tooltipCancelButton={{
                        text: 'Cancel',
                        onClick: action('legacy special: cancel'),
                    }}
                >
                    <Button>special</Button>
                </LegacyPopover>
            </Column>
            <Column label="New: clear + brand background">
                <Popover
                    // set the surface color on Popup's own CSS var, not inside Alert
                    style={{
                        '--g-popup-background-color': 'var(--g-color-base-brand)',
                        '--g-popup-border-color': 'var(--g-color-base-brand)',
                    }}
                    content={
                        <Alert
                            theme="clear"
                            style={{color: 'var(--g-color-text-brand-contrast)'}}
                            message="Special tooltip"
                            // legacy "special" theme button views: action=normal-contrast, cancel=flat-contrast
                            actions={
                                <Alert.Actions>
                                    <Alert.Action
                                        view="normal-contrast"
                                        onClick={action('new special: action')}
                                    >
                                        Action
                                    </Alert.Action>
                                    <Alert.Action
                                        view="flat-contrast"
                                        onClick={action('new special: cancel')}
                                    >
                                        Cancel
                                    </Alert.Action>
                                </Alert.Actions>
                            }
                        />
                    }
                    hasArrow
                    placement="bottom"
                >
                    <Button>brand</Button>
                </Popover>
            </Column>
            <Column label="Legacy: announcement">
                <LegacyPopover
                    content="Announcement tooltip"
                    theme="announcement"
                    placement="bottom"
                    tooltipActionButton={{
                        text: 'Action',
                        onClick: action('legacy announcement: action'),
                    }}
                    tooltipCancelButton={{
                        text: 'Cancel',
                        onClick: action('legacy announcement: cancel'),
                    }}
                >
                    <Button>announcement</Button>
                </LegacyPopover>
            </Column>
            <Column label="New: normal (no exact match)">
                <Popover
                    content={
                        <Alert
                            theme="normal"
                            view="filled"
                            message="Announcement tooltip (approx.)"
                            // legacy "announcement" theme button views: action=normal-contrast, cancel=outlined
                            actions={
                                <Alert.Actions>
                                    <Alert.Action
                                        view="normal-contrast"
                                        onClick={action('new announcement: action')}
                                    >
                                        Action
                                    </Alert.Action>
                                    <Alert.Action
                                        view="outlined"
                                        onClick={action('new announcement: cancel')}
                                    >
                                        Cancel
                                    </Alert.Action>
                                </Alert.Actions>
                            }
                        />
                    }
                    hasArrow
                    placement="bottom"
                >
                    <Button>normal</Button>
                </Popover>
            </Column>
        </Flex>
    ),
};

export const ClickOnly: Story = {
    render: () => (
        <Flex gap={8} alignItems="center">
            <Column label="Legacy: openOnHover={false}">
                <LegacyPopover content="Click-only content" openOnHover={false} theme="info">
                    <Button>Click me</Button>
                </LegacyPopover>
            </Column>
            <Column label='New: trigger="click"'>
                <Popover
                    content={<Alert theme="clear" message="Click-only content" />}
                    hasArrow
                    trigger="click"
                    placement={['right', 'bottom']}
                >
                    <Button>Click me</Button>
                </Popover>
            </Column>
        </Flex>
    ),
};
