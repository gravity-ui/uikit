import {Icon} from '../../Icon';
import {bAvatar} from '../constants';
import type {AvatarSize} from '../types/common';

import type {AvatarIconProps} from './types';

const avatarSizeToIconSize: Record<AvatarSize, number> = {
    '3xs': 10,
    '2xs': 12,
    xs: 14,
    s: 16,
    m: 16,
    l: 20,
    xl: 24,
};

export const AvatarIcon = ({icon, color, size}: AvatarIconProps) => {
    const style = {color};

    return (
        <div className={bAvatar('icon')} style={style}>
            <Icon data={icon} size={avatarSizeToIconSize[size]} />
        </div>
    );
};
