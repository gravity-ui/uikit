import type {DOMProps} from '../../types';

export type AvatarSize = '3xs' | '2xs' | 'xs' | 's' | 'm' | 'l' | 'xl';

export interface AvatarCommonProps extends Pick<DOMProps, 'className'> {
    size: AvatarSize;
}
