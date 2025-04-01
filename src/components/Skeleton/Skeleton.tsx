import type * as React from 'react';

import type {QAProps} from '../types';
import {block} from '../utils/cn';

import './Skeleton.scss';

const b = block('skeleton');

export interface SkeletonProps
    extends Pick<React.HTMLAttributes<HTMLDivElement>, 'className' | 'style'>,
        QAProps {
    /**
     * Controls whether the animation effect is enabled
     * @default true
     */
    isAnimated?: boolean;
}

export function Skeleton({className, style, qa, isAnimated = true}: SkeletonProps) {
    return (
        <div
            className={b(
                {
                    animated: isAnimated,
                },
                className,
            )}
            style={style}
            data-qa={qa}
        />
    );
}
