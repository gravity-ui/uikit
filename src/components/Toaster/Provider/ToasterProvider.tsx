'use client';

import * as React from 'react';

import type {ToasterSingleton} from '../ToasterSingleton';
import type {InternalToastProps} from '../types';

import {ToasterContext} from './ToasterContext';
import {ToastsContext} from './ToastsContext';

type Props = React.PropsWithChildren<{
    toaster: ToasterSingleton;
}>;

export const ToasterProvider = ({toaster, children}: Props) => {
    const [toasts, setToasts] = React.useState<InternalToastProps[]>([]);

    React.useEffect(() => {
        const unsubscribe = toaster.subscribe(setToasts);

        return () => {
            unsubscribe();
        };
    }, [toaster]);

    return (
        <ToasterContext.Provider value={toaster}>
            <ToastsContext.Provider value={toasts}>{children}</ToastsContext.Provider>
        </ToasterContext.Provider>
    );
};

ToasterProvider.displayName = 'ToasterProvider';
