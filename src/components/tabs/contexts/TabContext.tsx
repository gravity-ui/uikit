'use client';
import * as React from 'react';

export interface TabContextProps {
    id: string;
    value?: string;
    onUpdate?: (value: string) => void;
    isFocused?: boolean;
    isProvider?: boolean;
}
export const TabContext = React.createContext<TabContextProps | undefined>(undefined);

TabContext.displayName = 'TabContext';
