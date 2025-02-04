'use client';

import * as React from 'react';

import {useUniqId} from '../../hooks';

import {TabContext} from './contexts/TabContext';
import type {TabProviderProps} from './types';

export const TabProvider = ({value, onUpdate, children}: TabProviderProps) => {
    const id = useUniqId();
    const contextValue = React.useMemo(
        () => ({value, onUpdate, id, isProvider: true}),
        [value, onUpdate, id],
    );
    return <TabContext.Provider value={contextValue}>{children}</TabContext.Provider>;
};
