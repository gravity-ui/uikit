import type {ToastProps} from '../types';

export function getToastIndex(toasts: ToastProps[], name: ToastProps['name']) {
    return toasts.findIndex((toast) => toast.name === name);
}
