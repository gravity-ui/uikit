import React from 'react';

import debounce from 'lodash/debounce';

import {useControlledState} from '../../hooks';
import {useDirection} from '../theme';
import {block} from '../utils/cn';

import {BaseSlider} from './BaseSlider/BaseSlider';
import {SliderTooltip} from './SliderTooltip/SliderTooltip';
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
        hasTooltip = false,
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
    const previousBoundaries = React.useRef({min, max});

    const innerState = prepareSliderInnerState({
        availableValues,
        defaultValue,
        marksCount,
        max,
        min,
        step,
        value,
    });

    const [currentValue, setCurrentValue] = useControlledState(
        innerState.value as RcSliderValueType,
        innerState.defaultValue as RcSliderValueType,
        onUpdate,
    );

    const direction = useDirection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedUpdate = React.useCallback(
        debounce(
            (changedValue: RcSliderValueType) => onUpdate?.(changedValue as SliderValue),
            debounceDelay,
        ),
        [onUpdate, debounceDelay],
    );

    const handleUpdate = React.useCallback(
        (changedValue: RcSliderValueType) => {
            setCurrentValue(changedValue as SliderValue);
            debouncedUpdate(changedValue);
        },
        [debouncedUpdate],
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
            debouncedUpdate.cancel();
            handleUpdateComplete.cancel();
        };
    }, [debouncedUpdate, handleUpdateComplete]);

    React.useEffect(() => {
        //TODO написать код изменения состояния только в том случае, если не первый рендер
        //то есть при изменении минимального и максимального значения
        if (previousBoundaries.current.min !== min || previousBoundaries.current.max !== max) {
            //изменились значения, значит, проверяем, укладывается ли текущее значение
            //слайдера в ограничения и если нет, то меняем его

            //записываем новые значения
            previousBoundaries.current = {min, max};
        }
    }, [min, max]);

    const stateModifiers: StateModifiers = {
        size,
        error: validationState === 'invalid' && !disabled,
        disabled,
        hasTooltip: Boolean(hasTooltip),
        rtl: direction === 'rtl',
    };

    return (
        <div className={b(null, className)} ref={ref}>
            <div className={b('top', {size, hasTooltip})}></div>
            <BaseSlider
                ref={apiRef}
                value={currentValue}
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
                    hasTooltip
                        ? (originHandle, handleProps) => {
                              const styleProp = stateModifiers.rtl ? 'right' : 'left';
                              return (
                                  <React.Fragment>
                                      {originHandle}
                                      <SliderTooltip
                                          value={handleProps.value}
                                          className={b('tooltip')}
                                          style={{
                                              insetInlineStart:
                                                  originHandle.props.style?.[styleProp],
                                          }}
                                          stateModifiers={stateModifiers}
                                      />
                                  </React.Fragment>
                              );
                          }
                        : undefined
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
