'use client';

import * as React from 'react';

import {useControlledState, useFocusWithin, useUniqId} from '../../hooks';
import {Slider} from '../Slider';
import type {SliderProps, SliderSize} from '../Slider';
import type {TextInputProps} from '../controls/TextInput';
import {TextInput} from '../controls/TextInput';
import {OuterAdditionalContent} from '../controls/common/OuterAdditionalContent/OuterAdditionalContent';
import {useDefaultProps} from '../theme/useDefaultProps';
import type {AriaLabelingProps, DOMProps, FocusEventHandlers, QAProps} from '../types';
import {block} from '../utils/cn';
import {filterDOMProps} from '../utils/filterDOMProps';

import {
    alignRangeInputValue,
    getAdjacentRangeInputValue,
    parseRangeInputDraft,
    prepareRangeInputDomain,
} from './utils';

import './RangeInput.scss';

const b = block('range-input');

export type RangeInputSize = SliderSize;

type RangeInputSliderProps = Pick<
    SliderProps<number>,
    | 'value'
    | 'defaultValue'
    | 'min'
    | 'max'
    | 'step'
    | 'marks'
    | 'markFormat'
    | 'disabled'
    | 'name'
    | 'form'
    | 'onUpdate'
    | 'onUpdateComplete'
>;

export type RangeInputControlProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    | 'aria-invalid'
    | 'aria-valuemax'
    | 'aria-valuemin'
    | 'aria-valuenow'
    | 'autoComplete'
    | 'autoFocus'
    | 'defaultValue'
    | 'disabled'
    | 'form'
    | 'id'
    | 'inputMode'
    | 'max'
    | 'min'
    | 'name'
    | 'pattern'
    | 'placeholder'
    | 'readOnly'
    | 'role'
    | 'step'
    | 'tabIndex'
    | 'type'
    | 'value'
>;

export interface RangeInputProps
    extends RangeInputSliderProps,
        DOMProps,
        QAProps,
        AriaLabelingProps,
        FocusEventHandlers<HTMLDivElement> {
    size?: RangeInputSize;
    autoComplete?: TextInputProps['autoComplete'];
    autoFocus?: boolean;
    tabIndex?: number;
    id?: string;
    label?: TextInputProps['label'];
    placeholder?: TextInputProps['placeholder'];
    startContent?: TextInputProps['startContent'];
    endContent?: TextInputProps['endContent'];
    note?: TextInputProps['note'];
    validationState?: TextInputProps['validationState'];
    errorMessage?: TextInputProps['errorMessage'];
    controlRef?: React.Ref<HTMLInputElement>;
    controlProps?: RangeInputControlProps;
}

export const RangeInput = React.forwardRef<HTMLDivElement, RangeInputProps>(
    function RangeInput(rawProps, ref) {
        const props = useDefaultProps('RangeInput', rawProps);
        const {
            value: valueProp,
            defaultValue: defaultValueProp,
            min: minProp,
            max: maxProp,
            step: stepProp,
            marks: marksProp,
            markFormat,
            size = 'm',
            disabled = false,
            name,
            form,
            onUpdate,
            onUpdateComplete,
            onFocus,
            onBlur,
            autoComplete,
            autoFocus,
            tabIndex,
            id,
            label,
            placeholder,
            startContent,
            endContent,
            note,
            validationState,
            errorMessage,
            controlRef,
            controlProps,
            className,
            style,
            qa,
            ...restProps
        } = props;

        const domain = React.useMemo(
            () =>
                prepareRangeInputDomain({
                    min: minProp,
                    max: maxProp,
                    step: stepProp,
                    marks: marksProp,
                }),
            [marksProp, maxProp, minProp, stepProp],
        );
        const controlledValue = React.useMemo(
            () => (valueProp === undefined ? undefined : alignRangeInputValue(valueProp, domain)),
            [domain, valueProp],
        );
        const defaultValue = React.useMemo(
            () => alignRangeInputValue(defaultValueProp ?? domain.min, domain),
            [defaultValueProp, domain],
        );
        const suppressOnUpdateRef = React.useRef(false);
        const handleStateUpdate = React.useCallback(
            (nextValue: number) => {
                if (!suppressOnUpdateRef.current) {
                    onUpdate?.(nextValue);
                }
            },
            [onUpdate],
        );
        const [storedValue, setStoredValue] = useControlledState(
            controlledValue,
            defaultValue,
            handleStateUpdate,
        );
        const committedValue = React.useMemo(
            () => alignRangeInputValue(storedValue, domain),
            [domain, storedValue],
        );
        const [draftValue, setDraftValue] = React.useState(String(committedValue));
        const previousCommittedValueRef = React.useRef(committedValue);
        const isControlled = valueProp !== undefined;

        React.useEffect(() => {
            if (!Object.is(previousCommittedValueRef.current, committedValue)) {
                if (!isControlled && !Object.is(storedValue, committedValue)) {
                    suppressOnUpdateRef.current = true;
                    setStoredValue(committedValue);
                    suppressOnUpdateRef.current = false;
                }
                previousCommittedValueRef.current = committedValue;
                setDraftValue(String(committedValue));
            }
        }, [committedValue, isControlled, setStoredValue, storedValue]);

        const updateCommittedValue = React.useCallback(
            (nextValue: number) => {
                const canonicalValue = alignRangeInputValue(nextValue, domain);
                setStoredValue(canonicalValue);
                setDraftValue(String(isControlled ? committedValue : canonicalValue));
            },
            [committedValue, domain, isControlled, setStoredValue],
        );

        const commitDraft = React.useCallback(() => {
            const parsedValue = parseRangeInputDraft(draftValue);
            if (parsedValue === undefined) {
                setDraftValue(String(committedValue));
                return;
            }

            const nextValue = alignRangeInputValue(parsedValue, domain);
            updateCommittedValue(nextValue);
            onUpdateComplete?.(nextValue);
        }, [committedValue, domain, draftValue, onUpdateComplete, updateCommittedValue]);

        const handleInputChange = React.useCallback(
            (event: React.ChangeEvent<HTMLInputElement>) => {
                const nextDraft = event.target.value;
                setDraftValue(nextDraft);
                controlProps?.onChange?.(event);

                const parsedValue = parseRangeInputDraft(nextDraft);
                if (parsedValue !== undefined) {
                    const alignedValue = alignRangeInputValue(parsedValue, domain);
                    if (alignedValue === parsedValue) {
                        updateCommittedValue(alignedValue);
                    }
                }
            },
            [controlProps, domain, updateCommittedValue],
        );

        const handleInputBlur = React.useCallback(
            (event: React.FocusEvent<HTMLInputElement>) => {
                commitDraft();
                controlProps?.onBlur?.(event);
            },
            [commitDraft, controlProps],
        );

        const handleInputKeyDown = React.useCallback(
            (event: React.KeyboardEvent<HTMLInputElement>) => {
                if (event.key === 'Enter') {
                    commitDraft();
                } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                    event.preventDefault();
                    const nextValue = getAdjacentRangeInputValue(
                        committedValue,
                        event.key === 'ArrowUp' ? 'up' : 'down',
                        domain,
                    );
                    updateCommittedValue(nextValue);
                    onUpdateComplete?.(nextValue);
                } else if (event.key === 'Home' || event.key === 'End') {
                    event.preventDefault();
                    const nextValue = event.key === 'Home' ? domain.min : domain.max;
                    updateCommittedValue(nextValue);
                    onUpdateComplete?.(nextValue);
                }
                controlProps?.onKeyDown?.(event);
            },
            [
                commitDraft,
                committedValue,
                controlProps,
                domain,
                onUpdateComplete,
                updateCommittedValue,
            ],
        );

        const handleSliderUpdateComplete = React.useCallback(
            (nextValue: number) => {
                const canonicalValue = alignRangeInputValue(nextValue, domain);
                setDraftValue(String(isControlled ? committedValue : canonicalValue));
                onUpdateComplete?.(canonicalValue);
            },
            [committedValue, domain, isControlled, onUpdateComplete],
        );

        const {focusWithinProps} = useFocusWithin<HTMLDivElement>({
            onFocusWithin: onFocus,
            onBlurWithin: onBlur,
        });
        const invalid = validationState === 'invalid' && !disabled;
        const errorMessageId = useUniqId();
        const noteId = useUniqId();
        const ariaDescribedBy = [
            props['aria-describedby'],
            note ? noteId : undefined,
            invalid && errorMessage ? errorMessageId : undefined,
        ]
            .filter(Boolean)
            .join(' ');
        const ariaProps = filterDOMProps(restProps, {labelable: true});
        const sharedLabel = props['aria-label'] ?? label;

        return (
            <div
                {...ariaProps}
                {...focusWithinProps}
                ref={ref}
                className={b({size, disabled, invalid}, className)}
                style={style}
                data-qa={qa}
                role="group"
                aria-label={props['aria-label']}
                aria-labelledby={props['aria-labelledby']}
                aria-describedby={ariaDescribedBy || undefined}
                aria-disabled={disabled || undefined}
            >
                <TextInput
                    className={b('input')}
                    size={size}
                    value={draftValue}
                    disabled={disabled}
                    autoComplete={autoComplete}
                    autoFocus={autoFocus}
                    tabIndex={tabIndex}
                    id={id}
                    label={label}
                    placeholder={placeholder}
                    startContent={startContent}
                    endContent={endContent}
                    validationState={invalid ? 'invalid' : undefined}
                    controlRef={controlRef}
                    controlProps={{
                        ...controlProps,
                        form,
                        role: 'spinbutton',
                        inputMode: 'decimal',
                        'aria-label': controlProps?.['aria-label'] ?? sharedLabel,
                        'aria-labelledby':
                            controlProps?.['aria-labelledby'] ?? props['aria-labelledby'],
                        'aria-describedby': [controlProps?.['aria-describedby'], ariaDescribedBy]
                            .filter(Boolean)
                            .join(' '),
                        'aria-valuemin': domain.min,
                        'aria-valuemax': domain.max,
                        'aria-valuenow': committedValue,
                    }}
                    onChange={handleInputChange}
                    onFocus={controlProps?.onFocus}
                    onBlur={handleInputBlur}
                    onKeyDown={handleInputKeyDown}
                    onKeyUp={controlProps?.onKeyUp}
                    onKeyPress={controlProps?.onKeyPress}
                />
                <Slider<number>
                    className={b('slider')}
                    value={committedValue}
                    min={domain.min}
                    max={domain.max}
                    step={domain.step}
                    marks={domain.marks}
                    markFormat={markFormat}
                    size={size}
                    disabled={disabled || domain.min === domain.max}
                    tooltipDisplay="off"
                    tabIndex={tabIndex}
                    name={name}
                    form={form}
                    aria-label={sharedLabel}
                    aria-labelledby={props['aria-labelledby']}
                    validationState={invalid ? 'invalid' : undefined}
                    onUpdate={updateCommittedValue}
                    onUpdateComplete={handleSliderUpdateComplete}
                />
                <OuterAdditionalContent
                    note={note}
                    noteId={noteId}
                    errorMessage={invalid ? errorMessage : undefined}
                    errorMessageId={errorMessageId}
                />
            </div>
        );
    },
);
