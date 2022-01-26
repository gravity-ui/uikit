import React from 'react';
import {TextInputView, TextInputSize, TextInputPin} from '../TextInput';
import {ControlGroupProps, ControlGroupOption} from '../types';

export type SelectProps<T = unknown> = Omit<ControlGroupProps, 'value' | 'options'> & {
    renderOption?: (option: SelectOption<T>) => React.ReactNode;
    getOptionHeight?: (option: SelectOption<T>) => number;
    view?: TextInputView;
    size?: TextInputSize;
    pin?: TextInputPin;
    controlWidth?: 'unset' | 'auto' | 'max' | number;
    popupWidth?: number;
    className?: string;
    label?: string;
    placeholder?: React.ReactNode;
    value?: string[];
    options?: (SelectOption<T> | SelectOptgroup<T>)[];
    multiple?: boolean;
};

export type SelectOption<T = unknown> = React.OptionHTMLAttributes<T> &
    ControlGroupOption & {
        value: string;
        searchText?: string;
    };

export type SelectOptgroup<T = unknown> = {
    label: string;
    options: SelectOption<T>[];
};
