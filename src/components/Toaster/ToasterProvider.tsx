import React, {PropsWithChildren} from 'react';
import {ToasterContext} from './ToasterContext';
import {ToasterRef, ToastProps} from './types';
import {hasToast} from './utilities/hasToast';
import {removeToast} from './utilities/removeToast';
import {getToastIndex} from './utilities/getToastIndex';

type Props = PropsWithChildren<{}>;

export const ToasterProvider = React.memo(
    React.forwardRef<ToasterRef, Props>(function ToasterProvider({children}: Props, ref) {
        const [toasts, setToasts] = React.useState<ToastProps[]>([]);

        const add = React.useCallback((toast: ToastProps) => {
            const {name} = toast;

            setToasts((toasts) => {
                let nextToasts = toasts;

                if (hasToast(toasts, name)) {
                    nextToasts = removeToast(toasts, name);
                }

                return [...nextToasts, toast];
            });
        }, []);

        const remove = React.useCallback((toastName: ToastProps['name']) => {
            setToasts((toasts) => {
                return removeToast(toasts, toastName);
            });
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
                update,
                list: toasts,
                isInitialized: true,
            };
        }, [add, remove, toasts, update]);

        React.useImperativeHandle(ref, () => ({
            add,
            remove,
            update,
        }));

        return <ToasterContext.Provider value={toasterContext}>{children}</ToasterContext.Provider>;
    }),
);

ToasterProvider.displayName = 'ToasterProvider';
