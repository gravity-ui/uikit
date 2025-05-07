'use client';

import * as React from 'react';

import {useControlledState} from '../../hooks';
import {useFormResetHandler} from '../../hooks/private';
import {useDirection} from '../theme';
import {block} from '../utils/cn';
import {filterDOMProps} from '../utils/filterDOMProps';

import {BaseSlider} from './BaseSlider/BaseSlider';
import {HandleWithTooltip} from './HandleWithTooltip/HandleWithTooltip';
import type {HandleWithTooltipProps, SliderProps, StateModifiers} from './types';
import {prepareSliderInnerState} from './utils';

import './Slider.scss';

const b = block('slider');

export const Slider = React.forwardRef(function Slider(
    {
        value,
        defaultValue,
        size = 'm',
        min = 0,
        max = 100,
        step = 1,
        markFormat,
        marks = 2,
        tooltipDisplay,
        tooltipFormat = markFormat,
        errorMessage,
        validationState,
        disabled = false,
        startPoint,
        inverted,
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
        ...restProps
    }: SliderProps,
    ref: React.ForwardedRef<HTMLDivElement>,
) {
    const direction = useDirection();

    const innerState = prepareSliderInnerState({
        defaultValue,
        max,
        min,
        step,
        value,
        markFormat,
        marks,
        tooltipDisplay,
        tooltipFormat,
        startPoint: inverted ? Math.max(min, max) : startPoint,
    });
    const [innerValue, setValue] = useControlledState(
        innerState.value,
        innerState.defaultValue,
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
        'tooltip-display': innerState.tooltipDisplay,
        rtl: direction === 'rtl',
        'no-marks': Array.isArray(marks) ? marks.length === 0 : marks === 0,
        inverted: innerState.startPoint === innerState.max && !innerState.range,
        'with-start-point': Boolean(
            innerState.startPoint &&
                !innerState.range &&
                innerState.startPoint !== innerState.max &&
                innerState.startPoint !== innerState.min,
        ),
    };

    const handleRender = (
        originHandle: HandleWithTooltipProps['originHandle'],
        originHandleProps: HandleWithTooltipProps['originHandleProps'],
    ) => {
        const handle =
            innerState.tooltipDisplay === 'off' ? (
                originHandle
            ) : (
                <HandleWithTooltip
                    originHandle={originHandle}
                    originHandleProps={originHandleProps}
                    stateModifiers={stateModifiers}
                    className={b('tooltip')}
                    tooltipFormat={innerState.tooltipFormat}
                />
            );

        return (
            <React.Fragment>
                {handle}
                <input
                    ref={inputRef}
                    type="hidden"
                    name={name}
                    form={form}
                    value={originHandleProps.value}
                    disabled={disabled}
                />
            </React.Fragment>
        );
    };

    return (
        <div {...filterDOMProps(restProps)} className={b(null, className)} style={style} ref={ref}>
            <div className={b('top', {size, 'tooltip-display': tooltipDisplay})}>
                {/* use this block to reserve place for tooltip */}
            </div>
            <BaseSlider
                ref={apiRef}
                value={innerValue}
                min={innerState.min}
                max={innerState.max}
                step={innerState.step}
                range={innerState.range}
                disabled={disabled}
                marks={innerState.marks}
                startPoint={innerState.startPoint}
                onBlur={onBlur}
                onFocus={onFocus}
                onChange={setValue}
                onChangeComplete={onUpdateComplete}
                stateModifiers={stateModifiers}
                autoFocus={autoFocus}
                tabIndex={tabIndex}
                data-qa={qa}
                handleRender={handleRender}
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
