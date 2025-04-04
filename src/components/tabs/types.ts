import type * as React from 'react';

import type {LabelProps} from '../Label';
import type {DOMProps, QAProps} from '../types';

export type TabSize = 'm' | 'l' | 'xl';

export interface TabProviderProps {
    value?: string;
    onUpdate?: (value: string) => void;
    children?: React.ReactNode;
}

export interface TabListProps
    extends DOMProps,
        QAProps,
        Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
    onUpdate?: (value: string) => void;
    value?: string;
    size?: TabSize;
    // contentOverflow?: 'wrap';
    activateOnFocus?: boolean;
    children?: React.ReactNode;
}

interface TabCommonProps extends QAProps, DOMProps {
    value: string;
    icon?: React.ReactNode;
    counter?: number | string;
    label?: {
        content: React.ReactNode;
        theme?: LabelProps['theme'];
    };
    disabled?: boolean;
    children?: React.ReactNode;
}

export interface TabButtonProps
    extends TabCommonProps,
        Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'disabled' | 'style'> {
    component?: never;
    href?: never;
}

export interface TabLinkProps
    extends TabCommonProps,
        Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'style'> {
    component?: never;
    href: string;
}

export type TabComponentElementType = Exclude<React.ElementType, 'a' | 'button'> | undefined;

export type TabComponentProps<T extends Exclude<TabComponentElementType, undefined>> =
    TabCommonProps &
        React.ComponentPropsWithoutRef<T> & {
            component: T;
        };

export type TabProps<T extends TabComponentElementType = undefined> =
    | TabButtonProps
    | TabLinkProps
    | TabComponentProps<Exclude<T, undefined>>;

export interface TabPanelProps
    extends DOMProps,
        QAProps,
        Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
    value: string;
    children?: React.ReactNode;
}
