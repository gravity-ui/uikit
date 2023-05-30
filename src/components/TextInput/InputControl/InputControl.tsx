import React from 'react';

import {block} from '../../utils/cn';
import {TextInputProps} from '../types';

export interface InputControlProps
    extends Omit<TextInputProps, 'autoComplete'>,
        Pick<React.InputHTMLAttributes<HTMLInputElement>, 'autoComplete'> {}

const b = block('text-input');

export function InputControl(props: InputControlProps) {
    const {
        type,
        name,
        id,
        tabIndex,
        autoFocus,
        autoComplete,
        placeholder,
        value,
        defaultValue,
        onChange,
        onFocus,
        onBlur,
        onKeyDown,
        onKeyUp,
        onKeyPress,
        controlProps,
        controlRef,
        disabled,
    } = props;

    return (
        <input
            {...(controlProps as React.InputHTMLAttributes<HTMLInputElement>)}
            ref={controlRef as React.Ref<HTMLInputElement>}
            className={b('control', {type: 'input'}, controlProps?.className)}
            type={type}
            name={name}
            id={id}
            tabIndex={tabIndex}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            autoFocus={autoFocus}
            autoComplete={autoComplete}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onKeyPress={onKeyPress}
            disabled={disabled}
        />
    );
}
