import React from 'react';

import {block} from '../utils/cn';

import './Skeleton.scss';

const b = block('skeleton');

export interface SkeletonProps
    extends Pick<React.HTMLAttributes<HTMLDivElement>, 'className' | 'style'> {}

export function Skeleton({className, style}: SkeletonProps) {
    return <div className={b(null, className)} style={style} />;
}
