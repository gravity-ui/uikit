import type {ToastProps} from '../types';

import {hasToast} from './hasToast';

export function removeToast<T extends ToastProps>(toasts: T[], name: ToastProps['name']) {
    if (!hasToast(toasts, name)) {
        return toasts;
    }

    return toasts.filter((toast) => toast.name !== name);
}
