import {PropsWithChildren, ReactNode} from 'react';
import {DOMProps, QAProps} from '../types';

export type Sizes = 'm' | 'l';

export type Props = PropsWithChildren<{
    labelClassName?: string;
    title?: string;
    disabled?: boolean;
    size?: Sizes;
    control: ReactNode;
}> &
    DOMProps &
    QAProps;
