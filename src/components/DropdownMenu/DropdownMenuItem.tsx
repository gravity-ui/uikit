import React, {MouseEventHandler, useCallback, useContext} from 'react';
import {Menu, MenuItemProps} from '../Menu';
import {DropdownMenuContext} from './DropdownMenuContext';
import type {DropdownMenuItemRequiredProps} from './types';

type Props<T> = Omit<MenuItemProps, 'onClick'> & Partial<DropdownMenuItemRequiredProps<T>>;

export const DropdownMenuItem = <T,>({text, children, action, ...props}: Props<T>) => {
    const {toggle, data} = useContext(DropdownMenuContext);
    const onClick: MouseEventHandler<HTMLElement> = useCallback(
        (event) => {
            action?.(event, data as unknown as T);
            toggle(false);
        },
        [action, data, toggle],
    );

    return (
        <Menu.Item onClick={onClick} {...props}>
            {text || children}
        </Menu.Item>
    );
};

DropdownMenuItem.displayName = 'DropdownMenu.Item';
