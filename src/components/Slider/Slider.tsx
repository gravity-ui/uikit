'use client';

import React from 'react';

import {useControlledState} from '../../hooks';
import {useFormResetHandler} from '../../hooks/private';
import {useDirection} from '../theme';
import {block} from '../utils/cn';
import {filterDOMProps} from '../utils/filterDOMProps';

import {BaseSlider} from './BaseSlider/BaseSlider';
import {SliderTooltip} from './SliderTooltip/SliderTooltip';
import type {SliderProps, StateModifiers} from './types';
import {prepareSliderInnerState} from './utils';

import './Slider.scss';

const b = block('slider');

export const Slider = React.forwardRef(function Slider(
    {
        value,
        defaultValue = 0,
        size = 'm',
        min = 0,
        max = 100,
        step = 1,
        marksCount = 2,
        availableValues,
        hasTooltip = false,
        errorMessage,
        validationState,
        disabled = false,
        onBlur,
        onUpdate,
        onUpdateComplete,
        onFocus,
        autoFocus = false,
        tabIndex,
        className,
        style,
        qa,
        apiRef,
        'aria-label': ariaLabelForHandle,
        'aria-labelledby': ariaLabelledByForHandle,
        name,
        form,
        id,
        ...otherProps
    }: SliderProps,
    ref: React.ForwardedRef<HTMLDivElement>,
) {
    const direction = useDirection();

    const innerState = prepareSliderInnerState({
        availableValues,
        defaultValue,
        marksCount,
        max,
        min,
        step,
        value,
    });

    const [innerValue, setValue] = useControlledState(
        innerState.value,
        innerState.defaultValue ?? min,
        onUpdate,
    );

    const handleReset = React.useCallback(
        (v: number | [number, number]) => {
            setValue(v);

            onUpdateComplete?.(v);
        },
        [onUpdateComplete, setValue],
    );

    const inputRef = useFormResetHandler({initialValue: innerValue, onReset: handleReset});

    const stateModifiers: StateModifiers = {
        size,
        error: validationState === 'invalid' && !disabled,
        disabled,
        hasTooltip: Boolean(hasTooltip),
        rtl: direction === 'rtl',
    };

    return (
        <div
            {...filterDOMProps(otherProps)}
            id={id}
            className={b(null, className)}
            ref={ref}
            style={style}
            data-qa={qa}
        >
            <div className={b('top', {size, hasTooltip})}></div>
            <BaseSlider
                ref={apiRef}
                value={innerValue}
                min={innerState.min}
                max={innerState.max}
                step={innerState.step}
                range={innerState.range}
                disabled={disabled}
                marks={innerState.marks}
                onBlur={onBlur}
                onFocus={onFocus}
                onChange={setValue}
                onChangeComplete={onUpdateComplete}
                stateModifiers={stateModifiers}
                autoFocus={autoFocus}
                tabIndex={tabIndex}
                handleRender={(originHandle, handleProps) => {
                    let handle: React.ReactElement = React.cloneElement(originHandle, {
                        // @ts-expect-error originHandle has incorrect type, actually props is HTMLAttributes<HTMLDivElement>
                        id: id ? `${id}-handle-${handleProps.index}` : undefined,
                        'data-qa': qa ? `${qa}-handle-${handleProps.index}` : undefined,
                    });
                    if (name) {
                        handle = (
                            <React.Fragment>
                                {handle}
                                <input
                                    ref={inputRef}
                                    type="hidden"
                                    name={name}
                                    form={form}
                                    value={handleProps.value}
                                    disabled={disabled}
                                />
                            </React.Fragment>
                        );
                    }
                    if (!hasTooltip) {
                        return handle;
                    }
                    const styleProp = stateModifiers.rtl ? 'right' : 'left';
                    return (
                        <React.Fragment>
                            {handle}
                            <SliderTooltip
                                value={handleProps.value}
                                className={b('tooltip')}
                                style={{
                                    insetInlineStart: originHandle.props.style?.[styleProp],
                                }}
                                stateModifiers={stateModifiers}
                            />
                        </React.Fragment>
                    );
                }}
                reverse={stateModifiers.rtl}
                ariaLabelForHandle={ariaLabelForHandle}
                ariaLabelledByForHandle={ariaLabelledByForHandle}
            />
            {stateModifiers.error && errorMessage && (
                <div className={b('error', {size})}>{errorMessage}</div>
            )}
        </div>
    );
}) as <T extends number | [number, number]>(
    p: SliderProps<T> & {ref?: React.Ref<HTMLDivElement>},
) => React.ReactElement;
