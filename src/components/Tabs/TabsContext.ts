import {createContext} from 'react';

export const TabsContext = createContext<{activeTabId: string | undefined}>({
    activeTabId: undefined,
});

TabsContext.displayName = 'TabsContext';
