'use client';

import {AlertContext} from './AlertContext';
import type {AlertContextProviderProps} from './types';

export const AlertContextProvider = ({
    layout,
    actionsLayout,
    view,
    size,
    children,
}: AlertContextProviderProps) => {
    return (
        <AlertContext.Provider value={{layout, actionsLayout, view, size}}>
            {children}
        </AlertContext.Provider>
    );
};
