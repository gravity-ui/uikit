import type React from 'react';

import type {DistributiveOmit} from '../../types/utils';
import type {AvatarProps} from '../Avatar';
import type {DOMProps, QAProps} from '../types';

export type UserLabelType = 'person' | 'email' | 'empty';
export type UserLabelView = 'outlined' | 'clear';

export interface UserLabelProps extends DOMProps, QAProps {
    type?: UserLabelType;
    avatar?:
        | DistributiveOmit<AvatarProps, 'size' | 'className'>
        | string
        | React.ReactElement<unknown>;
    children: React.ReactNode;
    view?: UserLabelView;
    onClick?: React.MouseEventHandler<HTMLElement>;
    onCloseClick?: React.MouseEventHandler<HTMLButtonElement>;
}
