'use client';

import * as React from 'react';

import {useCheckbox} from '../../hooks/private';
import {ControlLabel} from '../ControlLabel';
import type {ControlProps, DOMProps, QAProps} from '../types';
import {block} from '../utils/cn';

import {CheckboxDashIcon} from './CheckboxDashIcon';
import {CheckboxTickIcon} from './CheckboxTickIcon';

import './Checkbox.scss';

export type CheckboxSize = 'm' | 'l' | 'xl';

export interface CheckboxProps extends ControlProps, DOMProps, QAProps {
    size?: CheckboxSize;
    content?: React.ReactNode;
    children?: React.ReactNode;
    title?: string;
}

const b = block('checkbox');

export const Checkbox = React.forwardRef<HTMLLabelElement, CheckboxProps>(
    function Checkbox(props, ref) {
        const {
            size = 'm',
            indeterminate,
            disabled = false,
            content,
            children,
            title,
            style,
            className,
            qa,
        } = props;
        const {checked, inputProps} = useCheckbox(props);
        const text = content || children;

        const control = (
            <span className={b('indicator')}>
                <span className={b('icon')} aria-hidden>
                    {indeterminate ? (
                        <CheckboxDashIcon className={b('icon-svg', {type: 'dash'})} />
                    ) : (
                        <CheckboxTickIcon className={b('icon-svg', {type: 'tick'})} />
                    )}
                </span>
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
                        indeterminate,
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
    },
);
