'use client';

import React from 'react';

import {KeyCode} from '../../../constants';
import {useForkRef} from '../../../hooks';
import {useFormResetHandler} from '../../../hooks/private';
import {block} from '../../utils/cn';
import {TextInput} from '../TextInput';
import {defaultBaseTextInputProps} from '../TextInput/TextInput';
import type {BaseInputControlProps} from '../types';
import {getInputControlState} from '../utils';

import {NumericArrows} from './NumericArrows/NumericArrows';
import {format, getParsedValue, getPossibleNumberSubstring} from './utils';

import './NumberInput.scss';

const b = block('number-input');

export interface NumberInputProps extends Omit<BaseInputControlProps<HTMLInputElement>, 'error'> {
    /** The control's html attributes */
    controlProps?: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'min' | 'max'>;
    /** Help text rendered to the left of the input node */
    label?: string;

    readOnly?: boolean;

    /** User`s node rendered before label and input node */
    startContent?: React.ReactNode;
    /** User`s node rendered after input node and clear button */
    endContent?: React.ReactNode;
    /** An optional element displayed under the lower right corner of the control and sharing the place with the error container */
    note?: React.ReactNode;

    validationState?: 'invalid' | undefined;

    hasControls?: boolean;

    min?: number;
    max?: number;

    /** defaults to 1 */
    step?: number;
    /** defaults to 10 */
    shiftMultiplier?: number;

    /** defaults to false */
    allowMouseWheel?: boolean;
    allowDecimal?: boolean;
}
const voidFunction = (..._props: any[]) => {};

export const NumberInput = React.forwardRef<HTMLSpanElement, NumberInputProps>(function NumberInput(
    {endContent, ...props},
    ref,
) {
    const {
        value,
        defaultValue,
        onChange,
        onUpdate,
        min: externalMin = Number.MIN_SAFE_INTEGER,
        max: externalMax = Number.MAX_SAFE_INTEGER,
        shiftMultiplier = 10,
        size,
        view,
        disabled,
        hasControls = true,
        validationState,
        onFocus,
        onBlur,
        onKeyDown,
        onKeyUp,
        controlProps,
        allowMouseWheel,
        className,
    } = {...defaultBaseTextInputProps, ...props};

    if (externalMin && externalMin < Number.MIN_SAFE_INTEGER) {
        console.log('min value sould not be less than Number.MIN_SAFE_INTEGER');
    }
    if (externalMax && externalMax > Number.MAX_SAFE_INTEGER) {
        console.log('min value sould not be greater than Number.MAX_SAFE_INTEGER');
    }

    if (externalMin && externalMax && externalMin > externalMax) {
        console.warn('min value sould not be greater than max value');
    }

    const clamp = true;

    const min = externalMin
        ? Math.max(Math.min(externalMin, externalMax), Number.MIN_SAFE_INTEGER)
        : Number.MIN_SAFE_INTEGER;
    const max = externalMax
        ? Math.min(Math.max(externalMin, externalMax), Number.MAX_SAFE_INTEGER)
        : Number.MAX_SAFE_INTEGER;

    const controlInitialStep = controlProps?.step ? Number(controlProps?.step) : 1;
    const [step, setStep] = React.useState(controlInitialStep);
    const [active, setActive] = React.useState(false);

    const state = getInputControlState(validationState);

    const {isNumberValue, parsedValue} = getParsedValue(value);

    const canIncrementNumber = parsedValue + step <= max;

    const canDecrementNumber = parsedValue - step >= min;

    const innerControlRef = React.useRef<HTMLTextAreaElement | HTMLInputElement>(null);
    const fieldRef = useFormResetHandler({
        initialValue: defaultValue ?? '',
        onReset: onUpdate ?? voidFunction,
    });
    const handleRef = useForkRef(props.controlRef, innerControlRef, fieldRef);

    const handleIncrement = () => {
        if (canIncrementNumber) {
            onUpdate?.(format(parsedValue + step));
        }
    };

    const handleDecrement = () => {
        if (canDecrementNumber) {
            onUpdate?.(format(parsedValue - step));
        }
    };

    const handleWheel: React.WheelEventHandler<HTMLInputElement> = (e) => {
        const delta = e.shiftKey ? e.deltaX : e.deltaY;
        if (delta > 0) {
            handleIncrement();
        } else if (delta < 0) {
            handleDecrement();
        }
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === KeyCode.SHIFT) {
            setStep(controlInitialStep * shiftMultiplier);
        } else if (e.key === KeyCode.ARROW_DOWN) {
            handleDecrement();
        } else if (e.key === KeyCode.ARROW_UP) {
            handleIncrement();
        }
        onKeyDown?.(e);
    };

    const handleKeyUp: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === KeyCode.SHIFT) {
            setStep(controlInitialStep);
        }
        onKeyUp?.(e);
    };

    const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
        setActive(true);
        onFocus?.(e);
    };

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
        setActive(false);
        if (clamp) {
            if (parsedValue < min) {
                onUpdate?.(format(min));
            } else if (parsedValue > max) {
                onUpdate?.(format(max));
            }
        }
        onBlur?.(e);
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const preparedStringValue = getPossibleNumberSubstring(e.target.value);
        if (preparedStringValue && preparedStringValue !== value) {
            onChange?.(e);
        }
    };

    const handleUpdate = (v: string) => {
        const preparedStringValue = getPossibleNumberSubstring(v);
        if (preparedStringValue !== value) {
            onUpdate?.(preparedStringValue ?? '');
        }
    };

    return (
        <TextInput
            {...props}
            className={b({size, view, state}, className)}
            controlProps={{
                ...props.controlProps,
                onWheel: allowMouseWheel && active ? handleWheel : undefined,
                role: 'spinbutton',
                'aria-valuemin': props.min,
                'aria-valuemax': props.max,
                'aria-valuenow': isNumberValue ? parsedValue : undefined,
                'aria-valuetext': isNumberValue ? undefined : value,
            }}
            controlRef={handleRef}
            value={value}
            onChange={handleChange}
            onUpdate={handleUpdate}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onFocus={handleFocus}
            onBlur={handleBlur}
            ref={ref}
            unstable_endContent={
                <React.Fragment>
                    {endContent}
                    {hasControls ? (
                        <NumericArrows
                            className={b('numeric-arrows')}
                            size={size}
                            disabled={disabled || !isNumberValue}
                            onUpClick={() => {
                                innerControlRef.current?.focus();
                                handleIncrement();
                            }}
                            onDownClick={() => {
                                innerControlRef.current?.focus();
                                handleDecrement();
                            }}
                        />
                    ) : null}
                </React.Fragment>
            }
        />
    );
});
