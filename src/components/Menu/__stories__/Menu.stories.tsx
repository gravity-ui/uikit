import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Menu, MenuProps} from '../Menu';
import {Icon} from '../../Icon';
import gearIcon from '../../../../assets/icons/gear.svg';

export default {
    title: 'Components/Menu',
    component: Menu,
} as Meta;

export const Default: Story<MenuProps> = (args) => (
    <Menu {...args}>
        <Menu.Item>Первый</Menu.Item>
        <Menu.Item>Второй</Menu.Item>
    </Menu>
);

export const ItemActive: Story<MenuProps> = (args) => (
    <Menu {...args}>
        <Menu.Item active>Первый</Menu.Item>
        <Menu.Item>Второй</Menu.Item>
        <Menu.Item>Третий</Menu.Item>
    </Menu>
);

export const ItemIcon: Story<MenuProps> = (args) => (
    <Menu {...args}>
        <Menu.Item icon={<Icon data={gearIcon} size={16} />}>Настройки</Menu.Item>
    </Menu>
);

export const ItemDisabled: Story<MenuProps> = (args) => (
    <Menu {...args}>
        <Menu.Item>Первый</Menu.Item>
        <Menu.Item disabled>Второй (недоступен)</Menu.Item>
        <Menu.Item>Третий</Menu.Item>
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
        <Menu.Item>Первый</Menu.Item>
        <Menu.Group label="Группа Один">
            <Menu.Item>Раз</Menu.Item>
            <Menu.Item>Два</Menu.Item>
        </Menu.Group>
        <Menu.Group label="Группа Два">
            <Menu.Item>Раз</Menu.Item>
            <Menu.Item>Два</Menu.Item>
        </Menu.Group>
        <Menu.Item>По середине</Menu.Item>
        <Menu.Group label="Группа Три">
            <Menu.Item>Раз</Menu.Item>
            <Menu.Item>Два</Menu.Item>
        </Menu.Group>
        <Menu.Item>Последний</Menu.Item>
    </Menu>
);
