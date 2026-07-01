'use client';

import * as React from 'react';

import {useFocusWithin, useForkRef, useUniqId} from '../../hooks';
import {useDefaultProps} from '../theme/useDefaultProps';
import {warnOnce} from '../utils/warn';

import {TabListCollapseItem} from './TabListCollapseItem/TabListCollapseItem';
import {bTab} from './constants';
import {TabContext} from './contexts/TabContext';
import {useTabList} from './hooks/useTabList';
import {useTabListCollapsedChildren} from './hooks/useTabListCollapsedChildren';
import type {TabListProps} from './types';

import './TabList.scss';

export const TabList = React.forwardRef<HTMLDivElement, TabListProps>((rawProps, ref) => {
    const props = useDefaultProps('TabList', rawProps);
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

    const {renderTabs} = props;
    const {shownChildren} = collapsedChildrenResults;
    const shownTabs = renderTabs ? renderTabs(shownChildren) : undefined;

    // Dev-only validation of the `renderTabs` result: `warnOnce` already gates on
    // NODE_ENV and dedupes. We check the actual DOM (the element tree can't be validated
    // reliably — dnd libraries hide the `<Tab>` behind a render function).
    React.useEffect(() => {
        if (!renderTabs || !listRef.current) {
            return;
        }
        const tabClassName = bTab();
        const shownCount = Array.from(listRef.current.children).filter((child) =>
            child.classList.contains(tabClassName),
        ).length;
        if (shownCount !== shownChildren.length) {
            warnOnce(
                'TabList: `renderTabs` must render exactly one visible tab per received element ' +
                    '(preserve keys, no extra wrapper DOM around a tab). A wrapper element breaks ' +
                    'the `contentOverflow="collapse"` measurement.',
            );
        }
    });

    return (
        <TabContext.Provider value={innerContextValue}>
            <div ref={containerRef} {...tabListProps} {...focusWithinProps}>
                {collapseEnabled ? (
                    <React.Fragment>
                        {shownTabs ?? shownChildren}
                        <TabListCollapseItem
                            ref={collapsedChildrenResults.collapseItemRef}
                            triggerChild={collapsedChildrenResults.triggerChild}
                            moreLabel={props.moreLabel}
                            size={props.size}
                        >
                            {collapsedChildrenResults.collapsedChildren}
                        </TabListCollapseItem>
                    </React.Fragment>
                ) : (
                    (shownTabs ?? props.children)
                )}
            </div>
        </TabContext.Provider>
    );
});

TabList.displayName = 'TabList';
