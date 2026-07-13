import * as React from 'react';

import type {OpenChangeReason} from '@floating-ui/react';

import {useLayoutEffect, useUniqId} from '../../../hooks';
import {useOpenState} from '../../../hooks/useSelect/useOpenState';
import {List} from '../../List';
import {Loader} from '../../Loader';
import {Popup} from '../../Popup';
import {TextInput} from '../../controls';
import {block} from '../../utils/cn';

import type {SuggestProps} from './types';

import './Suggest.scss';

const b = block('suggest');

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
        virtualized = false,
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
    const listRef = React.useRef<List<T>>(null);

    const autoId = useUniqId();
    const componentId = idProp || autoId;
    const popupId = `${componentId}-popup`;
    const listId = `${componentId}-list`;

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

    const [activeIndex, setActiveIndex] = React.useState<number | undefined>();

    const handleActiveIndexChange = React.useCallback(
        (index: number | undefined) => {
            setActiveIndex(index);
            onActiveIndexChange?.(index);
        },
        [onActiveIndexChange],
    );

    React.useEffect(() => {
        if (!open) {
            setActiveIndex(undefined);
        }
    }, [open]);

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

    const hasContent = loading || Boolean(options?.length) || Boolean(renderPopup);

    const handleValueChange = React.useCallback(
        (newValue: string) => {
            onUpdate?.(newValue);
            if (!isOpenControlled) {
                setOpen(Boolean(newValue));
            }
        },
        [onUpdate, isOpenControlled, setOpen],
    );

    const handleInputFocus = React.useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            if (!isOpenControlled && value) {
                setOpen(true);
            }
            inputProps?.onFocus?.(e);
        },
        [value, isOpenControlled, setOpen, inputProps],
    );

    const handleInputClick = React.useCallback(
        (e: React.MouseEvent<HTMLInputElement>) => {
            if (!isOpenControlled && !open && value) {
                setOpen(true);
            }
            inputProps?.controlProps?.onClick?.(e);
        },
        [open, value, isOpenControlled, setOpen, inputProps],
    );

    const handleInputKeyDown = React.useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            const {key} = e;

            const isNavKey =
                key === 'ArrowDown' ||
                key === 'ArrowUp' ||
                key === 'Enter' ||
                key === 'PageUp' ||
                key === 'PageDown';

            if (open && listRef.current && isNavKey) {
                listRef.current.onKeyDown(e as React.KeyboardEvent<HTMLDivElement>);
            }

            if (!isOpenControlled && !open && (key === 'ArrowDown' || key === 'ArrowUp')) {
                e.preventDefault();
                if (value) {
                    setOpen(true);
                }
            }

            if (key === 'Enter' && open) {
                e.preventDefault(); // prevent form submission
            }

            inputProps?.onKeyDown?.(e);
        },
        [open, value, isOpenControlled, setOpen, inputProps],
    );

    const handleOptionClick = React.useCallback(
        (option: T, index?: number) => {
            const keepOpen = Boolean(onOptionClick?.(option, index));
            setOpen(keepOpen);
        },
        [onOptionClick, setOpen],
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

        const virtualizedHeight = virtualized ? listHeight : undefined;

        const list = options?.length ? (
            <div
                className={b('list')}
                style={virtualizedHeight ? {height: virtualizedHeight} : undefined}
            >
                <List<T>
                    ref={listRef}
                    id={listId}
                    role="listbox"
                    filterable={false}
                    items={options}
                    renderItem={renderOption}
                    virtualized={virtualized}
                    itemHeight={getOptionHeight}
                    itemsHeight={virtualizedHeight}
                    onItemClick={handleOptionClick}
                    onChangeActive={handleActiveIndexChange}
                    onLoadMore={onLoadMore}
                />
            </div>
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
                value={value}
                defaultValue={defaultValue}
                onUpdate={handleValueChange}
                onFocus={handleInputFocus}
                onBlur={inputProps?.onBlur}
                onKeyDown={handleInputKeyDown}
                controlRef={inputProps?.controlRef}
                controlProps={{
                    ...inputProps?.controlProps,
                    onClick: handleInputClick,
                    role: 'combobox',
                    'aria-expanded': hasContent && open,
                    'aria-controls': popupId,
                    'aria-autocomplete': 'list',
                    'aria-activedescendant':
                        activeIndex === undefined ? undefined : `${listId}-item-${activeIndex}`,
                }}
            />
            <Popup
                placement="bottom-start"
                {...popupProps}
                id={popupId}
                open={hasContent && open}
                onOpenChange={setOpen}
                anchorElement={anchorElement}
                className={b('popup', popupProps?.className)}
                style={popupStyle}
                onEscapeKeyDown={() => setOpen(false)}
                returnFocus={false}
            >
                {renderPopupContent()}
            </Popup>
        </div>
    );
}) as SuggestComponent;
