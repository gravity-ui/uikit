import {useContext} from 'react';

import {PortalContext} from './PortalProvider';

export function usePortalContainer(): HTMLElement | null {
    const context = useContext(PortalContext);

    let defaultContainer = null;

    if (typeof window === 'object') {
        defaultContainer = window.document.body;
    }

    return context.current ?? defaultContainer;
}
