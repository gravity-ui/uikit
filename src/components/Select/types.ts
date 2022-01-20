import React from 'react';
import {TextInputView, TextInputSize, TextInputPin} from '../TextInput';

export type SelectProps = {
    view?: TextInputView;
    size?: TextInputSize;
    pin?: TextInputPin;
    controlWidth?: 'unset' | 'auto' | 'max' | number;
    label?: string;
    placeholder?: React.ReactNode;
    value?: string[];
};
