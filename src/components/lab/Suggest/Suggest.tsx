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
import {ListVirtualizationContext, useListVirtualization} from '../../List/VirtualizationContext';
import {LIST_ITEM_VIEW_MIN_HEIGHT} from '../../ListItemView/constants';
import {Loader} from '../../Loader';
import {Popup} from '../../Popup';
import {TextInput} from '../../controls';
import {block} from '../../utils/cn';

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
        renderEmptyOptions,

        id: idProp,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledBy,
        'aria-describedby': ariaDescribedBy,
        'aria-details': ariaDetails,
        ...inputProps
    }: SuggestProps<T>,
    ref: React.Ref<HTMLSpanElement>,
) {
    const {t} = i18n.useTranslation();
    const [anchorElement, setAnchorElement] = React.useState<HTMLElement | null>(null);
    const handleControlRef = useForkRef(
        inputProps.controlRef,
        React.useCallback((element: HTMLInputElement | null) => {
            setAnchorElement(element?.parentElement ?? null);
        }, []),
    );
    const [fitWidth, setFitWidth] = React.useState<number>();
    const focusOwner = useListFocusOwner();
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
    const virtualization = useListVirtualization(
        getItemHeight,
        '[Suggest] `estimateItemSize` of `ListVirtualizer` is not used: row height comes from `getOptionHeight` and the input size.',
    );

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

    const [open, setOpen] = useControlledState(openProp, defaultOpen ?? false, onOpenChange);
    const {onFocus, onBlur} = inputProps;
    const {focusWithinProps} = useFocusWithin<HTMLInputElement>({
        onFocusWithin: onFocus,
        onBlurWithin: React.useCallback(
            (event: React.FocusEvent<HTMLInputElement>) => {
                onBlur?.(event);
                setOpen(false, event.nativeEvent, 'focus-out');
            },
            [onBlur, setOpen],
        ),
    });

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
                    focusOwner={focusOwner}
                    onActiveItemUpdate={onActiveOptionUpdate}
                    onItemAction={handleOptionAction}
                    renderItem={renderItem}
                />
            </ListVirtualizationContext.Provider>
        );
    };

    let popupContent: React.ReactElement | null = null;
    if (open) {
        popupContent = renderPopup ? renderPopup({renderList}) : renderList();
    }
    const popupOpen = open && Boolean(popupContent);

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
            setOpen(Boolean(newValue), undefined, 'input-change');
        },
        [value, onUpdate, setOpen],
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

    return (
        <React.Fragment>
            <TextInput
                autoComplete={false}
                {...inputProps}
                {...focusWithinProps}
                ref={ref}
                controlRef={handleControlRef}
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
                    'aria-busy': initialLoading || undefined,
                    'aria-autocomplete': 'list',
                }}
            />
            <span className={b('status')} role="status" aria-live="polite" aria-atomic="true">
                {statusText}
            </span>
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
