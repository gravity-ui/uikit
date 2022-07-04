import React from 'react';
import {ToasterRef, ToastProps} from './types';

type ToasterContextValue = ToasterRef & {
    list: ToastProps[];
    isInitialized: boolean;
};

export const ToasterContext = React.createContext<ToasterContextValue>({
    add() {},
    createToast() {},
    remove() {},
    removeToast() {},
    update() {},
    overrideToast() {},
    list: [],
    isInitialized: false,
});
ToasterContext.displayName = 'ToasterContext';
