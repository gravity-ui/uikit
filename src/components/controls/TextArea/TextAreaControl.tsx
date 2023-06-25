import React from 'react';

import {block} from '../../utils/cn';
import {useForkRef} from '../../utils/useForkRef';

import type {TextAreaProps} from './types';

type Props = Omit<TextAreaProps, 'autoComplete' | 'onChange'> & {
    onChange: NonNullable<TextAreaProps['onChange']>;
    autoComplete?: React.TextareaHTMLAttributes<HTMLTextAreaElement>['autoComplete'];
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
        size,
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
    const textareaRows = rows || minRows;
    const innerValue = value || innerControlRef?.current?.value;

    const resizeHeight = React.useCallback(() => {
        const control = innerControlRef?.current;

        if (control && !rows) {
            const controlStyles = getComputedStyle(control);
            const lineHeight = parseInt(controlStyles.getPropertyValue('line-height'), 10);
            const paddingTop = parseInt(controlStyles.getPropertyValue('padding-top'), 10);
            const linesWithCarriageReturn = (innerValue?.match(/\n/g) || []).length + 1;
            const linesByScrollHeight = Math.floor(control.scrollHeight / lineHeight);

            if (maxRows && maxRows < Math.max(linesByScrollHeight, linesWithCarriageReturn)) {
                control.style.height = 'auto';
                control.style.height = `${maxRows * lineHeight + 2 * paddingTop}px`;
            } else {
                control.style.height = 'auto';
                control.style.height =
                    linesWithCarriageReturn > 1 || linesByScrollHeight > 1
                        ? `${control.scrollHeight}px`
                        : ''; // Set falsy value to use styles from css
            }
        }
    }, [rows, maxRows, innerValue]);

    React.useEffect(resizeHeight, [resizeHeight, size]);

    return (
        <textarea
            {...(controlProps as React.InputHTMLAttributes<HTMLTextAreaElement>)}
            ref={handleRef as React.Ref<HTMLTextAreaElement>}
            style={{
                ...(controlProps as React.InputHTMLAttributes<HTMLTextAreaElement>)?.style,
                height: rows ? 'auto' : undefined,
            }}
            className={b('control', controlProps?.className)}
            name={name}
            id={id}
            tabIndex={tabIndex}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            rows={textareaRows}
            // TextArea provides this functionality for its user. False by default
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
        />
    );
}
