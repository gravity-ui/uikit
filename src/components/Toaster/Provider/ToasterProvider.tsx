import React, {PropsWithChildren} from 'react';
import {ToasterContext} from './ToasterContext';
import {InternalToastProps, ToasterPublicMethods, ToastProps} from '../types';
import {hasToast} from '../utilities/hasToast';
import {removeToast} from '../utilities/removeToast';
import {getToastIndex} from '../utilities/getToastIndex';
import {ToastsContext} from './ToastsContext';

type Props = PropsWithChildren<{}>;

export const ToasterProvider = React.forwardRef<ToasterPublicMethods, Props>(
    function ToasterProvider({children}: Props, ref) {
        const [toasts, setToasts] = React.useState<InternalToastProps[]>([]);

        const add = React.useCallback((toast: ToastProps) => {
            const {name} = toast;

            setToasts((toasts) => {
                let nextToasts = toasts;

                if (hasToast(toasts, name)) {
                    nextToasts = removeToast(toasts, name);
                }

                return [...nextToasts, {...toast, addedAt: Date.now()}];
            });
        }, []);

        const remove = React.useCallback((toastName: ToastProps['name']) => {
            setToasts((toasts) => {
                return removeToast(toasts, toastName);
            });
        }, []);

        const removeAll = React.useCallback(() => {
            setToasts(() => []);
        }, []);

        const update = React.useCallback(
            (toastName: ToastProps['name'], override: Partial<ToastProps>) => {
                setToasts((toasts) => {
                    if (!hasToast(toasts, toastName)) {
                        return toasts;
                    }

                    const index = getToastIndex(toasts, toastName);

                    return [
                        ...toasts.slice(0, index),
                        {
                            ...toasts[index],
                            ...override,
                            isOverride: true,
                        },
                        ...toasts.slice(index + 1),
                    ];
                });
            },
            [],
        );

        const toasterContext = React.useMemo(() => {
            return {
                add,
                remove,
                removeAll,
                update,
            };
        }, [add, remove, removeAll, update]);

        React.useImperativeHandle(ref, () => ({
            add,
            remove,
            removeAll,
            update,
        }));

        return (
            <ToasterContext.Provider value={toasterContext}>
                <ToastsContext.Provider value={toasts}>{children}</ToastsContext.Provider>
            </ToasterContext.Provider>
        );
    },
);

ToasterProvider.displayName = 'ToasterProvider';
