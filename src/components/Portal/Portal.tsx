import React from 'react';

import ReactDOM from 'react-dom';

import {usePortalContainer} from '../../hooks/usePortalContainer/usePortalContainer';

export interface PortalProps {
    container?: HTMLElement;
    children?: React.ReactNode;
    disablePortal?: boolean;
}

export function Portal({container, children, disablePortal}: PortalProps) {
    const defaultContainer = usePortalContainer();

    const containerNode = container ?? defaultContainer;

    if (disablePortal) {
        return <React.Fragment>{children}</React.Fragment>;
    }

    return containerNode ? ReactDOM.createPortal(children, containerNode) : null;
}
