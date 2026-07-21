import type * as React from 'react';

import type {LabelProps} from '../Label';
import type {DOMProps, QAProps} from '../types';
import type {PolymorphicComponentProps, PolymorphicCustomElementType} from '../utils/polymorphic';

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
    contentOverflow?: 'wrap' | 'scroll' | 'collapse';
    /** Label for the collapse overflow trigger when the active tab is visible in the list */
    moreLabel?: React.ReactNode;
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

export type TabComponentElementType = PolymorphicCustomElementType;

export type TabComponentProps<T extends Exclude<TabComponentElementType, undefined>> =
    PolymorphicComponentProps<TabCommonProps, T>;

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

export interface TabListCollapseItemProps {
    children: React.ReactNode;
    triggerChild?: React.ReactNode;
    moreLabel?: React.ReactNode;
    size?: TabSize;
}
