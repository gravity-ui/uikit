'use client';

import * as React from 'react';

import {useUniqId} from '../../hooks';
import {useDefaultProps} from '../theme/useDefaultProps';

import {TabContext} from './contexts/TabContext';
import type {TabProviderProps} from './types';

export const TabProvider = (rawProps: TabProviderProps) => {
    const {value, onUpdate, children} = useDefaultProps('TabProvider', rawProps);
    const id = useUniqId();
    const contextValue = React.useMemo(
        () => ({value, onUpdate, id, isProvider: true}),
        [value, onUpdate, id],
    );
    return <TabContext.Provider value={contextValue}>{children}</TabContext.Provider>;
};
