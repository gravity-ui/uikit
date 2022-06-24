import React, {
    forwardRef,
    memo,
    PropsWithChildren,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import {ToasterContext} from './ToasterContext';
import {ToasterRef, ToastProps} from './types';
import {hasToast} from './utilities/hasToast';
import {removeToast} from './utilities/removeToast';
import {setRef} from '../utils/setRef';
import {getToastIndex} from './utilities/getToastIndex';

type Props = PropsWithChildren<{}>;

export const ToasterProvider = memo(
    forwardRef<ToasterRef, Props>(function ToasterProvider({children}: Props, ref) {
        const [toasts, setToasts] = useState<ToastProps[]>([]);

        const add = useCallback((toast: ToastProps) => {
            const {name} = toast;

            setToasts((toasts) => {
                let nextToasts = toasts;

                if (hasToast(toasts, name)) {
                    nextToasts = removeToast(toasts, name);
                }

                return [...nextToasts, toast];
            });
        }, []);

        const remove = useCallback((toastName: ToastProps['name']) => {
            setToasts((toasts) => {
                return removeToast(toasts, toastName);
            });
        }, []);

        const update = useCallback(
            (toastName: ToastProps['name'], override: Partial<ToastProps>) => {
                setToasts((toasts) => {
                    if (!hasToast(toasts, toastName)) {
                        return toasts;
                    }

                    const index = getToastIndex(toasts, toastName);

                    return [
                        ...toasts.slice(0, index + 1),
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

        const toasterContext = useMemo(() => {
            return {
                add,
                remove,
                update,
                list: toasts,
            };
        }, [add, remove, toasts, update]);

        useEffect(() => {
            setRef(ref, {
                add,
                remove,
                update,
            });
        }, [add, ref, remove, update]);

        return <ToasterContext.Provider value={toasterContext}>{children}</ToasterContext.Provider>;
    }),
);

ToasterProvider.displayName = 'ToasterProvider';
