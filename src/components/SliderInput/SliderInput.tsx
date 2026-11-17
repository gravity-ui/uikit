'use client';

import * as React from 'react';

import {useControlledState, useFocusWithin, useLayoutEffect, useUniqId} from '../../hooks';
import {useFormResetHandler} from '../../hooks/private';
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
    alignSliderInputValue,
    getAdjacentSliderInputValue,
    parseSliderInputDraft,
    prepareSliderInputDomain,
} from './utils';

import './SliderInput.scss';

const b = block('slider-input');
const inputUpdateKeys = ['ArrowUp', 'ArrowDown', 'Home', 'End'];

interface SliderInputInteraction {
    source: 'input' | 'slider';
    startValue: number;
    lastValue: number;
}

export type SliderInputSize = SliderSize;

type SliderInputSliderProps = Pick<
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

export type SliderInputControlProps = Omit<
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

export interface SliderInputProps
    extends SliderInputSliderProps,
        DOMProps,
        QAProps,
        AriaLabelingProps,
        FocusEventHandlers<HTMLDivElement> {
    /**
     * The size of the control
     * @default "m"
     */
    size?: SliderInputSize;
    /** The control's `autocomplete` attribute */
    autoComplete?: TextInputProps['autoComplete'];
    /** The control's `autofocus` attribute */
    autoFocus?: boolean;
    /** The control's `tabIndex` attribute, applied to both the field and the slider handle */
    tabIndex?: number;
    /** The control's `id` attribute */
    id?: string;
    /** Help text rendered to the left of the input node */
    label?: TextInputProps['label'];
    /** Text that appears in the control when it has no value set */
    placeholder?: TextInputProps['placeholder'];
    /** User's node rendered before the input node */
    startContent?: TextInputProps['startContent'];
    /** User's node rendered after the input node */
    endContent?: TextInputProps['endContent'];
    /** An optional element rendered under the control */
    note?: TextInputProps['note'];
    /** Validation state */
    validationState?: TextInputProps['validationState'];
    /** Text of an error to show under the control when `validationState` is `"invalid"` */
    errorMessage?: TextInputProps['errorMessage'];
    /** React ref provided to the visible input element */
    controlRef?: React.Ref<HTMLInputElement>;
    /** The visible input's HTML attributes */
    controlProps?: SliderInputControlProps;
}

export const SliderInput = React.forwardRef<HTMLDivElement, SliderInputProps>(
    function SliderInput(rawProps, ref) {
        const props = useDefaultProps('SliderInput', rawProps);
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
                prepareSliderInputDomain({
                    min: minProp,
                    max: maxProp,
                    step: stepProp,
                    marks: marksProp,
                }),
            [marksProp, maxProp, minProp, stepProp],
        );
        const controlledValue = React.useMemo(
            () => (valueProp === undefined ? undefined : alignSliderInputValue(valueProp, domain)),
            [domain, valueProp],
        );
        const defaultValue = React.useMemo(
            () => alignSliderInputValue(defaultValueProp ?? domain.min, domain),
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
            () => alignSliderInputValue(storedValue, domain),
            [domain, storedValue],
        );
        const [draftValue, setDraftValue] = React.useState(String(committedValue));
        const draftValueRef = React.useRef(draftValue);
        const updateDraftValue = React.useCallback((nextDraft: string) => {
            // User callbacks can synchronously blur the input before React renders the new draft.
            draftValueRef.current = nextDraft;
            setDraftValue(nextDraft);
        }, []);
        const [completion, setCompletion] = React.useState<SliderInputInteraction | null>(null);
        const interactionRef = React.useRef<SliderInputInteraction | null>(null);
        const completedInteractionRef = React.useRef<SliderInputInteraction | null>(null);
        const previousStateRef = React.useRef({value: committedValue, domain});
        const sliderRef = React.useRef<HTMLDivElement>(null);
        const isControlled = valueProp !== undefined;

        useLayoutEffect(() => {
            const previous = previousStateRef.current;
            const domainChanged =
                previous.domain.min !== domain.min ||
                previous.domain.max !== domain.max ||
                previous.domain.step !== domain.step ||
                previous.domain.markPoints.length !== domain.markPoints.length ||
                previous.domain.markPoints.some(
                    (point, index) => point !== domain.markPoints[index],
                );
            const valueChanged = !Object.is(previous.value, committedValue);
            const interaction = interactionRef.current ?? completion;
            const externalUpdate =
                isControlled && valueChanged && !Object.is(committedValue, interaction?.lastValue);
            const cancelled = disabled || domainChanged || externalUpdate;

            if (cancelled) {
                interactionRef.current = null;
            }
            if (!isControlled && !Object.is(storedValue, committedValue)) {
                suppressOnUpdateRef.current = true;
                setStoredValue(committedValue);
                suppressOnUpdateRef.current = false;
            }
            if (
                (cancelled || valueChanged) &&
                parseSliderInputDraft(draftValue) !== committedValue
            ) {
                updateDraftValue(String(committedValue));
            }
            previousStateRef.current = {value: committedValue, domain};

            if (completion) {
                setCompletion(null);
                // A completion can share a React batch with its update (for example, a mark click).
                if (completedInteractionRef.current !== completion) {
                    completedInteractionRef.current = completion;
                    if (!cancelled && !Object.is(completion.startValue, committedValue)) {
                        onUpdateComplete?.(committedValue);
                    }
                }
            }
        }, [
            committedValue,
            completion,
            disabled,
            domain,
            draftValue,
            isControlled,
            onUpdateComplete,
            setStoredValue,
            storedValue,
            updateDraftValue,
        ]);

        const beginInteraction = React.useCallback(
            (source: SliderInputInteraction['source']) => {
                if (interactionRef.current?.source !== source) {
                    interactionRef.current = {
                        source,
                        startValue: committedValue,
                        lastValue: committedValue,
                    };
                }
                return interactionRef.current;
            },
            [committedValue],
        );

        const updateValue = React.useCallback(
            (nextValue: number, source: SliderInputInteraction['source']) => {
                const canonicalValue = alignSliderInputValue(nextValue, domain);
                beginInteraction(source).lastValue = canonicalValue;
                setStoredValue(canonicalValue);
                return canonicalValue;
            },
            [beginInteraction, domain, setStoredValue],
        );

        const finishInteraction = React.useCallback((source: SliderInputInteraction['source']) => {
            if (interactionRef.current?.source === source) {
                const interaction = interactionRef.current;
                interactionRef.current = null;
                setCompletion(interaction);
            }
        }, []);

        const commitDraft = React.useCallback(() => {
            // A late blur must not commit the old draft after a Slider interaction has started.
            if (interactionRef.current?.source !== 'input') {
                return;
            }
            const parsedValue = parseSliderInputDraft(draftValueRef.current);
            const nextValue =
                parsedValue === undefined
                    ? committedValue
                    : alignSliderInputValue(parsedValue, domain);
            if (!Object.is(nextValue, interactionRef.current.lastValue)) {
                updateValue(nextValue, 'input');
            }
            updateDraftValue(String(isControlled ? committedValue : nextValue));
            finishInteraction('input');
        }, [
            committedValue,
            domain,
            finishInteraction,
            isControlled,
            updateDraftValue,
            updateValue,
        ]);

        const handleInputChange = React.useCallback(
            (event: React.ChangeEvent<HTMLInputElement>) => {
                const nextDraft = event.target.value;
                beginInteraction('input');
                updateDraftValue(nextDraft);

                const parsedValue = parseSliderInputDraft(nextDraft);
                const isCanonicalDraft =
                    parsedValue !== undefined &&
                    alignSliderInputValue(parsedValue, domain) === parsedValue;
                if (isCanonicalDraft) {
                    // Keep equivalent decimal drafts such as "0.050" while publishing the number.
                    updateValue(parsedValue, 'input');
                }
                controlProps?.onChange?.(event);
                if (isCanonicalDraft && isControlled && !Object.is(parsedValue, committedValue)) {
                    updateDraftValue(String(committedValue));
                }
            },
            [
                beginInteraction,
                committedValue,
                controlProps,
                domain,
                isControlled,
                updateDraftValue,
                updateValue,
            ],
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
                const isUpdateKey = inputUpdateKeys.includes(event.key);
                if (event.key === 'Enter') {
                    commitDraft();
                } else if (isUpdateKey) {
                    event.preventDefault();
                    let nextValue: number;
                    if (event.key === 'Home') {
                        nextValue = domain.min;
                    } else if (event.key === 'End') {
                        nextValue = domain.max;
                    } else {
                        nextValue = getAdjacentSliderInputValue(
                            parseSliderInputDraft(draftValueRef.current) ?? committedValue,
                            event.key === 'ArrowUp' ? 'up' : 'down',
                            domain,
                        );
                    }
                    updateDraftValue(String(nextValue));
                    updateValue(nextValue, 'input');
                }
                controlProps?.onKeyDown?.(event);
                if (isUpdateKey && isControlled) {
                    updateDraftValue(String(committedValue));
                }
            },
            [
                commitDraft,
                committedValue,
                controlProps,
                domain,
                isControlled,
                updateDraftValue,
                updateValue,
            ],
        );

        const handleInputKeyUp = React.useCallback(
            (event: React.KeyboardEvent<HTMLInputElement>) => {
                if (inputUpdateKeys.includes(event.key)) {
                    finishInteraction('input');
                }
                controlProps?.onKeyUp?.(event);
            },
            [controlProps, finishInteraction],
        );

        const handleSliderUpdate = React.useCallback(
            (nextValue: number) => {
                const canonicalValue = updateValue(nextValue, 'slider');
                updateDraftValue(String(isControlled ? committedValue : canonicalValue));
            },
            [committedValue, isControlled, updateDraftValue, updateValue],
        );
        const handleSliderUpdateComplete = React.useCallback(() => {
            finishInteraction('slider');
        }, [finishInteraction]);
        const {focusWithinProps: sliderFocusWithinProps} = useFocusWithin<HTMLDivElement>({
            onBlurWithin: handleSliderUpdateComplete,
        });

        const handlePointerDownCapture = React.useCallback(
            (event: React.PointerEvent<HTMLDivElement>) => {
                if (sliderRef.current?.contains(event.target as Node)) {
                    commitDraft();
                }
            },
            [commitDraft],
        );

        const handleReset = React.useCallback(
            (initialValue: number) => {
                interactionRef.current = null;
                setCompletion(null);
                const nextValue = alignSliderInputValue(initialValue, domain);
                setStoredValue(nextValue);
                updateDraftValue(String(isControlled ? committedValue : nextValue));
            },
            [committedValue, domain, isControlled, setStoredValue, updateDraftValue],
        );
        const resetRef = useFormResetHandler({initialValue: committedValue, onReset: handleReset});

        const formatMark = React.useCallback(
            (value: number) => {
                const formattedValue = markFormat ? markFormat(value) : String(value);
                // rc-slider removes a selectable mark when its label is an empty string.
                return formattedValue === '' ? '\u00a0' : formattedValue;
            },
            [markFormat],
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
                className={b(
                    {size, disabled, invalid, fixed: domain.min === domain.max},
                    className,
                )}
                style={style}
                data-qa={qa}
                role="group"
                aria-label={props['aria-label']}
                aria-labelledby={props['aria-labelledby']}
                // Both controls describe the value; the group does not repeat their description.
                aria-describedby={undefined}
                aria-disabled={disabled || undefined}
                onPointerDownCapture={handlePointerDownCapture}
            >
                <TextInput
                    className={b('input')}
                    name=""
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
                        'aria-describedby':
                            [controlProps?.['aria-describedby'], ariaDescribedBy]
                                .filter(Boolean)
                                .join(' ') || undefined,
                        'aria-valuemin': domain.min,
                        'aria-valuemax': domain.max,
                        'aria-valuenow': committedValue,
                        'aria-valuetext':
                            controlProps?.['aria-valuetext'] ??
                            (draftValue === String(committedValue)
                                ? undefined
                                : draftValue || undefined),
                    }}
                    onChange={handleInputChange}
                    onFocus={controlProps?.onFocus}
                    onBlur={handleInputBlur}
                    onKeyDown={handleInputKeyDown}
                    onKeyUp={handleInputKeyUp}
                    onKeyPress={controlProps?.onKeyPress}
                />
                <Slider<number>
                    {...sliderFocusWithinProps}
                    ref={sliderRef}
                    className={b('slider')}
                    value={committedValue}
                    min={domain.min}
                    max={domain.max}
                    step={domain.step}
                    marks={domain.markPoints}
                    markFormat={formatMark}
                    size={size}
                    disabled={disabled || domain.min === domain.max}
                    tooltipDisplay="off"
                    tabIndex={tabIndex}
                    name=""
                    form=""
                    aria-label={sharedLabel}
                    aria-labelledby={props['aria-labelledby']}
                    validationState={invalid ? 'invalid' : undefined}
                    aria-describedby={ariaDescribedBy || undefined}
                    onUpdate={handleSliderUpdate}
                    onUpdateComplete={handleSliderUpdateComplete}
                />
                <input
                    // Remount only this hidden input to rebind reset when its form owner changes.
                    key={form}
                    ref={resetRef}
                    type="hidden"
                    name={name}
                    form={form}
                    value={committedValue}
                    disabled={disabled}
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
