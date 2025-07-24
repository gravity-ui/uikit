'use client';

import * as React from 'react';

import {useFocusWithin, useForkRef, useUniqId} from '../../hooks';

import {TabContext} from './contexts/TabContext';
import {useTabList} from './hooks/useTabList';
import type {TabListProps} from './types';

import './TabList.scss';

export const TabList = React.forwardRef<HTMLDivElement, TabListProps>((props, ref) => {
    const tabContext = React.useContext(TabContext);
    const id = useUniqId();

    const listRef = React.useRef<HTMLDivElement>(null);
    const containerRef = useForkRef(ref, listRef);

    const {children, ...tabListProps} = useTabList(props, listRef);

    const [isFocused, setIsFocused] = React.useState(false);

    const {focusWithinProps} = useFocusWithin({
        onFocusWithinChange: setIsFocused,
    });

    const innerContextValue = React.useMemo(
        () => ({
            value: tabContext?.value ?? props.value,
            onUpdate: tabContext?.onUpdate ?? props.onUpdate,
            id: tabContext?.id ?? id,
            isProvider: tabContext?.isProvider ?? false,
            isFocused,
        }),
        [tabContext, props.value, props.onUpdate, id, isFocused],
    );

    return (
        <TabContext.Provider value={innerContextValue}>
            <div ref={containerRef} {...tabListProps} {...focusWithinProps}>
                {children}
            </div>
        </TabContext.Provider>
    );
});

TabList.displayName = 'TabList';
