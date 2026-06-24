'use client';

import * as React from 'react';

import type {DraggableProvided} from '@hello-pangea/dnd';
import {
    DragDropContext,
    Draggable,
    Droppable,
    useMouseSensor,
    useTouchSensor,
} from '@hello-pangea/dnd';

import {useFocusWithin, useForkRef, useUniqId} from '../../hooks';

import {TabListCollapseItem} from './TabListCollapseItem/TabListCollapseItem';
import {bTabList} from './constants';
import {TabContext} from './contexts/TabContext';
import {useTabList} from './hooks/useTabList';
import {useTabListCollapsedChildren} from './hooks/useTabListCollapsedChildren';
import {useTabListDnd} from './hooks/useTabListDnd';
import type {TabListProps, TabProps} from './types';

import './TabList.scss';

export const TabList = React.forwardRef<HTMLDivElement, TabListProps>((props, ref) => {
    const tabContext = React.useContext(TabContext);
    const id = useUniqId();

    const listRef = React.useRef<HTMLDivElement>(null);
    const containerRef = useForkRef(ref, listRef);

    const value = tabContext?.value ?? props.value;

    const tabListProps = useTabList(props);

    const collapseEnabled = props.contentOverflow === 'collapse';
    const dndEnabled = Boolean(props.sortable);

    const collapsedChildrenResults = useTabListCollapsedChildren(
        props.children,
        value,
        listRef,
        collapseEnabled,
    );

    const {handleDragEnd, handleDragStart} = useTabListDnd({
        shownChildren: collapsedChildrenResults.shownChildren,
        collapsedChildren: collapsedChildrenResults.collapsedChildren,
        onSortStart: props.onSortStart,
        onSortEnd: props.onSortEnd,
    });

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

    const collapseItem = collapseEnabled ? (
        <TabListCollapseItem
            ref={collapsedChildrenResults.collapseItemRef}
            triggerChild={collapsedChildrenResults.triggerChild}
            moreLabel={props.moreLabel}
            size={props.size}
        >
            {collapsedChildrenResults.collapsedChildren}
        </TabListCollapseItem>
    ) : null;

    const shownChildren = collapsedChildrenResults.shownChildren;

    const renderItem = React.useCallback(
        (child: React.ReactElement, provided: DraggableProvided) => {
            const tabChild = child as React.ReactElement<TabProps>;

            return React.cloneElement(tabChild, {
                provided,
                className: [tabChild.props.className, bTabList('dnd-item')]
                    .filter(Boolean)
                    .join(' '),
            });
        },
        [collapseEnabled, shownChildren.length],
    );

    if (dndEnabled) {
        return (
            <TabContext.Provider value={innerContextValue}>
                <DragDropContext
                    onDragEnd={handleDragEnd}
                    onDragStart={handleDragStart}
                    enableDefaultSensors={false}
                    sensors={[useMouseSensor, useTouchSensor]}
                >
                    <Droppable droppableId={id} direction="horizontal">
                        {(droppableProvided) => (
                            <div
                                ref={droppableProvided.innerRef}
                                {...droppableProvided.droppableProps}
                            >
                                <div ref={containerRef} {...tabListProps} {...focusWithinProps}>
                                    {shownChildren.map((child, index) => {
                                        const draggableId = String(child.key ?? index);

                                        return (
                                            <Draggable
                                                key={draggableId}
                                                draggableId={draggableId}
                                                index={index}
                                                disableInteractiveElementBlocking
                                            >
                                                {(provided) => renderItem(child, provided)}
                                            </Draggable>
                                        );
                                    })}
                                    {droppableProvided.placeholder}
                                    {collapseItem}
                                </div>
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </TabContext.Provider>
        );
    }

    return (
        <TabContext.Provider value={innerContextValue}>
            <div ref={containerRef} {...tabListProps} {...focusWithinProps}>
                {collapseEnabled ? (
                    <React.Fragment>
                        {collapsedChildrenResults.shownChildren}
                        {collapseItem}
                    </React.Fragment>
                ) : (
                    props.children
                )}
            </div>
        </TabContext.Provider>
    );
});

TabList.displayName = 'TabList';
