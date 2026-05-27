import * as React from 'react';

import type {QAProps} from '../types';
import {block} from '../utils/cn';

import './Skeleton.scss';

const b = block('skeleton');

export type SkeletonSize = 'xs' | 's' | 'm' | 'l' | 'xl';

export interface SkeletonProps
    extends Pick<React.HTMLAttributes<HTMLElement>, 'className' | 'style'>,
        QAProps {
    /**
     * Animation type to apply to the skeleton
     * @default 'gradient'
     */
    animation?: 'gradient' | 'pulse' | 'none';
    /** @default 'rounded' */
    shape?: 'rounded' | 'sharp' | 'square' | 'circle';
    isText?: boolean;
    /** @default 'm' */
    size?: SkeletonSize;
}

export function Skeleton({
    className,
    style,
    qa,
    animation = 'gradient',
    shape = 'rounded',
    isText,
    size = 'm',
}: SkeletonProps) {
    return (
        <div
            className={b({animation, shape, text: isText, size}, className)}
            style={style}
            data-qa={qa}
        />
    );
}
