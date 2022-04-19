import React from 'react';
import {TextInputView, TextInputSize, TextInputPin} from '../TextInput';
import {ControlGroupProps, ControlGroupOption} from '../types';
import {Option, OptionGroup} from './tech-components';

export type SelectProps = Pick<ControlGroupProps, 'name' | 'disabled'> & {
    onUpdate?: (value: string[]) => void;
    onOpenChange?: (args: {open: boolean}) => void;
    renderControl?: () => React.ReactNode;
    renderOption?: (option: SelectOption) => React.ReactNode;
    getOptionHeight?: (option: SelectOption) => number;
    view?: TextInputView;
    size?: TextInputSize;
    pin?: TextInputPin;
    width?: 'auto' | 'max' | number;
    popupWidth?: number;
    className?: string;
    label?: string;
    placeholder?: React.ReactNode;
    value?: string[];
    defaultValue?: string[];
    options?: (SelectOption | SelectOptionGroup)[];
    multiple?: boolean;
    children?:
        | React.ReactElement<SelectOption, typeof Option>
        | React.ReactElement<SelectOption, typeof Option>[]
        | React.ReactElement<SelectOptionGroup, typeof OptionGroup>
        | React.ReactElement<SelectOptionGroup, typeof OptionGroup>[];
};

export type SelectOption = ControlGroupOption & {
    text?: string;
    data?: any;
};

export type SelectOptionGroup = {
    label: string;
    options?: SelectOption[];
    children?:
        | React.ReactElement<SelectOption, typeof Option>
        | React.ReactElement<SelectOption, typeof Option>[];
};
