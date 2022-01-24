import React from 'react';
import {ToastProps, Toast} from '../Toast/Toast';

import './ToastsContainer.scss';

interface ToastsContainerProps {
    toasts: ToastProps[];
    removeCallback: (name: string) => void;
}

function renderToasts(toasts: ToastProps[], removeCallback: (name: string) => void) {
    return toasts.map((toast) => {
        const {name} = toast;

        return <Toast key={name} {...toast} removeCallback={() => removeCallback(name)} />;
    });
}

export function ToastsContainer(props: ToastsContainerProps) {
    const {toasts, removeCallback} = props;

    return <React.Fragment>{renderToasts(toasts, removeCallback)}</React.Fragment>;
}
