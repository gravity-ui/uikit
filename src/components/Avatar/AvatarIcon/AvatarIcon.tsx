import React from 'react';

import {Icon} from '../../Icon';
import type {AvatarSize} from '../types/common';

import type {AvatarIconProps} from './types';

const avatarSizeToIconSize: Record<AvatarSize, number> = {
    '2xs': 12,
    xs: 14,
    s: 16,
    m: 16,
    l: 20,
    xl: 24,
};

export const AvatarIcon = ({icon, color, size, className}: AvatarIconProps) => {
    const style = {color};

    return (
        <div style={style} className={className}>
            <Icon data={icon} size={avatarSizeToIconSize[size]} />
        </div>
    );
};
