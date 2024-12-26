import type {UserSize} from './types';

export const DEFAULT_USER_SIZE: UserSize = 'm';

export const COMPACT_SIZES: Set<UserSize> = new Set(['xs', '2xs', '3xs']);

export const UserQa = {
    NAME: 'user-name',
    DESCRIPTION: 'user-description',
};
