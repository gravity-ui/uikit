import React from 'react';

export const TabsContext = React.createContext<{activeTabId: string | undefined}>({
    activeTabId: undefined,
});

TabsContext.displayName = 'TabsContext';
