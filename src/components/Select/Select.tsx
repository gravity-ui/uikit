import React from 'react';
import {useForkRef} from '../utils/useForkRef';
import {useSelect} from '../utils/useSelect';
import {List} from '../List';
import {KeyCode} from '../constants';
import {reducer, getInitialState} from './store';
import type {SelectProps} from './types';
import {useQuickSearch} from './hooks';
import {
    FlattenOption,
    getOptionsFromChildren,
    getFlattenOptions,
    getOptionsText,
    getListItems,
    getActiveItem,
    getPopupHeight,
    getPopupMinWidth,
    getPopupVerticalOffset,
    findItemIndexByQuickSearch,
    activateFirstClickableItem,
} from './utils';
import {SelectControl, SelectPopup, SelectList} from './components';
import {Option, OptionGroup} from './tech-components';
import {VIRTUALIZE_THRESHOLD} from './constants';

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
    const [{controlRect}, dispatch] = React.useReducer(reducer, getInitialState());
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
    const virtualized = flattenOptions.length >= VIRTUALIZE_THRESHOLD;
    const popupHeight = getPopupHeight({
        options: flattenOptions,
        getOptionHeight,
        size,
    });
    const popupMinWidth = getPopupMinWidth(virtualized, controlRect);
    const popupVerticalOffset = getPopupVerticalOffset({height: popupHeight, controlRect});

    const handleClose = React.useCallback(() => setOpen(false), [setOpen]);

    const handleOptionClick = React.useCallback(
        (option?: FlattenOption) => {
            if (!option || 'label' in option) {
                return;
            }

            handleSelection(option);
        },
        [handleSelection],
    );

    const handleActiveItemSelection = React.useCallback(() => {
        handleOptionClick(getActiveItem(listRef));
    }, [handleOptionClick]);

    const handleControlKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
        // prevent dialog closing in case of item selection by Enter/Spacebar keydown
        if ([KeyCode.ENTER, KeyCode.SPACEBAR].includes(e.key) && open) {
            e.preventDefault();

            if (e.key === KeyCode.SPACEBAR) {
                handleActiveItemSelection();
            }
        }

        listRef?.current?.onKeyDown(e);
    };

    const handleQuickSearchChange = React.useCallback((search: string) => {
        if (search) {
            const itemIndex = findItemIndexByQuickSearch(search, getListItems(listRef));

            if (typeof itemIndex === 'number' && itemIndex !== -1) {
                listRef?.current?.activateItem(itemIndex, true);
            }
        }
    }, []);

    useQuickSearch({
        onActiveItemSelect: handleActiveItemSelection,
        onSearchChange: handleQuickSearchChange,
        open,
    });

    React.useEffect(() => {
        if (open) {
            activateFirstClickableItem(listRef);
            const nextControlRect = controlRef.current?.getBoundingClientRect();
            dispatch({type: 'SET_CONTROL_RECT', payload: {controlRect: nextControlRect}});
        }

        onOpenChange?.(open);
    }, [open, onOpenChange]);

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
                controlRef={controlRef}
                width={popupWidth}
                minWidth={popupMinWidth}
                verticalOffset={popupVerticalOffset}
                open={open}
                handleClose={handleClose}
            >
                <SelectList
                    ref={listRef}
                    size={size}
                    value={value}
                    flattenOptions={flattenOptions}
                    height={popupHeight}
                    multiple={multiple}
                    virtualized={virtualized}
                    onOptionClick={handleOptionClick}
                    renderOption={renderOption}
                    getOptionHeight={getOptionHeight}
                />
            </SelectPopup>
        </React.Fragment>
    );
}) as SelectComponent;

Select.Option = Option;
Select.OptionGroup = OptionGroup;
