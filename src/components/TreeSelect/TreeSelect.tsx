'use client';

import React from 'react';

import {useFocusWithin, useForkRef, useUniqId} from '../../hooks';
import {SelectControl} from '../Select/components';
import {SelectPopup} from '../Select/components/SelectPopup/SelectPopup';
import {TreeList} from '../TreeList';
import type {TreeListOnItemClick, TreeListRenderItem} from '../TreeList/types';
import {useMobile} from '../mobile';
import {ListItemView, useList} from '../useList';
import {block} from '../utils/cn';
import type {CnMods} from '../utils/cn';

import {useTreeSelectSelection, useValue} from './hooks/useTreeSelectSelection';
import type {TreeSelectProps, TreeSelectRenderControlProps} from './types';

import './TreeSelect.scss';

const b = block('tree-select');

const defaultItemRenderer: TreeListRenderItem<unknown> = (renderState) => {
    return <ListItemView {...renderState.props} {...renderState.renderContainerProps} />;
};

export const TreeSelect = React.forwardRef(function TreeSelect<T>(
    {
        id,
        qa,
        title,
        placement,
        slotBeforeListBody,
        slotAfterListBody,
        size = 'm',
        defaultOpen,
        width,
        containerRef: propsContainerRef,
        className,
        containerClassName,
        popupClassName,
        open: propsOpen,
        multiple,
        popupWidth,
        popupDisablePortal,
        items,
        value: propsValue,
        defaultValue,
        withExpandedState = true,
        defaultExpandedState = 'expanded',
        disableDefaultItemClickBehavior,
        onClose,
        onOpenChange,
        onUpdate,
        renderControl,
        renderItem = defaultItemRenderer as TreeListRenderItem<T>,
        renderContainer,
        mapItemDataToProps,
        onFocus,
        onBlur,
        getItemId,
        onItemClick,
    }: TreeSelectProps<T>,
    ref: React.Ref<HTMLButtonElement>,
) {
    const mobile = useMobile();
    const uniqId = useUniqId();
    const treeSelectId = id ?? uniqId;
    const popupId = `tree-select-popup-${treeSelectId}`;

    const controlWrapRef = React.useRef<HTMLDivElement>(null);
    const controlRef = React.useRef<HTMLElement>(null);
    const containerRefLocal = React.useRef<HTMLDivElement>(null);
    const containerRef = propsContainerRef ?? containerRefLocal;

    const handleControlRef = useForkRef(ref, controlRef);

    const {value, setInnerValue, selected} = useValue({
        value: propsValue,
        defaultValue,
    });

    const list = useList({
        controlledState: {
            selectedById: selected,
        },
        items,
        getItemId,
        defaultExpandedState,
        withExpandedState,
    });

    const {open, toggleOpen, handleClearValue, handleMultipleSelection, handleSingleSelection} =
        useTreeSelectSelection({
            value,
            setInnerValue,
            onUpdate: (ids) => {
                onUpdate?.(ids, list);
            },
            defaultOpen,
            open: propsOpen,
            onClose,
            onOpenChange,
        });

    const handleItemClick = React.useMemo(() => {
        if (disableDefaultItemClickBehavior && !onItemClick) {
            return undefined;
        }

        const handler: TreeListOnItemClick<T> = (payload, e) => {
            const {list, id} = payload;

            if (list.state.disabledById[id]) return;

            if (!disableDefaultItemClickBehavior) {
                // always activate selected item
                list.state.setActiveItemId(id);

                const isGroup = list.state.expandedById && id in list.state.expandedById;

                if (isGroup && list.state.setExpanded) {
                    list.state.setExpanded((prvState) => ({
                        ...prvState,
                        [id]: !prvState[id],
                    }));
                } else if (multiple) {
                    handleMultipleSelection(id);
                } else {
                    handleSingleSelection(id);
                }
            }

            onItemClick?.(payload, e);
        };

        return handler;
    }, [
        multiple,
        disableDefaultItemClickBehavior,
        onItemClick,
        handleMultipleSelection,
        handleSingleSelection,
    ]);

    // restoring focus when popup opens
    React.useLayoutEffect(() => {
        if (open) {
            containerRef.current?.focus();
        }

        return () => list.state.setActiveItemId(undefined); // reset active item on popup close
        // subscribe only in open event
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const handleClose = React.useCallback(() => toggleOpen(false), [toggleOpen]);

    const {focusWithinProps} = useFocusWithin({
        onFocusWithin: onFocus,
        onBlurWithin: React.useCallback(
            (e: React.FocusEvent) => {
                onBlur?.(e);
                handleClose();
            },
            [handleClose, onBlur],
        ),
    });

    const controlProps: TreeSelectRenderControlProps<T> = {
        list,
        open,
        toggleOpen,
        clearValue: handleClearValue,
        ref: handleControlRef,
        size,
        value,
        id: treeSelectId,
        activeItemId: list.state.activeItemId,
        title,
    };

    const togglerNode = renderControl ? (
        renderControl(controlProps)
    ) : (
        <SelectControl
            {...controlProps}
            selectedOptionsContent={React.Children.toArray(
                value.map((itemId) => mapItemDataToProps(list.structure.itemsById[itemId]).title),
            ).join(', ')}
            view="normal"
            pin="round-round"
            popupId={popupId}
            selectId={treeSelectId}
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
        <div
            ref={controlWrapRef}
            {...focusWithinProps}
            className={b(mods, className)}
            style={inlineStyles}
        >
            {togglerNode}
            <SelectPopup
                ref={controlWrapRef}
                className={b('popup', {size}, popupClassName)}
                controlRef={controlRef}
                width={popupWidth}
                placement={placement}
                open={open}
                handleClose={handleClose}
                disablePortal={popupDisablePortal}
                mobile={mobile}
                id={popupId}
            >
                {slotBeforeListBody}

                <TreeList<T>
                    list={list}
                    size={size}
                    className={b('list', containerClassName)}
                    qa={qa}
                    multiple={multiple}
                    id={`list-${treeSelectId}`}
                    containerRef={containerRef}
                    onItemClick={handleItemClick}
                    disableDefaultItemClickBehavior
                    renderContainer={renderContainer}
                    mapItemDataToProps={mapItemDataToProps}
                    renderItem={renderItem ?? defaultItemRenderer}
                />

                {slotAfterListBody}
            </SelectPopup>
        </div>
    );
}) as <T, P extends {} = {}>(
    props: TreeSelectProps<T, P> & {ref?: React.Ref<HTMLDivElement>},
) => React.ReactElement;
