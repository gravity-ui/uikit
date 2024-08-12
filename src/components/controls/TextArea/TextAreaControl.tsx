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

const getRowsNumber = (textArea: HTMLTextAreaElement) => {
    const lineHeight = parseInt(getComputedStyle(textArea, null).lineHeight, 10);

    return Math.floor(textArea.scrollHeight / lineHeight);
};

// by default this number is 2, but in our component is 1
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#rows
const DEFAULT_TEXT_AREA_ROWS_NUMBER = 1;

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

    React.useEffect(() => {
        if (rows || !innerControlRef.current) return;

        innerControlRef.current.setAttribute('rows', DEFAULT_TEXT_AREA_ROWS_NUMBER.toString());
        let currentRowsNumber = getRowsNumber(innerControlRef.current);

        if (minRows !== undefined && currentRowsNumber < minRows) currentRowsNumber = minRows;
        if (maxRows !== undefined && currentRowsNumber > maxRows) currentRowsNumber = maxRows;

        innerControlRef.current.setAttribute('rows', currentRowsNumber.toString());
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
            rows={rows || DEFAULT_TEXT_AREA_ROWS_NUMBER}
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
