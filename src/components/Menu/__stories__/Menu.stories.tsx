import React from 'react';

import {CircleExclamationFill, Gear} from '@gravity-ui/icons';
import {action} from '@storybook/addon-actions';
import type {Meta, StoryFn} from '@storybook/react';

import {Icon} from '../../Icon';
import {Menu} from '../Menu';
import type {MenuProps} from '../Menu';

export default {
    title: 'Components/Navigation/Menu',
    component: Menu,
    parameters: {
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'aria-required-parent',
                        enabled: false, // https://github.com/gravity-ui/uikit/issues/1342
                    },
                    {
                        id: 'aria-required-children',
                        enabled: false, // https://github.com/gravity-ui/uikit/issues/1342
                    },
                    {
                        id: 'listitem',
                        enabled: false, // https://github.com/gravity-ui/uikit/issues/1342
                    },
                    {
                        id: 'color-contrast',
                        enabled: false,
                    },
                ],
            },
        },
    },
} as Meta<typeof Menu>;

const createItemClickHandler = (text: string) => () => {
    action(`Click ${text} item`);
    alert(`${text} item clicked`);
};

export const Default: StoryFn<MenuProps> = (args) => (
    <Menu {...args}>
        <Menu.Item onClick={createItemClickHandler('First')}>First</Menu.Item>
        <Menu.Item onClick={createItemClickHandler('Second')}>Second</Menu.Item>
    </Menu>
);

export const ItemActive: StoryFn<MenuProps> = (args) => (
    <Menu {...args}>
        <Menu.Item active onClick={createItemClickHandler('First')}>
            First
        </Menu.Item>
        <Menu.Item onClick={createItemClickHandler('Second')}>Second</Menu.Item>
        <Menu.Item onClick={createItemClickHandler('Third')}>Third</Menu.Item>
    </Menu>
);

export const ItemIcon: StoryFn<MenuProps> = (args) => (
    <Menu {...args}>
        <Menu.Item
            iconStart={<Icon data={Gear} size={16} />}
            onClick={createItemClickHandler('Settings')}
        >
            Settings
        </Menu.Item>
    </Menu>
);

export const ItemBothIcons: StoryFn<MenuProps> = (args) => (
    <Menu {...args}>
        <Menu.Item
            iconStart={<Icon data={Gear} size={16} />}
            iconEnd={<Icon data={CircleExclamationFill} size={16} />}
            onClick={createItemClickHandler('Settings')}
        >
            Settings
        </Menu.Item>
    </Menu>
);

export const ItemDisabled: StoryFn<MenuProps> = (args) => (
    <Menu {...args}>
        <Menu.Item onClick={createItemClickHandler('First')}>First</Menu.Item>
        <Menu.Item onClick={createItemClickHandler('Second')} disabled>
            Second (unavailable)
        </Menu.Item>
        <Menu.Item onClick={createItemClickHandler('Third')}>Third</Menu.Item>
    </Menu>
);

export const ItemSelected: StoryFn<MenuProps> = (args) => (
    <Menu {...args}>
        <Menu.Item onClick={createItemClickHandler('First')}>First</Menu.Item>
        <Menu.Item onClick={createItemClickHandler('Second')}>Second</Menu.Item>
        <Menu.Item selected onClick={createItemClickHandler('Third')}>
            Third
        </Menu.Item>
    </Menu>
);

export const ItemTheme: StoryFn<MenuProps> = (args) => (
    <Menu {...args}>
        <Menu.Item onClick={createItemClickHandler('Normal')}>Normal</Menu.Item>
        <Menu.Item theme="danger" onClick={createItemClickHandler('Danger')}>
            Danger
        </Menu.Item>
        <Menu.Item theme="danger" disabled onClick={createItemClickHandler('Danger (disabled)')}>
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
        <Menu.Item onClick={createItemClickHandler('First')}>First</Menu.Item>
        <Menu.Group label="Group One">
            <Menu.Item onClick={createItemClickHandler('Group One: One')}>One</Menu.Item>
            <Menu.Item onClick={createItemClickHandler('Group One: Two')}>Two</Menu.Item>
        </Menu.Group>
        <Menu.Group label="Group Two">
            <Menu.Item onClick={createItemClickHandler('Group Two: One')}>One</Menu.Item>
            <Menu.Item onClick={createItemClickHandler('Group Two: Two')}>Two</Menu.Item>
        </Menu.Group>
        <Menu.Item onClick={createItemClickHandler('Middle')}>Middle</Menu.Item>
        <Menu.Group label="Group Three">
            <Menu.Item onClick={createItemClickHandler('Group Three: One')}>One</Menu.Item>
            <Menu.Item onClick={createItemClickHandler('Group Three: Two')}>Two</Menu.Item>
        </Menu.Group>
        <Menu.Item onClick={createItemClickHandler('Last')}>Last</Menu.Item>
    </Menu>
);
