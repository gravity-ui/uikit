import React from 'react';
import {MenuItemProps} from '../Menu';

export type DropdownMenuItemAction<T> = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    data?: T,
) => void;

type DropdownMenuItemRequiredProps<T> =
    | {
          text: React.ReactNode;
          action: DropdownMenuItemAction<T>;
          href?: string;
      }
    | {
          text: React.ReactNode;
          href: string;
          action?: DropdownMenuItemAction<T>;
      };

export type DropdownMenuItem<T = unknown> = Omit<MenuItemProps, 'onClick' | 'children'> &
    DropdownMenuItemRequiredProps<T> & {
        hidden?: boolean;
    };

export type DropdownMenuItemMixed<T> = DropdownMenuItem<T> | Array<DropdownMenuItem<T>>;

export type DropdownMenuSize = 's' | 'm' | 'l' | 'xl';
