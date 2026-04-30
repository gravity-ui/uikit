import * as React from 'react';

import {DEFAULT_AVATAR_SIZE} from '../../Avatar/constants';
import type {AvatarSize} from '../../Avatar/types/common';
import type {AvatarShape} from '../../Avatar/types/main';
import {block} from '../../utils/cn';
import {Skeleton} from '../Skeleton';
import type {SkeletonProps} from '../Skeleton';

import './SkeletonAvatar.scss';

const b = block('skeleton-avatar');

export interface SkeletonAvatarProps
    extends Pick<React.HTMLAttributes<HTMLDivElement>, 'className'>,
        Pick<SkeletonProps, 'animation'> {
    /** @default DEFAULT_AVATAR_SIZE */
    size?: AvatarSize;
    /** @default 'circle' */
    shape?: AvatarShape;
}

export function SkeletonAvatar({
    size = DEFAULT_AVATAR_SIZE,
    shape = 'circle',
    animation,
    className,
}: SkeletonAvatarProps) {
    return <Skeleton animation={animation} className={b({size, shape}, className)} />;
}
