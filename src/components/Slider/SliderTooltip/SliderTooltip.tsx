import React from 'react';

import {blockNew} from '../../utils/cn';
import type {StyleModifiers} from '../types';

import {SliderTooltipPin} from './SliderTooltipPin';

import './SliderTooltip.scss';

const b = blockNew('slider-tooltip');

type SliderTooltipProps = {
    value: number;
    className?: string;
    style?: React.CSSProperties;
    styleModifiers: Omit<StyleModifiers, 'hasTooltip'>;
};

export const SliderTooltip = ({value, className, style, styleModifiers}: SliderTooltipProps) => {
    const preventAction = React.useCallback((e: React.SyntheticEvent) => {
        //make tooltip non-interactive
        e.preventDefault();
        e.stopPropagation();
    }, []);
    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <div
            className={b(styleModifiers, className)}
            style={style}
            onClick={preventAction}
            onMouseDown={preventAction}
            onTouchStart={preventAction}
        >
            <div className={b('card', styleModifiers)}>
                {value}
                {styleModifiers.disabled && (
                    //use this element to prevent crossing effect
                    <SliderTooltipPin className={b('pin', {background: true})} />
                )}
                <SliderTooltipPin className={b('pin')} />
            </div>
        </div>
    );
};
