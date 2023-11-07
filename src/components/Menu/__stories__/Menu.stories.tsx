import React from 'react';

import {CircleExclamationFill, Gear} from '@gravity-ui/icons';
import type {Meta, StoryFn} from '@storybook/react';

import {Icon} from '../../Icon';
import {Menu} from '../Menu';
import type {MenuProps} from '../Menu';

export default {
    title: 'Components/Navigation/Menu',
    component: Menu,
} as Meta<typeof Menu>;

export const Default: StoryFn<MenuProps> = (args) => (
    <Menu {...args}>
        <Menu.Item>First</Menu.Item>
        <Menu.Item>Second</Menu.Item>
    </Menu>
);

export const ItemActive: StoryFn<MenuProps> = (args) => (
    <Menu {...args}>
        <Menu.Item active>First</Menu.Item>
        <Menu.Item>Second</Menu.Item>
        <Menu.Item>Third</Menu.Item>
    </Menu>
);

export const ItemIcon: StoryFn<MenuProps> = (args) => (
    <Menu {...args}>
        <Menu.Item iconStart={<Icon data={Gear} size={16} />}>Settings</Menu.Item>
    </Menu>
);

export const ItemBothIcons: StoryFn<MenuProps> = (args) => (
    <Menu {...args}>
        <Menu.Item
            iconStart={<Icon data={Gear} size={16} />}
            iconEnd={<Icon data={CircleExclamationFill} size={16} />}
        >
            Settings
        </Menu.Item>
    </Menu>
);

export const ItemDisabled: StoryFn<MenuProps> = (args) => (
    <Menu {...args}>
        <Menu.Item>First</Menu.Item>
        <Menu.Item disabled>Second (unavailable)</Menu.Item>
        <Menu.Item>Third</Menu.Item>
    </Menu>
);

export const ItemSelected: StoryFn<MenuProps> = (args) => (
    <Menu {...args}>
        <Menu.Item>First</Menu.Item>
        <Menu.Item>Second</Menu.Item>
        <Menu.Item selected>Third</Menu.Item>
    </Menu>
);

export const ItemTheme: StoryFn<MenuProps> = (args) => (
    <Menu {...args}>
        <Menu.Item>Normal</Menu.Item>
        <Menu.Item theme="danger">Danger</Menu.Item>
        <Menu.Item theme="danger" disabled>
            Danger (disabled)
        </Menu.Item>
    </Menu>
);

export const ItemLink: StoryFn<MenuProps> = (args) => (
    <Menu {...args}>
        <Menu.Item href="https://yandex.ru" target="_blank">
            yandex.ru
        </Menu.Item>
        <Menu.Item href="https://ya.ru" target="_blank">
            ya.ru
        </Menu.Item>
        <Menu.Item href="https://ya.ru" target="_blank" disabled>
            disabled ya.ru
        </Menu.Item>
    </Menu>
);

export const Group: StoryFn<MenuProps> = (args) => (
    <Menu {...args}>
        <Menu.Item>First</Menu.Item>
        <Menu.Group label="Group One">
            <Menu.Item>One</Menu.Item>
            <Menu.Item>Two</Menu.Item>
        </Menu.Group>
        <Menu.Group label="Group Two">
            <Menu.Item>One</Menu.Item>
            <Menu.Item>Two</Menu.Item>
        </Menu.Group>
        <Menu.Item>Middle</Menu.Item>
        <Menu.Group label="Group Three">
            <Menu.Item>One</Menu.Item>
            <Menu.Item>Two</Menu.Item>
        </Menu.Group>
        <Menu.Item>Last</Menu.Item>
    </Menu>
);
