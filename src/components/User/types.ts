import type * as React from 'react';

import type {DistributiveOmit} from '../../utils/types';
import type {AvatarProps} from '../Avatar';
import type {AriaLabelingProps, DOMProps, QAProps} from '../types';

export type UserSize = '3xs' | '2xs' | 'xs' | 's' | 'm' | 'l' | 'xl';

export interface UserProps extends AriaLabelingProps, DOMProps, QAProps {
    avatar?:
        | DistributiveOmit<AvatarProps, 'size' | 'className'>
        | string
        | React.ReactElement<unknown>;
    name?: React.ReactNode;
    description?: React.ReactNode;
    size?: UserSize;
}
