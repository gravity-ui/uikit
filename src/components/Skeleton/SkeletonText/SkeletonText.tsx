import * as React from 'react';

import type {TextBaseProps} from '../../Text/text/text';
import {block} from '../../utils/cn';
import {Skeleton} from '../Skeleton';
import type {SkeletonProps} from '../Skeleton';

import './SkeletonText.scss';

const b = block('skeleton-text');

export interface SkeletonTextProps
    extends Pick<React.HTMLAttributes<HTMLDivElement>, 'className'>,
        Pick<SkeletonProps, 'animation'> {
    /** @default 'body-1' */
    variant?: TextBaseProps['variant'];
    /** @default '100%' */
    width?: number | string;
    /** @default 1 */
    lines?: number;
    /** Width of the last line when `lines > 1`. Falls back to `width` when not provided. */
    lastLineWidth?: number | string;
}

export function SkeletonText({
    variant = 'body-1',
    width = '100%',
    lines = 1,
    lastLineWidth,
    animation,
    className,
}: SkeletonTextProps) {
    if (lines <= 1) {
        return (
            <Skeleton animation={animation} className={b({variant}, className)} style={{width}} />
        );
    }

    return (
        <div className={b({variant, multiline: true}, className)}>
            <div className={b('lines')}>
                {Array.from({length: lines}, (_, i) => {
                    const isLast = i === lines - 1;
                    const lineWidth = isLast && lastLineWidth !== undefined ? lastLineWidth : width;
                    return <Skeleton key={i} animation={animation} style={{width: lineWidth}} />;
                })}
            </div>
        </div>
    );
}
