import type * as React from 'react';

import type {QAProps} from '../types';
import {block} from '../utils/cn';

import './Skeleton.scss';

const b = block('skeleton');

export interface SkeletonProps
    extends Pick<React.HTMLAttributes<HTMLDivElement>, 'className' | 'style'>,
        QAProps {
    /**
     * Animation type to apply to the skeleton
     * @default 'gradient'
     */
    animation?: 'gradient' | 'pulse' | 'none';
}

export function Skeleton({className, style, qa, animation = 'gradient'}: SkeletonProps) {
    return (
        <div
            className={b(
                {
                    animation,
                },
                className,
            )}
            style={style}
            data-qa={qa}
        />
    );
}
