import type * as React from 'react';

import type {QAProps} from '../types';
import {block} from '../utils/cn';

import './Skeleton.scss';

const b = block('skeleton');

export type SkeletonSize = 'xs' | 's' | 'm' | 'l' | 'xl';

export interface SkeletonProps
    extends Pick<React.HTMLAttributes<HTMLDivElement>, 'className' | 'style'>,
        QAProps {
    /**
     * Animation type to apply to the skeleton
     * @default 'gradient'
     */
    animation?: 'gradient' | 'pulse' | 'none';
    /** @default 'rect' */
    variant?: 'rect' | 'square' | 'circle' | 'text';
    size?: SkeletonSize;
    width?: number | string;
    height?: number | string;
}

export function Skeleton({
    className,
    style,
    width,
    height,
    qa,
    animation = 'gradient',
    variant = 'rect',
    size,
}: SkeletonProps) {
    return (
        <div
            className={b({animation, variant, size}, className)}
            style={{
                ...(width !== undefined && {width}),
                ...(height !== undefined && {height}),
                ...style,
            }}
            data-qa={qa}
        />
    );
}
