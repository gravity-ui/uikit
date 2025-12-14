'use client';

import * as React from 'react';

import {useCheckbox} from '../../hooks/private';
import {ControlLabel} from '../ControlLabel';
import type {ControlProps, DOMProps, QAProps} from '../types';
import {block} from '../utils/cn';

import './Switch.scss';

const b = block('switch');

export type SwitchSize = 's' | 'm' | 'l';

export interface SwitchProps extends ControlProps, DOMProps, QAProps {
    size?: SwitchSize;
    loading?: boolean;
    content?: React.ReactNode;
    children?: React.ReactNode;
    title?: string;
}

export const Switch = React.forwardRef<HTMLLabelElement, SwitchProps>(function Switch(props, ref) {
    const {
        size = 'm',
        disabled = false,
        loading = false,
        content,
        children,
        title,
        style,
        className,
        qa,
    } = props;
    const {checked, inputProps} = useCheckbox({
        ...props,
        controlProps: {...props.controlProps, role: 'switch'},
    });
    const text = content || children;

    const control = (
        <span className={b('indicator')}>
            <input {...inputProps} className={b('control')} />
            <span className={b('outline')} />
            <span className={b('slider')} />
        </span>
    );

    return (
        <ControlLabel
            ref={ref}
            title={title}
            style={style}
            size={size}
            disabled={disabled}
            className={b(
                {
                    size,
                    disabled,
                    checked,
                    loading,
                },
                className,
            )}
            labelClassName={b('text')}
            qa={qa}
            control={control}
        >
            {text}
        </ControlLabel>
    );
});
