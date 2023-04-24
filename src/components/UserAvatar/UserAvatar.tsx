import React from 'react';
import {block} from '../utils/cn';
import './UserAvatar.scss';

export type UserAvatarSize = 'xs' | 's' | 'm' | 'l' | 'xl';

export interface UserAvatarProps {
    imgUrl?: string;
    size?: UserAvatarSize;
    title?: string;
    className?: string;
    /** @deprecated Use appropriate component, like `<Button/>` instead */
    onClick?: () => void;
}

const b = block('user-avatar');

export function UserAvatar({imgUrl, size = 'm', title, className, onClick}: UserAvatarProps) {
    return (
        <div
            title={title}
            className={b({size}, className)}
            style={{
                backgroundImage: `url(${imgUrl})`,
            }}
            onClick={onClick}
        />
    );
}
