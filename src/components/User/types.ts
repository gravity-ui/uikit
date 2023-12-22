import type React from 'react';

import type {DistributiveOmit} from '../../types/utils';
import type {AvatarProps} from '../Avatar';
import type {DOMProps, QAProps} from '../types';

export type UserSize = 'xs' | 's' | 'm' | 'l' | 'xl';

export interface UserProps extends DOMProps, QAProps {
    avatar?: DistributiveOmit<AvatarProps, 'size' | 'className'> | React.ReactElement<unknown>;
    name?: React.ReactNode;
    description?: React.ReactNode;
    size?: UserSize;
    'aria-label'?: string;
    'aria-labelledby'?: string;
}
