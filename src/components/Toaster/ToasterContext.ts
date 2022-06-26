import {createContext} from 'react';
import {ToasterRef, ToastProps} from './types';

type ToasterContextValue = ToasterRef & {
    list: ToastProps[];
    isInitialized: boolean;
};

export const ToasterContext = createContext<ToasterContextValue>({
    add() {},
    remove() {},
    update() {},
    list: [],
    isInitialized: false,
});
ToasterContext.displayName = 'ToasterContext';
