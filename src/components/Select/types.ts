import React from 'react';
import {TextInputView, TextInputSize, TextInputPin} from '../TextInput';

export type SelectProps<T = unknown> = {
    renderOption?: (option: SelectOption<T>) => React.ReactNode;
    getOptionHeight?: (option: SelectOption<T>) => number;
    view?: TextInputView;
    size?: TextInputSize;
    pin?: TextInputPin;
    controlWidth?: 'unset' | 'auto' | 'max' | number;
    listboxWidth?: number;
    className?: string;
    label?: string;
    placeholder?: React.ReactNode;
    value?: string[];
    options?: (SelectOption<T> | SelectOptgroup<T>)[];
    multiple?: boolean;
    disabled?: boolean;
};

export type SelectOption<T = unknown> = React.OptionHTMLAttributes<T> & {
    label: string;
    value: string;
};

export type SelectOptgroup<T = unknown> = {
    label: string;
    options: SelectOption<T>[];
};
