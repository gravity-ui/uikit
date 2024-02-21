import React from 'react';

import {KeyCode} from '../../constants';
import {useFocusWithin, useForkRef, useSelect, useUniqId} from '../../hooks';
import type {List} from '../List';
import {OuterAdditionalContent} from '../controls/common/OuterAdditionalContent/OuterAdditionalContent';
import {errorPropsMapper} from '../controls/utils';
import {useMobile} from '../mobile';
import type {CnMods} from '../utils/cn';

import {EmptyOptions, SelectControl, SelectFilter, SelectList, SelectPopup} from './components';
import {DEFAULT_VIRTUALIZATION_THRESHOLD, selectBlock} from './constants';
import {useQuickSearch} from './hooks';
import {getSelectFilteredOptions, useSelectOptions} from './hooks-public';
import {initialState, reducer} from './store';
import {Option, OptionGroup} from './tech-components';
import type {SelectProps, SelectRenderPopup} from './types';
import type {SelectFilterRef} from './types-misc';
import {
    activateFirstClickableItem,
    findItemIndexByQuickSearch,
    getActiveItem,
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

export const DEFAULT_RENDER_POPUP: SelectRenderPopup = ({renderFilter, renderList}) => {
    return (
        <React.Fragment>
            {renderFilter()}
            {renderList()}
        </React.Fragment>
    );
};

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
        renderOptionGroup,
        renderSelectedOption,
        renderEmptyOptions,
        renderPopup = DEFAULT_RENDER_POPUP,
        getOptionHeight,
        getOptionGroupHeight,
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
        popupPlacement,
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
        id,
    } = props;
    const mobile = useMobile();
    const [{filter}, dispatch] = React.useReducer(reducer, initialState);
    // to avoid problem with incorrect popper offset calculation
    // for example: https://github.com/radix-ui/primitives/issues/1567
    const controlWrapRef = React.useRef<HTMLDivElement>(null);
    const controlRef = React.useRef<HTMLElement>(null);
    const filterRef = React.useRef<SelectFilterRef>(null);
    const listRef = React.useRef<List<FlattenOption>>(null);
    const handleControlRef = useForkRef(ref, controlRef);

    const handleFilterChange = React.useCallback(
        (nextFilter: string) => {
            onFilterChange?.(nextFilter);
            dispatch({type: 'SET_FILTER', payload: {filter: nextFilter}});
        },
        [onFilterChange],
    );

    const handleOpenChange = React.useCallback(
        (open: boolean) => {
            onOpenChange?.(open);

            if (!open && filterable) {
                // FIXME: rework after https://github.com/gravity-ui/uikit/issues/1354
                setTimeout(() => {
                    handleFilterChange('');
                }, 100);
            }
        },
        [filterable, onOpenChange, handleFilterChange],
    );

    const {
        value,
        open,
        activeIndex,
        toggleOpen,
        handleSelection,
        handleClearValue,
        setActiveIndex,
    } = useSelect({
        onUpdate,
        value: propsValue,
        defaultValue,
        defaultOpen,
        multiple,
        open: propsOpen,
        onClose,
        onOpenChange: handleOpenChange,
    });
    const uniqId = useUniqId();
    const selectId = id ?? uniqId;
    const propsOptions = props.options || getOptionsFromChildren(props.children);
    const options = useSelectOptions({
        options: propsOptions,
        filter,
        filterable,
        filterOption,
    });
    const filteredOptions = getSelectFilteredOptions(options) as FlattenOption[];
    const selectedOptionsContent = getSelectedOptionsContent(options, value, renderSelectedOption);
    const virtualized = filteredOptions.length >= virtualizationThreshold;

    const {errorMessage, errorPlacement, validationState} = errorPropsMapper({
        error,
        errorMessage: props.errorMessage,
        errorPlacement: props.errorPlacement || 'outside',
        validationState: props.validationState,
    });
    const errorMessageId = useUniqId();

    const isErrorMsgVisible =
        validationState === 'invalid' && Boolean(errorMessage) && errorPlacement === 'outside';
    const isErrorIconVisible =
        validationState === 'invalid' && Boolean(errorMessage) && errorPlacement === 'inside';
    const isErrorStateVisible = isErrorMsgVisible || isErrorIconVisible;

    const handleOptionClick = React.useCallback(
        (option?: FlattenOption) => {
            if (!option || option?.disabled || 'label' in option) {
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
            if ([KeyCode.ARROW_DOWN, KeyCode.ARROW_UP].includes(e.key) && !open) {
                e.preventDefault();
                toggleOpen();
            }

            listRef?.current?.onKeyDown(e);
        },
        [handleOptionClick, open, toggleOpen],
    );

    const handleFilterKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLElement>) => {
        listRef?.current?.onKeyDown(e);
    }, []);

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
    const {onFocus, onBlur} = props;
    const {focusWithinProps} = useFocusWithin({
        onFocusWithin: onFocus,
        onBlurWithin: React.useCallback(
            (e: React.FocusEvent) => {
                onBlur?.(e);
                handleClose();
            },
            [handleClose, onBlur],
        ),
    });

    const _renderFilter = () => {
        if (filterable) {
            return (
                <SelectFilter
                    ref={filterRef}
                    size={size}
                    value={filter}
                    placeholder={filterPlaceholder}
                    onChange={handleFilterChange}
                    onKeyDown={handleFilterKeyDown}
                    renderFilter={renderFilter}
                />
            );
        }

        return null;
    };

    const _renderList = () => {
        if (filteredOptions.length || props.loading) {
            return (
                <SelectList
                    ref={listRef}
                    size={size}
                    value={value}
                    mobile={mobile}
                    flattenOptions={filteredOptions}
                    multiple={multiple}
                    virtualized={virtualized}
                    onOptionClick={handleOptionClick}
                    renderOption={renderOption}
                    renderOptionGroup={renderOptionGroup}
                    getOptionHeight={getOptionHeight}
                    getOptionGroupHeight={getOptionGroupHeight}
                    loading={props.loading}
                    onLoadMore={props.onLoadMore}
                    selectId={`select-${selectId}`}
                    onChangeActive={setActiveIndex}
                />
            );
        }

        return <EmptyOptions filter={filter} renderEmptyOptions={renderEmptyOptions} />;
    };

    return (
        <div
            ref={controlWrapRef}
            className={selectBlock(mods, className)}
            {...focusWithinProps}
            style={inlineStyles}
        >
            <SelectControl
                toggleOpen={toggleOpen}
                hasClear={hasClear}
                clearValue={handleClearValue}
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
                isErrorVisible={isErrorStateVisible}
                errorMessage={isErrorIconVisible ? errorMessage : undefined}
                open={open}
                disabled={disabled}
                onKeyDown={handleControlKeyDown}
                renderControl={renderControl}
                value={value}
                popupId={`select-popup-${selectId}`}
                selectId={`select-${selectId}`}
                activeIndex={activeIndex}
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
                id={`select-popup-${selectId}`}
                placement={popupPlacement}
            >
                {renderPopup({renderFilter: _renderFilter, renderList: _renderList})}
            </SelectPopup>

            <OuterAdditionalContent
                errorMessage={isErrorMsgVisible ? errorMessage : null}
                errorMessageId={errorMessageId}
            />
        </div>
    );
}) as unknown as SelectComponent;

Select.Option = Option;
Select.OptionGroup = OptionGroup;
