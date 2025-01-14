import * as React from 'react';

export interface TabContextProps {
    activeTabId: string | undefined;
}
export const TabContext = React.createContext<TabContextProps>({
    activeTabId: undefined,
});

TabContext.displayName = 'TabsContext';
