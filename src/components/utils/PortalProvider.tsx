import React from 'react';
import type {RefObject} from 'react';

export const PortalContext = React.createContext<RefObject<HTMLElement>>({current: null});

PortalContext.displayName = 'PortalContext';

export type PortalProviderProps = {
    container: RefObject<HTMLElement>;
};

export const PortalProvider: React.FC<PortalProviderProps> = ({container, children}) => {
    return <PortalContext.Provider value={container}>{children}</PortalContext.Provider>;
};
