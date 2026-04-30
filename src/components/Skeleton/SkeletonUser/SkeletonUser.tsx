import * as React from 'react';

import {COMPACT_SIZES, DEFAULT_USER_SIZE} from '../../User/constants';
import type {UserSize} from '../../User/types';
import {block} from '../../utils/cn';
import {Skeleton} from '../Skeleton';
import type {SkeletonProps} from '../Skeleton';
import {SkeletonAvatar} from '../SkeletonAvatar';

import './SkeletonUser.scss';

const b = block('skeleton-user');

export interface SkeletonUserProps
    extends Pick<React.HTMLAttributes<HTMLDivElement>, 'className'>,
        Pick<SkeletonProps, 'animation'> {
    /** @default DEFAULT_USER_SIZE */
    size?: UserSize;
}

export function SkeletonUser({size = DEFAULT_USER_SIZE, animation, className}: SkeletonUserProps) {
    const isCompact = COMPACT_SIZES.has(size);

    return (
        <div className={b({size}, className)}>
            <SkeletonAvatar size={size} shape="circle" animation={animation} />
            <div className={b('info')}>
                <Skeleton animation={animation} className={b('name')} />
                {!isCompact && <Skeleton animation={animation} className={b('description')} />}
            </div>
        </div>
    );
}
