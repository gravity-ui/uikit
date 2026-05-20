import * as React from 'react';

import type {QAProps} from '../types';
import {block} from '../utils/cn';

import './Skeleton.scss';

const b = block('skeleton');

export interface SkeletonProps
    extends Pick<React.HTMLAttributes<HTMLElement>, 'className' | 'style'>,
        QAProps {
    /**
     * Animation type to apply to the skeleton
     * @default 'gradient'
     */
    animation?: 'gradient' | 'pulse' | 'none';

    /**
     * Visual variant of the skeleton placeholder.
     * - `'square'`  — sharp corners (border-radius: 0)
     * - `'rounded'` — default slight rounding (border-radius: 5px) — **default**
     * - `'circle'`  — circular; best for square elements (border-radius: 50%)
     * - `'text'`    — inline text-line placeholder; clips height to cap-height within
     *                 a line-height box. Inherits `font-size` and `line-height` from
     *                 the parent context, so wrap with `<Text variant="...">` or any
     *                 element that sets those.
     * @default 'rounded'
     */
    variant?: 'square' | 'rounded' | 'circle' | 'text';

    children?: React.ReactElement;
}

export function Skeleton({
    className,
    style,
    qa,
    animation = 'gradient',
    variant = 'rounded',
    children,
}: SkeletonProps) {
    if (children !== undefined) {
        return (
            <div
                className={b({children: true, animation, variant}, className)}
                style={style}
                aria-hidden="true"
                data-qa={qa}
            >
                {children}
            </div>
        );
    }

    return <div className={b({animation, variant}, className)} style={style} data-qa={qa} />;
}
