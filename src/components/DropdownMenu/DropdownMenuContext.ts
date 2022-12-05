import {createContext} from 'react';

interface Context<T> {
    toggle(open?: boolean): void;
    data: T | undefined;
}

export const DropdownMenuContext = createContext<Context<unknown>>({
    toggle() {},
    data: undefined,
});

DropdownMenuContext.displayName = 'DropdownMenu.Context';
