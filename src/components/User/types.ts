import type React from 'react';

import type {DistributiveOmit} from '../../types/utils';
import type {AvatarProps} from '../Avatar';
import type {AriaLabelingProps, DOMProps, QAProps} from '../types';

export type UserSize = '2xs' | 'xs' | 's' | 'm' | 'l' | 'xl';

export interface UserProps extends DOMProps, AriaLabelingProps, QAProps {
    avatar?: DistributiveOmit<AvatarProps, 'size' | 'className'> | React.ReactElement<unknown>;
    name?: React.ReactNode;
    description?: React.ReactNode;
    size?: UserSize;
}
