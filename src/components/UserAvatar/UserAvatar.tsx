import React from 'react';
import {block} from '../utils/cn';
import {SIZES} from './constants';
import type {UserAvatarSize} from './types';
import './UserAvatar.scss';

export interface UserAvatarProps {
    imgUrl?: string;
    size?: UserAvatarSize;
    srcSet?: string;
    sizes?: string;
    title?: string;
    className?: string;
    /** @deprecated Use appropriate component, like `<Button/>` instead */
    onClick?: () => void;
}

const b = block('user-avatar');

export function UserAvatar({
    imgUrl,
    size = 'm',
    srcSet,
    sizes,
    title,
    className,
    onClick,
}: UserAvatarProps) {
    return (
        <div title={title} className={b({size}, className)} onClick={onClick}>
            <img
                className={b('figure')}
                width={SIZES[size]}
                height={SIZES[size]}
                src={imgUrl}
                srcSet={srcSet}
                sizes={sizes}
                alt={''}
            />
        </div>
    );
}
