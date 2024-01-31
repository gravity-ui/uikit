import React from 'react';

import Slider from 'rc-slider';
import type {SliderProps, SliderRef} from 'rc-slider';

import {blockNew} from '../../utils/cn';
import type {StyleModifiers} from '../types';

import './BaseSlider.scss';

const b = blockNew('base-slider');

type BaseSliderProps = {styleModifiers: StyleModifiers} & Omit<
    SliderProps,
    'classNames' | 'prefixCls' | 'className' | 'pushable'
>;

export const BaseSlider = React.forwardRef<SliderRef, BaseSliderProps>(function BaseSlider(
    {styleModifiers, ...otherProps}: BaseSliderProps,
    ref: React.ForwardedRef<SliderRef>,
) {
    return (
        <Slider
            {...otherProps}
            ref={ref}
            className={b(styleModifiers)}
            classNames={{
                handle: b('handle', styleModifiers),
                rail: b('rail', styleModifiers),
                track: b('track', styleModifiers),
            }}
            pushable={false}
            dots={false}
        ></Slider>
    );
});
