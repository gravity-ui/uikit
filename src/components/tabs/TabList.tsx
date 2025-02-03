'use client';

import * as React from 'react';

import {useUniqId} from '../../hooks';

import {TabListContext} from './contexts/TabListContext';
import {useTabList} from './hooks/useTabList';
import type {TabListProps} from './types';

import './TabList.scss';

export const TabList = React.forwardRef<HTMLDivElement, TabListProps>((props, ref) => {
    const id = useUniqId();
    const tabListProps = useTabList(props, id);

    const contextValue = React.useMemo(
        () => ({value: props.value, onUpdate: props.onUpdate, id}),
        [props.value, props.onUpdate, id],
    );

    return (
        <div ref={ref} {...tabListProps}>
            <TabListContext.Provider value={contextValue}>{props.children}</TabListContext.Provider>
        </div>
    );
});

TabList.displayName = 'TabList';
