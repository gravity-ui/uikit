import React from 'react';

import type {List} from '../List';
import {KeyCode} from '../constants';
import {useMobile} from '../mobile';
import type {CnMods} from '../utils/cn';
import {useForkRef} from '../utils/useForkRef';
import {useOnFocusOutside} from '../utils/useOnFocusOutside';
import {useSelect} from '../utils/useSelect';

import {EmptyOptions, SelectControl, SelectFilter, SelectList, SelectPopup} from './components';
import {DEFAULT_VIRTUALIZATION_THRESHOLD, selectBlock} from './constants';
import {useQuickSearch} from './hooks';
import {initialState, reducer} from './store';
import {Option, OptionGroup} from './tech-components';
import type {SelectProps} from './types';
import type {SelectFilterRef} from './types-misc';
import {
    activateFirstClickableItem,
    findItemIndexByQuickSearch,
    getActiveItem,
    getFilteredFlattenOptions,
    getFlattenOptions,
    getListItems,
    getOptionsFromChildren,
    getSelectedOptionsContent,
} from './utils';
import type {FlattenOption} from './utils';

import './Select.scss';

//https://stackoverflow.com/a/58473012
type SelectComponent = (<T = any>(
    p: SelectProps<T> & {ref?: React.Ref<HTMLButtonElement>},
) => React.ReactElement) & {Option: typeof Option} & {OptionGroup: typeof OptionGroup};

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(function Select<T = any>(
    props: SelectProps<T>,
    ref: React.Ref<HTMLButtonElement>,
) {
    const {
        onUpdate,
        onOpenChange,
        onFilterChange,
        renderControl,
        renderFilter,
        renderOption,
        renderSelectedOption,
        renderEmptyOptions,
        getOptionHeight,
        filterOption,
        name,
        className,
        controlClassName,
        popupClassName,
        qa,
        value: propsValue,
        defaultValue,
        defaultOpen,
        open: propsOpen,
        label,
        placeholder,
        filterPlaceholder,
        width,
        popupWidth,
        error,
        virtualizationThreshold = DEFAULT_VIRTUALIZATION_THRESHOLD,
        view = 'normal',
        size = 'm',
        pin = 'round-round',
        multiple = false,
        disabled = false,
        filterable = false,
        disablePortal,
        hasClear = false,
        onClose,
    } = props;
    const [mobile] = useMobile();
    const [{filter}, dispatch] = React.useReducer(reducer, initialState);
    // to avoid problem with incorrect popper offset calculation
    // for example: https://github.com/radix-ui/primitives/issues/1567
    const controlWrapRef = React.useRef<HTMLDivElement>(null);
    const controlRef = React.useRef<HTMLElement>(null);
    const filterRef = React.useRef<SelectFilterRef>(null);
    const listRef = React.useRef<List<FlattenOption>>(null);
    const handleControlRef = useForkRef(ref, controlRef);
    const {value, open, toggleOpen, handleSelection, handleClearValue} = useSelect({
        onUpdate,
        value: propsValue,
        defaultValue,
        defaultOpen,
        multiple,
        open: propsOpen,
        onClose,
        onOpenChange,
    });
    const options = props.options || getOptionsFromChildren(props.children);
    const flattenOptions = getFlattenOptions(options);
    const filteredFlattenOptions = filterable
        ? getFilteredFlattenOptions({
              options: flattenOptions,
              filter,
              filterOption,
          })
        : flattenOptions;
    const selectedOptionsContent = getSelectedOptionsContent(
        flattenOptions,
        value,
        renderSelectedOption,
    );
    const virtualized = filteredFlattenOptions.length >= virtualizationThreshold;

    const handleOptionClick = React.useCallback(
        (option?: FlattenOption) => {
            if (!option || 'label' in option) {
                return;
            }

            if (multiple) {
                const activeItemIndex = listRef?.current?.getActiveItem();
                filterRef.current?.focus();

                if (typeof activeItemIndex === 'number') {
                    // prevent item deactivation in case of multiple selection
                    // https://github.com/gravity-ui/uikit/blob/main/src/components/List/List.tsx#L369
                    // Will fixed after https://github.com/gravity-ui/uikit/issues/385
                    setTimeout(() => {
                        listRef?.current?.activateItem(activeItemIndex, true);
                    }, 50);
                }
            }

            handleSelection(option);
        },
        [handleSelection, multiple],
    );

    const clearValue = React.useCallback(
        (e?: React.MouseEvent | React.KeyboardEvent<HTMLElement>) => {
            e?.stopPropagation();
            handleClearValue();
        },
        [handleClearValue],
    );

    const handleControlKeyDown = React.useCallback(
        (e: React.KeyboardEvent<HTMLElement>) => {
            // prevent dialog closing in case of item selection by Enter/Spacebar keydown
            if ([KeyCode.ENTER, KeyCode.SPACEBAR].includes(e.key) && open) {
                e.preventDefault();

                if (e.key === KeyCode.SPACEBAR) {
                    handleOptionClick(getActiveItem(listRef));
                }
            }

            listRef?.current?.onKeyDown(e);
        },
        [handleOptionClick, open],
    );

    const handleFilterKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLElement>) => {
        listRef?.current?.onKeyDown(e);
    }, []);

    const handleFilterChange = React.useCallback(
        (nextFilter: string) => {
            onFilterChange?.(nextFilter);
            dispatch({type: 'SET_FILTER', payload: {filter: nextFilter}});
        },
        [onFilterChange],
    );

    const handleQuickSearchChange = React.useCallback((search: string) => {
        if (search) {
            const itemIndex = findItemIndexByQuickSearch(search, getListItems(listRef));

            if (typeof itemIndex === 'number' && itemIndex !== -1) {
                listRef?.current?.activateItem(itemIndex, true);
            }
        }
    }, []);

    useQuickSearch({
        onChange: handleQuickSearchChange,
        open,
        disabled: filterable,
    });

    React.useEffect(() => {
        if (open) {
            activateFirstClickableItem(listRef);

            if (filterable) {
                filterRef.current?.focus();
            }
        } else {
            dispatch({type: 'SET_FILTER', payload: {filter: ''}});
        }
    }, [open, filterable]);

    const mods: CnMods = {
        ...(width === 'max' && {width}),
    };
    const inlineStyles: React.CSSProperties = {};

    if (typeof width === 'number') {
        inlineStyles.width = width;
    }

    const handleClose = React.useCallback(() => toggleOpen(false), [toggleOpen]);
    const {onFocus, onBlur} = useOnFocusOutside({enabled: open, onFocusOutside: handleClose});

    return (
        <div
            ref={controlWrapRef}
            className={selectBlock(mods, className)}
            onFocus={onFocus}
            onBlur={onBlur}
            style={inlineStyles}
        >
            <SelectControl
                toggleOpen={toggleOpen}
                hasClear={hasClear}
                clearValue={clearValue}
                ref={handleControlRef}
                className={controlClassName}
                qa={qa}
                name={name}
                view={view}
                size={size}
                pin={pin}
                label={label}
                placeholder={placeholder}
                selectedOptionsContent={selectedOptionsContent}
                error={error}
                open={open}
                disabled={disabled}
                onKeyDown={handleControlKeyDown}
                renderControl={renderControl}
                value={value}
            />
            <SelectPopup
                ref={controlWrapRef}
                className={popupClassName}
                controlRef={controlRef}
                width={popupWidth}
                open={open}
                handleClose={handleClose}
                disablePortal={disablePortal}
                virtualized={virtualized}
                mobile={mobile}
            >
                {filterable && (
                    <SelectFilter
                        ref={filterRef}
                        size={size}
                        value={filter}
                        placeholder={filterPlaceholder}
                        onChange={handleFilterChange}
                        onKeyDown={handleFilterKeyDown}
                        renderFilter={renderFilter}
                    />
                )}
                {filteredFlattenOptions.length ? (
                    <SelectList
                        ref={listRef}
                        size={size}
                        value={value}
                        mobile={mobile}
                        flattenOptions={filteredFlattenOptions}
                        multiple={multiple}
                        virtualized={virtualized}
                        onOptionClick={handleOptionClick}
                        renderOption={renderOption}
                        getOptionHeight={getOptionHeight}
                    />
                ) : (
                    <EmptyOptions filter={filter} renderEmptyOptions={renderEmptyOptions} />
                )}
            </SelectPopup>
        </div>
    );
}) as unknown as SelectComponent;

Select.Option = Option;
Select.OptionGroup = OptionGroup;
