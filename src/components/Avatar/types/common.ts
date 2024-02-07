export type AvatarSize = 'xs' | 's' | 'm' | 'l' | 'xl';

export interface AvatarCommonProps {
    size: AvatarSize;
    className?: string;
}
