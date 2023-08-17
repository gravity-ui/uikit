import React from 'react';

import {block} from '../../utils/cn';
import {getControlErrorTextId, getControlNoteId} from '../utils';

import type {TextInputProps} from './TextInput';

type Props = Omit<TextInputProps, 'autoComplete'> & {
    autoComplete?: React.TextareaHTMLAttributes<HTMLInputElement>['autoComplete'];
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
        error,
        note,
    } = props;

    const describedBy = React.useMemo(() => {
        const result = [];
        if (id) {
            if (error) {
                result.push(getControlErrorTextId(id));
            }
            if (note) {
                result.push(getControlNoteId(id));
            }
        }
        return result.join(' ');
    }, [error, note, id]);

    return (
        <input
            {...controlProps}
            ref={controlRef}
            className={b('control', {type: 'input'}, controlProps?.className)}
            type={type}
            name={name}
            id={id}
            tabIndex={tabIndex}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            // TextInput provides this functionality for its user. False by default
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={autoFocus}
            autoComplete={autoComplete}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onKeyPress={onKeyPress}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
        />
    );
}
