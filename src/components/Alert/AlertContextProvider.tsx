'use client';

import {AlertContext} from './AlertContext';
import type {AlertContextProviderProps} from './types';

export const AlertContextProvider = ({layout, view, children}: AlertContextProviderProps) => {
    return <AlertContext.Provider value={{layout, view}}>{children}</AlertContext.Provider>;
};
