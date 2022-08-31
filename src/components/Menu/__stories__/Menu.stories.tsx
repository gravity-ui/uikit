import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Menu, MenuProps} from '../Menu';
import {Icon} from '../../Icon';
import {GearIcon} from '../../icons/GearIcon';

export default {
    title: 'Components/Menu',
    component: Menu,
} as Meta;

export const Default: Story<MenuProps> = (args) => (
    <Menu {...args}>
        <Menu.Item>First</Menu.Item>
        <Menu.Item>Second</Menu.Item>
    </Menu>
);

export const ItemActive: Story<MenuProps> = (args) => (
    <Menu {...args}>
        <Menu.Item active>First</Menu.Item>
        <Menu.Item>Second</Menu.Item>
        <Menu.Item>Third</Menu.Item>
    </Menu>
);

export const ItemIcon: Story<MenuProps> = (args) => (
    <Menu {...args}>
        <Menu.Item icon={<Icon data={GearIcon} size={16} />}>Settings</Menu.Item>
    </Menu>
);

export const ItemDisabled: Story<MenuProps> = (args) => (
    <Menu {...args}>
        <Menu.Item>First</Menu.Item>
        <Menu.Item disabled>Second (unavailable)</Menu.Item>
        <Menu.Item>Third</Menu.Item>
    </Menu>
);

export const ItemTheme: Story<MenuProps> = (args) => (
    <Menu {...args}>
        <Menu.Item>Normal</Menu.Item>
        <Menu.Item theme="danger">Danger</Menu.Item>
        <Menu.Item theme="danger" disabled>
            Danger (disabled)
        </Menu.Item>
    </Menu>
);

export const ItemLink: Story<MenuProps> = (args) => (
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

export const Group: Story<MenuProps> = (args) => (
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
