import type {DistributiveOmit} from '../../../utils/types';
import type {AriaLabelingProps, DOMProps, QAProps} from '../../types';
import type {AvatarIconProps} from '../AvatarIcon';
import type {AvatarImageProps} from '../AvatarImage';
import type {AvatarTextProps} from '../AvatarText';

import type {AvatarCommonProps, AvatarSize} from './common';

export type AvatarTheme = 'normal' | 'brand';
export type AvatarView = 'filled' | 'outlined';
export type AvatarShape = 'square' | 'circle';

interface AvatarBaseProps extends AriaLabelingProps, DOMProps, QAProps {
    size?: AvatarSize;
    theme?: AvatarTheme;
    view?: AvatarView;
    shape?: AvatarShape;
    backgroundColor?: string;
    borderColor?: string;
    title?: string;
}

export type AvatarProps = AvatarBaseProps &
    DistributiveOmit<AvatarImageProps | AvatarIconProps | AvatarTextProps, keyof AvatarCommonProps>;
