import type {AvatarSize} from '../Avatar/types/common';

export const AVATAR_STACK_DEFAULT_MAX = 3;

export const COMPONENT_SIZE_TO_MORE_ICON_SIZE = {
    xl: 24,
    l: 20,
    m: 16,
    s: 16,
    xs: 14,
    '2xs': 12,
    '3xs': 10,
} satisfies Record<AvatarSize, number>;
