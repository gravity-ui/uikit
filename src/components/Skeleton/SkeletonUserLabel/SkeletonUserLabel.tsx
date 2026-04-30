import * as React from 'react';

import {DEFAULT_USER_LABEL_SIZE} from '../../UserLabel/constants';
import type {UserLabelSize} from '../../UserLabel/types';
import {block} from '../../utils/cn';
import {Skeleton} from '../Skeleton';
import type {SkeletonProps} from '../Skeleton';

import './SkeletonUserLabel.scss';

const b = block('skeleton-user-label');

const DEFAULT_WIDTH = 120;

export interface SkeletonUserLabelProps
    extends Pick<React.HTMLAttributes<HTMLDivElement>, 'className'>,
        Pick<SkeletonProps, 'animation'> {
    /** @default DEFAULT_USER_LABEL_SIZE */
    size?: UserLabelSize;
    /** @default DEFAULT_WIDTH */
    width?: number | string;
}

export function SkeletonUserLabel({
    size = DEFAULT_USER_LABEL_SIZE,
    width = DEFAULT_WIDTH,
    animation,
    className,
}: SkeletonUserLabelProps) {
    return <Skeleton animation={animation} className={b({size}, className)} style={{width}} />;
}
