import React from 'react';
import {CnMods, block} from '../../../utils/cn';
import {Icon} from '../../../Icon';
import {Chevron} from '../../../icons/Chevron';
import {SelectProps} from '../../types';

import './Control.scss';

const b = block('select-control');

type ControlProps = {
    view: NonNullable<SelectProps['view']>;
    size: NonNullable<SelectProps['size']>;
    pin: NonNullable<SelectProps['pin']>;
    value: string[];
    width?: SelectProps['controlWidth'];
    label?: string;
    placeholder?: SelectProps['placeholder'];
};

export const Control = (props: ControlProps) => {
    const {view, size, pin, value, width, label, placeholder} = props;
    const showValues = Boolean(value.length);
    const showPlaceholder = Boolean(placeholder && !showValues);
    const controlMods: CnMods = {
        view,
        size,
        pin,
        ...(typeof width === 'string' && {width}),
    };
    const controlInlineStyles: React.CSSProperties = {};

    if (typeof width === 'number') {
        controlInlineStyles.width = width;
    }

    return (
        <button className={b(controlMods)} style={controlInlineStyles}>
            {label && <span className={b('label')}>{label}</span>}
            {showPlaceholder && <span className={b('placeholder')}>{placeholder}</span>}
            {showValues && <span className={b('value')}>{value.join(', ')}</span>}
            <Icon className={b('chevron-icon')} data={Chevron} />
        </button>
    );
};
