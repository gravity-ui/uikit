import {PropsWithChildren, ReactElement} from 'react';

import {DOMProps, QAProps} from '../types';

export type Size = 'm' | 'l';

export type Props = PropsWithChildren<{
    labelClassName?: string;
    title?: string;
    disabled?: boolean;
    size?: Size;
    control: ReactElement;
}> &
    DOMProps &
    QAProps;
