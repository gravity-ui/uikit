'use client';

import React from 'react';

import {KeyCode} from '../../../constants';
import {useControlledState, useForkRef} from '../../../hooks';
import {useFormResetHandler} from '../../../hooks/private';
import {TextInput} from '../../controls/TextInput';
import type {BaseInputControlProps} from '../../controls/types';
import {getInputControlState} from '../../controls/utils';
import {block} from '../../utils/cn';

import {NumericArrows} from './NumericArrows/NumericArrows';
import {
    areStringRepresentationOfNumbersEqual,
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
    value?: number | null;
    /** The control's default value. Use when the component is not controlled */
    defaultValue?: number | null;
    /** Fires when the input’s value is changed by the user. Provides new value as an callback's argument */
    onUpdate?: (value: number | null) => void;
}

function getStringValue(value: number | null) {
    return value === null ? '' : String(value);
}

export const NumberInput = React.forwardRef<HTMLSpanElement, NumberInputProps>(function NumberInput(
    {endContent, defaultValue: externalDefaultValue, ...props},
    ref,
) {
    const {
        value: externalValue,
        onChange: handleChange,
        onUpdate: externalOnUpdate,
        min: externalMin,
        max: externalMax,
        shiftMultiplier: externalShiftMultiplier = 10,
        step: externalStep = 1,
        size = 'm',
        view = 'normal',
        disabled,
        hiddenControls,
        validationState,
        onFocus,
        onBlur,
        onKeyDown,
        allowMouseWheel = false,
        allowDecimal = false,
        className,
    } = props;

    const {
        min,
        max,
        step: baseStep,
        value: internalValue,
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

    const [value, setValue] = useControlledState(
        internalValue,
        defaultValue ?? null,
        externalOnUpdate,
    );

    const [inputValue, setInputValue] = React.useState(getStringValue(value));

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

    const [active, setActive] = React.useState(false);
    const safeValue = value ?? 0;

    const state = getInputControlState(validationState);

    const canIncrementNumber = safeValue < (max ?? Number.MAX_SAFE_INTEGER);

    const canDecrementNumber = safeValue > (min ?? Number.MIN_SAFE_INTEGER);

    const innerControlRef = React.useRef<HTMLInputElement>(null);
    const fieldRef = useFormResetHandler({
        initialValue: value,
        onReset: setValue,
    });
    const handleRef = useForkRef(props.controlRef, innerControlRef, fieldRef);

    const handleIncrement = (
        e:
            | React.MouseEvent<HTMLButtonElement>
            | React.WheelEvent<HTMLInputElement>
            | React.KeyboardEvent<HTMLInputElement>,
    ) => {
        const step = e.shiftKey ? shiftMultiplier * baseStep : baseStep;
        if (canIncrementNumber) {
            const newValue = clampToNearestStepValue({
                value: safeValue + step,
                step: baseStep,
                min,
                max,
                direction: 'up',
            });
            setValue?.(newValue);
            setInputValue(newValue.toString());
        }
    };

    const handleDecrement = (
        e:
            | React.MouseEvent<HTMLButtonElement>
            | React.WheelEvent<HTMLInputElement>
            | React.KeyboardEvent<HTMLInputElement>,
    ) => {
        const step = e.shiftKey ? shiftMultiplier * baseStep : baseStep;
        if (canDecrementNumber) {
            const newValue = clampToNearestStepValue({
                value: safeValue - step,
                step: baseStep,
                min,
                max,
                direction: 'down',
            });
            setValue?.(newValue);
            setInputValue(newValue.toString());
        }
    };

    const handleWheel: React.WheelEventHandler<HTMLInputElement> = (e) => {
        const delta = e.shiftKey ? e.deltaX : e.deltaY;
        e.preventDefault();
        if (delta > 0) {
            handleIncrement(e);
        } else if (delta < 0) {
            handleDecrement(e);
        }
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === KeyCode.ARROW_DOWN) {
            e.preventDefault();
            handleDecrement(e);
        } else if (e.key === KeyCode.ARROW_UP) {
            e.preventDefault();
            handleIncrement(e);
        } else if (e.key === KeyCode.HOME) {
            e.preventDefault();
            if (min !== undefined) {
                setValue?.(min);
                setInputValue(min.toString());
            }
        } else if (e.key === KeyCode.END) {
            e.preventDefault();
            if (max !== undefined) {
                const newValue = clampToNearestStepValue({
                    value: max,
                    step: baseStep,
                    min,
                    max,
                });
                setValue?.(newValue);
                setInputValue(newValue.toString());
            }
        }
        onKeyDown?.(e);
    };

    const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
        setActive(true);
        onFocus?.(e);
    };

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
        setActive(false);
        if (clamp && value) {
            const clampedValue = clampToNearestStepValue({
                value,
                step: baseStep,
                min,
                max,
            });
            if (value !== clampedValue) {
                setValue?.(clampedValue);
                setInputValue(clampedValue.toString());
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
            setValue?.(parsedNumberValue);
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
                'aria-valuenow': value === null ? undefined : value,
            }}
            controlRef={handleRef}
            value={inputValue}
            onChange={handleChange}
            onUpdate={handleUpdate}
            onKeyDown={handleKeyDown}
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
                            onUpClick={(e) => {
                                innerControlRef.current?.focus();
                                handleIncrement(e);
                            }}
                            onDownClick={(e) => {
                                innerControlRef.current?.focus();
                                handleDecrement(e);
                            }}
                        />
                    )}
                </React.Fragment>
            }
        />
    );
});
