'use client';
import * as React from 'react';

import type {MenuSize} from './types';

export interface MenuContextProps {
    size: MenuSize;
    activeIndex: number | null;
    floatingParentId: string | null;
    getItemProps: (userProps?: React.HTMLProps<HTMLElement>) => Record<string, unknown>;
    inline: boolean;
}

export const MenuContext = React.createContext<MenuContextProps | null>(null);

MenuContext.displayName = 'MenuContext';
