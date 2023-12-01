import React from 'react';

import type {DOMProps, QAProps} from '../types';
import {blockNew} from '../utils/cn';

import {ColorsGridItem} from './ColorsGridItem';
import type {Color} from './utils';

import './ColorsGrid.scss';

const b = blockNew('colors-grid');

export type ColorsGridSize = 's' | 'm' | 'l';

export interface ColorsGridProps extends DOMProps, QAProps {
    colors: Color[];
    value?: Color;
    rowSize?: number;
    size?: ColorsGridSize;
    onUpdate?(value: Color): void;
}

export function ColorsGrid(props: ColorsGridProps) {
    const {colors, rowSize = 6, size = 'm', value, onUpdate, style, className, qa} = props;

    const handleSelectColor = (color: Color) => {
        if (!onUpdate) {
            return undefined;
        }

        return (event: React.UIEvent<HTMLElement>) => {
            event.preventDefault();
            onUpdate(color);
        };
    };

    return (
        <div
            data-qa={qa}
            className={b({size}, className)}
            style={{...style, '--_--cols-num': rowSize} as React.CSSProperties}
        >
            {colors.map((color, index) => (
                <ColorsGridItem
                    key={index}
                    color={color}
                    selected={color === value}
                    onClick={handleSelectColor(color)}
                />
            ))}
        </div>
    );
}
