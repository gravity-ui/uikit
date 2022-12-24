import React from 'react';
import {ToasterContext} from '../Provider/ToasterContext';
import {ToasterPublicMethods} from '../types';

export function useToaster(): ToasterPublicMethods {
    const toaster = React.useContext(ToasterContext);

    if (toaster === null) {
        throw new Error('Toaster: `useToaster` hook is used out of context');
    }

    return React.useMemo(() => toaster, [toaster]);
}
