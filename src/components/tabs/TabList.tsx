'use client';

import * as React from 'react';

import {useFocusWithin, useUniqId} from '../../hooks';

import {TabContext} from './contexts/TabContext';
import {useTabList} from './hooks/useTabList';
import type {TabListProps} from './types';

import './TabList.scss';

export const TabList = React.forwardRef<HTMLDivElement, TabListProps>((props, ref) => {
    const tabContext = React.useContext(TabContext);
    const id = useUniqId();
    const tabListProps = useTabList(props);
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
            <div ref={ref} {...tabListProps} {...focusWithinProps}>
                {props.children}
            </div>
        </TabContext.Provider>
    );
});

TabList.displayName = 'TabList';
