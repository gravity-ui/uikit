import React from 'react';

import type {DataAttrProps} from '../../types';
import {block} from '../../utils/cn';

import type {TextInputProps} from './TextInput';

type Props = Omit<TextInputProps, 'autoComplete' | 'controlProps'> & {
    autoComplete?: React.TextareaHTMLAttributes<HTMLInputElement>['autoComplete'];
    controlProps: NonNullable<TextInputProps['controlProps']>;
};

const b = block('text-input');

export function TextInputControl(props: Props) {
    const {
        controlProps,
        controlRef,
        type,
        name,
        id,
        tabIndex,
        autoComplete,
        placeholder,
        value,
        defaultValue,
        autoFocus,
        disabled,
        onChange,
        onFocus,
        onBlur,
        onKeyDown,
        onKeyUp,
        onKeyPress,
        ...otherProps
    } = props;

    const dataAttrProps = Object.fromEntries(
        Object.entries(otherProps).filter(([key]) => key.startsWith('data-')),
    ) as DataAttrProps;

    return (
        <input
            {...controlProps}
            {...dataAttrProps}
            ref={controlRef}
            className={b('control', {type: 'input'}, controlProps.className)}
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
            disabled={disabled ?? controlProps.disabled}
        />
    );
}
