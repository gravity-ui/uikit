'use client';
import * as React from 'react';

export interface MenuItemContextProps {
    setHasFocusInside: (hasFocusInside: boolean) => void;
}

export const MenuItemContext = React.createContext<MenuItemContextProps | null>(null);

MenuItemContext.displayName = 'MenuItemContext';
