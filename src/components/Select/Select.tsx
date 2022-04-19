import React from 'react';
import {useForkRef} from '../utils/useForkRef';
import {List} from '../List';
import {KeyCode} from '../constants';
import {reducer, getInitialState} from './store';
import {SelectProps, SelectOption} from './types';
import {
    FlattenOption,
    getOptionsFromChildren,
    getFlattenOptions,
    getOptionsText,
    getListItems,
    getActiveItem,
    getNextQuickSearch,
    findItemIndexByQuickSearch,
    activateFirstClickableItem,
} from './utils';
import {SelectControl, SelectPopup} from './components';
import {Option, OptionGroup} from './tech-components';
import {LIST_CLASSNAME} from './constants';

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
        renderControl,
        renderOption,
        getOptionHeight,
        name,
        className,
        value: propsValue,
        defaultValue,
        label,
        placeholder,
        width,
        popupWidth,
        view = 'normal',
        size = 'm',
        pin = 'round-round',
        multiple = false,
        disabled = false,
    } = props;
    const [{innerValue, controlRect, active, quickSearch, quickSearchTimer}, dispatch] =
        React.useReducer(reducer, getInitialState({defaultValue}));
    const controlRef = React.useRef<HTMLElement>(null);
    const listRef = React.useRef<List<FlattenOption>>(null);
    const handleControlRef = useForkRef(ref, controlRef);
    const uncontrolled = !propsValue;
    const value = propsValue || innerValue;
    const options = props.options || getOptionsFromChildren(props.children);
    const flattenOptions = getFlattenOptions(options);
    const optionsText = getOptionsText(flattenOptions, value);

    const setActive = React.useCallback(
        (nextActive: boolean) => {
            onOpenChange?.({open: nextActive});
            dispatch({type: 'SET_ACTIVE', payload: {active: nextActive}});
        },
        [onOpenChange],
    );

    const handleSingleOptionClick = React.useCallback(
        (option: SelectOption) => {
            if (!value.includes(option.value)) {
                const nextValue = [option.value];
                onUpdate?.(nextValue);

                if (uncontrolled) {
                    dispatch({type: 'SET_INNER_VALUE', payload: {innerValue: nextValue}});
                }
            }

            setActive(false);
        },
        [onUpdate, setActive, value, uncontrolled],
    );

    const handleMultipleOptionClick = React.useCallback(
        (option: SelectOption) => {
            const alreadySelected = value.includes(option.value);
            const nextValue = alreadySelected
                ? value.filter((iteratedVal) => iteratedVal !== option.value)
                : [...value, option.value];

            onUpdate?.(nextValue);

            if (uncontrolled) {
                dispatch({type: 'SET_INNER_VALUE', payload: {innerValue: nextValue}});
            }
        },
        [onUpdate, value, uncontrolled],
    );

    const handleOptionClick = React.useCallback(
        (option?: FlattenOption) => {
            if (!option || 'label' in option) {
                return;
            }

            if (multiple) {
                handleMultipleOptionClick(option);
            } else {
                handleSingleOptionClick(option);
            }

            if (quickSearch) {
                dispatch({type: 'SET_QUICK_SEARCH', payload: {quickSearch: ''}});
            }
        },
        [handleSingleOptionClick, handleMultipleOptionClick, multiple, quickSearch],
    );

    const handleControlKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
        // prevent dialog closing in case of item selection by Enter/Spacebar keydown
        if ([KeyCode.ENTER, KeyCode.SPACEBAR].includes(e.key) && active) {
            e.preventDefault();

            if (e.key === KeyCode.SPACEBAR) {
                handleOptionClick(getActiveItem(listRef));
            }
        }

        listRef?.current?.onKeyDown(e);
    };

    const handleQuickSearchTimer = React.useCallback(
        (nextQuickSearch: string) => {
            clearTimeout(quickSearchTimer);

            if (nextQuickSearch) {
                const nextTimer = window.setTimeout(() => {
                    dispatch({type: 'SET_QUICK_SEARCH', payload: {quickSearch: ''}});
                }, 2000);
                dispatch({type: 'SET_QUICK_SEARCH_TIMER', payload: {quickSearchTimer: nextTimer}});
            }
        },
        [quickSearchTimer],
    );

    const handleQuickSearch = React.useCallback(
        (e: KeyboardEvent) => {
            e.stopPropagation();

            if (
                e.key === KeyCode.SPACEBAR &&
                document.activeElement?.classList.contains(LIST_CLASSNAME)
            ) {
                handleOptionClick(getActiveItem(listRef));

                return;
            }

            const nextQuickSearch = getNextQuickSearch(e.key, quickSearch);

            if (quickSearch !== nextQuickSearch) {
                handleQuickSearchTimer(nextQuickSearch);
                dispatch({type: 'SET_QUICK_SEARCH', payload: {quickSearch: nextQuickSearch}});
            }
        },
        [handleQuickSearchTimer, handleOptionClick, quickSearch],
    );

    React.useEffect(() => {
        if (active) {
            activateFirstClickableItem(listRef);
            const nextControlRect = controlRef.current?.getBoundingClientRect();
            dispatch({type: 'SET_CONTROL_RECT', payload: {controlRect: nextControlRect}});
        }
    }, [active]);

    React.useEffect(() => {
        if (active) {
            document.addEventListener('keydown', handleQuickSearch);
        } else {
            dispatch({type: 'SET_QUICK_SEARCH', payload: {quickSearch: ''}});
        }

        return () => {
            if (active) {
                document.removeEventListener('keydown', handleQuickSearch);
            }
        };
    }, [handleQuickSearch, active]);

    React.useEffect(() => {
        if (defaultValue) {
            dispatch({type: 'SET_INNER_VALUE', payload: {innerValue: defaultValue}});
        }
    }, [defaultValue]);

    React.useEffect(() => {
        if (quickSearch) {
            const itemIndex = findItemIndexByQuickSearch(quickSearch, getListItems(listRef));

            if (typeof itemIndex === 'number' && itemIndex !== -1) {
                listRef?.current?.activateItem(itemIndex, true);
            }
        }
    }, [quickSearch]);

    React.useEffect(() => {
        if (!active && typeof quickSearchTimer === 'number') {
            clearTimeout(quickSearchTimer);
        }
    }, [active, quickSearchTimer]);

    return (
        <React.Fragment>
            <SelectControl
                ref={handleControlRef}
                className={className}
                name={name}
                view={view}
                size={size}
                pin={pin}
                width={width}
                label={label}
                placeholder={placeholder}
                optionsText={optionsText}
                active={active}
                disabled={disabled}
                setActive={setActive}
                onKeyDown={handleControlKeyDown}
                renderControl={renderControl}
            />
            <SelectPopup
                ref={listRef}
                controlRef={controlRef}
                size={size}
                value={value}
                flattenOptions={flattenOptions}
                popupWidth={popupWidth}
                controlRect={controlRect}
                active={active}
                multiple={multiple}
                setActive={setActive}
                onOptionClick={handleOptionClick}
                renderOption={renderOption}
                getOptionHeight={getOptionHeight}
            />
        </React.Fragment>
    );
}) as SelectComponent;

Select.Option = Option;
Select.OptionGroup = OptionGroup;
