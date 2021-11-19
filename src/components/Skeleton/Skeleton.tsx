import React from 'react';
import {block} from '../utils/cn';

import './Skeleton.scss';

const b = block('skeleton');

export interface SkeletonProps {
    className?: string;
}

export function Skeleton({className}: SkeletonProps) {
    return <div className={b(null, className)} />;
}
