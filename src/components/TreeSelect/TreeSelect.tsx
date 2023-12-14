import React from 'react';

import {useForkRef, useUniqId} from '../../hooks';
import {
    ItemRenderer,
    ListBodyRenderer,
    ListContainerView,
    type ListItemId,
    bListRadiuses,
    computeItemSize,
    defaultItemRendererBuilder,
    scrollToListItem,
    useList,
    useListKeydown,
} from '../ListNext';
import {SelectControl} from '../Select/components';
import {SelectPopup} from '../Select/components/SelectPopup/SelectPopup';
import {Flex} from '../layout';
import {useMobile} from '../mobile';
import {block} from '../utils/cn';

import {useTreeSelectSelection} from './hooks/useTreeSelectSelection';
import type {RenderControlProps, TreeSelectProps} from './types';

import './TreeSelect.scss';

const b = block('tree-select');

export const TreeSelect = React.forwardRef(function TreeSelect<T>(
    {
        id,
        slotBeforeListBody,
        slotAfterListBody,
        size = 'm',
        items,
        defaultOpen,
        popupClassName,
        open: propsOpen,
        multiple,
        popupWidth,
        listContainerClassName,
        expandedItemsMap,
        defaultValue,
        virtualized,
        popupDisablePortal,
        groupAction = 'items-count',
        disabledItemsStateMap,
        value: propsValue,
        groupsBehavior = 'expandable',
        containerWrapper,
        onClose,
        onUpdate,
        getItemContent,
        getId,
        onOpenChange,
        renderControl,
        itemWrapper,
        renderItem: propsRenderItem,
    }: TreeSelectProps<T>,
    ref: React.Ref<HTMLButtonElement>,
) {
    const [mobile] = useMobile();
    const uniqId = useUniqId();
    const treeSelectId = id ?? uniqId;

    const controlWrapRef = React.useRef<HTMLDivElement>(null);
    const controlRef = React.useRef<HTMLElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const handleControlRef = useForkRef(ref, controlRef);

    const [{byId, flattenIdsOrder, groupsState, itemsState, lastItemId}, listState] = useList({
        items,
        expanded: expandedItemsMap,
        getId,
    });

    const {
        value,
        open,
        toggleOpen,
        handleClearValue,
        handleMultipleSelection,
        handleSingleSelection,
    } = useTreeSelectSelection({
        onUpdate,
        value: propsValue,
        defaultValue,
        defaultOpen,
        open: propsOpen,
        onClose,
        onOpenChange,
    });

    const lastSelectedItemId = value[value.length - 1];
    const expanded = expandedItemsMap || listState.expanded;
    const disabled = disabledItemsStateMap || listState.disabled;
    const selected = React.useMemo(
        () =>
            value.reduce<Record<ListItemId, boolean>>((acc, value) => {
                acc[value] = true;
                return acc;
            }, {}),
        [value],
    );

    const handleItemClick = React.useCallback(
        (id: ListItemId) => {
            if (listState.disabled[id]) return;

            listState.setActiveItemId(id);

            const isGroup = id in groupsState;

            if (isGroup && groupsBehavior === 'expandable') {
                // toggle group selection
                listState.setExpanded((state) => ({
                    ...state,
                    // by default all groups expanded
                    [id]: typeof state[id] === 'boolean' ? !state[id] : false,
                }));
            } else if (multiple) {
                handleMultipleSelection(id);
            } else {
                handleSingleSelection(id);
                toggleOpen(false);
            }
        },
        [
            groupsState,
            groupsBehavior,
            handleMultipleSelection,
            handleSingleSelection,
            listState,
            multiple,
            toggleOpen,
        ],
    );

    // restoring focus when popup opens
    React.useLayoutEffect(() => {
        if (open) {
            containerRef.current?.focus();

            const firstItemId = flattenIdsOrder[0];

            listState.setActiveItemId(lastSelectedItemId ?? firstItemId);

            if (lastSelectedItemId) {
                scrollToListItem(lastSelectedItemId, containerRef.current);
            }
        }
        // subscribe only in open event
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    useListKeydown({
        containerRef,
        activeItemId: listState.activeItemId,
        setActiveItemId: listState.setActiveItemId,
        onItemClick: handleItemClick,
        flattenIdsOrder,
        disabled,
    });

    const handleClose = React.useCallback(() => toggleOpen(false), [toggleOpen]);

    const getContainerNode = () => (
        <ListContainerView
            ref={containerRef}
            id={`list-${treeSelectId}`}
            className={listContainerClassName}
            virtualized={virtualized}
        >
            <ListBodyRenderer
                items={items}
                virtualized={virtualized}
                expanded={expanded}
                flattenIdsOrder={flattenIdsOrder}
                itemSize={(index) =>
                    computeItemSize(
                        size,
                        Boolean(
                            getItemContent(byId[flattenIdsOrder[index]], {
                                isLastItem: lastItemId === flattenIdsOrder[index],
                                id: flattenIdsOrder[index],
                                isGroup: flattenIdsOrder[index] in groupsState,
                            }).subtitle,
                        ),
                    )
                }
            >
                {(id) => (
                    <ItemRenderer
                        lastItemId={lastItemId}
                        size={size}
                        id={id}
                        byId={byId}
                        onItemClick={handleItemClick}
                        itemsState={itemsState}
                        groupsState={groupsState}
                        activeItemId={listState.activeItemId}
                        selected={selected}
                        disabled={disabled}
                        expanded={expanded}
                        renderItem={
                            propsRenderItem ||
                            defaultItemRendererBuilder({
                                groupsBehavior,
                                itemWrapper,
                                getItemContent,
                                groupAction,
                            })
                        }
                    />
                )}
            </ListBodyRenderer>
        </ListContainerView>
    );

    const controlProps: RenderControlProps = {
        open,
        toggleOpen,
        clearValue: handleClearValue,
        ref: handleControlRef,
        size,
        value,
        id: treeSelectId,
        activeItemId: listState.activeItemId,
    };

    const togglerNode = renderControl ? (
        renderControl(controlProps)
    ) : (
        <SelectControl
            {...controlProps}
            selectedOptionsContent={React.Children.toArray(
                value.map(
                    (id) =>
                        getItemContent(byId[id], {
                            id,
                            isGroup: id in groupsState,
                            isLastItem: lastItemId === id,
                        }).title,
                ),
            ).join(', ')}
            view="normal"
            pin="round-round"
            popupId={`tree-select-popup-${treeSelectId}`}
            selectId={`tree-select-${treeSelectId}`}
        />
    );

    return (
        <Flex direction="column" gap="5" ref={controlWrapRef} className={b()}>
            {togglerNode}
            <SelectPopup
                ref={controlWrapRef}
                className={b('popup', bListRadiuses({size}, popupClassName))}
                controlRef={controlRef}
                width={popupWidth}
                open={open}
                handleClose={handleClose}
                disablePortal={popupDisablePortal}
                virtualized={virtualized}
                mobile={mobile}
                id={`tree-select-popup-${treeSelectId}`}
            >
                {slotBeforeListBody}
                {containerWrapper
                    ? // the full list of properties will be updated as the component develops
                      containerWrapper(getContainerNode, {items})
                    : getContainerNode()}
                {slotAfterListBody}
            </SelectPopup>
        </Flex>
    );
}) as <T>(props: TreeSelectProps<T> & {ref?: React.Ref<HTMLDivElement>}) => React.ReactElement;
