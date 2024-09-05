import type React from 'react';

import type {ButtonProps} from '../Button';

type Size = 's' | 'm' | 'l' | 'promo';

type PlaceholderContainerImageNodeProps = NonNullable<React.ReactNode>;

export type PlaceholderContainerImageProps = {
    src: string;
    alt?: string;
};

export type PlaceholderContainerActionProps = Pick<
    ButtonProps,
    'disabled' | 'loading' | 'view' | 'size' | 'href' | 'onClick'
> & {
    text: string;
};

export interface PlaceholderContainerProps {
    size?: Size;
    direction?: 'row' | 'column';
    align?: 'left' | 'center';
    title?: string;
    description?: React.ReactNode;
    content?: React.ReactNode;
    actions?: PlaceholderContainerActionProps[] | React.ReactNode;
    className?: string;
    image: PlaceholderContainerImageNodeProps | PlaceholderContainerImageProps;
}
