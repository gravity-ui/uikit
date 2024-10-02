'use client';

import React from 'react';

import {KeyCode} from '../../../constants';
import {useForkRef} from '../../../hooks';
import {useFormResetHandler} from '../../../hooks/private';
import {TextInput} from '../../controls/TextInput';
import {defaultBaseTextInputProps} from '../../controls/TextInput/TextInput';
import type {BaseInputControlProps} from '../../controls/types';
import {getInputControlState} from '../../controls/utils';
import {block} from '../../utils/cn';

import {NumericArrows} from './NumericArrows/NumericArrows';
import {
    clampToNearestStepValue,
    getInputPattern,
    getInternalState,
    getParsedValue,
    getPossibleNumberSubstring,
    updateCursorPosition,
} from './utils';

import './NumberInput.scss';

const b = block('number-input');

export interface NumberInputProps
    extends Omit<
        BaseInputControlProps<HTMLInputElement>,
        'error' | 'value' | 'defaultValue' | 'onUpdate'
    > {
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

    /** Hides increment/decrement buttons at the end of control
     */
    hiddenControls?: boolean;
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
    /** The control's value */
    value?: number;
    /** The control's default value. Use when the component is not controlled */
    defaultValue?: number;
    /** Fires when the input’s value is changed by the user. Provides new value as an callback's argument */
    onUpdate?: (value: number | undefined) => void;
}

const voidFunction = (..._props: any[]) => {};

// Useful when in input string '-1.' is typed and value={-1} prop passed.
// In this case we leave input string without replacing it by '-1'.
// Means that where is no need for replacing current input value with external value
function areStringRepresentationOfNumbersEqual(v1: string, v2: string) {
    if (v1 === v2) {
        return true;
    }

    const {valid: v1Valid, value: v1Value} = getParsedValue(v1);
    const {valid: v2Valid, value: v2Value} = getParsedValue(v2);

    if (v1Valid && v2Valid) {
        return v1Value === v2Value;
    }

    const v1OnlyNumbers = v1.replace(/\D/g, '');
    const v2OnlyNumbers = v2.replace(/\D/g, '');

    if (v1OnlyNumbers.length === v2OnlyNumbers.length && v1OnlyNumbers.length === 0) {
        // exmpl, when just '-' typed and '' (equivalent for undefined) value passed
        return true;
    }
    return false;
}

function getStringValue(value: number | undefined) {
    return value === undefined ? '' : String(value);
}

export const NumberInput = React.forwardRef<HTMLSpanElement, NumberInputProps>(function NumberInput(
    {endContent, ...props},
    ref,
) {
    const {
        value: externalValue,
        defaultValue: externalDefaultValue,
        onChange: handleChange,
        onUpdate,
        min: externalMin,
        max: externalMax,
        shiftMultiplier: externalShiftMultiplier = 10,
        step: externalStep = 1,
        size,
        view,
        disabled,
        hiddenControls,
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
        value,
        defaultValue,
        shiftMultiplier,
    } = getInternalState({
        min: externalMin,
        max: externalMax,
        step: externalStep,
        shiftMultiplier: externalShiftMultiplier,
        allowDecimal,
        value: externalValue,
        defaultValue: externalDefaultValue,
    });

    const [inputValue, setInputValue] = React.useState(
        getStringValue(value) ?? getStringValue(defaultValue),
    );

    React.useEffect(() => {
        const stringPropsValue = getStringValue(value);
        setInputValue((currentInputValue) => {
            if (!areStringRepresentationOfNumbersEqual(currentInputValue, stringPropsValue)) {
                return stringPropsValue;
            }
            return currentInputValue;
        });
    }, [value]);

    const clamp = true;
    const [step, setStep] = React.useState(baseStep);
    const [active, setActive] = React.useState(false);
    const safeValue = value ?? 0;

    const state = getInputControlState(validationState);

    const canIncrementNumber =
        clampToNearestStepValue({value: safeValue + step, step, min, max, direction: 'up'}) >
        safeValue;

    const canDecrementNumber =
        clampToNearestStepValue({value: safeValue - step, step, min, max, direction: 'down'}) <
        safeValue;

    const innerControlRef = React.useRef<HTMLInputElement>(null);
    const fieldRef = useFormResetHandler({
        initialValue: defaultValue,
        onReset: onUpdate ?? voidFunction,
    });
    const handleRef = useForkRef(props.controlRef, innerControlRef, fieldRef);

    const handleIncrement = () => {
        if (canIncrementNumber) {
            onUpdate?.(
                clampToNearestStepValue({
                    value: safeValue + step,
                    step: baseStep,
                    min,
                    max,
                    direction: 'up',
                }),
            );
        }
    };

    const handleDecrement = () => {
        if (canDecrementNumber) {
            onUpdate?.(
                clampToNearestStepValue({
                    value: safeValue - step,
                    step: baseStep,
                    min,
                    max,
                    direction: 'down',
                }),
            );
        }
    };

    const handleWheel: React.WheelEventHandler<HTMLInputElement> = (e) => {
        const delta = e.shiftKey ? e.deltaX : e.deltaY;
        e.preventDefault();
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
            e.preventDefault();
            handleDecrement();
        } else if (e.key === KeyCode.ARROW_UP) {
            e.preventDefault();
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
        setStep(baseStep);
        if (clamp && value) {
            const clampedValue = clampToNearestStepValue({
                value,
                step: baseStep,
                min,
                max,
            });
            if (value !== clampedValue) {
                onUpdate?.(clampedValue);
            }
        }
        onBlur?.(e);
    };

    const handleUpdate = (v: string) => {
        setInputValue(v);
        const preparedStringValue = getPossibleNumberSubstring(v, allowDecimal);
        updateCursorPosition(innerControlRef, v, preparedStringValue);
        const {valid, value: parsedNumberValue} = getParsedValue(preparedStringValue);
        if (valid && parsedNumberValue !== value) {
            onUpdate?.(parsedNumberValue);
        }
    };

    const handleInput: React.FormEventHandler<HTMLInputElement> = (e) => {
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
                inputMode: 'numeric',
                pattern: props.controlProps?.pattern ?? getInputPattern(allowDecimal, false),
                'aria-valuemin': props.min,
                'aria-valuemax': props.max,
                'aria-valuenow': value,
            }}
            controlRef={handleRef}
            value={inputValue}
            defaultValue={defaultValue === undefined ? undefined : String(defaultValue)}
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
                    {hiddenControls ? null : (
                        <NumericArrows
                            className={b('numeric-arrows')}
                            size={size}
                            disabled={disabled}
                            onUpClick={() => {
                                innerControlRef.current?.focus();
                                handleIncrement();
                            }}
                            onDownClick={() => {
                                innerControlRef.current?.focus();
                                handleDecrement();
                            }}
                        />
                    )}
                </React.Fragment>
            }
        />
    );
});
