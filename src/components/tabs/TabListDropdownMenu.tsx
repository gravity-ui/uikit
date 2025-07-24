import * as React from 'react';

import {
    unstable_Menu as Menu,
    unstable_MenuItem as MenuItem,
    unstable_MenuTrigger as MenuTrigger,
} from '../../unstable';

import {bTabListDropdownMenu} from './constants';
import type {TabsDropdownMenuProps} from './types';

import './TabListDropdownMenu.scss';

export function TabsDropdownMenu({children}: TabsDropdownMenuProps) {
    if (!React.Children.count(children)) {
        return null;
    }

    return (
        <Menu trigger={<MenuTrigger className={bTabListDropdownMenu()} />}>
            {React.Children.map(children, (child, index) => (
                <MenuItem key={index} component="div">
                    {child}
                </MenuItem>
            ))}
        </Menu>
    );
}
