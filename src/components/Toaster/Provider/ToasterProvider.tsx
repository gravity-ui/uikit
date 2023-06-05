import React from 'react';

import type {InternalToastProps, ToastProps, ToasterPublicMethods} from '../types';
import {getToastIndex} from '../utilities/getToastIndex';
import {hasToast} from '../utilities/hasToast';
import {removeToast} from '../utilities/removeToast';

import {ToasterContext} from './ToasterContext';
import {ToastsContext} from './ToastsContext';

type Props = React.PropsWithChildren<{}>;

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

                return [
                    ...nextToasts,
                    {
                        ...toast,
                        addedAt: Date.now(),
                        ref: React.createRef<HTMLDivElement>(),
                    },
                ];
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

        const toastsRef = React.useRef<InternalToastProps[]>(toasts);
        React.useEffect(() => {
            toastsRef.current = toasts;
        }, [toasts]);
        const has = React.useCallback((toastName: ToastProps['name']) => {
            return toastsRef.current ? hasToast(toastsRef.current, toastName) : false;
        }, []);

        const toasterContext = React.useMemo(() => {
            return {
                add,
                remove,
                removeAll,
                update,
                has,
            };
        }, [add, remove, removeAll, update, has]);

        React.useImperativeHandle(ref, () => ({
            add,
            remove,
            removeAll,
            update,
            has,
        }));

        return (
            <ToasterContext.Provider value={toasterContext}>
                <ToastsContext.Provider value={toasts}>{children}</ToastsContext.Provider>
            </ToasterContext.Provider>
        );
    },
);

ToasterProvider.displayName = 'ToasterProvider';
