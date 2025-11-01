import type * as React from 'react';

import type {UseOpenProps} from '../../hooks/useSelect/types';
import type {PopupPlacement} from '../Popup';
import type {InputControlPin, InputControlSize, InputControlView} from '../controls';
import type {AriaLabelingProps, ControlGroupOption, QAProps} from '../types';

import type {Option, OptionGroup} from './tech-components';

export type SelectRenderClearArgs = {
    renderIcon?: () => React.ReactNode;
};

export type SelectRenderTriggerProps = AriaLabelingProps &
    Pick<
        React.ButtonHTMLAttributes<HTMLElement>,
        | 'id'
        | 'type'
        | 'role'
        | 'aria-controls'
        | 'aria-haspopup'
        | 'aria-expanded'
        | 'aria-activedescendant'
        | 'onClick'
        | 'onKeyDown'
        | 'disabled'
    >;

export type SelectRenderControlProps<T extends HTMLElement = HTMLElement> = {
    onClear: () => void;
    renderClear: (args: SelectRenderClearArgs) => React.ReactNode;
    renderCounter: () => React.ReactNode;
    ref: React.Ref<T>;
    open: boolean;
    disabled?: boolean;
    triggerProps: SelectRenderTriggerProps;
};

export type SelectRenderControlOptions = {
    value: SelectProps['value'];
};
export type SelectRenderControl<T extends HTMLElement = HTMLElement> = (
    props: SelectRenderControlProps<T>,
    options: SelectRenderControlOptions,
) => React.ReactElement;

export type SelectRenderOptionViewParams = {
    itemHeight: number;
};

export type SelectRenderOption<T> = (
    option: SelectOption<T>,
    options: SelectRenderOptionViewParams,
) => React.ReactElement;

export type SelectRenderOptionGroup<T> = (
    option: Pick<SelectOptionGroup<T>, 'label'>,
    options: SelectRenderOptionViewParams,
) => React.ReactElement;

export type SelectRenderPopup = (popupItems: {
    renderFilter: () => React.JSX.Element | null;
    renderList: () => React.JSX.Element;
}) => React.ReactElement;

export type SelectFilterInputProps = {value: string} & Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    | 'placeholder'
    | 'onKeyDown'
    | 'onChange'
    | 'size'
    | 'aria-label'
    | 'aria-controls'
    | 'aria-activedescendant'
>;
export type SelectRenderFilter = (props: {
    /** @deprecated use inputProps instead */
    onChange: (filter: string) => void;
    /** @deprecated use inputProps instead */
    onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
    /** @deprecated use inputProps instead */
    value: string;
    ref: React.Ref<HTMLInputElement>;
    style: React.CSSProperties;
    inputProps: SelectFilterInputProps;
}) => React.ReactElement;

export type SelectSize = InputControlSize;

export type SelectRenderCounter = (
    originalComponent: React.ReactElement<SelectCounterProps>,
    counterProps: SelectCounterProps,
) => React.ReactNode;

export type SelectProps<T = any> = AriaLabelingProps &
    QAProps &
    UseOpenProps & {
        onUpdate?: (value: string[]) => void;
        renderControl?: SelectRenderControl;
        renderFilter?: SelectRenderFilter;
        renderOption?: SelectRenderOption<T>;
        renderOptionGroup?: SelectRenderOptionGroup<T>;
        renderSelectedOption?: (option: SelectOption<T>, index: number) => React.ReactElement;
        renderEmptyOptions?: ({filter}: {filter: string}) => React.ReactElement;
        renderPopup?: SelectRenderPopup;
        renderCounter?: SelectRenderCounter;
        getOptionHeight?: (option: SelectOption<T>, index: number) => number;
        getOptionGroupHeight?: (option: SelectOptionGroup<T>, index: number) => number;
        filterOption?: (option: SelectOption<T>, filter: string) => boolean;
        view?: InputControlView;
        size?: SelectSize;
        pin?: InputControlPin;
        width?: 'auto' | 'max' | number;
        popupWidth?: 'fit' | number;
        virtualizationThreshold?: number;
        className?: string;
        controlClassName?: string;
        popupClassName?: string;
        popupPlacement?: PopupPlacement;
        label?: string;
        placeholder?: React.ReactNode;
        filterPlaceholder?: string;
        value?: string[];
        defaultValue?: string[];
        options?: (SelectOption<T> | SelectOptionGroup<T>)[];
        /**
         * @deprecated Prop `error` has a lower priority than `errorMessage`. Use `errorMessage` instead
         */
        error?: string | boolean;
        /** Determines content of the error message */
        errorMessage?: React.ReactNode;
        /** Determines whether the error message will be placed under the input field as text or in the tooltip */
        errorPlacement?: 'outside' | 'inside';
        /** Describes the validation state */
        validationState?: 'invalid';
        multiple?: boolean;
        filterable?: boolean;
        filter?: string;
        onFilterChange?: (filter: string) => void;
        disablePortal?: boolean;
        hasClear?: boolean;
        onFocus?: (e: React.FocusEvent) => void;
        onBlur?: (e: React.FocusEvent) => void;
        loading?: boolean;
        onLoadMore?: () => void;
        children?:
            | React.ReactElement<SelectOption<T>, typeof Option>
            | React.ReactElement<SelectOption<T>, typeof Option>[]
            | React.ReactElement<SelectOptionGroup<T>, typeof OptionGroup>
            | React.ReactElement<SelectOptionGroup<T>, typeof OptionGroup>[];
        id?: string;
        /**Shows selected options count if multiple selection is avalable */
        hasCounter?: boolean;
        title?: string;
        name?: string;
        form?: string;
        disabled?: boolean;
    };

export type SelectOption<T = any> = QAProps &
    ControlGroupOption & {
        text?: string;
        data?: T;
    };

export type SelectOptionGroup<T = any> = {
    /** Label is a string which displayed above the options group.
     * If label is empty string, group item height will be 0 and only border will be displayed */
    label: string;
    data?: T;
    options?: SelectOption<T>[];
    children?:
        | React.ReactElement<SelectOption, typeof Option>
        | React.ReactElement<SelectOption, typeof Option>[];
};

type SelectClearIconProps = {
    size: SelectSize;
    renderIcon: SelectRenderClearArgs['renderIcon'];
};

export type SelectClearProps = SelectClearIconProps & {
    onClick: (e: React.MouseEvent) => void;
    /**
     * select control (button) has styles on focus, focus-in with animation on click event
     * to prevent this on click by clear icon need to set class on button
     * with disabling animation on button
     * @param e
     */
    onMouseEnter: (e: React.MouseEvent) => void;
    onMouseLeave: (e: React.MouseEvent) => void;
};

export type SelectCounterProps = {
    /** amount of selected elements to show */
    count: number;
    /** size of the parent element */
    size: SelectSize;
    /** disabled state of the parent element*/
    disabled?: boolean;
};

export type SelectOptions<T = any> = NonNullable<SelectProps<T>['options']>;
