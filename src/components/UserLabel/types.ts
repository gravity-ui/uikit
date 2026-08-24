import type * as React from 'react';

import type {DistributiveOmit} from '../../utils/types';
import type {AvatarProps} from '../Avatar';
import type {DOMProps, QAProps} from '../types';

export type UserLabelType = 'person' | 'email' | 'empty';
export type UserLabelView = 'outlined' | 'clear';
export type UserLabelSize = '3xs' | '2xs' | 'xs' | 's' | 'm' | 'l' | 'xl';

export interface UserLabelProps extends DOMProps, QAProps {
    type?: UserLabelType;
    view?: UserLabelView;
    size?: UserLabelSize;
    avatar?:
        | Partial<DistributiveOmit<AvatarProps, 'size' | 'className'>>
        | string
        | React.ReactElement<unknown>;
    text: React.ReactNode;
    description?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLElement>;
    onCloseClick?: React.MouseEventHandler<HTMLButtonElement>;
}
