import {useContext} from 'react';
import {PortalContext} from './PortalProvider';

export function usePortalContainer(): HTMLElement {
    const context = useContext(PortalContext);
    return context.current ?? document.body;
}
