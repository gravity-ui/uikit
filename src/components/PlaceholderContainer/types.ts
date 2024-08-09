import type React from 'react';

import type {Action} from './PlaceholderContainerAction';
import type {Align, Direction} from './constants';

type Size = 's' | 'm' | 'l' | 'promo';

type PlaceholderContainerImageNodeProps = NonNullable<React.ReactNode>;

export type PlaceholderContainerImageSettingsProps = {
    url: string;
    alt?: string;
};

interface PlaceholderContainerGeneralProps {
    title?: string;
    description?: React.ReactNode;
    renderContent?: () => React.ReactNode;
    action?: Action | Action[];
    renderAction?: () => React.ReactNode;
    className?: string;
    image: PlaceholderContainerImageNodeProps | PlaceholderContainerImageSettingsProps;
}

export interface PlaceholderContainerDefaultProps {
    size: Size;
    direction: (typeof Direction)[keyof typeof Direction];
    align: (typeof Align)[keyof typeof Align];
}

export type PlaceholderContainerInnerProps = PlaceholderContainerGeneralProps &
    PlaceholderContainerDefaultProps;

export interface PlaceholderContainerProps
    extends PlaceholderContainerGeneralProps,
        Partial<PlaceholderContainerDefaultProps> {}

export interface PlaceholderContainerState {}
