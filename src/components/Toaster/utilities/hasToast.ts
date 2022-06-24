import {getToastIndex} from './getToastIndex';
import {ToastProps} from '../types';

export function hasToast(toasts: ToastProps[], name: ToastProps['name']): boolean {
    return getToastIndex(toasts, name) !== -1;
}
