import React, {HTMLAttributes} from 'react';
import {block} from '../utils/cn';
import {useSkeletonGroup} from './SkeletonGroup';

import './Skeleton.scss';

const b = block('skeleton');

export interface SkeletonProps
    extends Pick<HTMLAttributes<HTMLDivElement>, 'className' | 'style'> {}

export function Skeleton({className, style}: SkeletonProps) {
    const ref = React.useRef<HTMLDivElement>(null);
    useSkeletonGroup(ref);
    return <div ref={ref} className={b(null, className)} style={style} />;
}
