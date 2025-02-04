'use client';

import * as React from 'react';

import {useFocusWithin, useUniqId} from '../../hooks';

import {TabListContext} from './contexts/TabListContext';
import {useTabList} from './hooks/useTabList';
import type {TabListProps} from './types';

import './TabList.scss';

export const TabList = React.forwardRef<HTMLDivElement, TabListProps>((props, ref) => {
    const id = useUniqId();
    const tabListProps = useTabList(props, id);
    const [isFocused, setIsFocused] = React.useState(false);

    const contextValue = React.useMemo(
        () => ({value: props.value, onUpdate: props.onUpdate, id, isFocused}),
        [props.value, props.onUpdate, id, isFocused],
    );

    const {focusWithinProps} = useFocusWithin({
        onFocusWithinChange: setIsFocused,
    });

    return (
        <div ref={ref} {...tabListProps} {...focusWithinProps}>
            <TabListContext.Provider value={contextValue}>{props.children}</TabListContext.Provider>
        </div>
    );
});

TabList.displayName = 'TabList';
