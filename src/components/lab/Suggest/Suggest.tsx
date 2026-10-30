'use client';

import * as React from 'react';

import {useForkRef, useIntersection, useLayoutEffect, useUniqId} from '../../../hooks';
import {useOpenState} from '../../../hooks/useSelect/useOpenState';
import {List, useListFocusOwner} from '../../List';
import type {ListItemActionEvent, ListItemContext, ListItemHelpers} from '../../List';
import {ListVirtualizationContext} from '../../List/VirtualizationContext';
import {LIST_ITEM_VIEW_MIN_HEIGHT} from '../../ListItemView/constants';
import {Loader} from '../../Loader';
import {Popup} from '../../Popup';
import {TextInput} from '../../controls';
import {block} from '../../utils/cn';
import {warnOnce} from '../../utils/warn';

import type {SuggestOpenChangeReason, SuggestProps} from './types';
import {buildListItems, getItemId, getItemTextValue, isLoadingItem} from './utils';
import type {SuggestListItem} from './utils';

import './Suggest.scss';

const b = block('suggest');

function defaultRenderOption<T>(option: SuggestListItem<T>): React.ReactNode {
    return isLoadingItem(option) ? '' : (option.content ?? option.children ?? null);
}

// Option children are React content, not nested list sections.
const getItemChildren = () => undefined;

type SuggestComponent = <T>(
    props: SuggestProps<T> & {ref?: React.Ref<HTMLSpanElement>},
) => React.ReactElement;

export const Suggest = React.forwardRef(function Suggest<T>(
    {
        value,
        defaultValue,
        onUpdate,

        options,
        onOptionAction,
        renderOption,
        getOptionHeight,
        onLoadMore,

        popupWidth = 'fit',
        popupClassName,
        popupPlacement = 'bottom-start',
        disablePortal,

        loading = false,

        open: openProp,
        defaultOpen,
        onOpenChange,

        onActiveOptionUpdate,

        renderPopup,

        id: idProp,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledBy,
        'aria-describedby': ariaDescribedBy,
        'aria-details': ariaDetails,
        ...inputProps
    }: SuggestProps<T>,
    ref: React.Ref<HTMLSpanElement>,
) {
    const [anchorElement, setAnchorElement] = React.useState<HTMLSpanElement | null>(null);
    const handleRef = useForkRef(ref, setAnchorElement);
    const [fitWidth, setFitWidth] = React.useState<number>();
    const focusOwner = useListFocusOwner();
    const [loadingElement, setLoadingElement] = React.useState<HTMLElement | null>(null);
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue ?? '');
    const inputValue = value ?? uncontrolledValue;
    const items = React.useMemo(() => buildListItems(options, loading), [options, loading]);
    const itemHeight = LIST_ITEM_VIEW_MIN_HEIGHT[inputProps.size ?? 'm'];
    const getItemHeight = React.useCallback(
        (item: SuggestListItem<T>, index: number) =>
            isLoadingItem(item) ? itemHeight : (getOptionHeight?.(item, index) ?? itemHeight),
        [getOptionHeight, itemHeight],
    );
    const outerVirtualization = React.useContext(ListVirtualizationContext);
    const virtualization = React.useMemo(() => {
        if (!outerVirtualization) {
            return null;
        }
        if (outerVirtualization.estimateItemSize !== undefined) {
            warnOnce(
                '[Suggest] `estimateItemSize` of `ListVirtualizer` is not used: row height comes from `getOptionHeight` and the input size.',
            );
        }
        return {
            ...outerVirtualization,
            estimateItemSize: (ctx: ListItemContext<SuggestListItem<T>>) =>
                getItemHeight(ctx.item, ctx.index),
        };
    }, [outerVirtualization, getItemHeight]);

    const autoId = useUniqId();
    const componentId = idProp || autoId;
    const popupId = `${componentId}-popup`;
    const listId = `${componentId}-list`;
    const listLabel =
        ariaLabel ??
        inputProps.controlProps?.['aria-label'] ??
        inputProps.label ??
        inputProps.placeholder;
    const listLabelledBy = ariaLabelledBy ?? inputProps.controlProps?.['aria-labelledby'];

    const {open, toggleOpen} = useOpenState({
        open: openProp,
        defaultOpen,
    });

    const isOpenControlled = openProp !== undefined;

    const setOpen = React.useCallback(
        (nextOpen: boolean, event?: Event, reason?: SuggestOpenChangeReason) => {
            if (nextOpen !== open) {
                onOpenChange?.(nextOpen, event, reason);
            }
            toggleOpen(nextOpen);
        },
        [open, toggleOpen, onOpenChange],
    );

    const hasContent = loading || Boolean(options?.length) || Boolean(renderPopup);
    const popupOpen = hasContent && open;

    const hasLoadMore = Boolean(onLoadMore);
    const onLoadMoreRef = React.useRef(onLoadMore);
    useLayoutEffect(() => {
        onLoadMoreRef.current = onLoadMore;
    }, [onLoadMore]);
    const handleLoadMore = React.useCallback(() => onLoadMoreRef.current?.(), []);

    useIntersection({
        element: popupOpen && hasLoadMore && options?.length ? loadingElement : null,
        onIntersect: handleLoadMore,
    });

    const {onKeyDown: onListKeyDown, ...listInputProps} = focusOwner.getInputProps();

    useLayoutEffect(() => {
        if (popupWidth === 'fit' && anchorElement && open) {
            setFitWidth(anchorElement.offsetWidth);
        }
    }, [popupWidth, anchorElement, open]);

    const popupStyle: React.CSSProperties = (() => {
        if (popupWidth === 'fit') {
            return fitWidth === undefined ? {} : {width: fitWidth};
        }
        if (popupWidth === 'auto') {
            return {width: 'auto'};
        }
        if (typeof popupWidth === 'number' && Number.isFinite(popupWidth) && popupWidth > 0) {
            return {width: popupWidth};
        }
        return {};
    })();

    const handleValueChange = React.useCallback(
        (newValue: string) => {
            if (value === undefined) {
                setUncontrolledValue(newValue);
            }
            onUpdate?.(newValue);
            if (!isOpenControlled) {
                setOpen(Boolean(newValue), undefined, 'input-change');
            }
        },
        [value, onUpdate, isOpenControlled, setOpen],
    );

    const handleInputClick = React.useCallback(
        (e: React.MouseEvent<HTMLInputElement>) => {
            if (!open) {
                setOpen(true, e.nativeEvent, 'click');
            }
            inputProps.controlProps?.onClick?.(e);
        },
        [open, setOpen, inputProps],
    );

    const handleInputKeyDown = React.useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            const {key} = e;

            if (popupOpen) {
                onListKeyDown?.(e);
            }

            if (!open && (key === 'ArrowDown' || key === 'ArrowUp')) {
                e.preventDefault();
                setOpen(true, e.nativeEvent, 'list-navigation');
            }

            inputProps.onKeyDown?.(e);
        },
        [open, popupOpen, setOpen, inputProps, onListKeyDown],
    );

    const handleOptionAction = React.useCallback(
        (id: string, option: SuggestListItem<T>, event: ListItemActionEvent) => {
            if (isLoadingItem(option)) {
                return;
            }
            onOptionAction?.(id, option, event);
            setOpen(false, event.nativeEvent, 'option-action');
        },
        [onOptionAction, setOpen],
    );

    const renderItem = React.useCallback(
        (ctx: ListItemContext<SuggestListItem<T>>, helpers: ListItemHelpers) => {
            if (isLoadingItem(ctx.item)) {
                return (
                    <div
                        {...helpers.getItemProps({
                            className: b('loader'),
                            ref: setLoadingElement,
                            style: {height: getItemHeight(ctx.item, ctx.index)},
                        })}
                    >
                        <Loader />
                    </div>
                );
            }
            const height = getOptionHeight ? getItemHeight(ctx.item, ctx.index) : undefined;
            return (
                <List.ItemView
                    {...helpers.getItemProps({
                        style: height === undefined ? undefined : {height, minHeight: height},
                        'data-qa': ctx.item.qa,
                    })}
                    {...helpers.getItemViewProps()}
                >
                    {renderOption
                        ? renderOption(ctx.item, ctx.state.active, ctx.index)
                        : ctx.content}
                </List.ItemView>
            );
        },
        [getOptionHeight, getItemHeight, renderOption],
    );

    const renderPopupContent = () => {
        if (loading && !options?.length) {
            return (
                <div className={b('loader')} style={{height: itemHeight}}>
                    <Loader />
                </div>
            );
        }

        if (!options?.length && !renderPopup) {
            return null;
        }

        const list = options?.length ? (
            <ListVirtualizationContext.Provider value={virtualization}>
                <List<SuggestListItem<T>>
                    id={listId}
                    className={b('list')}
                    aria-label={listLabel}
                    aria-labelledby={listLabelledBy}
                    size={inputProps.size}
                    items={items}
                    getItemId={getItemId}
                    getItemChildren={getItemChildren}
                    getItemContent={defaultRenderOption}
                    getItemTextValue={getItemTextValue}
                    focusOwner={focusOwner}
                    onActiveItemUpdate={onActiveOptionUpdate}
                    onItemAction={handleOptionAction}
                    renderItem={renderItem}
                />
            </ListVirtualizationContext.Provider>
        ) : null;

        if (renderPopup) {
            return renderPopup({list});
        }

        return list;
    };

    return (
        <React.Fragment>
            <TextInput
                autoComplete={false}
                {...inputProps}
                ref={handleRef}
                id={componentId}
                value={inputValue}
                onUpdate={handleValueChange}
                onKeyDown={handleInputKeyDown}
                controlProps={{
                    ...inputProps.controlProps,
                    'aria-label': ariaLabel ?? inputProps.controlProps?.['aria-label'],
                    'aria-labelledby':
                        ariaLabelledBy ?? inputProps.controlProps?.['aria-labelledby'],
                    'aria-describedby':
                        ariaDescribedBy ?? inputProps.controlProps?.['aria-describedby'],
                    'aria-details': ariaDetails ?? inputProps.controlProps?.['aria-details'],
                    onClick: handleInputClick,
                    ...listInputProps,
                    'aria-expanded': popupOpen,
                    'aria-autocomplete': 'list',
                }}
            />
            <Popup
                placement={popupPlacement}
                disablePortal={disablePortal}
                qa="suggest-popup"
                id={popupId}
                open={popupOpen}
                onOpenChange={setOpen}
                anchorElement={anchorElement}
                className={b('popup', popupClassName)}
                style={popupStyle}
                returnFocus={false}
            >
                {popupOpen ? renderPopupContent() : null}
            </Popup>
        </React.Fragment>
    );
}) as SuggestComponent;
