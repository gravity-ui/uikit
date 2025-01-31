import * as React from 'react';

export interface TabInnerContextProps {
    activeTabId?: string;
    onUpdate?: (value: string) => void;
    focusedIndex: number;
    setFocusedIndex?: (value: number) => void;
}

export const TabInnerContext = React.createContext<TabInnerContextProps>({
    activeTabId: undefined,
    onUpdate: undefined,
    focusedIndex: -1,
    setFocusedIndex: undefined,
});

TabInnerContext.displayName = 'TabInnerContext';
