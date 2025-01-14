import * as React from 'react';

export interface TabInnerContextProps {
    activeTabId: string | undefined;
    onUpdate: ((value: string) => void) | undefined;
}

export const TabInnerContext = React.createContext<TabInnerContextProps>({
    activeTabId: undefined,
    onUpdate: undefined,
});

TabInnerContext.displayName = 'TabInnerContext';
