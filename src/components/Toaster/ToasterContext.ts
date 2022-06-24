import {createContext} from 'react';
import {ToasterRef, ToastProps} from './types';

type ToasterContextValue = ToasterRef & {
    list: ToastProps[];
};

export const ToasterContext = createContext<ToasterContextValue>({
    add() {},
    remove() {},
    update() {},
    list: [],
});
ToasterContext.displayName = 'ToasterContext';
