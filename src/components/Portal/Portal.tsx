import React from 'react';
import ReactDOM from 'react-dom';

export interface PortalProps {
    container?: HTMLElement;
    children?: React.ReactNode;
}

export function Portal({container = document.body, children}: PortalProps) {
    return ReactDOM.createPortal(children, container);
}
