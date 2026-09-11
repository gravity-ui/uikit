'use client';

import * as React from 'react';

import {KeyCode} from '../../constants';
import {useControlledState, useFocusWithin, useForkRef, useSelect, useUniqId} from '../../hooks';
import {OuterAdditionalContent} from '../controls/common/OuterAdditionalContent/OuterAdditionalContent';
import {errorPropsMapper} from '../controls/utils';
import {useListFocusOwner} from '../lab/List';
import {ListVirtualizationContext} from '../lab/List/VirtualizationContext';
import {useMobile} from '../mobile';
import {useDefaultProps} from '../theme/useDefaultProps';
import type {CnMods} from '../utils/cn';
import {filterDOMProps} from '../utils/filterDOMProps';
import {warnOnce} from '../utils/warn';

import {
    EmptyOptions,
    HiddenSelect,
    SelectControl,
    SelectFilter,
    SelectList,
    SelectPopup,
} from './components';
import {VIRTUALIZATION_HINT_OPTIONS_COUNT, selectBlock} from './constants';
import {useActiveItemId} from './hooks';
import {getSelectFilteredOptions, useSelectOptions} from './hooks-public';
import {Option, OptionGroup} from './tech-components';
import type {SelectOption, SelectProps, SelectRenderPopup} from './types';
import type {SelectFilterRef} from './types-misc';
import type {FlattenOption} from './utils';
import {getOptionsFromChildren, getSelectedOptionsContent, isSelectGroupTitle} from './utils';

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
    rawProps: SelectProps<T>,
    ref: React.Ref<HTMLButtonElement>,
) {
    const props = useDefaultProps('Select', rawProps);
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
        getOptionText,
        getOptionHeight,
        getOptionGroupHeight,
        filterOption,
        name,
        form,
        className,
        controlClassName,
        popupClassName,
        sheetClassName,
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
    const handleControlRef = useForkRef(ref, controlRef);

    // One owner for two elements: the trigger and the filter input. The list is mounted only while
    // the popup is open, so the owner is connected exactly then
    const focusOwner = useListFocusOwner();
    // Virtualization is opt-in from the outside: <ListVirtualizer> around the Select. The context
    // reaches the list through the portal of the popup; the Select needs to know about it for the
    // width of the popup and for the modifier of the list
    const virtualized = React.useContext(ListVirtualizationContext) !== null;

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
        getOptionText,
    });
    const filteredOptions = getSelectFilteredOptions(options) as FlattenOption[];
    const selectedOptionsContent = React.useMemo(() => {
        return getSelectedOptionsContent(options, value, renderSelectedOption, getOptionText);
    }, [options, value, renderSelectedOption, getOptionText]);

    if (!virtualized && filteredOptions.length > VIRTUALIZATION_HINT_OPTIONS_COUNT) {
        warnOnce(
            `[Select] The list renders ${VIRTUALIZATION_HINT_OPTIONS_COUNT}+ options as DOM rows at once. Wrap the Select in <ListVirtualizer> from '@gravity-ui/uikit/virtualizer' to render only the visible ones.`,
        );
    }

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
        (option?: SelectOption) => {
            if (!option || option.disabled) {
                return;
            }

            handleSelection(option);
        },
        [handleSelection],
    );

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

    const [activeItemId, setActiveItemId] = useActiveItemId({
        options: filteredOptions,
        open,
        value,
    });

    const optionByValue = React.useMemo(() => {
        const map = new Map<string, SelectOption>();

        for (const option of filteredOptions) {
            if (!isSelectGroupTitle(option)) {
                map.set(option.value, option);
            }
        }

        return map;
    }, [filteredOptions]);

    const activeOption = activeItemId === undefined ? undefined : optionByValue.get(activeItemId);

    const handleActiveItemUpdate = React.useCallback(
        (id: string | null) => {
            setActiveItemId(id ?? undefined);
        },
        [setActiveItemId],
    );

    const handleControlKeyDown = React.useCallback(
        (e: React.KeyboardEvent<HTMLElement>) => {
            // prevent dialog closing in case of item selection by Enter/Spacebar keydown
            if ([KeyCode.ENTER, KeyCode.SPACEBAR].includes(e.key) && open) {
                // Enter is applied by the core, and so is a Space that continues a search by the
                // first letters (the core marks it as handled) — the rest of the spaces are the
                // gesture of the Select
                const handledByList = e.defaultPrevented;

                e.preventDefault();

                if (e.key === KeyCode.SPACEBAR && !handledByList) {
                    handleOptionClick(activeOption);
                }
            }
            if ([KeyCode.ARROW_DOWN, KeyCode.ARROW_UP].includes(e.key) && !open) {
                e.preventDefault();
                toggleOpen();
            }
            if (e.key === KeyCode.ESCAPE && open) {
                toggleOpen(false);
            }
        },
        [activeOption, handleOptionClick, open, toggleOpen],
    );

    const handleFilterKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === KeyCode.ENTER) {
            e.preventDefault();
        }
    }, []);

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
                    focusOwner={focusOwner}
                    open={open}
                />
            );
        }

        return null;
    };

    const _renderList = () => {
        if (filteredOptions.length || props.loading) {
            return (
                <SelectList
                    size={size}
                    value={value}
                    mobile={mobile}
                    flattenOptions={filteredOptions}
                    multiple={multiple}
                    virtualized={virtualized}
                    onOptionClick={handleOptionClick}
                    renderOption={renderOption}
                    renderOptionGroup={renderOptionGroup}
                    getOptionText={getOptionText}
                    getOptionHeight={getOptionHeight}
                    getOptionGroupHeight={getOptionGroupHeight}
                    loading={props.loading}
                    onLoadMore={props.onLoadMore}
                    id={popupId}
                    labelledBy={selectId}
                    // The Sheet and the Popup keep the list mounted while they animate out: a list
                    // the Select has already closed must not keep the keyboard of the trigger
                    focusOwner={open ? focusOwner : undefined}
                    activeItemId={activeItemId}
                    onActiveItemUpdate={handleActiveItemUpdate}
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
                focusOwner={focusOwner}
                hasCounter={multiple && hasCounter}
                renderCounter={renderCounter}
                title={title}
            />
            <SelectPopup
                ref={controlWrapRef}
                className={popupClassName}
                sheetClassName={sheetClassName}
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
                    filterable && !propsFilter
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
