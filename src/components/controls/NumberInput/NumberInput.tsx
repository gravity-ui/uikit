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
import {
    format,
    getInternalVariables,
    getPossibleNumberSubstring,
    updateCursorPosition,
} from './utils';

import './NumberInput.scss';

const b = block('number-input');

export interface NumberInputProps extends Omit<BaseInputControlProps<HTMLInputElement>, 'error'> {
    /** The control's html attributes */
    controlProps?: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'min' | 'max' | 'onChange'>;
    /** Help text rendered to the left of the input node */
    label?: string;
    /** Indicates that the user cannot change control's value */
    readOnly?: boolean;
    /** User`s node rendered before label and input node */
    startContent?: React.ReactNode;
    /** User`s node rendered after input node and clear button */
    endContent?: React.ReactNode;
    /** An optional element displayed under the lower right corner of the control and sharing the place with the error container */
    note?: React.ReactNode;
    /**Describes the validation state */
    validationState?: 'invalid' | undefined;

    /** Shows inncrement/decrement buttons at the end of control
     * @default true
     */
    hasControls?: boolean;
    /** min allowed value. It is used for clamping entered value to allowed range
     * @default Number.MAX_SAFE_INTEGER
     */
    min?: number;
    /** max allowed value. It is used for clamping entered value to allowed range
     * @default Number.MIN_SAFE_INTEGER
     */
    max?: number;
    /** Delta for incrementing/decrementing entered value with arrow keyboard buttons or component controls
     * @default 1
     */
    step?: number;
    /** Step multiplier when shift button is pressed
     * @default 10
     */
    shiftMultiplier?: number;
    /** Enables changing value by scrolling mousewheel on with cursor on the input
     * @default  false
     */
    allowMouseWheel?: boolean;
    /** Enables ability to enter decimal numbers
     * @default false
     */
    allowDecimal?: boolean;
}

const voidFunction = (..._props: any[]) => {};

export const NumberInput = React.forwardRef<HTMLSpanElement, NumberInputProps>(function NumberInput(
    {endContent, ...props},
    ref,
) {
    const {
        value: externalValue = '',
        defaultValue,
        onChange,
        onUpdate,
        min: externalMin = Number.MIN_SAFE_INTEGER,
        max: externalMax = Number.MAX_SAFE_INTEGER,
        shiftMultiplier: externalShiftMultiplier = 10,
        step: externalStep = 1,
        size,
        view,
        disabled,
        hasControls = true,
        validationState,
        onFocus,
        onBlur,
        onKeyDown,
        onKeyUp,
        allowMouseWheel = false,
        allowDecimal = false,
        className,
    } = {...defaultBaseTextInputProps, ...props};

    const {
        min,
        max,
        step: baseStep,
        isNumberValue,
        value,
        shiftMultiplier,
    } = getInternalVariables({
        min: externalMin,
        max: externalMax,
        step: externalStep,
        shiftMultiplier: externalShiftMultiplier,
        allowDecimal,
        value: externalValue,
    });

    const clamp = true;
    const [step, setStep] = React.useState(baseStep);
    const [active, setActive] = React.useState(false);

    const state = getInputControlState(validationState);

    const canIncrementNumber = value + step <= max;

    const canDecrementNumber = value - step >= min;

    const innerControlRef = React.useRef<HTMLInputElement>(null);
    const fieldRef = useFormResetHandler({
        initialValue: defaultValue ?? '',
        onReset: onUpdate ?? voidFunction,
    });
    const handleRef = useForkRef(props.controlRef, innerControlRef, fieldRef);

    const handleIncrement = () => {
        if (canIncrementNumber) {
            onUpdate?.(format(value + step));
        }
    };

    const handleDecrement = () => {
        if (canDecrementNumber) {
            onUpdate?.(format(value - step));
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
            setStep(baseStep * shiftMultiplier);
        } else if (e.key === KeyCode.ARROW_DOWN) {
            handleDecrement();
        } else if (e.key === KeyCode.ARROW_UP) {
            handleIncrement();
        }
        onKeyDown?.(e);
    };

    const handleKeyUp: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === KeyCode.SHIFT) {
            setStep(baseStep);
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
            if (value < min) {
                onUpdate?.(format(min));
            } else if (value > max) {
                onUpdate?.(format(max));
            }
        }
        onBlur?.(e);
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const preparedStringValue = getPossibleNumberSubstring(e.target.value, allowDecimal);
        updateCursorPosition(innerControlRef, e.target.value, preparedStringValue);
        if (preparedStringValue && preparedStringValue !== externalValue) {
            onChange?.(e);
        }
    };

    const handleUpdate = (v: string) => {
        const preparedStringValue = getPossibleNumberSubstring(v, allowDecimal);
        updateCursorPosition(innerControlRef, v, preparedStringValue);
        if (preparedStringValue !== externalValue) {
            onUpdate?.(preparedStringValue ?? '');
        }
    };

    const handleInput: React.FormEventHandler<HTMLInputElement> = (e) => {
        console.log(e);
        const preparedStringValue = getPossibleNumberSubstring(e.currentTarget.value, allowDecimal);
        updateCursorPosition(innerControlRef, e.currentTarget.value, preparedStringValue);
    };

    return (
        <TextInput
            {...props}
            className={b({size, view, state}, className)}
            controlProps={{
                onInput: handleInput,
                ...props.controlProps,
                onWheel: allowMouseWheel && active ? handleWheel : undefined,
                role: 'spinbutton',
                'aria-valuemin': props.min,
                'aria-valuemax': props.max,
                'aria-valuenow': isNumberValue ? value : undefined,
                'aria-valuetext': isNumberValue ? undefined : externalValue,
            }}
            controlRef={handleRef}
            value={externalValue}
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
