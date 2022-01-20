import React from 'react';
import {SelectProps} from './types';
import {Control} from './components';

export const Select = (props: SelectProps) => {
    const {
        label,
        placeholder,
        view = 'normal',
        size = 'm',
        pin = 'round-round',
        controlWidth = 'auto',
        value = [],
    } = props;

    return (
        <Control
            view={view}
            size={size}
            pin={pin}
            width={controlWidth}
            label={label}
            placeholder={placeholder}
            value={value}
        />
    );
};
