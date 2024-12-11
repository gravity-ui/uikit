'use client';

import type {InternalToastProps, ToastProps} from './types';
import {getToastIndex} from './utilities/getToastIndex';
import {hasToast} from './utilities/hasToast';
import {removeToast} from './utilities/removeToast';

const TOASTER_KEY: unique symbol = Symbol('Toaster instance key');

declare global {
    interface Window {
        [TOASTER_KEY]: ToasterSingleton;
    }
}

export class ToasterSingleton {
    private toasts: InternalToastProps[] = [];
    private listeners: ((toasts: InternalToastProps[]) => void)[] = [];

    constructor() {
        if (window[TOASTER_KEY] instanceof ToasterSingleton) {
            return window[TOASTER_KEY];
        }

        window[TOASTER_KEY] = this;
    }

    add(toast: ToastProps) {
        let nextToasts = this.toasts;

        if (hasToast(nextToasts, toast.name)) {
            nextToasts = removeToast(nextToasts, toast.name);
        }

        this.toasts = [
            ...nextToasts,
            {
                ...toast,
                addedAt: Date.now(),
                ref: {current: null},
            },
        ];

        this.notify();
    }

    remove(name: string) {
        this.toasts = removeToast(this.toasts, name);

        this.notify();
    }

    removeAll() {
        this.toasts = [];

        this.notify();
    }

    update(name: string, overrideOptions: Partial<ToastProps>) {
        if (!hasToast(this.toasts, name)) {
            return;
        }

        const index = getToastIndex(this.toasts, name);

        this.toasts = [
            ...this.toasts.slice(0, index),
            {
                ...this.toasts[index],
                ...overrideOptions,
            },
            ...this.toasts.slice(index + 1),
        ];

        this.notify();
    }

    has(name: string) {
        return hasToast(this.toasts, name);
    }

    subscribe(listener: (toasts: InternalToastProps[]) => void) {
        if (typeof listener === 'function') {
            this.listeners.push(listener);
        }

        return () => {
            this.listeners = this.listeners.filter(
                (currentListener) => listener !== currentListener,
            );
        };
    }

    private notify() {
        for (const listener of this.listeners) {
            listener(this.toasts);
        }
    }
}
