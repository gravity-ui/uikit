import React from 'react';
import {ButtonView} from '../Button';

export type ToasterArgs = {
    // FIXME: BREAKING CHANGE. Remove in the next major
    /** @deprecated  Will be deleted in te next major. Use className instead */
    additionalClass?: string;
    className?: string;
    mobile?: boolean;
};

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export type ToastAction = {
    onClick: VoidFunction;
    label: string;
    view?: ButtonView;
    removeAfterClick?: boolean;
};

export type ToastProps = {
    name: string;
    title?: string;
    className?: string;
    hideAfter?: number | false;
    content?: React.ReactNode;
    type?: ToastType;
    isClosable?: boolean;
    isOverride?: boolean;
    actions?: ToastAction[];
};

export type InternalToastProps = ToastProps & {
    addedAt?: number;
};

export interface ToasterContextMethods {
    add(toast: ToastProps): void;
    remove(toastName: ToastProps['name']): void;
    removeAll(): void;
    update(toastName: ToastProps['name'], override: Partial<ToastProps>): void;
}

export interface ToasterPublicMethods extends ToasterContextMethods {}
