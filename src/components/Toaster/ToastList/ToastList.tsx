import React from 'react';
import {ToastProps} from '../types';
import {Toast} from '../Toast/Toast';

import './ToastList.scss';

type ToastListProps = {
    removeCallback: (name: string) => void;
    toasts: ToastProps[];
    mobile?: boolean;
};

export function ToastList(props: ToastListProps) {
    const {toasts, mobile, removeCallback} = props;

    return (
        <React.Fragment>
            {toasts.map((toast) => (
                <Toast
                    {...toast}
                    key={toast.name}
                    mobile={mobile}
                    removeCallback={() => removeCallback(toast.name)}
                />
            ))}
        </React.Fragment>
    );
}
