import * as React from 'react';

import type {ButtonPin, ButtonSize} from '../../Button/Button';
import {block} from '../../utils/cn';
import {Skeleton} from '../Skeleton';
import type {SkeletonProps} from '../Skeleton';

import './SkeletonButton.scss';

const b = block('skeleton-button');

const DEFAULT_WIDTH = 100;

export interface SkeletonButtonProps
    extends Pick<React.HTMLAttributes<HTMLDivElement>, 'className'>,
        Pick<SkeletonProps, 'animation'> {
    /** @default 'm' */
    size?: ButtonSize;
    /** @default DEFAULT_WIDTH */
    width?: number | string;
    /** @default 'round-round' */
    pin?: ButtonPin;
}

export function SkeletonButton({
    size = 'm',
    width = DEFAULT_WIDTH,
    pin = 'round-round',
    animation,
    className,
}: SkeletonButtonProps) {
    return <Skeleton animation={animation} className={b({size, pin}, className)} style={{width}} />;
}
