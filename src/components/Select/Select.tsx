import React from 'react';
import {useForkRef} from '../utils/useForkRef';
import {useSelect} from '../utils/useSelect';
import {List} from '../List';
import {KeyCode} from '../constants';
import {reducer, initialState} from './store';
import type {SelectProps} from './types';
import type {SelectFilterRef} from './types-misc';
import {useQuickSearch} from './hooks';
import {
    FlattenOption,
    getOptionsFromChildren,
    getFlattenOptions,
    getSelectedOptionsContent,
    getListItems,
    getActiveItem,
    getListHeight,
    getPopupMinWidth,
    getPopupVerticalOffset,
    getFilteredFlattenOptions,
    findItemIndexByQuickSearch,
    activateFirstClickableItem,
} from './utils';
import {SelectControl, SelectPopup, SelectList, SelectFilter, EmptyOptions} from './components';
import {Option, OptionGroup} from './tech-components';
import {DEFAULT_VIRTUALIZATION_THRESHOLD} from './constants';
import {useOnFocusOutside} from '../utils/useOnFocusOutside';

type SelectComponent = React.ForwardRefExoticComponent<
    SelectProps & React.RefAttributes<HTMLButtonElement>
> & {
    Option: typeof Option;
    OptionGroup: typeof OptionGroup;
};

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(function Select(props, ref) {
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
        popupClassName,
        qa,
        value: propsValue,
        defaultValue,
        defaultOpen,
        label,
        placeholder,
        filterPlaceholder,
        width,
        popupWidth,
        virtualizationThreshold = DEFAULT_VIRTUALIZATION_THRESHOLD,
        view = 'normal',
        size = 'm',
        pin = 'round-round',
        multiple = false,
        disabled = false,
        filterable = false,
    } = props;
    const [{controlRect, filter}, dispatch] = React.useReducer(reducer, initialState);
    const controlRef = React.useRef<HTMLElement>(null);
    const filterRef = React.useRef<SelectFilterRef>(null);
    const listRef = React.useRef<List<FlattenOption>>(null);
    const handleControlRef = useForkRef(ref, controlRef);
    const {value, open, setOpen, handleSelection} = useSelect({
        onUpdate,
        value: propsValue,
        defaultValue,
        defaultOpen,
        multiple,
    });
    const options = props.options || getOptionsFromChildren(props.children);
    const flattenOptions = getFlattenOptions(options);
    const filteredFlattenOptions =
        filterable && filter
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
    const listHeight = getListHeight({
        options: filteredFlattenOptions,
        getOptionHeight,
        size,
    });
    const filterHeight = filterRef.current?.getHeight() || 0;
    const popupHeight = listHeight + filterHeight;
    const popupMinWidth = getPopupMinWidth(virtualized, controlRect);
    const popupVerticalOffset = getPopupVerticalOffset({height: popupHeight, controlRect});

    const handleClose = React.useCallback(() => setOpen(false), [setOpen]);

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
            const nextControlRect = controlRef.current?.getBoundingClientRect();

            if (filterable) {
                filterRef.current?.focus();
            }

            dispatch({type: 'SET_CONTROL_RECT', payload: {controlRect: nextControlRect}});
        } else {
            dispatch({type: 'SET_FILTER', payload: {filter: ''}});
        }

        onOpenChange?.(open);
    }, [open, filterable, onOpenChange]);

    const {onFocus} = useOnFocusOutside(handleClose, open);

    return (
        <div style={{display: 'inline-block'}} onFocus={onFocus}>
            <SelectControl
                ref={handleControlRef}
                className={className}
                qa={qa}
                name={name}
                view={view}
                size={size}
                pin={pin}
                width={width}
                label={label}
                placeholder={placeholder}
                selectedOptionsContent={selectedOptionsContent}
                open={open}
                disabled={disabled}
                setOpen={setOpen}
                onKeyDown={handleControlKeyDown}
                renderControl={renderControl}
            />
            <SelectPopup
                className={popupClassName}
                controlRef={controlRef}
                width={popupWidth}
                minWidth={popupMinWidth}
                verticalOffset={popupVerticalOffset}
                enableFocusTrap={filterable}
                open={open}
                handleClose={handleClose}
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
                        flattenOptions={filteredFlattenOptions}
                        listHeight={listHeight}
                        filterHeight={filterHeight}
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
}) as SelectComponent;

Select.Option = Option;
Select.OptionGroup = OptionGroup;
