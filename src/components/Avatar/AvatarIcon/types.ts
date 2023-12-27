import type {IconData} from '../../Icon';
import type {AvatarCommonProps} from '../types/common';

export interface AvatarIconProps extends AvatarCommonProps {
    icon: IconData;
    color?: string;
}
