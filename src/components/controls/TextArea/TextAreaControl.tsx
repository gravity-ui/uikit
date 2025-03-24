'use client';

import * as React from 'react';

import {useForkRef, useResizeObserver} from '../../../hooks';
import {block} from '../../utils/cn';

import type {TextAreaProps} from './TextArea';

type Props = Omit<TextAreaProps, 'autoComplete' | 'onChange' | 'controlProps'> & {
    onChange: NonNullable<TextAreaProps['onChange']>;
    autoComplete?: React.TextareaHTMLAttributes<HTMLTextAreaElement>['autoComplete'];
    controlProps: NonNullable<TextAreaProps['controlProps']>;
};

const b = block('text-area');

const calculateLinesByScrollHeight = (args: {
    height: number;
    paddingTop: number;
    paddingBottom: number;
    lineHeight: number;
}) => {
    const {height, lineHeight} = args;
    const paddingTop = Number.isNaN(args.paddingTop) ? 0 : args.paddingTop;
    const paddingBottom = Number.isNaN(args.paddingBottom) ? 0 : args.paddingBottom;

    return (height - paddingTop - paddingBottom) / lineHeight;
};

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
        readOnly,
        onChange,
        onFocus,
        onBlur,
        onKeyDown,
        onKeyUp,
        onKeyPress,
    } = props;
    const innerControlRef = React.useRef<HTMLTextAreaElement>(null);
    const handleRef = useForkRef(controlRef, innerControlRef);
    const textareaRows = Math.max(rows || minRows, 1);
    const innerValue = value || innerControlRef?.current?.value;

    const resizeHeight = React.useCallback(() => {
        const control = innerControlRef?.current;
        const parent = control?.parentElement;

        if (control && parent && !rows) {
            const controlStyles = getComputedStyle(control);
            const lineHeight = parseInt(controlStyles.getPropertyValue('line-height'), 10);
            const paddingTop = parseInt(controlStyles.getPropertyValue('padding-top'), 10);
            const paddingBottom = parseInt(controlStyles.getPropertyValue('padding-bottom'), 10);
            const linesWithCarriageReturn = (innerValue?.match(/\n/g) || []).length + 1;

            const parentHeight = parent.style.height;
            parent.style.height = `${parent.offsetHeight}px`;

            control.style.height = `${lineHeight + paddingTop + paddingBottom}px`;
            const overflow = control.style.overflow;
            control.style.overflow = 'hidden';

            const linesByScrollHeight = calculateLinesByScrollHeight({
                height: control.scrollHeight,
                paddingTop,
                paddingBottom,
                lineHeight,
            });

            const linesCount = Math.max(linesByScrollHeight, linesWithCarriageReturn);

            if (maxRows && maxRows < linesCount) {
                control.style.height = `${maxRows * lineHeight + paddingTop + paddingBottom}px`;
            } else if (minRows && minRows > linesCount) {
                control.style.height = `${Math.min(minRows, maxRows || Infinity) * lineHeight + paddingTop + paddingBottom}px`;
            } else {
                control.style.height = `${control.scrollHeight}px`;
            }

            control.style.overflow = overflow;
            parent.style.height = parentHeight;
        }
    }, [rows, maxRows, minRows, innerValue]);

    useResizeObserver({
        ref: rows ? undefined : innerControlRef,
        onResize: resizeHeight,
    });

    React.useEffect(() => {
        resizeHeight();
    }, [resizeHeight, size, value]);

    return (
        <textarea
            {...controlProps}
            ref={handleRef}
            style={{
                ...controlProps.style,
                height: rows ? 'auto' : undefined,
            }}
            className={b('control', controlProps.className)}
            name={name}
            id={id}
            tabIndex={tabIndex}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            rows={textareaRows}
            autoFocus={autoFocus}
            autoComplete={autoComplete}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onKeyPress={onKeyPress}
            disabled={disabled ?? controlProps.disabled}
            readOnly={readOnly ?? controlProps.readOnly}
        />
    );
}
