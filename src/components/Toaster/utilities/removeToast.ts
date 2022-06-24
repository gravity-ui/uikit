import {ToastProps} from '../types';

export function removeToast(toasts: ToastProps[], name: ToastProps['name']) {
    return toasts.filter((toast) => toast.name !== name);
}
