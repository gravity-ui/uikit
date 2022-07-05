import React from 'react';
import {ToasterContextMethods} from '../types';

type ToasterContextValue = ToasterContextMethods & {
    isInitialized: boolean;
};

export const ToasterContext = React.createContext<ToasterContextValue>({
    add() {},
    remove() {},
    removeAll() {},
    update() {},
    isInitialized: false,
});
ToasterContext.displayName = 'ToasterContext';
