'use client';

import * as React from 'react';

import {
    useControlledState,
    useFocusWithin,
    useForkRef,
    useIntersection,
    useLayoutEffect,
    useUniqId,
} from '../../../hooks';
import {List, useListFocusOwner} from '../../List';
import type {ListItemActionEvent, ListItemContext, ListItemHelpers} from '../../List';
import {
    ListVirtualizationContext,
    useListVirtualization,
    useListVirtualizationItemSize,
} from '../../List/VirtualizationContext';
import {LIST_ITEM_VIEW_MIN_HEIGHT} from '../../ListItemView/constants';
import {Loader} from '../../Loader';
import {Popup} from '../../Popup';
import {TextInput} from '../../controls';
import {block} from '../../utils/cn';
import {getMiddlewares} from '../../utils/popupMiddlewares';

import i18n from './i18n';
import type {SuggestProps} from './types';
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
    props: SuggestProps<T> & {ref?: React.Ref<HTMLElement>},
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

        popupWidth,
        popupClassName,
        popupPlacement = 'bottom-start',
        disablePortal,

        loading = false,

        open: openProp,
        defaultOpen,
        onOpenChange,

        onActiveOptionUpdate,

        renderControl,
        renderPopup,
        renderEmptyOptions,

        id: idProp,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledBy,
        'aria-describedby': ariaDescribedBy,
        'aria-details': ariaDetails,
        ...inputProps
    }: SuggestProps<T>,
    ref: React.Ref<HTMLElement>,
) {
    const {t} = i18n.useTranslation();
    const [anchorElement, setAnchorElement] = React.useState<HTMLElement | null>(null);
    const setControlRef = React.useCallback((element: HTMLInputElement | null) => {
        setAnchorElement(element?.parentElement ?? null);
    }, []);
    const handleControlRef = useForkRef(inputProps.controlRef, setControlRef);
    const focusOwner = useListFocusOwner();
    const [activeOption, setActiveOption] = React.useState<string | null>(null);
    const activeOptionRef = React.useRef<string | null>(null);
    const handleActiveOptionUpdate = React.useCallback(
        (id: string | null) => {
            activeOptionRef.current = id;
            setActiveOption(id);
            onActiveOptionUpdate?.(id);
        },
        [onActiveOptionUpdate],
    );
    const resetActiveOption = React.useCallback(() => {
        const id = activeOptionRef.current;
        if (id === null) return;

        activeOptionRef.current = null;
        setActiveOption(null);
        if (options?.some((option) => option.value === id)) {
            onActiveOptionUpdate?.(null);
        }
    }, [options, onActiveOptionUpdate]);
    const [loadingElement, setLoadingElement] = React.useState<HTMLElement | null>(null);
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue ?? '');
    const inputValue = value ?? uncontrolledValue;
    const initialLoading = loading && !options?.length;
    const items = React.useMemo(() => buildListItems(options, loading), [options, loading]);
    const itemHeight = LIST_ITEM_VIEW_MIN_HEIGHT[inputProps.size ?? 'm'];
    const getItemHeight = React.useCallback(
        (item: SuggestListItem<T>, index: number) =>
            isLoadingItem(item) ? itemHeight : (getOptionHeight?.(item, index) ?? itemHeight),
        [getOptionHeight, itemHeight],
    );
    const outerVirtualization = useListVirtualization(items.length);
    const virtualization = useListVirtualizationItemSize(
        outerVirtualization,
        getItemHeight,
        '[Suggest] `estimateItemSize` of `ListVirtualizer` is not used: row height comes from `getOptionHeight` and the input size.',
    );

    const autoId = useUniqId();
    const componentId = idProp || autoId;
    const listId = `${componentId}-list`;
    // TextInput-only props are ignored with renderControl, including list label fallbacks.
    const nativeControlProps = renderControl ? undefined : inputProps.controlProps;
    const listLabel =
        ariaLabel ??
        (renderControl
            ? undefined
            : (nativeControlProps?.['aria-label'] ?? inputProps.label ?? inputProps.placeholder));
    const listLabelledBy = ariaLabelledBy ?? nativeControlProps?.['aria-labelledby'];

    const [open, setOpen] = useControlledState(openProp, defaultOpen ?? false, onOpenChange);

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
            const height = getItemHeight(ctx.item, ctx.index);
            return (
                <List.ItemView
                    {...helpers.getItemProps({
                        style: getOptionHeight ? {height, minHeight: height} : undefined,
                        'data-qa': ctx.item.qa,
                    })}
                    {...helpers.getItemViewProps()}
                >
                    {renderOption
                        ? renderOption(ctx.item, {
                              itemHeight: height,
                              isItemActive: ctx.state.active,
                              selected: false,
                          })
                        : ctx.content}
                </List.ItemView>
            );
        },
        [getOptionHeight, getItemHeight, renderOption],
    );

    const renderList = () => {
        if (initialLoading) {
            return (
                <div className={b('loader')} style={{height: itemHeight}}>
                    <Loader />
                </div>
            );
        }

        if (!options?.length) {
            return renderEmptyOptions?.({filter: inputValue}) ?? null;
        }

        return (
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
                    focusOwner={open ? focusOwner : undefined}
                    activeItemId={activeOption}
                    onActiveItemUpdate={handleActiveOptionUpdate}
                    onItemAction={handleOptionAction}
                    renderItem={renderItem}
                />
            </ListVirtualizationContext.Provider>
        );
    };

    const popupContent = renderPopup ? renderPopup({renderList}) : renderList();
    const popupOpen = open && Boolean(popupContent);

    // Track focus on the default input to preserve its onFocus/onBlur events.
    const {onFocus, onBlur} = inputProps;
    const {focusWithinProps} = useFocusWithin<HTMLInputElement>({
        onFocusWithin: onFocus,
        onBlurWithin: React.useCallback(
            (event: React.FocusEvent<HTMLInputElement>) => {
                onBlur?.(event);
                if (!popupOpen) {
                    setOpen(false, event.nativeEvent, 'focus-out');
                }
            },
            [onBlur, popupOpen, setOpen],
        ),
    });

    // Track focus on the wrapper; custom controls manage their own focus callbacks.
    // Close a pending popup on blur; visible popups handle focus-out themselves.
    const {focusWithinProps: customFocusWithinProps} = useFocusWithin<HTMLElement>({
        onBlurWithin: React.useCallback(
            (event: React.FocusEvent<HTMLElement>) => {
                if (!popupOpen) {
                    setOpen(false, event.nativeEvent, 'focus-out');
                }
            },
            [popupOpen, setOpen],
        ),
    });

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
    const listExpanded = listInputProps['aria-expanded'];
    // Match List's unmount behavior without notifying the consumer of a reset.
    useLayoutEffect(() => {
        if (!listExpanded) {
            activeOptionRef.current = null;
            setActiveOption(null);
        }
    }, [listExpanded]);

    let statusText = '';
    if (open) {
        if (initialLoading) {
            statusText = t('status_loading');
        } else if (listInputProps['aria-expanded']) {
            statusText = t('status_results', {count: options?.length ?? 0});
        } else if (!options?.length) {
            statusText = t('status_empty');
        }
    }

    const handleValueChange = React.useCallback(
        (newValue: string) => {
            if (value === undefined) {
                setUncontrolledValue(newValue);
            }
            onUpdate?.(newValue);
            setOpen(Boolean(newValue), undefined, 'input-change');
        },
        [value, onUpdate, setOpen],
    );

    const handleInputClick = React.useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            if (!open) {
                setOpen(true, e.nativeEvent, 'click');
            }
        },
        [open, setOpen],
    );

    const handleInputKeyDown = React.useCallback(
        (e: React.KeyboardEvent<HTMLElement>) => {
            if (e.nativeEvent.isComposing || e.keyCode === 229) {
                return;
            }
            const {key} = e;

            if (popupOpen) {
                onListKeyDown?.(e);
            }

            if (!open && (key === 'ArrowDown' || key === 'ArrowUp')) {
                e.preventDefault();
                setOpen(true, e.nativeEvent, 'list-navigation');
            }
        },
        [open, popupOpen, setOpen, onListKeyDown],
    );

    const controlProps = {
        'aria-label': ariaLabel ?? nativeControlProps?.['aria-label'],
        'aria-labelledby': ariaLabelledBy ?? nativeControlProps?.['aria-labelledby'],
        'aria-describedby': ariaDescribedBy ?? nativeControlProps?.['aria-describedby'],
        'aria-details': ariaDetails ?? nativeControlProps?.['aria-details'],
        ...listInputProps,
        'aria-busy': initialLoading || undefined,
        'aria-autocomplete': 'list' as const,
    };

    return (
        <React.Fragment>
            {renderControl ? (
                <div
                    ref={setAnchorElement}
                    className={b('control', inputProps.className)}
                    style={inputProps.style}
                    {...customFocusWithinProps}
                >
                    {renderControl({
                        controlProps: {
                            ...controlProps,
                            id: componentId,
                            onClick: handleInputClick,
                            onKeyDown: handleInputKeyDown,
                        },
                        disabled: inputProps.disabled,
                        onUpdate: handleValueChange,
                        open,
                        ref,
                        resetActiveOption,
                        value: inputValue,
                    })}
                </div>
            ) : (
                <TextInput
                    autoComplete={false}
                    {...inputProps}
                    {...focusWithinProps}
                    ref={ref as React.Ref<HTMLSpanElement>}
                    controlRef={handleControlRef}
                    id={componentId}
                    value={inputValue}
                    onUpdate={handleValueChange}
                    onKeyDown={(event) => {
                        handleInputKeyDown(event);
                        inputProps.onKeyDown?.(event);
                    }}
                    controlProps={{
                        ...inputProps.controlProps,
                        ...controlProps,
                        onClick: (event) => {
                            handleInputClick(event);
                            inputProps.controlProps?.onClick?.(event);
                        },
                    }}
                />
            )}
            <span className={b('status')} role="status">
                {statusText}
            </span>
            <Popup
                placement={popupPlacement}
                disablePortal={disablePortal}
                qa="suggest-popup"
                open={popupOpen}
                onOpenChange={setOpen}
                anchorElement={anchorElement}
                className={b('popup', popupClassName)}
                floatingMiddlewares={getMiddlewares({
                    width: popupWidth,
                    placement: popupPlacement,
                    disablePortal,
                    virtualized: Boolean(virtualization),
                })}
                returnFocus={false}
            >
                <div
                    className={b('popup-content')}
                    role="presentation"
                    onMouseDown={(event) => event.preventDefault()}
                >
                    {popupContent}
                </div>
            </Popup>
        </React.Fragment>
    );
}) as SuggestComponent;
