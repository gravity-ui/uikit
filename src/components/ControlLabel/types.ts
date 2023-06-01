import type {DOMProps, QAProps} from '../types';

export type Size = 'm' | 'l';

export type Props = React.PropsWithChildren<{
    labelClassName?: string;
    title?: string;
    disabled?: boolean;
    size?: Size;
    control: React.ReactElement;
}> &
    DOMProps &
    QAProps;
