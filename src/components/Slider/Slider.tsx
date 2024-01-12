import React from 'react';

import debounce from 'lodash/debounce';

import {blockNew} from '../utils/cn';

import {BaseSlider} from './BaseSlider/BaseSlider';
import {SliderTooltip} from './SliderTooltip/SliderTooltip';
import type {BaseSliderRefType, RcSliderValueType, SliderProps, SliderValue} from './sliderTypes';
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
        infoPointCount = 0,
        availableValues,
        withTooltip = true,
        error = false,
        disabled = false,
        keyboard = true,
        debounceDelay = 0,
        onBlur,
        onChange,
        onChangeComplete,
        onFocus,
        autoFocus = false,
        tabIndex,
        className,
        qa,
    }: SliderProps,
    ref: React.ForwardedRef<BaseSliderRefType>,
) {
    const baseSliderRef = React.useRef<BaseSliderRefType>(null);

    React.useImperativeHandle(ref, () => ({
        focus: () => {
            baseSliderRef.current?.focus();
        },
        blur: () => {
            baseSliderRef.current?.blur();
        },
    }));

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
        infoPointCount,
        max,
        min,
        step,
        value,
    });
    const styleModifiers = {
        size,
        error: error && !disabled,
        disabled,
        withTooltip: Boolean(withTooltip),
    };

    return (
        <div className={b({withTooltip}, className)}>
            <BaseSlider
                ref={baseSliderRef}
                value={innerState.value}
                defaultValue={innerState.defaultValue}
                min={innerState.min}
                max={innerState.max}
                step={innerState.step}
                range={innerState.range}
                disabled={disabled}
                keyboard={keyboard}
                marks={innerState.marks}
                onBlur={onBlur}
                onFocus={onFocus}
                onChange={handleChange}
                onChangeComplete={handleChangeComplete}
                styleModifiers={styleModifiers}
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus={autoFocus}
                tabIndex={tabIndex}
                data-qa={qa}
                handleRender={
                    withTooltip
                        ? (originHandle, handleProps) => {
                              return (
                                  <React.Fragment>
                                      {originHandle}
                                      <SliderTooltip
                                          value={handleProps.value}
                                          className={b('tooltip')}
                                          style={{left: originHandle.props.style?.left}}
                                          styleModifiers={styleModifiers}
                                      />
                                  </React.Fragment>
                              );
                          }
                        : undefined
                }
            ></BaseSlider>
        </div>
    );
});
