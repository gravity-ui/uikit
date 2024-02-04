import React from 'react';

import debounce from 'lodash/debounce';

import {blockNew} from '../utils/cn';

import {BaseSlider} from './BaseSlider/BaseSlider';
import {SliderTooltip} from './SliderTooltip/SliderTooltip';
import type {RcSliderValueType, SliderProps, SliderValue} from './types';
import {getInnerState} from './utils';

import './Slider.scss';

const b = blockNew('slider');

export const Slider = React.forwardRef(function Slider(
    {
        value,
        defaultValue = 0,
        size = 'm',
        min = 0,
        max = 100,
        step = 1,
        marksCount = 0,
        availableValues,
        hasTooltip = false,
        errorText,
        validationState,
        disabled = false,
        debounceDelay = 0,
        onBlur,
        onChange,
        onChangeComplete,
        onFocus,
        autoFocus = false,
        tabIndex,
        className,
        qa,
        apiRef,
    }: SliderProps,
    ref: React.ForwardedRef<HTMLDivElement>,
) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleChange = React.useCallback(
        debounce(
            (changedValue: RcSliderValueType) => onChange?.(changedValue as SliderValue),
            debounceDelay,
        ),
        [onChange, debounceDelay],
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleChangeComplete = React.useCallback(
        debounce(
            (changedValue: RcSliderValueType) => onChangeComplete?.(changedValue as SliderValue),
            debounceDelay,
        ),
        [onChangeComplete, debounceDelay],
    );

    React.useEffect(() => {
        return () => {
            handleChange.cancel();
            handleChangeComplete.cancel();
        };
    }, [handleChange, handleChangeComplete]);

    const innerState = getInnerState({
        availableValues,
        defaultValue,
        marksCount,
        max,
        min,
        step,
        value,
    });
    const stateModifiers = {
        size,
        error: validationState === 'invalid' && !disabled,
        disabled,
        hasTooltip: Boolean(hasTooltip),
    };

    return (
        <div className={b(null, className)} ref={ref}>
            <div className={b('top', {size, hasTooltip})}></div>
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
                onChange={handleChange}
                onChangeComplete={handleChangeComplete}
                stateModifiers={stateModifiers}
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus={autoFocus}
                tabIndex={tabIndex}
                data-qa={qa}
                handleRender={
                    hasTooltip
                        ? (originHandle, handleProps) => {
                              return (
                                  <React.Fragment>
                                      {originHandle}
                                      <SliderTooltip
                                          value={handleProps.value}
                                          className={b('tooltip')}
                                          style={{left: originHandle.props.style?.left}}
                                          stateModifiers={stateModifiers}
                                      />
                                  </React.Fragment>
                              );
                          }
                        : undefined
                }
            ></BaseSlider>
            {stateModifiers.error && errorText && (
                <div className={b('error', {size})}>{errorText}</div>
            )}
        </div>
    );
});
