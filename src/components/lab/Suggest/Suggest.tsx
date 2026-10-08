'use client';

import * as React from 'react';

import type {OpenChangeReason} from '@floating-ui/react';

import {useIntersection, useLayoutEffect, useUniqId} from '../../../hooks';
import {useOpenState} from '../../../hooks/useSelect/useOpenState';
import {List, useListFocusOwner} from '../../List';
import type {ListItemContext, ListItemHelpers} from '../../List';
import {ListVirtualizationContext} from '../../List/VirtualizationContext';
import {Loader} from '../../Loader';
import {Popup} from '../../Popup';
import {TextInput} from '../../controls';
import {block} from '../../utils/cn';

import type {SuggestOption, SuggestProps} from './types';

import './Suggest.scss';

const b = block('suggest');

function defaultRenderOption(option: SuggestOption): React.ReactNode {
    return option.content ?? option.children ?? null;
}

const getItemId = (option: SuggestOption) => option.value;
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
        onOptionClick,
        renderOption,
        listHeight = 300,
        getOptionHeight,
        onLoadMore,

        inputProps,

        popupWidth = 'fit',
        popupProps,

        loading = false,

        open: openProp,
        defaultOpen,
        onOpenChange,

        onActiveIndexChange,

        renderPopup,

        className,
        style,
        id: idProp,
        qa,
    }: SuggestProps<T>,
    ref: React.Ref<HTMLSpanElement>,
) {
    const [anchorElement, setAnchorElement] = React.useState<HTMLDivElement | null>(null);
    const [fitWidth, setFitWidth] = React.useState<number>();
    const focusOwner = useListFocusOwner();
    const [lastOptionElement, setLastOptionElement] = React.useState<HTMLElement | null>(null);
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue ?? '');
    const inputValue = value ?? uncontrolledValue;
    const outerVirtualization = React.useContext(ListVirtualizationContext);
    const virtualization = React.useMemo(
        () =>
            outerVirtualization && getOptionHeight
                ? {
                      ...outerVirtualization,
                      estimateItemSize: (ctx: ListItemContext<SuggestOption<T>>) =>
                          getOptionHeight(ctx.item, ctx.index),
                  }
                : outerVirtualization,
        [outerVirtualization, getOptionHeight],
    );

    const autoId = useUniqId();
    const componentId = idProp || autoId;
    const popupId = `${componentId}-popup`;
    const listId = `${componentId}-list`;
    const listLabel =
        inputProps?.controlProps?.['aria-label'] ??
        (inputProps?.label ? undefined : inputProps?.placeholder);
    const listLabelledBy =
        inputProps?.controlProps?.['aria-labelledby'] ?? (listLabel ? undefined : componentId);

    const {open, toggleOpen} = useOpenState({
        open: openProp,
        defaultOpen,
    });

    const isOpenControlled = openProp !== undefined;

    const setOpen = React.useCallback(
        (nextOpen: boolean, event?: Event, reason?: OpenChangeReason) => {
            if (nextOpen !== open) {
                onOpenChange?.(nextOpen, event, reason);
            }
            toggleOpen(nextOpen);
        },
        [open, toggleOpen, onOpenChange],
    );

    const [activeItemId, setActiveItemId] = React.useState<string | null>(null);
    const hasContent = loading || Boolean(options?.length) || Boolean(renderPopup);
    const popupOpen = hasContent && open;
    const activeIndex =
        popupOpen && !loading
            ? (options?.findIndex((option) => option.value === activeItemId && !option.disabled) ??
              -1)
            : -1;
    const previousActiveIndex = React.useRef(-1);

    React.useEffect(() => {
        if (previousActiveIndex.current !== activeIndex) {
            previousActiveIndex.current = activeIndex;
            onActiveIndexChange?.(activeIndex === -1 ? undefined : activeIndex);
        }
    }, [activeIndex, onActiveIndexChange]);

    React.useEffect(() => {
        if (activeIndex === -1) {
            setActiveItemId(null);
        }
    }, [activeIndex]);

    const hasLoadMore = Boolean(onLoadMore);
    const onLoadMoreRef = React.useRef(onLoadMore);
    useLayoutEffect(() => {
        onLoadMoreRef.current = onLoadMore;
    }, [onLoadMore]);
    const handleLoadMore = React.useCallback(() => onLoadMoreRef.current?.(), []);

    useIntersection({
        element: popupOpen && !loading && hasLoadMore ? lastOptionElement : null,
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
                setOpen(Boolean(newValue));
            }
        },
        [value, onUpdate, isOpenControlled, setOpen],
    );

    const handleInputFocus = React.useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            if (!isOpenControlled && inputValue) {
                setOpen(true);
            }
            inputProps?.onFocus?.(e);
        },
        [inputValue, isOpenControlled, setOpen, inputProps],
    );

    const handleInputClick = React.useCallback(
        (e: React.MouseEvent<HTMLInputElement>) => {
            if (!isOpenControlled && !open && inputValue) {
                setOpen(true);
            }
            inputProps?.controlProps?.onClick?.(e);
        },
        [open, inputValue, isOpenControlled, setOpen, inputProps],
    );

    const handleInputKeyDown = React.useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            const {key} = e;

            if (popupOpen) {
                onListKeyDown?.(e);
            }

            if (!isOpenControlled && !open && (key === 'ArrowDown' || key === 'ArrowUp')) {
                e.preventDefault();
                if (inputValue) {
                    setOpen(true);
                }
            }

            if (key === 'Enter' && open) {
                e.preventDefault(); // prevent form submission
            }

            inputProps?.onKeyDown?.(e);
        },
        [open, popupOpen, inputValue, isOpenControlled, setOpen, inputProps, onListKeyDown],
    );

    const handleOptionClick = React.useCallback(
        (_id: string, option: SuggestOption<T>) => {
            const index = options?.indexOf(option);
            const keepOpen = Boolean(onOptionClick?.(option, index));
            setOpen(keepOpen);
        },
        [options, onOptionClick, setOpen],
    );

    const renderItem = React.useCallback(
        (ctx: ListItemContext<SuggestOption<T>>, helpers: ListItemHelpers) => {
            const height = getOptionHeight?.(ctx.item, ctx.index);
            return (
                <List.ItemView
                    {...helpers.getItemProps({
                        ref:
                            hasLoadMore && ctx.index === (options?.length ?? 0) - 1
                                ? setLastOptionElement
                                : undefined,
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
        [getOptionHeight, hasLoadMore, options?.length, renderOption],
    );

    const renderPopupContent = () => {
        if (loading) {
            return (
                <div className={b('loader')}>
                    <Loader />
                </div>
            );
        }

        if (!options?.length && !renderPopup) {
            return null;
        }

        const list = options?.length ? (
            <ListVirtualizationContext.Provider value={virtualization}>
                <List<SuggestOption<T>>
                    id={listId}
                    className={b('list')}
                    style={{maxHeight: virtualization ? `min(${listHeight}px, 40vh)` : '40vh'}}
                    aria-label={listLabel}
                    aria-labelledby={listLabelledBy}
                    size={inputProps?.size}
                    items={options}
                    getItemId={getItemId}
                    getItemChildren={getItemChildren}
                    getItemContent={defaultRenderOption}
                    focusOwner={focusOwner}
                    activeItemId={activeIndex === -1 ? null : activeItemId}
                    onActiveItemUpdate={setActiveItemId}
                    onItemAction={handleOptionClick}
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
        <div className={b(null, className)} style={style} ref={setAnchorElement}>
            <TextInput
                autoComplete={false}
                {...inputProps}
                ref={ref}
                qa={qa}
                id={componentId}
                value={inputValue}
                onUpdate={handleValueChange}
                onFocus={handleInputFocus}
                onBlur={inputProps?.onBlur}
                onKeyDown={handleInputKeyDown}
                controlRef={inputProps?.controlRef}
                controlProps={{
                    ...inputProps?.controlProps,
                    onClick: handleInputClick,
                    ...listInputProps,
                    'aria-expanded': popupOpen,
                    'aria-autocomplete': 'list',
                }}
            />
            <Popup
                placement="bottom-start"
                {...popupProps}
                id={popupId}
                open={popupOpen}
                onOpenChange={setOpen}
                anchorElement={anchorElement}
                className={b('popup', popupProps?.className)}
                style={popupStyle}
                onEscapeKeyDown={() => setOpen(false)}
                returnFocus={false}
            >
                {popupOpen ? renderPopupContent() : null}
            </Popup>
        </div>
    );
}) as SuggestComponent;
