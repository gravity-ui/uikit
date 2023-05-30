import React from 'react';

import {Meta, Story} from '@storybook/react';

import {Popover, PopoverBehavior, PopoverProps} from '../';
import {Button} from '../../Button';

import {cnPopoverDemo} from './PopoverDemo.classname';
import {Base} from './examples/Base/Base';
import {WithCustomAnchor as WithCustomAnchorExample} from './examples/WithCustomAnchor/WithCustomAnchor';

import './PopoverDemo.scss';

export default {
    title: 'Components/Popover',
    component: Popover,
    argTypes: {
        initialOpen: {
            control: 'boolean',
            defaultValue: false,
        },
        disabled: {
            control: 'boolean',
            defaultValue: false,
        },
        autoclosable: {control: 'boolean', defaultValue: true},
        openOnHover: {control: 'boolean', defaultValue: true},
        offset: {control: 'object'},
        placement: {
            control: 'select',
            options: [
                'top',
                'right',
                'left',
                'bottom',
                'top-start',
                'top-end',
                'bottom-start',
                'bottom-end',
                'right-start',
                'right-end',
                'left-start',
                'left-end',
                'auto',
                'auto-start',
                'auto-end',
            ],
            defaultValue: ['right', 'bottom'],
        },
        hasArrow: {control: 'boolean', defaultValue: true},
        hasClose: {control: 'boolean', defaultValue: false},
        theme: {
            control: 'select',
            options: ['info', 'special', 'announcement'],
            defaultValue: 'info',
        },
        size: {control: 'select', options: ['s', 'l'], defaultValue: 's'},
        anchorRef: {},
        children: {control: 'string'},
        title: {control: 'string '},
        content: {control: 'string'},
        htmlContent: {control: 'object'},
        contentClassName: {control: 'string '},
        links: {control: 'array'},
        forceLinksAppearance: {control: 'boolean'},
        tooltipActionButton: {control: 'object'},
        tooltipCancelButton: {control: 'object'},
        tooltipOffset: {control: 'array'},
        tooltipClassName: {control: 'string '},
        className: {control: 'string '},
        onClick: {action: 'onClick'},
        onOpenChange: {action: 'onOpenChange'},
        onCloseClick: {action: 'onCloseClick'},
        behavior: {
            control: 'select',
            options: ['immediate', 'delayed', 'delayedClosing'],
            defaultValue: 'delayed',
        },
        delayOpening: {control: 'number', min: 0},
        delayClosing: {control: 'number', min: 0},
    },
} as Meta;

const PlaygroundTemplate: Story<PopoverProps> = (args) => (
    <Base {...args}>{args.openOnHover ? 'Move the cursor' : 'Click'} here to show the popover</Base>
);
export const Playground = PlaygroundTemplate.bind({});
Playground.args = {
    content: 'Popover content',
};

const ThemeTemplate: Story<PopoverProps> = () => (
    <div className={cnPopoverDemo('variants')}>
        <Base theme="info" content="Info tooltip" placement="bottom">
            <Button>Info (default)</Button>
        </Base>
        <Base theme="special" content="Special tooltip" placement="bottom">
            <Button>Special</Button>
        </Base>
        <Base theme="announcement" content="Announcement tooltip" placement="bottom">
            <Button>Announcement</Button>
        </Base>
    </div>
);
export const Theme = ThemeTemplate.bind({});

const SizeTemplate: Story<PopoverProps> = () => (
    <div className={cnPopoverDemo('variants')}>
        <Base size="s" content="Small tooltip" placement="bottom">
            <Button>Small (s)</Button>
        </Base>
        <Base size="l" content="Big tooltip" placement="bottom">
            <Button>Big (l)</Button>
        </Base>
    </div>
);
export const Size = SizeTemplate.bind({});

const FullFeaturedTemplate: Story<PopoverProps> = (args) => (
    <div className={cnPopoverDemo()}>
        <Base {...args}>
            <div className={cnPopoverDemo('content')}>
                <h3 className={cnPopoverDemo('text')}>
                    Tooltip on {args.openOnHover ? 'hover' : 'click'}
                </h3>
            </div>
        </Base>
    </div>
);
export const FullFeatured = FullFeaturedTemplate.bind({});
FullFeatured.args = {
    autoclosable: false,
    title: 'Title',
    tooltipActionButton: {
        text: 'Action',
        onClick: () => alert('Action button was clicked'),
    },
    tooltipCancelButton: {
        text: 'Cancel',
        onClick: () => alert('Cancel button was clicked'),
    },
    links: [
        {
            text: 'Link with a href',
            href: 'https://yandex.ru',
        },
        {
            text: 'Link with an onClick handler',
            onClick: () => alert('Link was clicked'),
        },
    ],
    className: 'demo-icon-tooltip',
    openOnHover: false,
    behavior: PopoverBehavior.Delayed,
    theme: 'info',
    htmlContent:
        'Tooltip\'s <b>html</b> content. Learn more <a href="https://example.com" target="_blank">here</a>',
};

export const WithLongActionItems = FullFeaturedTemplate.bind({});
WithLongActionItems.args = {
    autoclosable: false,
    content: 'There are two actions',
    tooltipActionButton: {
        text: 'Action with moderately long text',
        onClick: () => alert('Action button was clicked'),
    },
    tooltipCancelButton: {
        text: 'Cancel with moderately long text',
        onClick: () => alert('Cancel button was clicked'),
    },
    className: 'demo-icon-tooltip',
    openOnHover: false,
    behavior: PopoverBehavior.Delayed,
    theme: 'info',
};

const WithCustomAnchorTemplate: Story = () => <WithCustomAnchorExample />;
export const WithCustomAnchor = WithCustomAnchorTemplate.bind({});
WithCustomAnchor.args = {
    content: 'Popover content',
};
