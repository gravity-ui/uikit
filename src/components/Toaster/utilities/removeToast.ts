import {ToastProps} from '../types';
import {hasToast} from './hasToast';

export function removeToast(toasts: ToastProps[], name: ToastProps['name']) {
    if (!hasToast(toasts, name)) {
        return toasts;
    }

    return toasts.filter((toast) => toast.name !== name);
}
