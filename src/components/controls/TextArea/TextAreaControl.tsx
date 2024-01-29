import React from 'react';

import {useForkRef} from '../../../hooks';
import {block} from '../../utils/cn';

import type {TextAreaProps} from './TextArea';

type Props = Omit<TextAreaProps, 'autoComplete' | 'onChange'> & {
    onChange: NonNullable<TextAreaProps['onChange']>;
    autoComplete?: React.TextareaHTMLAttributes<HTMLTextAreaElement>['autoComplete'];
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
            const paddingBottom = parseInt(controlStyles.getPropertyValue('padding-bottom'), 10);
            const linesWithCarriageReturn = (innerValue?.match(/\n/g) || []).length + 1;
            const linesByScrollHeight = calculateLinesByScrollHeight({
                height: control.scrollHeight,
                paddingTop,
                paddingBottom,
                lineHeight,
            });

            control.style.height = 'auto';

            if (maxRows && maxRows < Math.max(linesByScrollHeight, linesWithCarriageReturn)) {
                control.style.height = `${maxRows * lineHeight + 2 * paddingTop}px`;
            } else if (linesWithCarriageReturn > 1 || linesByScrollHeight > 1) {
                control.style.height = `${control.scrollHeight}px`;
            }
        }
    }, [rows, maxRows, innerValue]);

    React.useEffect(() => {
        resizeHeight();
    }, [resizeHeight, size, value]);

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
