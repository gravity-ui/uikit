import React from 'react';
import {TextInputView, TextInputSize, TextInputPin} from '../TextInput';
import {ControlGroupProps, ControlGroupOption} from '../types';

export type SelectProps = Omit<ControlGroupProps, 'value' | 'options'> & {
    renderOption?: (option: SelectOption) => React.ReactNode;
    getOptionHeight?: (option: SelectOption) => number;
    view?: TextInputView;
    size?: TextInputSize;
    pin?: TextInputPin;
    controlWidth?: 'unset' | 'auto' | 'max' | number;
    popupWidth?: number;
    className?: string;
    label?: string;
    placeholder?: React.ReactNode;
    value?: string[];
    options?: (SelectOption | SelectOptgroup)[];
    multiple?: boolean;
};

export type SelectOption = ControlGroupOption & {
    searchText?: string;
    data?: any;
};

export type SelectOptgroup = {
    label: string;
    options: SelectOption[];
};
