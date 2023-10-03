import React from 'react';

import {PortalContext} from './PortalProvider';

export type UsePortalContainerReturnType = HTMLElement | null;

export function usePortalContainer(): UsePortalContainerReturnType {
    const context = React.useContext(PortalContext);

    let defaultContainer = null;

    if (typeof window === 'object') {
        defaultContainer = window.document.body;
    }

    return context.current ?? defaultContainer;
}
