import type {ToastProps} from '../types';

import {getToastIndex} from './getToastIndex';

export function hasToast(toasts: ToastProps[], name: ToastProps['name']): boolean {
    return getToastIndex(toasts, name) !== -1;
}
