import type * as React from 'react';

import type {VirtualElement} from '@floating-ui/react';

import type {PopupProps} from '../../Popup';
import type {DOMProps, QAProps} from '../../types';

export type MenuSize = 's' | 'm' | 'l' | 'xl';

export type MenuItemTheme = 'normal' | 'info' | 'success' | 'warning' | 'danger' | 'utility';

export interface MenuProps
    extends Pick<PopupProps, 'open' | 'onOpenChange' | 'placement'>,
        DOMProps,
        QAProps {
    size?: MenuSize;
    defaultOpen?: boolean;
    disabled?: boolean;
    trigger?:
        | ((props: Record<string, unknown>, ref: React.Ref<HTMLElement>) => React.ReactElement)
        | React.ReactElement
        | VirtualElement
        | null;
    inline?: boolean;
    children?: React.ReactNode;
}

interface MenuItemCommonProps extends QAProps {
    theme?: MenuItemTheme;
    selected?: boolean;
    disabled?: boolean;
    icon?: React.ReactElement;
    arrow?: React.ReactElement;
    children?: React.ReactNode;
}

export interface MenuItemButtonProps
    extends MenuItemCommonProps,
        Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> {
    component?: never;
    href?: never;
}

export interface MenuItemLinkProps
    extends MenuItemCommonProps,
        React.AnchorHTMLAttributes<HTMLAnchorElement> {
    component?: never;
    href: string;
}

export type MenuItemComponentProps<T extends Exclude<MenuItemComponentElementType, undefined>> =
    MenuItemCommonProps &
        React.ComponentPropsWithoutRef<T> & {
            component: T;
        };

export type MenuItemComponentElementType = Exclude<React.ElementType, 'a' | 'button'> | undefined;

export type MenuItemProps<T extends MenuItemComponentElementType = undefined> =
    | MenuItemLinkProps
    | MenuItemButtonProps
    | MenuItemComponentProps<Exclude<T, undefined>>;
