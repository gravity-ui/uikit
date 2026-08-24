import * as React from 'react';

import type {VirtualElement} from '@floating-ui/react';
import {Envelope, LayoutColumns3, LayoutRows3, LogoTelegram, Smartphone} from '@gravity-ui/icons';
import type {Meta, StoryObj} from '@storybook/react-webpack5';
import {action} from 'storybook/actions';

import {BUTTON_ICON_SIZE_MAP} from '../../../Button/constants';
import {Icon} from '../../../Icon';
import {Label} from '../../../Label';
import {Modal} from '../../../Modal';
import {Popup} from '../../../Popup';
import {Sheet} from '../../../Sheet';
import {Menu} from '../Menu';
import {MenuItem} from '../MenuItem';
import {MenuTrigger} from '../MenuTrigger';

import {getFullFeaturedMenuItems, getSimpleMenuItems} from './utils';

const meta: Meta<typeof Menu> = {
    title: 'Lab/Menu',
    component: Menu,
    parameters: {
        layout: 'centered',
        a11y: {
            context: '#storybook-root',
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
};

export default meta;

type Story = StoryObj<typeof Menu>;

export const Default = {
    render: (args) => {
        return <Menu {...args}>{getSimpleMenuItems(args)}</Menu>;
    },
    args: {
        trigger: <MenuTrigger aria-label="Actions" />,
        onOpenChange: action('onOpenChange'),
    },
} satisfies Story;

export const IconStory = {
    ...Default,
    name: 'Icon',
    render: (args) => {
        return (
            <Menu {...args} trigger={<MenuTrigger aria-label="Actions" />}>
                {getSimpleMenuItems(args, true)}
            </Menu>
        );
    },
} satisfies Story;

export const FullFeatured = {
    ...Default,
    render: (args) => {
        return (
            <Menu {...args} trigger={<MenuTrigger aria-label="Actions" />}>
                {getFullFeaturedMenuItems(args)}
            </Menu>
        );
    },
} satisfies Story;

export const Context = {
    ...Default,
    render: (args) => {
        const [anchor, setAnchor] = React.useState<VirtualElement | null>(null);

        const handleContextMenu = (event: React.MouseEvent) => {
            event.preventDefault();
            setAnchor({
                getBoundingClientRect() {
                    return {
                        width: 0,
                        height: 0,
                        x: event.clientX,
                        y: event.clientY,
                        top: event.clientY,
                        right: event.clientX,
                        bottom: event.clientY,
                        left: event.clientX,
                    };
                },
            });
        };

        return (
            <React.Fragment>
                <div
                    onContextMenu={handleContextMenu}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 300,
                        height: 300,
                        border: '2px dashed var(--g-color-line-focus)',
                        borderRadius: 12,
                    }}
                >
                    Right click in the area to open the menu
                </div>
                <Menu {...args} trigger={anchor}>
                    {getFullFeaturedMenuItems(args)}
                </Menu>
            </React.Fragment>
        );
    },
} satisfies Story;

export const InsideSheet = {
    ...Default,
    render: (args) => {
        return (
            <Sheet visible>
                <Menu {...args}>{getFullFeaturedMenuItems(args, true)}</Menu>
            </Sheet>
        );
    },
    args: {
        inline: true,
    },
} satisfies Story;

export const Selection = {
    ...Default,
    render: (args) => {
        const [value, setValue] = React.useState('row');
        const items = [
            {
                value: 'row',
                title: 'Row',
                icon: <Icon data={LayoutRows3} size={BUTTON_ICON_SIZE_MAP[args.size ?? 'm']} />,
            },
            {
                value: 'column',
                title: 'Column',
                icon: <Icon data={LayoutColumns3} size={BUTTON_ICON_SIZE_MAP[args.size ?? 'm']} />,
            },
        ];

        return (
            <Menu
                {...args}
                trigger={
                    <Label value={items.find((item) => item.value === value)?.title}>
                        Direction
                    </Label>
                }
            >
                {items.map((item) => (
                    <MenuItem
                        key={item.value}
                        icon={item.icon}
                        selected={item.value === value}
                        onClick={() => setValue(item.value)}
                    >
                        {item.title}
                    </MenuItem>
                ))}
            </Menu>
        );
    },
} satisfies Story;

export const Links = {
    ...Default,
    render: (args) => {
        return (
            <Menu {...args}>
                <Menu.Item
                    href="#mail"
                    icon={<Icon data={Envelope} size={BUTTON_ICON_SIZE_MAP[args.size ?? 'm']} />}
                >
                    Mail
                </Menu.Item>
                <Menu.Item
                    href="#sms"
                    icon={<Icon data={Smartphone} size={BUTTON_ICON_SIZE_MAP[args.size ?? 'm']} />}
                    disabled
                >
                    SMS
                </Menu.Item>
                <Menu.Item
                    href="#telegram"
                    icon={
                        <Icon data={LogoTelegram} size={BUTTON_ICON_SIZE_MAP[args.size ?? 'm']} />
                    }
                >
                    Telegram
                </Menu.Item>
            </Menu>
        );
    },
} satisfies Story;

export const InsidePopup = {
    ...Default,
    render: (args) => {
        const [popupAnchor, setPopupAnchor] = React.useState<HTMLDivElement | null>(null);

        return (
            <React.Fragment>
                <div ref={setPopupAnchor}>&nbsp;</div>
                <Popup anchorElement={popupAnchor} open>
                    <div style={{padding: 10}}>
                        <Menu {...args}>{getSimpleMenuItems(args)}</Menu>
                    </div>
                </Popup>
            </React.Fragment>
        );
    },
} satisfies Story;

export const InsideModal = {
    ...Default,
    render: (args) => {
        return (
            <Modal open>
                <div style={{padding: 10}}>
                    <Menu {...args}>{getSimpleMenuItems(args)}</Menu>
                </div>
            </Modal>
        );
    },
} satisfies Story;
