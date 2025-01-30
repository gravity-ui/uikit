import type {InternalToastProps, ToastProps} from './types';
import {EventEmitter} from './utilities/EventEmitter';
import {getToastIndex} from './utilities/getToastIndex';
import {hasToast} from './utilities/hasToast';
import {removeToast} from './utilities/removeToast';

export class Toaster {
    private toasts: InternalToastProps[] = [];
    private eventEmitter: EventEmitter<InternalToastProps[]> = new EventEmitter();

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

    destroy() {
        this.removeAll();
    }

    subscribe(listener: (toasts: InternalToastProps[]) => void) {
        return this.eventEmitter.subscribe(listener);
    }

    private notify() {
        this.eventEmitter.notify(this.toasts);
    }
}
