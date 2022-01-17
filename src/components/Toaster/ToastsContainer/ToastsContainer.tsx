import React from 'react';
import {ToastGeneralProps, Toast} from '../Toast/Toast';

import './ToastsContainer.scss';

interface ToastsContainerProps {
    toasts: ToastGeneralProps[];
    removeCallback: (name: string) => void;
}

const renderToasts = (toasts: ToastGeneralProps[], removeCallback: (name: string) => void) => {
    return toasts.map((toast) => {
        const {name} = toast;

        return <Toast key={name} {...toast} removeCallback={() => removeCallback(name)} />;
    });
};

export const ToastsContainer = (props: ToastsContainerProps) => {
    const {toasts, removeCallback} = props;

    return <React.Fragment>{renderToasts(toasts, removeCallback)}</React.Fragment>;
};
