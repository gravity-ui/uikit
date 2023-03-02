import React from 'react';
import {ButtonView} from '../Button';

export type ToasterArgs = {
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
    autoHiding?: number | false;
    content?: React.ReactNode;
    type?: ToastType;
    isClosable?: boolean;
    isOverride?: boolean;
    actions?: ToastAction[];

    /** Function. Use for toast icon customization. By default type-based behavior is used */
    renderIcon?: (toastProps: ToastProps) => React.ReactNode;
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
