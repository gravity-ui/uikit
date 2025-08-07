import type * as React from 'react';

import type {ButtonProps} from '../Button';
import type {QAProps} from '../types';

type Size = 's' | 'm' | 'l' | 'promo';

type PlaceholderContainerImageNodeProps = NonNullable<React.ReactNode>;

export type PlaceholderContainerImageProps = {
    src: string;
    alt?: string;
};

export type PlaceholderContainerActionProps = Pick<
    ButtonProps,
    'disabled' | 'loading' | 'view' | 'size' | 'onClick' | 'pin'
> & {
    href?: string;
    text: string;
};

export interface PlaceholderContainerProps extends QAProps {
    size?: Size;
    direction?: 'row' | 'column';
    align?: 'left' | 'center';
    title?: string;
    description?: React.ReactNode;
    content?: React.ReactNode;
    actions?: PlaceholderContainerActionProps[] | React.ReactNode;
    className?: string;
    image: PlaceholderContainerImageNodeProps | PlaceholderContainerImageProps;
    maxWidth?: number | string;
}
