'use client';

import type * as React from 'react';

import {block} from '../../utils/cn';
import type {StateModifiers} from '../types';

import {SliderTooltipPin} from './SliderTooltipPin';

import './SliderTooltip.scss';

const b = block('slider-tooltip');

type SliderTooltipProps = {
    className?: string;
    style?: React.CSSProperties;
    stateModifiers: Omit<StateModifiers, 'hasTooltip'>;
} & React.PropsWithChildren;

export const SliderTooltip = ({className, style, stateModifiers, children}: SliderTooltipProps) => (
    <div className={b(stateModifiers, className)} style={style}>
        <div className={b('card', stateModifiers)}>
            {children}
            {stateModifiers.disabled && (
                //use this element to prevent crossing effect
                <SliderTooltipPin className={b('pin', {background: true})} />
            )}
            <SliderTooltipPin className={b('pin')} />
        </div>
    </div>
);
