import {EventEmitter} from '../../utils/EventEmitter';

import type {InternalToastProps, ToastProps} from './types';
import {getToastIndex} from './utilities/getToastIndex';
import {hasToast} from './utilities/hasToast';
import {removeToast} from './utilities/removeToast';

export class Toaster {
    /** We were tried to notify about toaster changes, but no one were listened */
    private hasUndelivered = false;
    private toasts: InternalToastProps[] = [];
    private eventEmitter: EventEmitter<{'toasts-change': [InternalToastProps[]]}> =
        new EventEmitter();

    destroy() {
        this.removeAll();
        this.eventEmitter.destroy();
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
        const unsubscribe = this.eventEmitter.subscribe('toasts-change', listener);

        if (this.hasUndelivered) {
            this.notify();
        }

        return unsubscribe;
    }

    private notify() {
        const isDelivered = this.eventEmitter.notify('toasts-change', [this.toasts]);

        this.hasUndelivered = !isDelivered;
    }
}
