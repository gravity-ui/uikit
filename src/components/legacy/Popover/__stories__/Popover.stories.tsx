import * as React from 'react';

import type {Meta, StoryFn} from '@storybook/react-webpack5';

import {Popover, PopoverBehavior} from '../';
import type {PopoverProps} from '../';
import {Button} from '../../../Button';

import {cnPopoverDemo} from './PopoverDemo.classname';
import {Base} from './examples/Base/Base';
import {WithCustomAnchor as WithCustomAnchorExample} from './examples/WithCustomAnchor/WithCustomAnchor';

import './PopoverDemo.scss';

const meta: Meta<typeof Popover> = {
    title: 'Legacy/Popover',
    component: Popover,
    args: {
        initialOpen: false,
        disabled: false,
        autoclosable: true,
        openOnHover: true,
        hasArrow: true,
        hasClose: false,
        theme: 'info',
        size: 's',
        behavior: 'delayed',
    },
    argTypes: {
        initialOpen: {
            control: 'boolean',
        },
        disabled: {
            control: 'boolean',
        },
        autoclosable: {control: 'boolean'},
        openOnHover: {control: 'boolean'},
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
        },
        hasArrow: {control: 'boolean'},
        hasClose: {control: 'boolean'},
        theme: {
            control: 'select',
            options: ['info', 'special', 'announcement'],
        },
        size: {control: 'select', options: ['s', 'l']},
        anchorRef: {},
        children: {control: 'text'},
        title: {control: 'text'},
        content: {control: 'text'},
        htmlContent: {control: 'object'},
        contentClassName: {control: 'text'},
        links: {control: 'object'},
        forceLinksAppearance: {control: 'boolean'},
        tooltipActionButton: {control: 'object'},
        tooltipCancelButton: {control: 'object'},
        tooltipOffset: {control: 'object'},
        tooltipClassName: {control: 'text'},
        className: {control: 'text'},
        onClick: {action: 'onClick'},
        onOpenChange: {action: 'onOpenChange'},
        onCloseClick: {action: 'onCloseClick'},
        behavior: {
            control: 'select',
            options: ['immediate', 'delayed', 'delayedClosing'],
        },
        delayOpening: {control: 'number', min: 0},
        delayClosing: {control: 'number', min: 0},
        disablePortal: {control: 'boolean'},
        tooltipId: {control: 'text'},
    },
};

export default meta;

const PlaygroundTemplate: StoryFn<PopoverProps> = (args) => (
    <Base {...args}>{args.openOnHover ? 'Move the cursor' : 'Click'} here to show the popover</Base>
);
export const Playground = PlaygroundTemplate.bind({});
Playground.args = {
    content: 'Popover content',
};

const ThemeTemplate: StoryFn<PopoverProps> = () => (
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

const SizeTemplate: StoryFn<PopoverProps> = () => (
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

const FullFeaturedTemplate: StoryFn<PopoverProps> = (args) => (
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
    links: [
        {
            text: 'Link with a href',
            href: 'https://gravity-ui.com',
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

export const WithAlmostLongActionItems = FullFeaturedTemplate.bind({});
WithAlmostLongActionItems.args = {
    autoclosable: false,
    content: 'There are two actions',
    tooltipActionButton: {
        text: 'Action with more',
        onClick: () => alert('Action button was clicked'),
    },
    tooltipCancelButton: {
        text: 'Action with',
        onClick: () => alert('Cancel button was clicked'),
    },
    className: 'demo-icon-tooltip',
    openOnHover: false,
    behavior: PopoverBehavior.Delayed,
    theme: 'info',
};

const WithCustomAnchorTemplate: StoryFn = () => <WithCustomAnchorExample />;
export const WithCustomAnchor = WithCustomAnchorTemplate.bind({});
WithCustomAnchor.args = {
    content: 'Popover content',
};

const tooltipId = 'tooltipId';
const popoverId = 'popoverId';

const AccessibleTemplate: StoryFn<PopoverProps> = () => {
    const [openPopover, setOpenPopover] = React.useState(false);
    const ref = React.useRef<HTMLButtonElement>(null);

    return (
        <div className={cnPopoverDemo('variants')}>
            <Base content="Accessible tooltip" tooltipId={tooltipId}>
                {({onClick, open}) => (
                    <Button
                        onClick={onClick}
                        aria-controls={open ? tooltipId : undefined}
                        aria-describedby={tooltipId}
                    >
                        Tooltip
                    </Button>
                )}
            </Base>
            <Base
                content="Accessible popover with actions"
                tooltipId={popoverId}
                onOpenChange={setOpenPopover}
                tooltipActionButton={{
                    text: 'Action with more',
                    onClick: () => alert('Action button was clicked'),
                }}
                tooltipCancelButton={{
                    text: 'Action with',
                    onClick: () => alert('Cancel button was clicked'),
                }}
                autoclosable={false}
                openOnHover={false}
                focusTrap
                autoFocus
                restoreFocusRef={ref}
            >
                {({onClick}) => (
                    <Button
                        ref={ref}
                        aria-controls={popoverId}
                        aria-describedby={popoverId}
                        aria-expanded={openPopover}
                        onClick={onClick}
                    >
                        Popover
                    </Button>
                )}
            </Base>
        </div>
    );
};
export const Accessible = AccessibleTemplate.bind({});
Accessible.args = {
    content: 'Popover content',
};
