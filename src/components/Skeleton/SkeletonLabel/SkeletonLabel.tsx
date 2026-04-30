import * as React from 'react';

import type {LabelProps} from '../../Label/Label';
import {block} from '../../utils/cn';
import {Skeleton} from '../Skeleton';
import type {SkeletonProps} from '../Skeleton';

import './SkeletonLabel.scss';

const b = block('skeleton-label');

const DEFAULT_WIDTH = 80;

type LabelSize = NonNullable<LabelProps['size']>;

export interface SkeletonLabelProps
    extends Pick<React.HTMLAttributes<HTMLDivElement>, 'className'>,
        Pick<SkeletonProps, 'animation'> {
    /** @default 'xs' */
    size?: LabelSize;
    /** @default DEFAULT_WIDTH */
    width?: number | string;
}

export function SkeletonLabel({
    size = 'xs',
    width = DEFAULT_WIDTH,
    animation,
    className,
}: SkeletonLabelProps) {
    return <Skeleton animation={animation} className={b({size}, className)} style={{width}} />;
}
