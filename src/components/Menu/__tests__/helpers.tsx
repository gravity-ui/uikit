import {CircleExclamationFill, Gear} from '@gravity-ui/icons';

import {Icon} from '../../Icon';
import {Menu} from '../Menu';
import type {MenuGroupProps, MenuItemProps, MenuProps} from '../Menu';

export type TestMenuProps = Partial<MenuProps>;

export const TestMenu = (props: TestMenuProps) => {
    return (
        <Menu {...props}>
            <Menu.Item onClick={() => {}}>First</Menu.Item>
            <Menu.Item onClick={() => {}} disabled>
                Second (unavailable)
            </Menu.Item>
        </Menu>
    );
};

export type TestMenuGroupProps = Partial<MenuGroupProps>;

export const TestMenuGroup = (props: TestMenuGroupProps) => {
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

export type TestMenuItemProps = Partial<MenuItemProps>;

export const TestMenuItem = (props: TestMenuItemProps) => {
    return (
        <Menu>
            <Menu.Item onClick={() => {}}>...</Menu.Item>
            <Menu.Item {...props} />
            <Menu.Item onClick={() => {}}>...</Menu.Item>
        </Menu>
    );
};

export type TestMenuItemWithIconsProps = Partial<MenuItemProps>;

export const TestMenuItemWithIcons = (props: TestMenuItemWithIconsProps) => {
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
