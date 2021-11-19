import React from 'react';
import {MenuItemProps} from '../Menu';

export type DropdownMenuItemAction<T> = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    data?: T,
) => void;

export interface DropdownMenuItem<T> extends Omit<MenuItemProps, 'onClick' | 'children'> {
    text: React.ReactNode;
    action: DropdownMenuItemAction<T>;
    hidden?: boolean;
}

export type DropdownMenuItemMixed<T> = DropdownMenuItem<T> | Array<DropdownMenuItem<T>>;
