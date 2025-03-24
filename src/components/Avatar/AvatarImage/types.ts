import type {AvatarCommonProps} from '../types/common';

export interface AvatarImageProps extends AvatarCommonProps {
    imgUrl: string;
    fallbackImgUrl?: string;
    sizes?: string;
    srcSet?: string;
    alt?: string;
    loading?: 'eager' | 'lazy';
    withImageBorder?: boolean;
}
