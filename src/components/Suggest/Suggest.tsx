import * as React from 'react';

import {useUniqId} from '../../hooks';
import {useOpenState} from '../../hooks/useSelect/useOpenState';
import {List} from '../List';
import {Loader} from '../Loader';
import {Popup} from '../Popup';
import {TextInput} from '../controls';
import {block} from '../utils/cn';

import type {SuggestProps} from './types';

import './Suggest.scss';

const b = block('suggest');

type SuggestComponent = <T>(
    props: SuggestProps<T> & {ref?: React.Ref<HTMLSpanElement>},
) => React.ReactElement;

export const Suggest = React.forwardRef(function Suggest<T>(
    {
        value = '',
        defaultValue,
        onUpdate,

        items,
        onItemClick,
        renderItem,
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
    const inputWrapperRef = React.useRef<HTMLDivElement>(null);
    const listRef = React.useRef<List<T>>(null);

    const autoId = useUniqId();
    const componentId = idProp || autoId;
    const popupId = `${componentId}-popup`;
    const listId = `${componentId}-list`;

    const {open, toggleOpen} = useOpenState({
        open: openProp,
        defaultOpen,
        onOpenChange,
    });

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

    const popupStyle: React.CSSProperties = (() => {
        if (popupWidth === 'fit' && inputWrapperRef.current) {
            return {width: inputWrapperRef.current.offsetWidth};
        }
        if (popupWidth === 'auto') {
            return {width: 'auto'};
        }
        if (typeof popupWidth === 'number' && Number.isFinite(popupWidth) && popupWidth > 0) {
            return {width: popupWidth};
        }
        return {};
    })();

    const hasContent = loading || Boolean(items?.length);

    const handleValueChange = React.useCallback(
        (newValue: string) => {
            onUpdate?.(newValue);
            if (newValue) {
                toggleOpen(true);
            } else {
                toggleOpen(false);
            }
        },
        [onUpdate, toggleOpen],
    );

    const handleInputFocus = React.useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            if (value) {
                toggleOpen(true);
            }
            inputProps?.onFocus?.(e);
        },
        [value, toggleOpen, inputProps],
    );

    const handleInputClick = React.useCallback(
        (e: React.MouseEvent<HTMLInputElement>) => {
            if (!open && value) {
                toggleOpen(true);
            }
            inputProps?.controlProps?.onClick?.(e);
        },
        [open, value, toggleOpen, inputProps],
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

            if (!open && (key === 'ArrowDown' || key === 'ArrowUp')) {
                e.preventDefault();
                if (value) {
                    toggleOpen(true);
                }
            }

            if (key === 'Enter' && open) {
                e.preventDefault(); // prevent form submission
            }

            inputProps?.onKeyDown?.(e);
        },
        [open, value, toggleOpen, inputProps],
    );

    const handleItemClick = React.useCallback(
        (item: T, index?: number) => {
            const keepOpen = Boolean(onItemClick?.(item, index));
            toggleOpen(keepOpen);
        },
        [onItemClick, toggleOpen],
    );

    const renderPopupContent = () => {
        if (loading) {
            return (
                <div className={b('loader')}>
                    <Loader />
                </div>
            );
        }

        if (!items?.length) {
            return null;
        }

        const virtualizedHeight = virtualized ? listHeight : undefined;

        const list = (
            <div
                className={b('list')}
                style={virtualizedHeight ? {height: virtualizedHeight} : undefined}
            >
                <List<T>
                    ref={listRef}
                    id={listId}
                    role="listbox"
                    filterable={false}
                    items={items}
                    renderItem={renderItem}
                    virtualized={virtualized}
                    itemHeight={getOptionHeight}
                    itemsHeight={virtualizedHeight}
                    onItemClick={handleItemClick}
                    onChangeActive={handleActiveIndexChange}
                    onLoadMore={onLoadMore}
                />
            </div>
        );

        if (renderPopup) {
            return renderPopup({list});
        }

        return list;
    };

    return (
        <div className={b(null, className)} style={style} ref={inputWrapperRef}>
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
                onOpenChange={toggleOpen}
                anchorElement={inputWrapperRef.current}
                className={b('popup', popupProps?.className)}
                style={popupStyle}
                onEscapeKeyDown={() => toggleOpen(false)}
                returnFocus={false}
            >
                {renderPopupContent()}
            </Popup>
        </div>
    );
}) as SuggestComponent;
