import type {UserLabelSize} from './types';

export const DEFAULT_USER_LABEL_SIZE: UserLabelSize = 's';

export const COMPACT_SIZES: Set<UserLabelSize> = new Set(['m', 's', 'xs', '2xs', '3xs']);

export const BORDER_COLOR = 'var(--g-color-line-generic-solid)';

export const ICON_SIZES: Record<UserLabelSize, number> = {
    '3xs': 12,
    '2xs': 12,
    xs: 12,
    s: 16,
    m: 16,
    l: 16,
    xl: 16,
};
