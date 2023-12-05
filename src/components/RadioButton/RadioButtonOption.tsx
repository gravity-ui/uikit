import React from 'react';

import {useRadio} from '../../hooks/private';
import type {ControlProps} from '../types';
import {block} from '../utils/cn';
import {isIcon} from '../utils/common';

const b = block('radio-button');

export interface RadioButtonOptionProps<ValueType extends string> extends ControlProps {
    value: ValueType;
    content?: React.ReactNode;
    children?: React.ReactNode;
}

type RadioButtonOptionComponentType = <T extends string>(
    props: RadioButtonOptionProps<T> & {ref?: React.ForwardedRef<HTMLLabelElement>},
) => React.JSX.Element;

export const RadioButtonOption = React.forwardRef(function RadioButtonOption<T extends string>(
    props: RadioButtonOptionProps<T>,
    ref: React.ForwardedRef<HTMLLabelElement>,
) {
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
}) as unknown as RadioButtonOptionComponentType;
