import * as React from 'react';

import throttle from 'lodash/throttle';

import {useForkRef, useOutsideClick, useUniqId} from '../../hooks';
import {useOpenState} from '../../hooks/useSelect/useOpenState';
import {List} from '../List';
import {Loader} from '../Loader';
import {Popup} from '../Popup';
import {TextInput} from '../controls';
import {block} from '../utils/cn';

import {DefaultEmptyContent, DefaultErrorContent} from './DefaultFallbackContent';
import {useSuggestState} from './hooks/useSuggestState';
import type {SuggestProps} from './types';
import {isPopupContentVisible} from './utils';

import './Suggest.scss';

const b = block('suggest');

type SuggestComponent = <T>(
    props: SuggestProps<T> & {ref?: React.Ref<HTMLSpanElement>},
) => React.ReactElement;

export const Suggest = React.forwardRef(function Suggest<T>(
    {
        // Options
        getOptions,
        onOptionClick,
        renderOption,
        virtualized = false,
        itemHeight,
        getOptionHeight,
        getInitialActiveItemIndex,

        // TextInput props
        value = '',
        defaultValue,
        onUpdate,
        placeholder,
        size,
        pin,
        disabled,
        readOnly,
        autoComplete = false,
        autoFocus,
        hasClear,
        error: errorProp,
        errorMessage,
        errorPlacement,
        validationState,
        className,
        style,
        inputClassName,
        id: idProp,
        name,
        controlProps,
        startContent,
        endContent,
        controlRef,

        // Popup props
        popupClassName,
        popupPlacement,
        popupQa,
        popupWidth = 'fit',
        popupOffset,
        popupDisablePortal,
        syncPopupOnResize = false,
        renderStyle = 'popup',

        // Behavior
        debounce = 0,
        loading: loadingProp,
        showOptionsOnEmptyValue = false,
        getOptionsOnMount = false,
        applicableInputValue = false,
        showNoOptionsMessage = true,
        onLoadMore,

        // Open/close state
        open: openProp,
        defaultOpen,
        onOpenChange,

        // Event handlers
        onBlur,
        onInputKeyDown: onInputKeyDownProp,
        onInputEnterKeyDown,
        onTabKeyDown,

        // Fallback content
        emptyIcon,
        errorIcon,
        renderEmptyOptions,
        renderFetchOptionsError,
        renderPopup,

        children,

        qa,
    }: SuggestProps<T>,
    ref: React.Ref<HTMLSpanElement>,
) {
    const inputWrapperRef = React.useRef<HTMLDivElement>(null);
    const textInputRef = React.useRef<HTMLInputElement>(null);
    const listRef = React.useRef<List<T>>(null);

    const combinedControlRef = useForkRef<HTMLInputElement>(textInputRef, controlRef);

    // IDs for ARIA
    const autoId = useUniqId();
    const componentId = idProp || autoId;
    const popupId = `${componentId}-popup`;
    const listId = `${componentId}-list`;

    const {open, toggleOpen} = useOpenState({
        open: openProp,
        defaultOpen,
        onOpenChange,
    });

    const {
        showLoadingIndicator,
        options,
        error: fetchError,
        activeIndex,
        showEmptyMessage,
        setActiveIndex,
        handleValueChange,
        handleInputFocus,
        handleInputBlur,
        refetchOptions,
    } = useSuggestState({
        value,
        onUpdate,
        getOptions,
        debounce,
        loadingProp,
        showOptionsOnEmptyValue,
        getOptionsOnMount,
        getInitialActiveItemIndex,
        onBlur,
        open,
        toggleOpen,
        listRef,
    });

    useOutsideClick({
        ref: inputWrapperRef,
        handler: () => {
            if (open) {
                toggleOpen(false);
            }
        },
    });

    // When syncPopupOnResize is enabled, force a re-render on window resize so
    // the popup width re-measures the input. Throttled to avoid layout thrash.
    const [, setResizeTick] = React.useState(0);
    React.useEffect(() => {
        if (!syncPopupOnResize) return undefined;
        const throttledForceUpdate = throttle(() => setResizeTick((t) => t + 1), 300);
        window.addEventListener('resize', throttledForceUpdate);
        return () => {
            window.removeEventListener('resize', throttledForceUpdate);
            throttledForceUpdate.cancel();
        };
    }, [syncPopupOnResize]);

    // Calculate popup width
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

    const handleInputClick = React.useCallback(
        (event: React.MouseEvent<HTMLInputElement>) => {
            if (!open && (value || showOptionsOnEmptyValue)) {
                toggleOpen(true);
            }
            controlProps?.onClick?.(event);
        },
        [open, value, showOptionsOnEmptyValue, controlProps, toggleOpen],
    );

    const handleInputKeyDown = React.useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
            const {key} = event;

            // Tab key handling
            if (key === 'Tab' && onTabKeyDown && open) {
                const activeItemIndex = listRef.current?.getActiveItem() ?? undefined;
                const keepOpen = onTabKeyDown(value, event, {
                    items: options,
                    activeIndex: activeItemIndex,
                });
                if (typeof keepOpen === 'boolean') {
                    toggleOpen(keepOpen);
                }
            }

            // Custom input key handler
            if (
                onInputKeyDownProp &&
                (!listRef.current || typeof listRef.current.getActiveItem() !== 'number')
            ) {
                onInputKeyDownProp(value, event);
            }

            // Enter key with applicableInputValue
            if (
                key === 'Enter' &&
                applicableInputValue &&
                onInputEnterKeyDown &&
                (!listRef.current || typeof listRef.current.getActiveItem() !== 'number')
            ) {
                onInputEnterKeyDown(value, event);
            }
            // Forward navigation keys to List so it can update the active option.
            else if (
                listRef.current &&
                open &&
                (key === 'ArrowDown' ||
                    key === 'ArrowUp' ||
                    key === 'Enter' ||
                    key === 'PageUp' ||
                    key === 'PageDown')
            ) {
                listRef.current.onKeyDown(event as React.KeyboardEvent<HTMLDivElement>);
            }
            // Open popup without activating when closed
            else if (!open && (key === 'ArrowDown' || key === 'ArrowUp')) {
                event.preventDefault();
                if (value || showOptionsOnEmptyValue) {
                    toggleOpen(true);
                }
            }

            if (key === 'Home' || key === 'End') {
                moveCursorToEdge(textInputRef, key === 'Home', event.shiftKey);
                event.preventDefault();
            }

            // Prevent form submission on Enter when popup is open
            if (key === 'Enter' && open) {
                event.preventDefault();
            }

            // Escape key - close popup
            if (key === 'Escape' && open) {
                toggleOpen(false);
                event.preventDefault();
            }
        },
        [
            value,
            options,
            open,
            applicableInputValue,
            showOptionsOnEmptyValue,
            onInputKeyDownProp,
            onInputEnterKeyDown,
            onTabKeyDown,
            toggleOpen,
            listRef,
        ],
    );

    const handleItemClick = React.useCallback(
        (item: T, index?: number, fromKeyboard?: boolean) => {
            let keepOpen = false;
            if (onOptionClick) {
                keepOpen = Boolean(onOptionClick(item, index, fromKeyboard));
            }

            if (keepOpen) {
                // If we want to keep popup open, refocus the input to prevent blur-close
                textInputRef.current?.focus();
            }

            toggleOpen(keepOpen);
        },
        [onOptionClick, toggleOpen],
    );

    const hasContent = isPopupContentVisible({
        loading: showLoadingIndicator,
        options,
        error: fetchError,
        value,
        showOptionsOnEmptyValue,
        showNoOptionsMessage,
        showEmptyMessage,
    });

    const renderPopupContent = () => {
        if (showLoadingIndicator) {
            return (
                <div className={b('loader')}>
                    <Loader />
                </div>
            );
        }

        if (fetchError) {
            if (renderFetchOptionsError) {
                return (
                    <div className={b('fallback')}>
                        {React.createElement(renderFetchOptionsError, {value, error: fetchError})}
                    </div>
                );
            }

            return (
                <div className={b('fallback')}>
                    <DefaultErrorContent
                        value={value}
                        error={fetchError}
                        onRetry={refetchOptions}
                        icon={errorIcon}
                    />
                </div>
            );
        }

        // Options list
        if (options.length > 0) {
            // Calculate viewport height for virtualized lists
            let calculatedHeight: number | undefined;

            if (virtualized) {
                // For virtualization, use a fixed viewport height (not total of all items)
                // Default to showing ~10 items or 300px
                const DEFAULT_VIEWPORT_HEIGHT = 300;
                const ITEMS_TO_SHOW = 10;

                if (typeof itemHeight === 'number') {
                    calculatedHeight = Math.min(
                        itemHeight * ITEMS_TO_SHOW,
                        DEFAULT_VIEWPORT_HEIGHT,
                    );
                } else if (typeof getOptionHeight === 'number') {
                    calculatedHeight = Math.min(
                        getOptionHeight * ITEMS_TO_SHOW,
                        DEFAULT_VIEWPORT_HEIGHT,
                    );
                } else {
                    // For dynamic heights, use default viewport
                    calculatedHeight = DEFAULT_VIEWPORT_HEIGHT;
                }
            }

            const list = (
                <div
                    className={b('list')}
                    style={calculatedHeight ? {height: calculatedHeight} : undefined}
                >
                    <List<T>
                        ref={listRef}
                        id={listId}
                        role="listbox"
                        filterable={false}
                        items={options}
                        renderItem={renderOption}
                        virtualized={virtualized}
                        itemHeight={itemHeight || getOptionHeight}
                        itemsHeight={calculatedHeight}
                        activeItemIndex={activeIndex}
                        onItemClick={handleItemClick}
                        onChangeActive={setActiveIndex}
                        onLoadMore={onLoadMore}
                    />
                </div>
            );

            // Custom popup render
            if (renderPopup) {
                return renderPopup({list, loading: showLoadingIndicator, error: fetchError});
            }

            return list;
        }

        // Empty state
        if (value && showNoOptionsMessage && showEmptyMessage) {
            if (renderEmptyOptions) {
                return (
                    <div className={b('fallback')}>
                        {React.createElement(renderEmptyOptions, {value, loading: false})}
                    </div>
                );
            }

            // Default empty UI
            return (
                <div className={b('fallback')}>
                    <DefaultEmptyContent value={value} icon={emptyIcon} />
                </div>
            );
        }

        return null;
    };

    const input = (
        <TextInput
            ref={ref}
            qa={qa}
            id={componentId}
            name={name}
            className={b('input', inputClassName)}
            value={value}
            defaultValue={defaultValue}
            onUpdate={handleValueChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            placeholder={placeholder}
            size={size}
            pin={pin}
            disabled={disabled}
            readOnly={readOnly}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            hasClear={hasClear}
            error={errorProp}
            errorMessage={errorMessage}
            errorPlacement={errorPlacement}
            validationState={validationState}
            startContent={startContent}
            endContent={endContent}
            controlRef={combinedControlRef}
            controlProps={{
                ...controlProps,
                onClick: handleInputClick,
                role: 'combobox',
                'aria-expanded': hasContent && open,
                'aria-controls': popupId,
                'aria-autocomplete': applicableInputValue ? 'both' : 'list',
                'aria-activedescendant':
                    activeIndex === undefined ? undefined : `${listId}-item-${activeIndex}`,
            }}
        />
    );

    // Render-prop layout: caller takes full control over how input + options
    // are arranged.
    if (children) {
        return <React.Fragment>{children(input, options, showLoadingIndicator)}</React.Fragment>;
    }

    // Inline mode: render content directly under the input (no portal/popup).
    if (renderStyle === 'inline') {
        return (
            <div className={b(null, className)} style={style} ref={inputWrapperRef}>
                {input}
                {hasContent && (
                    <div className={b('inline-content', popupClassName)}>
                        {renderPopupContent()}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className={b(null, className)} style={style} ref={inputWrapperRef}>
            {input}
            <Popup
                id={popupId}
                qa={popupQa}
                open={hasContent && open}
                onOpenChange={toggleOpen}
                anchorElement={inputWrapperRef.current}
                placement={popupPlacement}
                className={b('popup', popupClassName)}
                style={popupStyle}
                onEscapeKeyDown={() => toggleOpen(false)}
                returnFocus={false}
                disablePortal={popupDisablePortal}
                offset={popupOffset}
            >
                {renderPopupContent()}
            </Popup>
        </div>
    );
}) as SuggestComponent;

// Helper function for cursor management (Home/End keys)
function moveCursorToEdge(
    inputRef: React.RefObject<HTMLInputElement>,
    moveToStart: boolean,
    selectMode: boolean,
) {
    const input = inputRef.current;
    if (!input) return;

    const end = moveToStart ? 0 : input.value.length;
    const currentSelection = input.selectionStart ?? end;
    if (end === currentSelection) return;

    const start = selectMode ? currentSelection : end;
    const positions = [start, end].sort((a, c) => a - c);

    input.setSelectionRange(positions[0], positions[1], start > end ? 'backward' : 'forward');
}
