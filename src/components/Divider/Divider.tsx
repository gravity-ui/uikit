import * as React from 'react';

import type {DOMProps, QAProps} from '../types';
import {block} from '../utils/cn';

import './Divider.scss';

export type DividerOrientation = 'vertical' | 'horizontal';
export type DividerAlign = 'start' | 'center' | 'end';

export interface DividerProps extends DOMProps, QAProps {
    orientation?: DividerOrientation;
    align?: DividerAlign;
    children?: React.ReactNode;
}

const b = block('divider');

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(function Divider(props, ref) {
    const {orientation = 'horizontal', className, style, qa, children, align = 'start'} = props;

    return (
        <div
            className={b({orientation, align}, className)}
            ref={ref}
            style={style}
            data-qa={qa}
            role="separator"
            aria-orientation={orientation === 'vertical' ? 'vertical' : undefined}
        >
            {children}
        </div>
    );
});
