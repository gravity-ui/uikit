import {createContext} from 'react';
import {ToastProps} from './types';

interface ToasterContextValue {
    add(toast: ToastProps): void;
    remove(toastName: ToastProps['name']): void;
    update(toastName: ToastProps['name'], override: Partial<ToastProps>): void;
    list: ToastProps[];
}

export const ToasterContext = createContext<ToasterContextValue>({
    add() {},
    remove() {},
    update() {},
    list: [],
});
ToasterContext.displayName = 'ToasterContext';
