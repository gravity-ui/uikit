'use client';

import {AlertContext} from './AlertContext';
import type {AlertContextProviderProps} from './types';

export const AlertContextProvider = ({layout, view, size, children}: AlertContextProviderProps) => {
    return <AlertContext.Provider value={{layout, view, size}}>{children}</AlertContext.Provider>;
};
