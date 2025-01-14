'use client';

import * as React from 'react';

import {useFocusWithin, useForkRef, useUniqId} from '../../hooks';
import {useOpenState} from '../../hooks/useSelect/useOpenState';
import {SelectControl} from '../Select/components';
import {SelectPopup} from '../Select/components/SelectPopup/SelectPopup';
import {TreeList} from '../TreeList';
import type {TreeListRenderItem} from '../TreeList/types';
import {OuterAdditionalContent} from '../controls/common/OuterAdditionalContent/OuterAdditionalContent';
import {errorPropsMapper} from '../controls/utils';
import {useMobile} from '../mobile';
import {ListItemView, getListItemClickHandler, useList} from '../useList';
import type {ListOnItemClick} from '../useList';
import {block} from '../utils/cn';
import type {CnMods} from '../utils/cn';

import {useControlledValue} from './hooks/useControlledValue';
import type {TreeSelectProps, TreeSelectRenderControlProps} from './types';

import './TreeSelect.scss';

const b = block('tree-select');

const defaultItemRenderer: TreeListRenderItem<unknown> = (renderState) => {
    return <ListItemView {...renderState.props} {...renderState.renderContainerProps} />;
};

export const TreeSelect = React.forwardRef(function TreeSelect<T, P extends {} = {}>(
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
        placeholder,
        disabled = false,
        withExpandedState = true,
        defaultExpandedState = 'expanded',
        hasClear,
        errorMessage: propsErrorMessage,
        errorPlacement: propsErrorPlacement,
        validationState: propsValidationState,
        onClose,
        onOpenChange,
        onUpdate,
        renderControl,
        renderItem = defaultItemRenderer as TreeListRenderItem<T, P>,
        renderContainer,
        mapItemDataToContentProps,
        onFocus,
        onBlur,
        getItemId,
        onItemClick,
    }: TreeSelectProps<T, P>,
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

    const {errorMessage, errorPlacement, validationState} = errorPropsMapper({
        errorMessage: propsErrorMessage,
        errorPlacement: propsErrorPlacement || 'outside',
        validationState: propsValidationState,
    });
    const errorMessageId = useUniqId();

    const isErrorStateVisible = validationState === 'invalid';
    const isErrorMsgVisible =
        isErrorStateVisible && Boolean(errorMessage) && errorPlacement === 'outside';
    const isErrorIconVisible =
        isErrorStateVisible && Boolean(errorMessage) && errorPlacement === 'inside';

    const handleControlRef = useForkRef(ref, controlRef);

    const {toggleOpen, open} = useOpenState({
        defaultOpen,
        onClose,
        onOpenChange,
        open: propsOpen,
    });

    const {value, selectedById, setSelected} = useControlledValue({
        value: propsValue,
        defaultValue,
        onUpdate,
    });

    const list = useList({
        controlledState: {
            selectedById,
            setSelected,
        },
        items,
        getItemId,
        defaultExpandedState,
        withExpandedState,
    });

    const handleItemClick = React.useMemo(() => {
        if (onItemClick === null) {
            return undefined;
        }

        const handler: ListOnItemClick = (arg, e) => {
            const payload = {id: arg.id, list};

            if (onItemClick) {
                onItemClick?.(payload, e);
            } else {
                const baseOnClick = getListItemClickHandler({list, multiple});

                baseOnClick(payload, e);

                const isGroup = list.state.expandedById && arg.id in list.state.expandedById;

                if (!multiple && !isGroup) {
                    toggleOpen(false);
                }
            }
        };

        return handler;
    }, [onItemClick, list, multiple, toggleOpen]);

    // restoring focus when popup opens
    React.useLayoutEffect(() => {
        if (open) {
            // for some reason popup position on page may be wrong calculated. `preventScroll` prevent page gap in that cases
            containerRef.current?.focus({preventScroll: true});
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
        placeholder,
        toggleOpen,
        clearValue: () => list.state.setSelected({}),
        ref: handleControlRef,
        size,
        value,
        disabled,
        id: treeSelectId,
        activeItemId: list.state.activeItemId,
        title,
        errorMessage: isErrorIconVisible ? errorMessage : undefined,
        errorPlacement,
        validationState,
        hasClear,
        isErrorVisible: isErrorStateVisible,
    };

    const togglerNode = renderControl ? (
        renderControl(controlProps)
    ) : (
        <SelectControl
            {...controlProps}
            selectedOptionsContent={React.Children.toArray(
                value.map((itemId) =>
                    itemId in list.structure.itemsById
                        ? mapItemDataToContentProps(list.structure.itemsById[itemId]).title
                        : '',
                ),
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

                <TreeList<T, P>
                    list={list}
                    size={size}
                    className={b('list', containerClassName)}
                    qa={qa}
                    multiple={multiple}
                    id={`list-${treeSelectId}`}
                    containerRef={containerRef}
                    onItemClick={handleItemClick}
                    renderContainer={renderContainer}
                    mapItemDataToContentProps={mapItemDataToContentProps}
                    renderItem={renderItem ?? defaultItemRenderer}
                />

                {slotAfterListBody}
            </SelectPopup>
            <OuterAdditionalContent
                errorMessage={isErrorMsgVisible ? errorMessage : null}
                errorMessageId={errorMessageId}
            />
        </div>
    );
}) as <T, P extends {} = {}>(
    props: TreeSelectProps<T, P> & {ref?: React.Ref<HTMLDivElement>},
) => React.ReactElement;
