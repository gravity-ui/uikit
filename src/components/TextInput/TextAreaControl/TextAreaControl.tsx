import React from 'react';

import {block} from '../../utils/cn';
import {useForkRef} from '../../utils/useForkRef';
import type {TextInputProps} from '../types';

export interface TextAreaControlProps
    extends Omit<TextInputProps, 'multiline' | 'autoComplete'>,
        Pick<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'autoComplete'> {}

const b = block('text-input');

export function TextAreaControl(props: TextAreaControlProps) {
    const {
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
        controlRef,
        controlProps,
        disabled,
        rows,
        minRows = 1,
        maxRows,
    } = props;
    const innerControlRef = React.useRef<HTMLTextAreaElement>(null);
    const handleRef = useForkRef(controlRef, innerControlRef);
    const textareaRows = rows || minRows;

    const resizeHeight = React.useCallback(() => {
        const control = innerControlRef?.current;

        if (control && !rows) {
            const inputValue = value || control.value;
            const numberOfLines = (inputValue.match(/\n/g) || []).length + 1;

            const controlStyles = getComputedStyle(control);

            const lineHeight = parseInt(controlStyles.getPropertyValue('line-height'), 10);
            const borderWidth = parseInt(controlStyles.getPropertyValue('border-top-width'), 10);
            const paddingTop = parseInt(controlStyles.getPropertyValue('padding-top'), 10);

            const lines = Math.floor(control.scrollHeight / lineHeight);

            if (maxRows && maxRows < Math.max(lines, numberOfLines)) {
                control.style.height = 'auto';
                control.style.height = `${
                    maxRows * lineHeight + 2 * paddingTop + 2 * borderWidth
                }px`;
            } else {
                control.style.height = 'auto';
                control.style.height = `${control.scrollHeight + 2 * borderWidth}px`;
            }
        }
    }, [rows, maxRows, value]);

    React.useEffect(resizeHeight, [resizeHeight]);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        if (onChange) {
            onChange(event);
        } else {
            /** In case uncontrolled component */
            resizeHeight();
        }
    };

    return (
        <textarea
            {...(controlProps as React.InputHTMLAttributes<HTMLTextAreaElement>)}
            ref={handleRef as React.Ref<HTMLTextAreaElement>}
            style={{
                ...(controlProps as React.InputHTMLAttributes<HTMLTextAreaElement>)?.style,
                height: rows ? 'auto' : undefined,
            }}
            className={b('control', {type: 'textarea'}, controlProps?.className)}
            name={name}
            id={id}
            tabIndex={tabIndex}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            rows={textareaRows}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={autoFocus}
            autoComplete={autoComplete}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onKeyPress={onKeyPress}
            disabled={disabled}
        />
    );
}
