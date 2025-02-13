'use client';

import * as React from 'react';

import Slider from 'rc-slider';
import type {SliderProps, SliderRef} from 'rc-slider';

import {block} from '../../utils/cn';
import type {StateModifiers} from '../types';

import './BaseSlider.scss';

const b = block('base-slider');

type BaseSliderProps<T = number | number[]> = {stateModifiers: StateModifiers} & Omit<
    SliderProps<T>,
    'classNames' | 'prefixCls' | 'className' | 'pushable' | 'keyboard'
>;

export const BaseSlider = React.forwardRef<SliderRef, BaseSliderProps>(function BaseSlider(
    {stateModifiers, ...restProps},
    ref,
) {
    return (
        <Slider
            {...restProps}
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
}) as <T>(p: BaseSliderProps<T> & {ref?: React.Ref<SliderRef>}) => React.ReactElement;
