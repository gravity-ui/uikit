import type React from 'react';

import type {PlaceholderContainerActionProps} from './PlaceholderContainerAction';

type Size = 's' | 'm' | 'l' | 'promo';

type PlaceholderContainerImageNodeProps = NonNullable<React.ReactNode>;

export type PlaceholderContainerImageProps = {
    url: string;
    alt?: string;
};

interface PlaceholderContainerGeneralProps {
    title?: string;
    description?: React.ReactNode;
    renderContent?: () => React.ReactNode;
    action?: PlaceholderContainerActionProps | PlaceholderContainerActionProps[];
    renderAction?: () => React.ReactNode;
    className?: string;
    image: PlaceholderContainerImageNodeProps | PlaceholderContainerImageProps;
}

export interface PlaceholderContainerDefaultProps {
    size: Size;
    direction: 'row' | 'column';
    align: 'left' | 'center';
}

export type PlaceholderContainerInnerProps = PlaceholderContainerGeneralProps &
    PlaceholderContainerDefaultProps;

export interface PlaceholderContainerProps
    extends PlaceholderContainerGeneralProps,
        Partial<PlaceholderContainerDefaultProps> {}

export interface PlaceholderContainerState {}
