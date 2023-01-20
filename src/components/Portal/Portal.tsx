import React from 'react';
import ReactDOM from 'react-dom';
import {usePortalContainer} from '../utils/usePortalContainer';

export interface PortalProps {
    container?: HTMLElement;
    children?: React.ReactNode;
    disablePortal?: boolean;
}

export function Portal({container, children, disablePortal}: PortalProps) {
    const defaultContainer = usePortalContainer();

    if (disablePortal) {
        return <React.Fragment>{children}</React.Fragment>;
    }

    return ReactDOM.createPortal(children, container ?? defaultContainer);
}
