import React from 'react';
import {InternalToastProps} from '../types';
import {Toast} from '../Toast/Toast';

import './ToastList.scss';

type ToastListProps = {
    removeCallback: (name: string) => void;
    toasts: InternalToastProps[];
    mobile?: boolean;
};

export function ToastList(props: ToastListProps) {
    const {toasts, mobile, removeCallback} = props;

    return (
        <React.Fragment>
            {toasts.map((toast) => (
                <Toast
                    {...toast}
                    key={`${toast.name}_${toast.addedAt}`}
                    mobile={mobile}
                    removeCallback={() => removeCallback(toast.name)}
                />
            ))}
        </React.Fragment>
    );
}
