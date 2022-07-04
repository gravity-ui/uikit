import React from 'react';
import {InternalToastProps, ToasterRef} from './types';

type ToasterContextValue = ToasterRef & {
    list: InternalToastProps[];
    isInitialized: boolean;
};

export const ToasterContext = React.createContext<ToasterContextValue>({
    add() {},
    createToast() {},
    remove() {},
    removeToast() {},
    removeAll() {},
    update() {},
    overrideToast() {},
    list: [],
    isInitialized: false,
});
ToasterContext.displayName = 'ToasterContext';
