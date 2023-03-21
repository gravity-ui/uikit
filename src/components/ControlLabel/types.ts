import {PropsWithChildren, ReactNode} from 'react';
import {DOMProps, QAProps} from '../types';

export type Size = 'm' | 'l';

export type Props = PropsWithChildren<{
    labelClassName?: string;
    title?: string;
    disabled?: boolean;
    size?: Size;
    control: ReactNode;
}> &
    DOMProps &
    QAProps;
