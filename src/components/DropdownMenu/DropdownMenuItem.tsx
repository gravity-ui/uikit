import React, {MouseEventHandler, useCallback, useContext} from 'react';
import {Menu} from '../Menu';
import {DropdownMenuContext} from './DropdownMenuContext';
import type {DropdownMenuItem as DropdownMenuItemType} from './types';

type Props<T> = DropdownMenuItemType<T>;

export const DropdownMenuItem = <T,>({text, action, ...props}: Props<T>) => {
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
            {text}
        </Menu.Item>
    );
};

DropdownMenuItem.displayName = 'DropdownMenu.Item';
