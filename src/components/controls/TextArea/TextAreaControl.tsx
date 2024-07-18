'use client';

import React from 'react';

import {useForkRef} from '../../../hooks';
import {block} from '../../utils/cn';

import type {TextAreaProps} from './TextArea';

type Props = Omit<TextAreaProps, 'autoComplete' | 'onChange' | 'controlProps'> & {
    onChange: NonNullable<TextAreaProps['onChange']>;
    autoComplete?: React.TextareaHTMLAttributes<HTMLTextAreaElement>['autoComplete'];
    controlProps: NonNullable<TextAreaProps['controlProps']>;
};

const b = block('text-area');

export function TextAreaControl(props: Props) {
    const {
        name,
        id,
        tabIndex,
        autoComplete,
        placeholder,
        value,
        defaultValue,
        controlRef,
        controlProps,
        rows,
        minRows = 1,
        maxRows,
        autoFocus,
        disabled,
        onChange,
        onFocus,
        onBlur,
        onKeyDown,
        onKeyUp,
        onKeyPress,
    } = props;
    const innerControlRef = React.useRef<HTMLTextAreaElement>(null);
    const handleRef = useForkRef(controlRef, innerControlRef);

    const innerValue = value || innerControlRef?.current?.value;

    const realRows = React.useMemo(() => {
        if (rows) return rows;

        let currentRowsNumber = (innerValue?.match(/\n/g) || []).length + 1;

        if (minRows !== undefined && currentRowsNumber < minRows) currentRowsNumber = minRows;
        if (maxRows !== undefined && currentRowsNumber > maxRows) currentRowsNumber = maxRows;

        return currentRowsNumber;
    }, [rows, minRows, maxRows, innerValue]);

    return (
        <textarea
            {...controlProps}
            ref={handleRef}
            style={{
                ...controlProps.style,
            }}
            className={b('control', controlProps.className)}
            name={name}
            id={id}
            tabIndex={tabIndex}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            rows={realRows}
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
