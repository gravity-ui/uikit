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
    contentOverflow?: 'wrap' | 'scroll' | 'collapse';
    /** Label for the collapse overflow trigger when the active tab is visible in the list */
    moreLabel?: React.ReactNode;
    activateOnFocus?: boolean;
    children?: React.ReactNode;
    /**
     * Wraps the already-computed visible tabs, e.g. to enable drag-and-drop with any library.
     * Called in both `contentOverflow` modes with the post-collapse visible tabs; collapsed tabs
     * are always rendered as raw `<Tab>` in the overflow menu and are NOT passed here.
     *
     * The returned tree MUST preserve each element's `key` and MUST NOT add wrapper DOM around a
     * tab (a `.g-tab` must stay a direct child of the list, otherwise overflow measurement breaks).
     */
    renderTabs?: (tabs: React.ReactElement[]) => React.ReactNode;
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
    /** Tab was collapsed and rendered in `Menu` */
    isMenuItem?: boolean;
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

export interface TabListCollapseItemProps {
    children: React.ReactNode;
    triggerChild?: React.ReactNode;
    moreLabel?: React.ReactNode;
    size?: TabSize;
}
