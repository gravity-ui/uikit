import React from 'react';

import type {QAProps} from '../types';
import {block} from '../utils/cn';

import './Skeleton.scss';

const b = block('skeleton');

export interface SkeletonProps
    extends Pick<React.HTMLAttributes<HTMLDivElement>, 'className' | 'style'>,
        QAProps {}

export function Skeleton({className, style, qa}: SkeletonProps) {
    return <div className={b(null, className)} style={style} data-qa={qa} />;
}
