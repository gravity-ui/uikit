import React, {MouseEventHandler, ReactNode, useCallback, useContext} from 'react';
import {Menu, MenuItemProps} from '../Menu';
import {DropdownMenuContext} from './DropdownMenuContext';
import type {DropdownMenuItemAction} from './types';

type Props<T> = Omit<MenuItemProps, 'onClick'> & {
    action?: DropdownMenuItemAction<T>;
    /** `text` is override given `children` */
    text?: ReactNode;
};

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
