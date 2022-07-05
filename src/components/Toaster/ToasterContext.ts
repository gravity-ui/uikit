import React from 'react';
import {InternalToastProps, ToasterContextMethods} from './types';

type ToasterContextValue = ToasterContextMethods & {
    list: InternalToastProps[];
    isInitialized: boolean;
};

export const ToasterContext = React.createContext<ToasterContextValue>({
    add() {},
    remove() {},
    removeAll() {},
    update() {},
    list: [],
    isInitialized: false,
});
ToasterContext.displayName = 'ToasterContext';
