'use client';

import * as React from 'react';

import {useFocusWithin, useForkRef, useUniqId} from '../../hooks';

import {TabListCollapseItem} from './TabListCollapseItem/TabListCollapseItem';
import {TabContext} from './contexts/TabContext';
import {useTabList} from './hooks/useTabList';
import {useTabListCollapsedChildren} from './hooks/useTabListCollapsedChildren';
import type {TabListProps} from './types';

import './TabList.scss';

export const TabList = React.forwardRef<HTMLDivElement, TabListProps>((props, ref) => {
    const tabContext = React.useContext(TabContext);
    const id = useUniqId();

    const listRef = React.useRef<HTMLDivElement>(null);
    const containerRef = useForkRef(ref, listRef);

    const value = tabContext?.value ?? props.value;

    const tabListProps = useTabList(props);

    const collapseEnabled = props.contentOverflow === 'collapse';

    const collapsedChildrenResults = useTabListCollapsedChildren(
        props.children,
        value,
        listRef,
        collapseEnabled,
    );

    const [isFocused, setIsFocused] = React.useState(false);

    const {focusWithinProps} = useFocusWithin({
        onFocusWithinChange: setIsFocused,
    });

    const innerContextValue = React.useMemo(
        () => ({
            value: value,
            onUpdate: tabContext?.onUpdate ?? props.onUpdate,
            id: tabContext?.id ?? id,
            isProvider: tabContext?.isProvider ?? false,
            isFocused,
        }),
        [tabContext, value, props.onUpdate, id, isFocused],
    );

    return (
        <TabContext.Provider value={innerContextValue}>
            <div ref={containerRef} {...tabListProps} {...focusWithinProps}>
                {collapseEnabled ? (
                    <React.Fragment>
                        {collapsedChildrenResults.shownChildren}
                        <TabListCollapseItem ref={collapsedChildrenResults.collapseItemRef}>
                            {collapsedChildrenResults.collapsedChildren}
                        </TabListCollapseItem>
                    </React.Fragment>
                ) : (
                    props.children
                )}
            </div>
        </TabContext.Provider>
    );
});

TabList.displayName = 'TabList';
