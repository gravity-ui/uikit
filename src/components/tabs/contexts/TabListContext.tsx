import * as React from 'react';

export interface TabListContextProps {
    value?: string;
    onUpdate?: (value: string) => void;
    id?: string;
}
export const TabListContext = React.createContext<TabListContextProps>({});

TabListContext.displayName = 'TabListContext';
