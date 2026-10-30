'use client';

import * as React from 'react';

import {KeyCode} from '../../constants';
import {useControlledState, useFocusWithin, useForkRef, useUniqId} from '../../hooks';
import {useOpenState} from '../../hooks/useSelect/useOpenState';
import {useListFocusOwner} from '../List';
import {useListVirtualization} from '../List/VirtualizationContext';
import {OuterAdditionalContent} from '../controls/common/OuterAdditionalContent/OuterAdditionalContent';
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
import type {SelectProps, SelectRenderPopup} from './types';
import type {SelectFilterRef} from './types-misc';
import type {FlattenOption} from './utils';
import {
    getGroupOfOption,
    getGroupsWithOptions,
    getOptionsFromChildren,
    getSelectValueKey,
    getSelectedOptionsContent,
    getSelectedValues,
    getValueByKey,
    isSelectGroupTitle,
} from './utils';

import './Select.scss';

//https://stackoverflow.com/a/58473012
// The last, non-generic signature is the one `React.ComponentProps` reads: it keeps the string value
type SelectComponent = {
    <T = any, V = string>(
        p: SelectProps<T, V> & {ref?: React.Ref<HTMLButtonElement>},
    ): React.ReactElement;
    (p: SelectProps & {ref?: React.Ref<HTMLButtonElement>}): React.ReactElement;
} & {Option: typeof Option} & {OptionGroup: typeof OptionGroup};

export const DEFAULT_RENDER_POPUP: SelectRenderPopup = ({renderFilter, renderList}) => {
    return (
        <React.Fragment>
            {renderFilter()}
            {renderList()}
        </React.Fragment>
    );
};

// Inside, a value is only ever compared by its key: the type of it stays with the consumer
type InnerSelectProps = SelectProps<any, unknown>;

export const Select = React.forwardRef<HTMLButtonElement, InnerSelectProps>(function Select(
    rawProps: InnerSelectProps,
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
        selectionStyle,
        renderSelectedOptions,
        renderEmptyOptions,
        renderPopup = DEFAULT_RENDER_POPUP,
        getOptionText,
        getValueKey,
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
        defaultValue = [],
        defaultOpen,
        open: propsOpen,
        label,
        placeholder,
        filterPlaceholder,
        width,
        popupWidth,
        popupPlacement,
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
    // The popup is anchored to a wrapper of the trigger: the trigger shrinks while pressed
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const controlRef = React.useRef<HTMLElement>(null);
    const filterRef = React.useRef<SelectFilterRef>(null);
    const handleControlRef = useForkRef(ref, controlRef);

    // One owner for two elements: the trigger and the filter input. The list is mounted only while
    // the popup is open, so the owner is connected exactly then
    const focusOwner = useListFocusOwner();
    // The mobile sheet hides the trigger, and without a filter there is no input left to own the
    // list: the list takes the focus itself, and the sheet is a dialog with a listbox in it
    const listOwnsFocus = mobile && !filterable;
    const activeItemRef = React.useRef<HTMLElement | null>(null);

    const [value, setValueState] = useControlledState(propsValue, defaultValue, onUpdate);
    const getKey = React.useCallback(
        (item: unknown) => getSelectValueKey(item, getValueKey),
        [getValueKey],
    );
    const selectedKeys = React.useMemo(() => value.map(getKey), [value, getKey]);
    const {open, toggleOpen} = useOpenState({
        defaultOpen,
        onClose,
        onOpenChange,
        open: propsOpen,
    });

    const setValue = React.useCallback(
        (nextValue: unknown[]) => {
            if (!disabled) {
                setValueState(nextValue);
            }
        },
        [disabled, setValueState],
    );
    const handleClearValue = React.useCallback(() => setValue([]), [setValue]);

    const propsOptions = props.options || getOptionsFromChildren(props.children);
    const options = useSelectOptions({
        options: propsOptions,
        filter,
        filterable,
        filterOption,
        getOptionText,
    });
    const filteredOptions = getSelectFilteredOptions(options) as FlattenOption[];

    // Options without the group headers and without the filter: typing does not switch the list
    const optionsCount = React.useMemo(
        () =>
            (options as FlattenOption[]).reduce(
                (count, option) => count + (isSelectGroupTitle(option) ? 0 : 1),
                0,
            ),
        [options],
    );
    const virtualization = useListVirtualization(optionsCount);
    const virtualized = virtualization !== null;

    React.useEffect(() => {
        virtualization?.preload();
    }, [virtualization]);

    // Which group an option came from: flattening loses the boundary, filtering keeps the objects
    const groupOfOption = getGroupOfOption(options);
    const groupsWithOptions = getGroupsWithOptions(options);
    const selectedValues = React.useMemo(
        () => getSelectedValues(options as FlattenOption[], value, getKey),
        [options, value, getKey],
    );
    const selectedOptionsContent = React.useMemo(() => {
        return getSelectedOptionsContent(
            options,
            selectedValues,
            getKey,
            renderSelectedOptions,
            getOptionText,
        );
    }, [options, selectedValues, getKey, renderSelectedOptions, getOptionText]);

    // The way back from the ids of the List: a selected value may have no option
    const valueByKey = React.useMemo(
        () => getValueByKey(options as FlattenOption[], value, getKey),
        [options, value, getKey],
    );
    const handleSelectedUpdate = React.useCallback(
        (keys: string[]) => setValue(keys.map((key) => valueByKey.get(key))),
        [setValue, valueByKey],
    );

    // The key of a value identifies the row of an option, and the list keeps one row per id. Two
    // options with one key were never two choices — clicking either applied the same value — but the
    // message about it should come from the component the consumer is holding
    const duplicateKey = React.useMemo(() => {
        if (process.env.NODE_ENV === 'production') {
            return undefined;
        }

        const seen = new Set<string>();

        for (const option of options as FlattenOption[]) {
            if (isSelectGroupTitle(option)) {
                continue;
            }

            const key = getKey(option.value);

            if (seen.has(key)) {
                return key;
            }

            seen.add(key);
        }

        return undefined;
    }, [options, getKey]);

    if (duplicateKey !== undefined) {
        warnOnce(
            `[Select] More than one option has the value "${duplicateKey}". The value identifies the row of an option: such rows share one DOM id and all of them show the content of the last option — make the values unique (or their \`getValueKey\`).`,
        );
    }

    if (
        process.env.NODE_ENV !== 'production' &&
        !virtualized &&
        optionsCount > VIRTUALIZATION_HINT_OPTIONS_COUNT
    ) {
        warnOnce(
            `[Select] The list renders ${VIRTUALIZATION_HINT_OPTIONS_COUNT}+ options as DOM rows at once. Wrap the Select in <ListVirtualizer> from '@gravity-ui/uikit/virtualizer' (or lower the \`minItemsCount\` of the one above it) to render only the visible ones.`,
        );
    }

    const {errorMessage, validationState, errorPlacement = 'outside'} = props;
    const errorMessageId = useUniqId();

    const isErrorStateVisible = validationState === 'invalid';
    const isErrorMsgVisible =
        isErrorStateVisible && Boolean(errorMessage) && errorPlacement === 'outside';
    const isErrorIconVisible =
        isErrorStateVisible && Boolean(errorMessage) && errorPlacement === 'inside';

    const handleOptionAction = React.useCallback(() => {
        if (!multiple) {
            toggleOpen(false);
        }
    }, [multiple, toggleOpen]);

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
    const labelId = useUniqId();
    // `aria-labelledby` overrides `aria-label`, so the trigger references itself to keep it in the
    // name. A custom control does not render the label
    const triggerLabelledBy =
        label && !renderControl
            ? [props['aria-label'] && selectId, props['aria-labelledby'], labelId]
                  .filter(Boolean)
                  .join(' ')
            : props['aria-labelledby'];
    // The list repeats the references of the trigger instead of pointing at it: a name is not
    // computed through two references in a row, so the label of the trigger would be lost
    const listLabelledBy = triggerLabelledBy || selectId;

    const [activeItemId, setActiveItemId] = useActiveItemId({
        options: filteredOptions,
        open,
        value,
        getKey,
    });

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
                e.preventDefault();
            }
            if ([KeyCode.ARROW_DOWN, KeyCode.ARROW_UP].includes(e.key) && !open) {
                e.preventDefault();
                toggleOpen();
            }
            if (e.key === KeyCode.ESCAPE && open) {
                toggleOpen(false);
            }
        },
        [open, toggleOpen],
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
                    selectedKeys={selectedKeys}
                    getKey={getKey}
                    mobile={mobile}
                    flattenOptions={filteredOptions}
                    groupOfOption={groupOfOption}
                    groupsWithOptions={groupsWithOptions}
                    multiple={multiple}
                    virtualization={virtualization}
                    onSelectedUpdate={handleSelectedUpdate}
                    onOptionAction={handleOptionAction}
                    renderOption={renderOption}
                    renderOptionGroup={renderOptionGroup}
                    selectionStyle={selectionStyle}
                    getOptionText={getOptionText}
                    getOptionHeight={getOptionHeight}
                    getOptionGroupHeight={getOptionGroupHeight}
                    loading={props.loading}
                    onLoadMore={props.onLoadMore}
                    id={popupId}
                    labelledBy={listLabelledBy}
                    // The Sheet and the Popup keep the list mounted while they animate out: a list
                    // the Select has already closed must not keep the keyboard of the trigger
                    focusOwner={open && !listOwnsFocus ? focusOwner : undefined}
                    activeItemId={activeItemId}
                    activeItemRef={activeItemRef}
                    onActiveItemUpdate={handleActiveItemUpdate}
                />
            );
        }

        return <EmptyOptions filter={filter} renderEmptyOptions={renderEmptyOptions} />;
    };

    return (
        <div
            className={selectBlock(mods, className)}
            {...focusWithinProps}
            style={inlineStyles}
            tabIndex={-1}
        >
            <div ref={anchorRef} className={selectBlock('anchor')}>
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
                    selectedCount={selectedValues.length}
                    popupId={popupId}
                    selectId={selectId}
                    labelId={labelId}
                    labelledBy={triggerLabelledBy}
                    focusOwner={focusOwner}
                    hasCounter={multiple && hasCounter}
                    renderCounter={renderCounter}
                    title={title}
                />
            </div>
            <SelectPopup
                ref={anchorRef}
                className={popupClassName}
                sheetClassName={sheetClassName}
                sheetTitle={label}
                controlRef={controlRef}
                width={popupWidth}
                open={open}
                handleClose={handleClose}
                disablePortal={disablePortal}
                virtualized={virtualized}
                mobile={mobile}
                placement={popupPlacement}
                // The keyboard acts on the active row right away; with a filter the sheet focuses
                // itself, since focusing the input would open the on-screen keyboard
                sheetInitialFocus={listOwnsFocus ? activeItemRef : undefined}
                // The sheet is named like the trigger: without a label it has no title
                sheetLabelledBy={listLabelledBy}
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
                selectedValues={selectedValues}
                getKey={getKey}
                disabled={disabled}
                form={form}
                onReset={setValue}
            />
        </div>
    );
}) as unknown as SelectComponent;

Select.Option = Option;
Select.OptionGroup = OptionGroup;
