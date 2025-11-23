'use client';

import * as React from 'react';

import {KeyCode} from '../../constants';
import {useControlledState, useFocusWithin, useForkRef, useSelect, useUniqId} from '../../hooks';
import type {List} from '../List';
import {OuterAdditionalContent} from '../controls/common/OuterAdditionalContent/OuterAdditionalContent';
import {errorPropsMapper} from '../controls/utils';
import {useMobile} from '../mobile';
import type {CnMods} from '../utils/cn';
import {filterDOMProps} from '../utils/filterDOMProps';

import {
    EmptyOptions,
    HiddenSelect,
    SelectControl,
    SelectFilter,
    SelectList,
    SelectPopup,
} from './components';
import {DEFAULT_VIRTUALIZATION_THRESHOLD, selectBlock} from './constants';
import {useActiveItemIndex, useQuickSearch} from './hooks';
import {getSelectFilteredOptions, useSelectOptions} from './hooks-public';
import {Option, OptionGroup} from './tech-components';
import type {SelectProps, SelectRenderPopup} from './types';
import type {SelectFilterRef} from './types-misc';
import {
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
        form,
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
        filter: propsFilter,
        disablePortal,
        hasClear = false,
        onClose,
        id,
        hasCounter,
        renderCounter,
        title,
    } = props;
    const mobile = useMobile();
    const [filter, setFilter] = useControlledState(propsFilter, '', onFilterChange);
    // to avoid problem with incorrect popper offset calculation
    // for example: https://github.com/radix-ui/primitives/issues/1567
    const controlWrapRef = React.useRef<HTMLDivElement>(null);
    const controlRef = React.useRef<HTMLElement>(null);
    const filterRef = React.useRef<SelectFilterRef>(null);
    const listRef = React.useRef<List<FlattenOption>>(null);
    const handleControlRef = useForkRef(ref, controlRef);

    const {value, open, toggleOpen, setValue, handleSelection, handleClearValue} = useSelect({
        onUpdate,
        value: propsValue,
        defaultValue,
        defaultOpen,
        multiple,
        open: propsOpen,
        onClose,
        onOpenChange,
        disabled,
    });

    React.useEffect(() => {
        if (!open && filterable && mobile) {
            // FIXME: add handlers to Sheet like in https://github.com/gravity-ui/uikit/issues/1354
            setTimeout(() => {
                setFilter('');
            }, 300);
        }
    }, [open, filterable, setFilter, mobile]);

    const propsOptions = props.options || getOptionsFromChildren(props.children);
    const options = useSelectOptions({
        options: propsOptions,
        filter,
        filterable,
        filterOption,
    });
    const filteredOptions = getSelectFilteredOptions(options) as FlattenOption[];
    const selectedOptionsContent = React.useMemo(() => {
        return getSelectedOptionsContent(options, value, renderSelectedOption);
    }, [options, value, renderSelectedOption]);
    const virtualized = filteredOptions.length >= virtualizationThreshold;

    const {errorMessage, errorPlacement, validationState} = errorPropsMapper({
        error,
        errorMessage: props.errorMessage,
        errorPlacement: props.errorPlacement || 'outside',
        validationState: props.validationState,
    });
    const errorMessageId = useUniqId();

    const isErrorStateVisible = validationState === 'invalid';
    const isErrorMsgVisible =
        isErrorStateVisible && Boolean(errorMessage) && errorPlacement === 'outside';
    const isErrorIconVisible =
        isErrorStateVisible && Boolean(errorMessage) && errorPlacement === 'inside';

    const handleOptionClick = React.useCallback(
        (option?: FlattenOption) => {
            if (!option || option?.disabled || 'label' in option) {
                return;
            }

            if (multiple) {
                const activeItemIndex = listRef?.current?.getActiveItem();

                if (!mobile) {
                    filterRef.current?.focus();
                }

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
        [handleSelection, mobile, multiple],
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
            if (e.key === KeyCode.ESCAPE && open) {
                toggleOpen(false);
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

                if (!mobile) {
                    handleClose();
                }
            },
            [handleClose, mobile, onBlur],
        ),
    });

    const uniqId = useUniqId();
    const selectId = id ?? uniqId;
    const popupId = `select-popup-${selectId}`;

    const [activeIndex, setActiveIndex] = useActiveItemIndex({
        options: filteredOptions,
        open,
        value,
    });

    const _renderFilter = () => {
        if (filterable) {
            return (
                <SelectFilter
                    ref={filterRef}
                    size={size}
                    value={filter}
                    placeholder={filterPlaceholder}
                    onChange={setFilter}
                    onKeyDown={handleFilterKeyDown}
                    renderFilter={renderFilter}
                    popupId={popupId}
                    activeIndex={activeIndex}
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
                    id={popupId}
                    activeIndex={activeIndex}
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
            tabIndex={-1}
        >
            <SelectControl
                {...filterDOMProps(props, {labelable: true})}
                toggleOpen={toggleOpen}
                hasClear={hasClear}
                clearValue={handleClearValue}
                ref={handleControlRef}
                className={controlClassName}
                qa={qa}
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
                popupId={popupId}
                selectId={selectId}
                activeIndex={activeIndex}
                hasCounter={multiple && hasCounter}
                renderCounter={renderCounter}
                title={title}
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
                placement={popupPlacement}
                onAfterOpen={
                    filterable
                        ? () => {
                              filterRef.current?.focus();
                          }
                        : undefined
                }
                onAfterClose={
                    filterable
                        ? () => {
                              setFilter('');
                          }
                        : undefined
                }
            >
                {renderPopup({renderFilter: _renderFilter, renderList: _renderList})}
            </SelectPopup>
            <OuterAdditionalContent
                errorMessage={isErrorMsgVisible ? errorMessage : null}
                errorMessageId={errorMessageId}
            />
            <HiddenSelect
                name={name}
                value={value}
                disabled={disabled}
                form={form}
                onReset={setValue}
            />
        </div>
    );
}) as unknown as SelectComponent;

Select.Option = Option;
Select.OptionGroup = OptionGroup;
