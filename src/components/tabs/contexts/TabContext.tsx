import * as React from 'react';

export interface TabContextProps {
    value?: string;
    onUpdate?: (value: string) => void;
    id?: string;
}
export const TabContext = React.createContext<TabContextProps>({});

TabContext.displayName = 'TabContext';
