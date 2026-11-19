'use client';
import * as React from 'react';

interface Context<T> {
    toggle(open?: boolean): void;
    data: T | undefined;
}

export const DropdownMenuContext = React.createContext<Context<unknown>>({
    toggle() {},
    data: undefined,
});

DropdownMenuContext.displayName = 'DropdownMenu.Context';
