import type * as React from 'react';

import type {QAProps} from '../types';
import {block} from '../utils/cn';

import './Skeleton.scss';

const b = block('skeleton');

export interface SkeletonProps
    extends Pick<React.HTMLAttributes<HTMLDivElement>, 'className' | 'style'>,
        QAProps {
    /**
     * Disables the animation effect when set to true
     */
    disableAnimation?: boolean;
    /**
     * Disables the gradient effect when set to true
     */
    disableGradient?: boolean;
}

export function Skeleton({className, style, qa, disableAnimation, disableGradient}: SkeletonProps) {
    return (
        <div
            className={b(
                {
                    animated: !disableAnimation,
                    'without-gradient': disableGradient,
                },
                className,
            )}
            style={style}
            data-qa={qa}
        />
    );
}
