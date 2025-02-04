import * as React from 'react';

export interface TabListContextProps {
    value?: string;
    onUpdate?: (value: string) => void;
    id?: string;
    isFocused?: boolean;
}
export const TabListContext = React.createContext<TabListContextProps>({});

TabListContext.displayName = 'TabListContext';
