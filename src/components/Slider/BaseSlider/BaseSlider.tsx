'use client';

import React from 'react';

import Slider from 'rc-slider';
import type {SliderProps, SliderRef} from 'rc-slider';

import {block} from '../../utils/cn';
import type {StateModifiers} from '../types';

import './BaseSlider.scss';

const b = block('base-slider');

type BaseSliderProps = {stateModifiers: StateModifiers} & Omit<
    SliderProps<number | [number, number]>,
    'classNames' | 'prefixCls' | 'className' | 'pushable' | 'keyboard'
>;

export const BaseSlider = React.forwardRef<SliderRef, BaseSliderProps>(function BaseSlider(
    {stateModifiers, ...otherProps}: BaseSliderProps,
    ref: React.ForwardedRef<SliderRef>,
) {
    return (
        // @ts-expect-error Slider value type is (number | number[]) but we use (number | [number, number])
        <Slider
            {...otherProps}
            ref={ref}
            className={b(stateModifiers)}
            classNames={{
                handle: b('handle', stateModifiers),
                rail: b('rail', stateModifiers),
                track: b('track', stateModifiers),
            }}
            pushable={false}
            dots={false}
            keyboard={true}
        />
    );
});
