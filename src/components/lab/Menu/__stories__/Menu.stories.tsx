import * as React from 'react';

import type {VirtualElement} from '@floating-ui/react';
import {LayoutColumns3, LayoutRows3} from '@gravity-ui/icons';
import type {Meta, StoryObj} from '@storybook/react';

import {BUTTON_ICON_SIZE_MAP} from '../../../Button/constants';
import {Icon} from '../../../Icon';
import {Label} from '../../../Label';
import {Sheet} from '../../../Sheet';
import {Menu} from '../Menu';
import {MenuItem} from '../MenuItem';
import {MenuTrigger} from '../MenuTrigger';

import {getMenuItems} from './utils';

const meta: Meta<typeof Menu> = {
    title: 'Lab/Menu',
    component: Menu,
    parameters: {
        layout: 'centered',
    },
};

export default meta;

type Story = StoryObj<typeof Menu>;

export const Default = {
    render: (args) => {
        return (
            <Menu {...args} trigger={<MenuTrigger aria-label="Actions" />}>
                {getMenuItems(args)}
            </Menu>
        );
    },
} satisfies Story;

export const Context = {
    render: (args) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
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
                    {getMenuItems(args)}
                </Menu>
            </React.Fragment>
        );
    },
} satisfies Story;

export const InsideSheet = {
    render: (args) => {
        return (
            <Sheet visible>
                <Menu {...args}>{getMenuItems(args, true)}</Menu>
            </Sheet>
        );
    },
    args: {
        inline: true,
    },
} satisfies Story;

export const Selection = {
    render: (args) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
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
