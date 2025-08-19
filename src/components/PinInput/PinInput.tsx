'use client';

import * as React from 'react';

import {KeyCode} from '../../constants';
import {useControlledState, useFocusWithin, useUniqId} from '../../hooks';
import {useFormResetHandler} from '../../hooks/private';
import type {TextInputProps, TextInputSize} from '../controls';
import {TextInput} from '../controls';
import {OuterAdditionalContent} from '../controls/common/OuterAdditionalContent/OuterAdditionalContent';
import {useDirection} from '../theme';
import type {AriaLabelingProps, DOMProps, FocusEventHandlers, QAProps} from '../types';
import {block} from '../utils/cn';
import {filterDOMProps} from '../utils/filterDOMProps';

import i18n from './i18n';

import './PinInput.scss';

export type PinInputSize = TextInputSize;
export type PinInputType = 'numeric' | 'alphanumeric';

export interface PinInputApi {
    focus: () => void;
}

export interface PinInputProps extends DOMProps, AriaLabelingProps, QAProps, FocusEventHandlers {
    value?: string[];
    defaultValue?: string[];
    onUpdate?: (value: string[]) => void;
    onUpdateComplete?: (value: string[]) => void;
    length?: number;
    size?: PinInputSize;
    type?: PinInputType;
    id?: string;
    name?: string;
    form?: string;
    placeholder?: string;
    disabled?: boolean;
    autoFocus?: boolean;
    otp?: boolean;
    mask?: boolean;
    responsive?: boolean;
    note?: TextInputProps['note'];
    validationState?: TextInputProps['validationState'];
    errorMessage?: TextInputProps['errorMessage'];
    apiRef?: React.RefObject<PinInputApi>;
}

const b = block('pin-input');
const NUMERIC_REGEXP = /[0-9]+/;
const ALPHANUMERIC_REGEXP = /[0-9a-z]+/i;

const validate = (type: PinInputType, newValue: string) => {
    if (type === 'numeric') {
        return NUMERIC_REGEXP.test(newValue);
    } else {
        return ALPHANUMERIC_REGEXP.test(newValue);
    }
};

export const PinInput = React.forwardRef<HTMLDivElement, PinInputProps>((props, ref) => {
    const {
        value,
        defaultValue,
        onUpdate,
        onUpdateComplete,
        onFocus,
        onBlur,
        length = 4,
        size = 'm',
        type = 'numeric',
        id: idProp,
        name,
        form,
        placeholder,
        disabled,
        autoFocus,
        otp,
        mask,
        responsive,
        note,
        validationState,
        errorMessage,
        apiRef,
        className,
        style,
        qa,
        ...restProps
    } = props;
    const refs = React.useRef<Record<number, HTMLInputElement | null>>({});
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [focusedIndex, setFocusedIndex] = React.useState(-1);
    const updateCallback = React.useCallback(
        (newValue: string[]) => {
            if (onUpdate) {
                onUpdate(newValue);
            }

            if (onUpdateComplete && newValue.every((v) => Boolean(v))) {
                onUpdateComplete(newValue);
            }
        },
        [onUpdate, onUpdateComplete],
    );
    const [values, setValues] = useControlledState(
        value,
        defaultValue ?? Array.from({length}, () => ''),
        updateCallback,
    );
    const direction = useDirection();
    const errorMessageId = useUniqId();
    const noteId = useUniqId();
    const isErrorMsgVisible = validationState === 'invalid' && errorMessage;
    const ariaDescribedBy = [
        props?.['aria-describedby'],
        note ? noteId : undefined,
        isErrorMsgVisible ? errorMessageId : undefined,
    ]
        .filter(Boolean)
        .join(' ');

    const handleRef = (index: number, inputRef: HTMLInputElement | null) => {
        refs.current[index] = inputRef;
    };

    const focus = (index: number) => {
        setActiveIndex(index);
        refs.current[index]?.focus();
    };

    const focusPrev = (index: number) => {
        if (index > 0) {
            focus(index - 1);
        }
    };

    const focusNext = (index: number) => {
        if (index < length - 1) {
            focus(index + 1);
        }
    };

    const setValuesAtIndex = (index: number, nextValue: string) => {
        // Normalize array size to length prop
        const newValues = Array.from({length}, (__, i) => values[i] ?? '');

        if (nextValue.length > 0) {
            // Fill the subsequent inputs as well as the target input
            for (let k = 0; k < nextValue.length && index + k < newValues.length; k++) {
                newValues[index + k] = nextValue[k];
            }
        } else {
            newValues[index] = '';
        }

        // If values are the same then do not update
        if (newValues.every((__, i) => newValues[i] === values[i])) {
            return;
        }

        setValues(newValues);
    };

    const handleInputChange = (i: number, event: React.ChangeEvent<HTMLInputElement>) => {
        let nextValue = event.currentTarget.value;
        const currentValue = values[i];

        if (currentValue) {
            // Remove the current value from the new value
            if (currentValue === nextValue[0]) {
                nextValue = nextValue.slice(1);
            } else if (currentValue === nextValue[nextValue.length - 1]) {
                nextValue = nextValue.slice(0, -1);
            }
        }

        if (!validate(type, nextValue)) {
            return;
        }

        // If value's length greater than 1, then it's a paste so inserting at the start
        if (nextValue.length > 1) {
            setValuesAtIndex(0, nextValue);
            focusNext(nextValue.length - 1);
        } else {
            setValuesAtIndex(i, nextValue);
            focusNext(i);
        }
    };

    const handleInputKeyDown = (i: number, event: React.KeyboardEvent<HTMLInputElement>) => {
        switch (event.code) {
            case KeyCode.BACKSPACE:
                event.preventDefault();

                if (event.currentTarget.value) {
                    setValuesAtIndex(i, '');
                } else if (i > 0) {
                    setValuesAtIndex(i - 1, '');
                    focusPrev(i);
                }

                break;
            case KeyCode.ARROW_LEFT:
            case KeyCode.ARROW_UP:
                event.preventDefault();

                if (direction === 'rtl' && event.code === KeyCode.ARROW_LEFT) {
                    focusNext(i);
                } else {
                    focusPrev(i);
                }

                break;
            case KeyCode.ARROW_RIGHT:
            case KeyCode.ARROW_DOWN:
                event.preventDefault();

                if (direction === 'rtl' && event.code === KeyCode.ARROW_RIGHT) {
                    focusPrev(i);
                } else {
                    focusNext(i);
                }

                break;
        }
    };

    const handleFocus = (index: number) => {
        setFocusedIndex(index);
        setActiveIndex(index);
    };

    const handleBlur = () => {
        setFocusedIndex(-1);
    };

    React.useEffect(() => {
        if (autoFocus) {
            focus(0);
        }
        // We only care about autofocus on initial render
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useImperativeHandle(
        apiRef,
        () => ({
            focus: () => {
                refs.current[activeIndex]?.focus();
            },
        }),
        [activeIndex],
    );

    const formInputRef = useFormResetHandler({initialValue: values, onReset: setValues});

    const {focusWithinProps} = useFocusWithin({
        onFocusWithin: onFocus,
        onBlurWithin: onBlur,
    });

    let id = useUniqId();
    if (idProp) {
        id = idProp;
    }

    const {t} = i18n.useTranslation();

    return (
        <div
            ref={ref}
            {...filterDOMProps(restProps, {labelable: true})}
            {...focusWithinProps}
            className={b({size, responsive}, className)}
            style={style}
            data-qa={qa}
            role="group"
            id={id}
            aria-describedby={ariaDescribedBy}
        >
            <div className={b('items')}>
                {Array.from({length}).map((__, i) => {
                    const inputId = `${id}-${i}`;
                    const ariaLabelledBy =
                        props['aria-labelledby'] || props['aria-label']
                            ? [inputId, props['aria-labelledby'] || id].join(' ')
                            : undefined;
                    return (
                        <div key={i} className={b('item')}>
                            <TextInput
                                // Only pick first symbol while keeping input always controlled
                                value={values[i]?.[0] ?? ''}
                                tabIndex={activeIndex === i ? 0 : -1}
                                type={mask ? 'password' : 'text'}
                                size={size}
                                id={inputId}
                                disabled={disabled}
                                placeholder={focusedIndex === i ? undefined : placeholder}
                                autoComplete={otp ? 'one-time-code' : 'off'}
                                validationState={validationState}
                                controlProps={{
                                    inputMode: type === 'numeric' ? 'numeric' : 'text',
                                    pattern: type === 'numeric' ? '[0-9]*' : '[0-9a-zA-Z]*',
                                    className: b('control'),
                                    autoCapitalize: 'none',
                                    'aria-label': t('label_one-of', {
                                        number: i + 1,
                                        count: length,
                                    }),
                                    'aria-labelledby': ariaLabelledBy,
                                    'aria-describedby': ariaDescribedBy,
                                    'aria-details': props['aria-details'],
                                    'aria-invalid':
                                        validationState === 'invalid' ? true : undefined,
                                }}
                                controlRef={handleRef.bind(null, i)}
                                onChange={handleInputChange.bind(null, i)}
                                onKeyDown={handleInputKeyDown.bind(null, i)}
                                onFocus={handleFocus.bind(null, i)}
                                onBlur={handleBlur}
                            />
                        </div>
                    );
                })}
                {name ? (
                    <input
                        ref={formInputRef}
                        type="hidden"
                        name={name}
                        form={form}
                        value={values.join('')}
                        disabled={disabled}
                    />
                ) : null}
            </div>
            <OuterAdditionalContent
                note={note}
                errorMessage={isErrorMsgVisible ? errorMessage : null}
                noteId={noteId}
                errorMessageId={errorMessageId}
            />
        </div>
    );
});

PinInput.displayName = 'PinInput';
