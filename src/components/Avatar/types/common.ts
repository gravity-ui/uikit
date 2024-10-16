export type AvatarSize = '2xs' | 'xs' | 's' | 'm' | 'l' | 'xl';

export interface AvatarCommonProps {
    size: AvatarSize;
    className?: string;
}
