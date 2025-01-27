'use client';

import * as React from 'react';

import {TabContext} from './contexts/TabContext';

export type TabProviderProps = React.PropsWithChildren<{
    value?: string;
}>;

export const TabProvider = ({value: activeTabId, children}: TabProviderProps) => {
    const value = React.useMemo(() => ({activeTabId}), [activeTabId]);
    return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
};
