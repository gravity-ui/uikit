import React from 'react';

import {useForkRef, useUniqId} from '../../hooks';
import {SelectControl} from '../Select/components';
import {SelectPopup} from '../Select/components/SelectPopup/SelectPopup';
import {borderRadius} from '../borderRadius';
import {Flex} from '../layout';
import {useMobile} from '../mobile';
import {
    type ListItemId,
    ListItemView,
    getItemRenderState,
    isKnownStructureGuard,
    scrollToListItem,
    useList,
    useListKeydown,
    useListState,
} from '../useList';
import {type CnMods, block} from '../utils/cn';

import {TreeListContainer} from './components/TreeListContainer/TreeListContainer';
import {useTreeSelectSelection, useValue} from './hooks/useTreeSelectSelection';
import type {RenderControlProps, TreeSelectProps} from './types';

import './TreeSelect.scss';

const b = block('tree-select');

export const TreeSelect = React.forwardRef(function TreeSelect<T>(
    props: TreeSelectProps<T>,
    ref: React.Ref<HTMLButtonElement>,
) {
    const {
        id,
        slotBeforeListBody,
        slotAfterListBody,
        size = 'm',
        items,
        defaultOpen,
        className,
        width,
        popupClassName,
        open: propsOpen,
        multiple,
        popupWidth,
        expandedById,
        disabledById,
        activeItemId,
        defaultValue,
        popupDisablePortal,
        groupsBehavior = 'expandable',
        value: propsValue,
        onClose,
        onUpdate,
        getId,
        onOpenChange,
        renderControl,
        renderItem,
        renderContainer: RenderContainer = TreeListContainer,
        onItemClick,
    } = props;

    const [mobile] = useMobile();
    const uniqId = useUniqId();
    const treeSelectId = id ?? uniqId;

    const controlWrapRef = React.useRef<HTMLDivElement>(null);
    const controlRef = React.useRef<HTMLElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const handleControlRef = useForkRef(ref, controlRef);

    const {value, setInnerValue, selected} = useValue({
        value: propsValue,
        defaultValue,
    });

    const listState = useListState({
        expandedById,
        disabledById,
        activeItemId,
        selectedById: selected,
    });

    const listParsedState = useList({
        items,
        expandedById: listState.expandedById,
        getId,
    });

    const wrappedOnUpdate = React.useCallback(
        (ids: ListItemId[]) =>
            onUpdate?.(
                ids,
                ids.map((id) => listParsedState.byId[id]),
            ),
        [listParsedState.byId, onUpdate],
    );

    const {open, toggleOpen, handleClearValue, handleMultipleSelection, handleSingleSelection} =
        useTreeSelectSelection({
            setInnerValue,
            value,
            onUpdate: wrappedOnUpdate,
            defaultOpen,
            open: propsOpen,
            onClose,
            onOpenChange,
        });

    const handleItemClick = React.useCallback(
        (id: ListItemId) => {
            // onItemClick = disabled - switch off default click behavior
            if (onItemClick === 'disabled') return undefined;

            const defaultHandleClick = () => {
                if (listState.disabledById[id]) return;

                // always activate selected item
                listState.setActiveItemId(id);

                const isGroup = id in listParsedState.groupsState;

                if (isGroup && groupsBehavior === 'expandable') {
                    listState.setExpanded((state) => ({
                        ...state,
                        // toggle expanded state by id, by default all groups expanded
                        [id]: typeof state[id] === 'boolean' ? !state[id] : false,
                    }));
                } else if (multiple) {
                    handleMultipleSelection(id);
                } else {
                    handleSingleSelection(id);
                    toggleOpen(false);
                }
            };

            if (onItemClick) {
                return onItemClick(defaultHandleClick, {
                    id,
                    isGroup: id in listParsedState.groupsState,
                    isLastItem:
                        listParsedState.flattenIdsOrder[
                            listParsedState.flattenIdsOrder.length - 1
                        ] === id,
                    disabled: listState.disabledById[id],
                });
            }

            return defaultHandleClick();
        },
        [
            onItemClick,
            listState,
            listParsedState.groupsState,
            listParsedState.flattenIdsOrder,
            groupsBehavior,
            multiple,
            handleMultipleSelection,
            handleSingleSelection,
            toggleOpen,
        ],
    );

    // restoring focus when popup opens
    React.useLayoutEffect(() => {
        if (open) {
            const lastSelectedItemId = value[value.length - 1];
            containerRef.current?.focus();

            const firstItemId = listParsedState.flattenIdsOrder[0];

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
        onItemClick: handleItemClick,
        ...listParsedState,
        ...listState,
    });

    const handleClose = React.useCallback(() => toggleOpen(false), [toggleOpen]);

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
                value.map((id) => {
                    if ('renderControlContent' in props) {
                        return props.renderControlContent(listParsedState.byId[id]).title;
                    }

                    const items = listParsedState.byId[id];

                    if (isKnownStructureGuard(items)) {
                        return items.title;
                    }

                    return items as string;
                }),
            ).join(', ')}
            view="normal"
            pin="round-round"
            popupId={`tree-select-popup-${treeSelectId}`}
            selectId={`tree-select-${treeSelectId}`}
        />
    );

    const mods: CnMods = {
        ...(width === 'max' && {width}),
    };

    const inlineStyles: React.CSSProperties = {};

    if (typeof width === 'number') {
        inlineStyles.width = width;
    }

    return (
        <Flex
            direction="column"
            gap="5"
            ref={controlWrapRef}
            className={b(mods, className)}
            style={inlineStyles}
        >
            {togglerNode}
            <SelectPopup
                ref={controlWrapRef}
                className={b('popup', borderRadius({size}, popupClassName))}
                controlRef={controlRef}
                width={popupWidth}
                open={open}
                handleClose={handleClose}
                disablePortal={popupDisablePortal}
                mobile={mobile}
                id={`tree-select-popup-${treeSelectId}`}
            >
                {slotBeforeListBody}
                <RenderContainer
                    size={size}
                    containerRef={containerRef}
                    id={`list-${treeSelectId}`}
                    {...listParsedState}
                    {...listState}
                    renderItem={(id, renderContextProps) => {
                        const [item, state, context] = getItemRenderState({
                            id,
                            size,
                            onItemClick: handleItemClick,
                            ...listParsedState,
                            ...listState,
                        });

                        // assign components scope logic
                        state.hasSelectionIcon = context.groupState
                            ? groupsBehavior === 'selectable'
                            : undefined;

                        if (renderItem) {
                            return renderItem(item, state, context, renderContextProps);
                        }

                        const itemData = listParsedState.byId[id];

                        return (
                            <ListItemView
                                {...state}
                                // eslint-disable-next-line no-nested-ternary
                                {...('renderControlContent' in props
                                    ? props.renderControlContent(itemData)
                                    : isKnownStructureGuard(itemData)
                                    ? itemData
                                    : {title: itemData as string})}
                                {...renderContextProps}
                            />
                        );
                    }}
                />
                {slotAfterListBody}
            </SelectPopup>
        </Flex>
    );
}) as <T>(props: TreeSelectProps<T> & {ref?: React.Ref<HTMLDivElement>}) => React.ReactElement;
