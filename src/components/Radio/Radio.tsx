'use client';

import * as React from 'react';

import {useRadio} from '../../hooks/private';
import {ControlLabel} from '../ControlLabel';
import type {ControlProps, DOMProps, QAProps} from '../types';
import {block} from '../utils/cn';

import './Radio.scss';

const b = block('radio');

export type RadioSize = 'm' | 'l' | 'xl';

export interface RadioProps extends ControlProps, DOMProps, QAProps {
    value: string;
    size?: RadioSize;
    content?: React.ReactNode;
    children?: React.ReactNode;
    title?: string;
}

export const Radio = React.forwardRef<HTMLLabelElement, RadioProps>(function Radio(props, ref) {
    const {size = 'm', disabled = false, content, children, title, style, className, qa} = props;
    const {checked, inputProps} = useRadio(props);
    const text = content || children;

    const control = (
        <span className={b('indicator')}>
            <span className={b('disc')} />
            <input {...inputProps} className={b('control')} />
            <span className={b('outline')} />
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
                },
                className,
            )}
            qa={qa}
            control={control}
        >
            {text}
        </ControlLabel>
    );
});
