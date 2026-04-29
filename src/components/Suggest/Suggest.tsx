'use client';

import * as React from 'react';

import {KeyCode} from '../../constants';
import {useControlledState, useFocusWithin, useForkRef, useUniqId} from '../../hooks';
import type {List} from '../List';
import {DEFAULT_RENDER_POPUP} from '../Select/Select';
import {EmptyOptions, SelectList, SelectPopup} from '../Select/components';
import {DEFAULT_VIRTUALIZATION_THRESHOLD, selectBlock} from '../Select/constants';
import {useActiveItemIndex} from '../Select/hooks';
import {getSelectFilteredOptions, useSelectOptions} from '../Select/hooks-public';
import type {SelectOption} from '../Select/types';
import type {FlattenOption} from '../Select/utils';
import {getActiveItem, isSelectGroupTitle} from '../Select/utils';
import {TextInput} from '../controls/TextInput';
import {useMobile} from '../mobile';
import {block} from '../utils/cn';
import type {CnMods} from '../utils/cn';

import type {SuggestProps} from './types';

import './Suggest.scss';
import '../Select/Select.scss';

const suggestBlock = block('suggest');

function getOptionDisplayText(option: SelectOption): string {
    if (typeof option.content === 'string') {
        return option.content;
    }
    if (typeof option.children === 'string') {
        return option.children;
    }
    if (option.text) {
        return option.text;
    }
    return option.value;
}

export const Suggest = React.forwardRef<HTMLDivElement, SuggestProps>(function Suggest(props, ref) {
    const {
        items,
        options: optionsProp,
        width,
        popupWidth,
        popupPlacement,
        popupClassName,
        disablePortal,
        inlineSuggest,
        virtualizationThreshold = DEFAULT_VIRTUALIZATION_THRESHOLD,
        renderOption,
        renderOptionGroup,
        renderPopup = DEFAULT_RENDER_POPUP,
        renderEmptyOptions,
        getOptionHeight,
        getOptionGroupHeight,
        filterOption,
        loading,
        onLoadMore,
        defaultOpen,
        open: openControlled,
        onOpenChange,
        onClose,
        className,
        controlClassName,
        qa,
        id: idProp,
        controlRef: controlRefProp,
        onFocus,
        onBlur,
        onKeyDown,
        onFilterChange,
        ...textInputProps
    } = props;

    const isInlineLayout = Boolean(inlineSuggest);
    const mobile = useMobile();
    const listMobile = !isInlineLayout && mobile;
    const controlWrapRef = React.useRef<HTMLDivElement>(null);
    const internalInputRef = React.useRef<HTMLInputElement>(null);
    const handleWrapRef = useForkRef(ref, controlWrapRef);
    const controlRef = useForkRef(controlRefProp, internalInputRef);
    const listRef = React.useRef<List<FlattenOption>>(null);

    const [inputValue, setInputValue] = useControlledState(
        props.value,
        props.defaultValue ?? '',
        props.onUpdate,
    );

    const handleInputUpdate = React.useCallback(
        (next: string) => {
            setInputValue(next);
            onFilterChange?.(next);
        },
        [onFilterChange, setInputValue],
    );

    const handleOpenChange = React.useCallback(
        (newOpen: boolean) => {
            onOpenChange?.(newOpen);
            if (newOpen === false && onClose) {
                onClose();
            }
        },
        [onClose, onOpenChange],
    );

    const [open, setOpenState] = useControlledState(
        openControlled,
        defaultOpen ?? false,
        handleOpenChange,
    );

    const openIsControlled = openControlled !== undefined;

    const toggleOpen = React.useCallback(
        (val?: boolean) => {
            const newOpen = typeof val === 'boolean' ? val : !open;
            setOpenState(newOpen);
        },
        [open, setOpenState],
    );

    const baseOptions = React.useMemo(() => {
        if (optionsProp) {
            return optionsProp;
        }
        return (items ?? []).map((item) => ({value: item, content: item}));
    }, [items, optionsProp]);

    const preparedOptions = useSelectOptions({
        options: baseOptions,
        filter: inputValue,
        filterable: true,
        filterOption,
    });

    const filteredOptions = getSelectFilteredOptions(preparedOptions) as FlattenOption[];

    const selectedValues = React.useMemo(() => {
        const flat = filteredOptions.filter(
            (option): option is SelectOption => !isSelectGroupTitle(option),
        );
        const hit = flat.find((option) => getOptionDisplayText(option) === inputValue);

        return hit ? [hit.value] : [];
    }, [filteredOptions, inputValue]);

    React.useEffect(() => {
        if (!filteredOptions.length && !loading) {
            toggleOpen(false);
        }
    }, [filteredOptions.length, loading, toggleOpen]);

    /**
     * Reopen the list when the value changes (typing, clear, paste) if there is something to show.
     * `onFocus` does not run when the user stays focused, so this fixes “pick → clear → type → list stays closed”.
     * Selection sets `suppressReopenFromPickRef` so we do not reopen immediately after a pick.
     */
    const suppressReopenFromPickRef = React.useRef(false);
    const prevInputForSyncRef = React.useRef(inputValue);

    React.useEffect(() => {
        if (openIsControlled || textInputProps.disabled) {
            return;
        }

        if (suppressReopenFromPickRef.current) {
            suppressReopenFromPickRef.current = false;
            prevInputForSyncRef.current = inputValue;
            return;
        }

        if (prevInputForSyncRef.current === inputValue) {
            return;
        }

        prevInputForSyncRef.current = inputValue;

        if (filteredOptions.length > 0 || loading) {
            toggleOpen(true);
        }
    }, [
        inputValue,
        filteredOptions.length,
        loading,
        openIsControlled,
        textInputProps.disabled,
        toggleOpen,
    ]);

    const listShown = Boolean(filteredOptions.length) || Boolean(loading);
    const popupActive = open && listShown && !textInputProps.disabled;

    const virtualized = !isInlineLayout && filteredOptions.length >= virtualizationThreshold;

    const [activeIndex, setActiveIndex] = useActiveItemIndex({
        options: filteredOptions,
        open: popupActive,
        value: selectedValues,
    });

    const handleClose = React.useCallback(() => toggleOpen(false), [toggleOpen]);

    const {focusWithinProps} = useFocusWithin({
        onFocusWithin: onFocus,
        onBlurWithin: React.useCallback(
            (e: React.FocusEvent) => {
                onBlur?.(e as React.FocusEvent<HTMLInputElement>);

                if (!mobile) {
                    handleClose();
                }
            },
            [handleClose, mobile, onBlur],
        ),
    });

    const uniqId = useUniqId();
    const suggestId = idProp ?? uniqId;
    const popupId = `suggest-popup-${suggestId}`;

    const handleOptionClick = React.useCallback(
        (option?: FlattenOption) => {
            if (!option || option.disabled || 'label' in option) {
                return;
            }

            const opt = option as SelectOption;

            suppressReopenFromPickRef.current = true;
            const nextText = getOptionDisplayText(opt);
            setInputValue(nextText);
            onFilterChange?.(nextText);
            toggleOpen(false);
        },
        [onFilterChange, setInputValue, toggleOpen],
    );

    const handleInputKeyDown = React.useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            onKeyDown?.(e);

            if (e.defaultPrevented) {
                return;
            }

            const hasPopup = open && listShown;

            if ([KeyCode.ENTER, KeyCode.SPACEBAR, KeyCode.SPACE].includes(e.key) && hasPopup) {
                e.preventDefault();

                if (e.key === KeyCode.SPACEBAR || e.key === KeyCode.SPACE) {
                    handleOptionClick(getActiveItem(listRef));
                }
            }

            if ([KeyCode.ARROW_DOWN, KeyCode.ARROW_UP].includes(e.key) && !open && listShown) {
                e.preventDefault();
                toggleOpen(true);
            }

            if (e.key === KeyCode.ESCAPE && open) {
                toggleOpen(false);
            }

            listRef.current?.onKeyDown(e as unknown as React.KeyboardEvent<HTMLElement>);

            if (e.key === KeyCode.ENTER) {
                e.preventDefault();
            }
        },
        [handleOptionClick, listShown, onKeyDown, open, toggleOpen],
    );

    const handleInputFocus = React.useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            onFocus?.(e);

            if (filteredOptions.length > 0 || loading) {
                toggleOpen(true);
            }
        },
        [filteredOptions.length, loading, onFocus, toggleOpen],
    );

    const mods: CnMods = {
        ...(width === 'max' && {width}),
    };

    const inlineStyles: React.CSSProperties = {};

    if (typeof width === 'number') {
        inlineStyles.width = width;
    }

    const _renderList = () => {
        if (filteredOptions.length || loading) {
            return (
                <SelectList
                    ref={listRef}
                    size={textInputProps.size ?? 'm'}
                    value={selectedValues}
                    mobile={listMobile}
                    flattenOptions={filteredOptions}
                    multiple={false}
                    virtualized={virtualized}
                    onOptionClick={handleOptionClick}
                    renderOption={renderOption}
                    renderOptionGroup={renderOptionGroup}
                    getOptionHeight={getOptionHeight}
                    getOptionGroupHeight={getOptionGroupHeight}
                    loading={loading}
                    onLoadMore={onLoadMore}
                    id={popupId}
                    activeIndex={activeIndex}
                    onChangeActive={setActiveIndex}
                />
            );
        }

        return <EmptyOptions renderEmptyOptions={renderEmptyOptions} filter={inputValue} />;
    };

    const activeDescendant =
        activeIndex === undefined ? undefined : `${popupId}-item-${activeIndex}`;

    const rootClassName = [
        selectBlock(mods, className),
        isInlineLayout ? suggestBlock({layout: 'inline'}) : '',
    ]
        .filter(Boolean)
        .join(' ');

    const inlineResults =
        isInlineLayout && popupActive ? (
            <div
                id={popupId}
                className={suggestBlock('inline-results', popupClassName)}
                data-qa="suggest-inline-results"
            >
                {renderPopup({renderFilter: () => null, renderList: _renderList})}
            </div>
        ) : null;

    const popupLayer = isInlineLayout ? null : (
        <SelectPopup
            ref={controlWrapRef}
            className={popupClassName}
            controlRef={internalInputRef}
            width={popupWidth}
            open={popupActive}
            handleClose={handleClose}
            disablePortal={disablePortal}
            virtualized={virtualized}
            mobile={mobile}
            placement={popupPlacement}
        >
            {renderPopup({renderFilter: () => null, renderList: _renderList})}
        </SelectPopup>
    );

    return (
        <div
            ref={handleWrapRef}
            className={rootClassName}
            {...focusWithinProps}
            style={inlineStyles}
            tabIndex={-1}
            data-qa={qa}
        >
            <TextInput
                {...textInputProps}
                id={suggestId}
                className={controlClassName}
                controlRef={controlRef}
                value={inputValue}
                onUpdate={handleInputUpdate}
                onFocus={handleInputFocus}
                onKeyDown={handleInputKeyDown}
                controlProps={{
                    ...textInputProps.controlProps,
                    role: 'combobox',
                    'aria-autocomplete': 'list',
                    'aria-expanded': popupActive,
                    'aria-controls': popupActive ? popupId : undefined,
                    'aria-haspopup': 'listbox',
                    'aria-activedescendant': popupActive ? activeDescendant : undefined,
                    onClick: (e) => {
                        textInputProps.controlProps?.onClick?.(e);

                        if (!e.defaultPrevented && listShown) {
                            toggleOpen(true);
                        }
                    },
                }}
            />
            {inlineResults}
            {popupLayer}
        </div>
    );
});

Suggest.displayName = 'Suggest';
