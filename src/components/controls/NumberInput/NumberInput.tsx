import React from 'react';

import {ChevronDown, ChevronUp} from '@gravity-ui/icons';
import type {NumberFormatValues, OnValueChange} from 'react-number-format';
import {NumericFormat} from 'react-number-format';

import {block} from '../../utils/cn';
import type {TextInputPin, TextInputProps, TextInputSize, TextInputView} from '../TextInput';
import {TextInput} from '../TextInput';
import type {InputControlSize} from '../types';

import {assignRef, useMergedRef} from './hooks/use-merged-ref';
import {useUncontrolled} from './hooks/use-uncontrolled';
import {clamp} from './utils/clamp';

import './NumberInput.scss';

// re for -0, -0., -0.0, -0.00, -0.000 ... strings
const partialNegativeNumberPattern = /^-0(\.0*)?$/;

// re for 01, 006, 0002 ... and negative counterparts
const leadingZerosPattern = /^-?0\d+$/;

export type NumberInputPin = TextInputPin;
export type NumberInputSize = TextInputSize;
export type NumberInputView = TextInputView;

export interface NumberInputHandlers {
    increment: () => void;
    decrement: () => void;
}

function isValidNumber(value: number | string | undefined): value is number {
    return (
        (typeof value === 'number'
            ? value < Number.MAX_SAFE_INTEGER
            : !Number.isNaN(Number(value))) && !Number.isNaN(value)
    );
}

interface GetDecrementedValueInput {
    value: number;
    min: number | undefined;
    step: number | undefined;
    allowNegative: boolean | undefined;
}

function getDecrementedValue({value, min, step = 1, allowNegative}: GetDecrementedValueInput) {
    const nextValue = value - step;

    if (min !== undefined && nextValue < min) {
        return min;
    }

    if (!allowNegative && nextValue < 0 && min === undefined) {
        return value;
    }

    if (min !== undefined && min >= 0 && nextValue <= min) {
        return nextValue;
    }

    return nextValue;
}

function isInRange(value: number | undefined, min: number | undefined, max: number | undefined) {
    if (value === undefined) {
        return true;
    }

    const minValid = min === undefined || value >= min;
    const maxValid = max === undefined || value <= max;

    return minValid && maxValid;
}

export type NumberInputProps = {
    /** Controlled component value */
    value?: number | string;

    /** Uncontrolled component default value */
    defaultValue?: number | string;

    /** Called when value changes */
    onChange?: (value: number | string) => void;

    /** Called when value changes with `react-number-format` payload */
    onValueChange?: OnValueChange;

    /** Determines whether leading zeros are allowed. If not set, leading zeros are removed when the input is blurred. `false` by default */
    allowLeadingZeros?: boolean;

    /** Determines whether negative values are allowed, `true` by default */
    allowNegative?: boolean;

    /** Characters which when pressed result in a decimal separator, `[',', '.']` by default */
    allowedDecimalSeparators?: string[];

    /** Limits the number of digits that can be entered after the decimal point */
    decimalScale?: number;

    /** Character used as a decimal separator, `'.'` by default */
    decimalSeparator?: string;

    /** If set, 0s are added after `decimalSeparator` to match given `decimalScale`. `false` by default */
    fixedDecimalScale?: boolean;

    /** Prefix added before the input value */
    prefix?: string;

    /** Suffix added after the input value */
    suffix?: string;

    /** Defines the thousand grouping style. */
    thousandsGroupStyle?: 'thousand' | 'lakh' | 'wan' | 'none';

    /** A function to validate the input value. If this function returns `false`, the `onChange` will not be called and the input value will not change. */
    isAllowed?: (values: NumberFormatValues) => boolean;

    /** If value is passed as string representation of numbers (unformatted) and number is used in any format props like in prefix or suffix in numeric format and format prop in pattern format then this should be passed as `true`. `false` by default. */
    valueIsNumericString?: boolean;

    /** Controls input `type` attribute, `'text'` by default */
    type?: 'text' | 'tel' | 'password';

    /** A character used to separate thousands */
    thousandSeparator?: string | boolean;

    /** Minimum possible value */
    min?: number;

    /** Maximum possible value */
    max?: number;

    /** Number by which value will be incremented/decremented with up/down controls and keyboard arrows, `1` by default */
    step?: number;

    /** Determines whether the up/down controls should be hidden, `false` by default */
    hideControls?: boolean;

    /** Controls how value is clamped, `strict` – user is not allowed to enter values that are not in `[min, max]` range, `blur` – user is allowed to enter any values, but the value is clamped when the input loses focus (default behavior), `none` – lifts all restrictions, `[min, max]` range is applied only for controls and up/down keys */
    clampBehavior?: 'strict' | 'blur' | 'none';

    /** Determines whether decimal values are allowed, `true` by default */
    allowDecimal?: boolean;

    /** Increment/decrement handlers */
    handlersRef?: React.ForwardedRef<NumberInputHandlers | undefined>;

    /** Value set to the input when increment/decrement buttons are clicked or up/down arrows pressed if the input is empty, `0` by default */
    startValue?: number;

    /** Delay before stepping the value. Can be a number of milliseconds or a function that receives the current step count and returns the delay in milliseconds. */
    stepHoldInterval?: number | ((stepCount: number) => number);

    /** Initial delay in milliseconds before stepping the value. */
    stepHoldDelay?: number;
} & Omit<TextInputProps, 'value' | 'defaultValue' | 'onChange' | 'leftContent' | 'rightContent'> & {
        value?: string | number;
        defaultValue?: string | number;
        onChange?: (value: string | number) => void;
    };

const b = block('number-input');

export const NumberInput = React.forwardRef<HTMLSpanElement, NumberInputProps>((props, ref) => {
    const {
        className,
        onChange,
        onValueChange,
        value,
        defaultValue,
        max,
        min,
        step = 1,
        endContent,
        errorPlacement,
        hideControls = typeof endContent !== 'undefined' || errorPlacement === 'inside',
        isAllowed,
        clampBehavior = 'blur',
        onBlur,
        allowDecimal = true,
        decimalScale,
        onKeyDown,
        handlersRef,
        startValue = 0,
        disabled,
        allowNegative = true,
        stepHoldInterval,
        stepHoldDelay,
        allowLeadingZeros,
        controlProps,
        size = 'm',
        ...others
    } = props;

    const [_value, setValue] = useUncontrolled({
        value,
        defaultValue,
        onChange,
    });

    const shouldUseStepInterval = stepHoldDelay !== undefined && stepHoldInterval !== undefined;
    const inputRef = React.useRef<HTMLInputElement>(null);
    const onStepTimeoutRef = React.useRef<number | null>(null);
    const stepCountRef = React.useRef<number>(0);

    const handleValueChange: OnValueChange = (payload, event) => {
        if (event.source === 'event') {
            setValue(
                isValidNumber(payload.floatValue) &&
                    !partialNegativeNumberPattern.test(payload.value) &&
                    !(allowLeadingZeros ? leadingZerosPattern.test(payload.value) : false)
                    ? payload.floatValue
                    : payload.value,
            );
        }
        onValueChange?.(payload, event);
    };

    const incrementRef = React.useRef<() => void>();
    incrementRef.current = () => {
        if (typeof _value !== 'number' || Number.isNaN(_value)) {
            setValue(clamp(startValue, min, max));
        } else if (max === undefined) {
            setValue(_value + step);
        } else {
            setValue(_value + step <= max ? _value + step : max);
        }
    };

    const decrementRef = React.useRef<() => void>();
    decrementRef.current = () => {
        if (typeof _value !== 'number' || Number.isNaN(_value)) {
            setValue(clamp(startValue, min, max));
        } else {
            setValue(getDecrementedValue({value: _value, min, step, allowNegative}));
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        onKeyDown?.(event);

        if (controlProps?.readOnly) {
            return;
        }

        if (event.key === 'ArrowUp') {
            event.preventDefault();
            if (incrementRef.current) {
                incrementRef.current();
            }
        }

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            if (decrementRef.current) {
                decrementRef.current();
            }
        }
    };

    assignRef(handlersRef, {
        increment: incrementRef.current,
        decrement: decrementRef.current,
    });

    const onStepHandleChange = (isIncrement: boolean) => {
        if (isIncrement) {
            if (incrementRef.current) {
                incrementRef.current();
            }
        } else if (decrementRef.current) {
            decrementRef.current();
        }
        stepCountRef.current += 1;
    };

    const onStepLoop = (isIncrement: boolean) => {
        onStepHandleChange(isIncrement);

        if (shouldUseStepInterval) {
            const interval =
                typeof stepHoldInterval === 'number'
                    ? stepHoldInterval
                    : stepHoldInterval(stepCountRef.current);
            onStepTimeoutRef.current = window.setTimeout(() => onStepLoop(isIncrement), interval);
        }
    };

    const onStep = (
        event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
        isIncrement: boolean,
    ) => {
        event.preventDefault();
        inputRef.current?.focus();
        onStepHandleChange(isIncrement);
        if (shouldUseStepInterval) {
            onStepTimeoutRef.current = window.setTimeout(
                () => onStepLoop(isIncrement),
                stepHoldDelay,
            );
        }
    };

    const onStepDone = () => {
        if (onStepTimeoutRef.current) {
            window.clearTimeout(onStepTimeoutRef.current);
        }
        onStepTimeoutRef.current = null;
        stepCountRef.current = 0;
    };

    const controls = (
        <div
            className={b('controls', {
                size,
            })}
        >
            <button
                className={b('left-control', {
                    size,
                })}
                tabIndex={-1}
                aria-hidden
                disabled={
                    disabled || (typeof _value === 'number' && max !== undefined && _value >= max)
                }
                onMouseDown={(event) => event.preventDefault()}
                onPointerDown={(event) => {
                    onStep(event, true);
                }}
                onPointerUp={onStepDone}
                onPointerLeave={onStepDone}
            >
                <NumberInputChevron size={size} direction="up" />
            </button>
            <button
                className={b('right-control', {
                    size,
                })}
                tabIndex={-1}
                aria-hidden
                disabled={
                    disabled || (typeof _value === 'number' && min !== undefined && _value <= min)
                }
                onMouseDown={(event) => event.preventDefault()}
                onPointerDown={(event) => {
                    onStep(event, false);
                }}
                onPointerUp={onStepDone}
                onPointerLeave={onStepDone}
            >
                <NumberInputChevron size={size} direction="down" />
            </button>
        </div>
    );

    return (
        <NumericFormat
            customInput={TextInput}
            allowNegative={allowNegative}
            className={b({}, className)}
            size={size}
            errorPlacement={errorPlacement}
            {...others}
            controlProps={controlProps}
            disabled={disabled}
            value={_value}
            getInputRef={useMergedRef(ref, inputRef)}
            onValueChange={handleValueChange}
            endContent={hideControls || controlProps?.readOnly ? endContent : controls}
            decimalScale={allowDecimal ? decimalScale : 0}
            allowedDecimalSeparators={[',', '.']}
            onKeyDown={handleKeyDown}
            allowLeadingZeros={allowLeadingZeros}
            onBlur={(event) => {
                onBlur?.(event);
                if (clampBehavior === 'blur' && typeof _value === 'number') {
                    const clampedValue = clamp(_value, min, max);
                    if (clampedValue !== _value) {
                        setValue(clamp(_value, min, max));
                    }
                }
            }}
            isAllowed={(val) => {
                if (clampBehavior === 'strict') {
                    if (isAllowed) {
                        return isAllowed(val) && isInRange(val.floatValue, min, max);
                    }

                    return isInRange(val.floatValue, min, max);
                }

                return isAllowed ? isAllowed(val) : true;
            }}
        />
    );
});

NumberInput.displayName = 'NumberInput';

interface ChevronProps extends React.ComponentPropsWithoutRef<'svg'> {
    direction: 'up' | 'down';
    size: InputControlSize;
}

function NumberInputChevron({direction, style, size, ...others}: ChevronProps) {
    const chevronSizeMap: Record<NumberInputSize, number> = {
        s: 11,
        m: 12,
        l: 14,
        xl: 15,
    };

    if (direction === 'up') {
        return (
            <ChevronUp
                className={b('control-arrow')}
                style={{
                    width: chevronSizeMap[size],
                    height: chevronSizeMap[size],
                    ...style,
                }}
                {...others}
            />
        );
    }

    return (
        <ChevronDown
            className={b('control-arrow')}
            style={{
                width: chevronSizeMap[size],
                height: chevronSizeMap[size],
                ...style,
            }}
            {...others}
        />
    );
}
