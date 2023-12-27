import type {DistributiveOmit} from '../../../types/utils';
import type {DOMProps, QAProps} from '../../types';
import type {AvatarIconProps} from '../AvatarIcon';
import type {AvatarImageProps} from '../AvatarImage';
import type {AvatarTextProps} from '../AvatarText';

import type {AvatarCommonProps, AvatarSize} from './common';

export type AvatarTheme = 'normal' | 'brand';
export type AvatarView = 'filled' | 'outlined';

interface AvatarBaseProps extends DOMProps, QAProps {
    size?: AvatarSize;
    theme?: AvatarTheme;
    view?: AvatarView;
    backgroundColor?: string;
    borderColor?: string;
    title?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
}

export type AvatarProps = AvatarBaseProps &
    DistributiveOmit<AvatarImageProps | AvatarIconProps | AvatarTextProps, keyof AvatarCommonProps>;
