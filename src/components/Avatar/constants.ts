import {block} from '../utils/cn';

import type {AvatarSize} from './types/common';

export const AVATAR_SIZES: Record<AvatarSize, number> = {
    '3xs': 16,
    '2xs': 20,
    xs: 24,
    s: 28,
    m: 32,
    l: 42,
    xl: 50,
};

export const DEFAULT_AVATAR_SIZE: AvatarSize = 'm';

export const bAvatar = block('avatar');
