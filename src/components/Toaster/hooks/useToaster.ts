import {useContext, useMemo} from 'react';

import {ToasterContext} from '../Provider/ToasterContext';
import type {ToasterPublicMethods} from '../types';

export function useToaster(): ToasterPublicMethods {
    const toaster = useContext(ToasterContext);

    if (toaster === null) {
        throw new Error('Toaster: `useToaster` hook is used out of context');
    }

    return useMemo(() => toaster, [toaster]);
}
