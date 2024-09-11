'use client';

import React from 'react';

import debounce from 'lodash/debounce';

import {useDirection} from '../theme';
import {block} from '../utils/cn';

import {BaseSlider} from './BaseSlider/BaseSlider';
import {HandleWithTooltip} from './HandleWithTooltip/HandleWithTooltip';
import type {RcSliderValueType, SliderProps, SliderValue, StateModifiers} from './types';
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
        hasTooltip,
        markFormat,
        marks,
        tooltipDisplay,
        tooltipFormat = markFormat,
        errorMessage,
        validationState,
        disabled = false,
        debounceDelay = 0,
        onBlur,
        onUpdate,
        onUpdateComplete,
        onFocus,
        autoFocus = false,
        tabIndex,
        className,
        qa,
        apiRef,
        'aria-label': ariaLabelForHandle,
        'aria-labelledby': ariaLabelledByForHandle,
    }: SliderProps,
    ref: React.ForwardedRef<HTMLDivElement>,
) {
    const direction = useDirection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleUpdate = React.useCallback(
        debounce(
            (changedValue: RcSliderValueType) => onUpdate?.(changedValue as SliderValue),
            debounceDelay,
        ),
        [onUpdate, debounceDelay],
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleUpdateComplete = React.useCallback(
        debounce(
            (changedValue: RcSliderValueType) => onUpdateComplete?.(changedValue as SliderValue),
            debounceDelay,
        ),
        [onUpdateComplete, debounceDelay],
    );

    React.useEffect(() => {
        return () => {
            handleUpdate.cancel();
            handleUpdateComplete.cancel();
        };
    }, [handleUpdate, handleUpdateComplete]);

    const innerState = prepareSliderInnerState({
        availableValues,
        defaultValue,
        marksCount,
        max,
        min,
        step,
        value,
        markFormat,
        marks,
        hasTooltip,
        tooltipDisplay,
        tooltipFormat,
    });
    const stateModifiers: StateModifiers = {
        size,
        error: validationState === 'invalid' && !disabled,
        disabled,
        tooltipDisplay,
        rtl: direction === 'rtl',
    };

    return (
        <div className={b(null, className)} ref={ref}>
            <div className={b('top', {size, tooltipDisplay})}>
                {/* use this block to reserve place for tooltip */}
            </div>
            <BaseSlider
                ref={apiRef}
                value={innerState.value}
                defaultValue={innerState.defaultValue}
                min={innerState.min}
                max={innerState.max}
                step={innerState.step}
                range={innerState.range}
                disabled={disabled}
                marks={innerState.marks}
                onBlur={onBlur}
                onFocus={onFocus}
                onChange={handleUpdate}
                onChangeComplete={handleUpdateComplete}
                stateModifiers={stateModifiers}
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus={autoFocus}
                tabIndex={tabIndex}
                data-qa={qa}
                handleRender={
                    innerState.tooltipDisplay === 'off'
                        ? undefined
                        : (originHandle, originHandleProps) => (
                              <HandleWithTooltip
                                  originHandle={originHandle}
                                  originHandleProps={originHandleProps}
                                  stateModifiers={stateModifiers}
                                  className={b('tooltip')}
                                  tooltipFormat={innerState.tooltipFormat}
                              />
                          )
                }
                reverse={stateModifiers.rtl}
                ariaLabelForHandle={ariaLabelForHandle}
                ariaLabelledByForHandle={ariaLabelledByForHandle}
            ></BaseSlider>
            {stateModifiers.error && errorMessage && (
                <div className={b('error', {size})}>{errorMessage}</div>
            )}
        </div>
    );
});
