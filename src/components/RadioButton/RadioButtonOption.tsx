import React from 'react';

import {useRadio} from '../../hooks/private';
import type {ControlProps} from '../types';
import {block} from '../utils/cn';
import {isIcon} from '../utils/common';

const b = block('radio-button');

export interface RadioButtonOptionProps extends ControlProps {
    value: string;
    content?: React.ReactNode;
    children?: React.ReactNode;
}

export const RadioButtonOption = React.forwardRef<HTMLLabelElement, RadioButtonOptionProps>(
    function RadioButtonOption(props, ref) {
        const {disabled = false, content, children} = props;
        const {checked, inputProps} = useRadio(props);
        const inner = content || children;
        const icon = isIcon(inner);

        return (
            <label
                className={b('option', {
                    disabled,
                    checked,
                })}
                ref={ref}
            >
                <input {...inputProps} className={b('option-control')} />
                <span className={b('option-outline')} />
                {inner && <span className={b('option-text', {icon})}>{inner}</span>}
            </label>
        );
    },
);
