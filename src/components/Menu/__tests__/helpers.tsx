import React from 'react';

import {CircleExclamationFill, Gear} from '@gravity-ui/icons';

import {Icon} from '../../Icon';
import {Menu} from '../Menu';
import type {MenuGroupProps, MenuItemProps, MenuProps} from '../Menu';

export const TestMenu = (props: Partial<MenuProps>) => {
    return (
        <Menu {...props}>
            <Menu.Item onClick={() => {}}>First</Menu.Item>
            <Menu.Item onClick={() => {}} disabled>
                Second (unavailable)
            </Menu.Item>
        </Menu>
    );
};

export const TestMenuGroup = (props: Partial<MenuGroupProps>) => {
    return (
        <Menu>
            <Menu.Item onClick={() => {}}>Test item before group</Menu.Item>
            <Menu.Group {...props}>
                <Menu.Item onClick={() => {}}>First</Menu.Item>
                <Menu.Item onClick={() => {}} disabled>
                    Second (unavailable)
                </Menu.Item>
            </Menu.Group>
            <Menu.Item onClick={() => {}}>Test item after group</Menu.Item>
        </Menu>
    );
};

export const TestMenuItem = (props: Partial<MenuItemProps>) => {
    return (
        <Menu>
            <Menu.Item onClick={() => {}}>...</Menu.Item>
            <Menu.Item {...props} />
            <Menu.Item onClick={() => {}}>...</Menu.Item>
        </Menu>
    );
};

export const TestMenuItemWithIcons = (props: Partial<MenuItemProps>) => {
    return (
        <Menu>
            <Menu.Item onClick={() => {}}>...</Menu.Item>
            <Menu.Item
                iconStart={<Icon data={Gear} size={16} />}
                iconEnd={<Icon data={CircleExclamationFill} size={16} />}
                {...props}
            />
            <Menu.Item onClick={() => {}}>...</Menu.Item>
        </Menu>
    );
};
