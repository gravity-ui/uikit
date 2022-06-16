import React from 'react';
import ReactDOM from 'react-dom';
import {usePortalContainer} from '../utils/usePortalContainer';

export interface PortalProps {
    container?: HTMLElement;
    children?: React.ReactNode;
}

export function Portal({container, children}: PortalProps) {
    const defaultContainer = usePortalContainer();
    return ReactDOM.createPortal(children, container ?? defaultContainer);
}
