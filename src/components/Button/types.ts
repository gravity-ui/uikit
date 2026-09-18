import type * as React from 'react';

import type {DOMProps, QAProps} from '../types';
import type {PolymorphicComponentProps, PolymorphicCustomElementType} from '../utils/polymorphic';

import type {BUTTON_VIEWS} from './constants';

export type ButtonView = (typeof BUTTON_VIEWS)[number];

export type ButtonSize = 'xs' | 's' | 'm' | 'l' | 'xl';

export type ButtonPin =
    | 'round-round'
    | 'brick-brick'
    | 'clear-clear'
    | 'circle-circle'
    | 'round-brick'
    | 'brick-round'
    | 'round-clear'
    | 'clear-round'
    | 'brick-clear'
    | 'clear-brick'
    | 'circle-brick'
    | 'brick-circle'
    | 'circle-clear'
    | 'clear-circle';

export type ButtonWidth = 'auto' | 'max';

export interface ButtonCommonProps extends QAProps, DOMProps {
    view?: ButtonView;
    size?: ButtonSize;
    pin?: ButtonPin;
    selected?: boolean;
    disabled?: boolean;
    loading?: boolean;
    width?: ButtonWidth;
    children?: React.ReactNode;
}

export interface ButtonButtonProps
    extends ButtonCommonProps,
        Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled' | 'style'> {
    component?: never;
    href?: never;
    /**
     * @deprecated Use additional props at the root
     */
    extraProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

export interface ButtonLinkProps
    extends ButtonCommonProps,
        Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'style'> {
    component?: never;
    href: string;
    /**
     * @deprecated Use additional props at the root
     */
    extraProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}

export type ButtonComponentProps<T extends Exclude<ButtonCustomElementType, undefined>> =
    PolymorphicComponentProps<ButtonCommonProps, T> & {
        /**
         * @deprecated Use additional props at the root
         */
        extraProps?: React.ComponentPropsWithoutRef<T>;
    };

export type ButtonCustomElementType = PolymorphicCustomElementType;

export type ButtonProps<T extends ButtonCustomElementType = undefined> =
    | ButtonLinkProps
    | ButtonButtonProps
    | ButtonComponentProps<Exclude<T, undefined>>;
