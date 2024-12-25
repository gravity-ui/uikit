'use client';

import * as React from 'react';

export const PortalContext = React.createContext<React.RefObject<HTMLElement>>({current: null});

PortalContext.displayName = 'PortalContext';

export type PortalProviderProps = React.PropsWithChildren<{
    container: React.RefObject<HTMLElement>;
}>;

export function PortalProvider({container, children}: PortalProviderProps) {
    return <PortalContext.Provider value={container}>{children}</PortalContext.Provider>;
}
