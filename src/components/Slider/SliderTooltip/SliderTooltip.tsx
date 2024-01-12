import React from 'react';

import {blockNew} from '../../utils/cn';
import type {StyleModifiers} from '../sliderTypes';

import {SliderTooltipPin} from './SliderTooltipPin';

import './SliderTooltip.scss';

const b = blockNew('slider-tooltip');

type SliderTooltipProps = {
    value: number;
    className?: string;
    style?: React.CSSProperties;
    styleModifiers: Omit<StyleModifiers, 'withTooltip'>;
};

export const SliderTooltip = ({value, className, style, styleModifiers}: SliderTooltipProps) => (
    <div className={b(styleModifiers, className)} style={style}>
        <div className={b('card', styleModifiers)}>
            {value}
            <SliderTooltipPin className={b('pin')} />
        </div>
    </div>
);
