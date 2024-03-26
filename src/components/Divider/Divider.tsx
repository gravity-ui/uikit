import React from 'react';

import type {DOMProps, QAProps} from '../types';
import {block} from '../utils/cn';

import './Divider.scss';

export type DividerOrientation = 'vertical' | 'horizontal';

export interface DividerProps extends DOMProps, QAProps {
    orientation?: DividerOrientation;
}

const b = block('divider');

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(function Divider(props, ref) {
    const {orientation = 'horizontal', className, style, qa} = props;

    return (
        <div
            className={b({orientation}, className)}
            ref={ref}
            style={style}
            data-qa={qa}
            role="separator"
            aria-orientation={orientation}
        />
    );
});
