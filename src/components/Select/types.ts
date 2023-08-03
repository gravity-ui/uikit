import type React from 'react';

import type {TextInputPin, TextInputSize, TextInputView} from '../TextInput';
import type {ControlGroupOption, ControlGroupProps, QAProps} from '../types';
import type {UseOpenProps} from '../utils/useSelect/types';

import type {Option, OptionGroup} from './tech-components';

export type SelectRenderClearArgs = {
    renderIcon?: () => React.ReactNode;
};

export type SelectRenderControlProps = {
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
    ref: React.Ref<HTMLElement>;
    open: boolean;
    renderClear?: (args: SelectRenderClearArgs) => React.ReactNode;
};
export type SelectRenderControlOptions = {
    value: SelectProps['value'];
};
export type SelectRenderControl = (
    props: SelectRenderControlProps,
    options: SelectRenderControlOptions,
) => React.ReactElement;

export type SelectRenderOptionViewParams = {
    itemHeight: number;
};

export type SelectRenderOption<T> = (
    option: SelectOption<T>,
    options: SelectRenderOptionViewParams,
) => React.ReactElement;

export type SelectSize = TextInputSize;

export type SelectProps<T = any> = QAProps &
    Pick<ControlGroupProps, 'name' | 'disabled'> &
    UseOpenProps & {
        onUpdate?: (value: string[]) => void;
        onFilterChange?: (filter: string) => void;
        renderControl?: SelectRenderControl;
        renderFilter?: (props: {
            onChange: (filter: string) => void;
            onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
            value: string;
            ref: React.Ref<HTMLInputElement>;
            style: React.CSSProperties;
        }) => React.ReactElement;
        renderOption?: SelectRenderOption<T>;
        renderSelectedOption?: (option: SelectOption<T>, index: number) => React.ReactElement;
        renderEmptyOptions?: ({filter}: {filter: string}) => React.ReactElement;
        getOptionHeight?: (option: SelectOption<T>) => number;
        filterOption?: (option: SelectOption<T>, filter: string) => boolean;
        view?: TextInputView;
        size?: SelectSize;
        pin?: TextInputPin;
        width?: 'auto' | 'max' | number;
        popupWidth?: 'outfit' | 'fit' | number;
        virtualizationThreshold?: number;
        className?: string;
        controlClassName?: string;
        popupClassName?: string;
        label?: string;
        placeholder?: React.ReactNode;
        filterPlaceholder?: string;
        value?: string[];
        defaultValue?: string[];
        options?: (SelectOption<T> | SelectOptionGroup<T>)[];
        error?: string | boolean;
        multiple?: boolean;
        filterable?: boolean;
        disablePortal?: boolean;
        hasClear?: boolean;
        loading?: boolean;
        children?:
            | React.ReactElement<SelectOption<T>, typeof Option>
            | React.ReactElement<SelectOption<T>, typeof Option>[]
            | React.ReactElement<SelectOptionGroup<T>, typeof OptionGroup>
            | React.ReactElement<SelectOptionGroup<T>, typeof OptionGroup>[];
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
