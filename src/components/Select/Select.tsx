import React from 'react';
import {useForkRef} from '../utils/useForkRef';
import {useSelect} from '../utils/useSelect';
import {List} from '../List';
import {KeyCode} from '../constants';
import {reducer, getInitialState} from './store';
import {SelectProps} from './types';
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
import {LIST_CLASSNAME, QUICK_SEARCH_TIMEOUT} from './constants';

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
        qa,
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
    const [{controlRect, quickSearch, quickSearchTimer}, dispatch] = React.useReducer(
        reducer,
        getInitialState(),
    );
    const controlRef = React.useRef<HTMLElement>(null);
    const listRef = React.useRef<List<FlattenOption>>(null);
    const handleControlRef = useForkRef(ref, controlRef);
    const {value, open, setOpen, handleSelection} = useSelect({
        onUpdate,
        value: propsValue,
        defaultValue,
        multiple,
    });
    const options = props.options || getOptionsFromChildren(props.children);
    const flattenOptions = getFlattenOptions(options);
    const optionsText = getOptionsText(flattenOptions, value);

    const handleClose = React.useCallback(() => setOpen(false), [setOpen]);

    const handleOptionClick = React.useCallback(
        (option?: FlattenOption) => {
            if (!option || 'label' in option) {
                return;
            }

            handleSelection(option);

            if (quickSearch) {
                dispatch({type: 'SET_QUICK_SEARCH', payload: {quickSearch: ''}});
            }
        },
        [handleSelection, quickSearch],
    );

    const handleControlKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
        // prevent dialog closing in case of item selection by Enter/Spacebar keydown
        if ([KeyCode.ENTER, KeyCode.SPACEBAR].includes(e.key) && open) {
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
                }, QUICK_SEARCH_TIMEOUT);
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
        if (open) {
            activateFirstClickableItem(listRef);
            const nextControlRect = controlRef.current?.getBoundingClientRect();
            dispatch({type: 'SET_CONTROL_RECT', payload: {controlRect: nextControlRect}});
        }

        onOpenChange?.(open);
    }, [open, onOpenChange]);

    React.useEffect(() => {
        if (open) {
            document.addEventListener('keydown', handleQuickSearch);
        } else {
            dispatch({type: 'SET_QUICK_SEARCH', payload: {quickSearch: ''}});
        }

        return () => {
            if (open) {
                document.removeEventListener('keydown', handleQuickSearch);
            }
        };
    }, [handleQuickSearch, open]);

    React.useEffect(() => {
        if (quickSearch) {
            const itemIndex = findItemIndexByQuickSearch(quickSearch, getListItems(listRef));

            if (typeof itemIndex === 'number' && itemIndex !== -1) {
                listRef?.current?.activateItem(itemIndex, true);
            }
        }
    }, [quickSearch]);

    React.useEffect(() => {
        if (!open && typeof quickSearchTimer === 'number') {
            clearTimeout(quickSearchTimer);
        }

        return () => clearTimeout(quickSearchTimer);
    }, [open, quickSearchTimer]);

    return (
        <React.Fragment>
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
                optionsText={optionsText}
                open={open}
                disabled={disabled}
                setOpen={setOpen}
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
                open={open}
                multiple={multiple}
                handleClose={handleClose}
                onOptionClick={handleOptionClick}
                renderOption={renderOption}
                getOptionHeight={getOptionHeight}
            />
        </React.Fragment>
    );
}) as SelectComponent;

Select.Option = Option;
Select.OptionGroup = OptionGroup;
