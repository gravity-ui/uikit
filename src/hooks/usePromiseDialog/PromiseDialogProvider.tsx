import React from 'react';

import omit from 'lodash/omit';

import {PromiseDialogContext} from './PromiseDialogContext';
import type {DialogRendererProps, PromiseDialogResult} from './types';

type PromiseDialogProviderProps = {
    children: React.ReactNode | React.ReactNode[];
};

export const PromiseDialogProvider = ({children}: PromiseDialogProviderProps) => {
    const [dialogs, setDialogs] = React.useState<Record<number, React.ReactNode>>([]);
    const dialogsRef: React.MutableRefObject<Record<number, React.ReactNode>> =
        React.useRef(dialogs);

    React.useEffect(() => {
        dialogsRef.current = dialogs;
    }, [dialogs]);

    const contextValue = React.useMemo(
        () => ({
            openDialog: <ResultType extends unknown>(
                renderDialog: ({
                    onSuccess,
                    asyncOnSuccess,
                    onCancel,
                    key,
                }: DialogRendererProps<ResultType>) => React.ReactNode,
            ) =>
                new Promise<{success: boolean; value?: ResultType}>((resolve) => {
                    const currentKeys = Object.keys(dialogsRef.current);

                    const key = parseInt(currentKeys[currentKeys.length - 1] || '0', 10) + 1;

                    const handleClose = (result: PromiseDialogResult<ResultType>) => {
                        resolve(result);

                        setDialogs(omit(dialogsRef.current, key));
                    };

                    const handleSuccess = (value: ResultType) => {
                        handleClose({success: true, value});
                    };

                    const handleSuccessPromise = (
                        getValue: Promise<ResultType>,
                        onError: (error: unknown) => void,
                    ) => {
                        getValue
                            .then((value) => {
                                handleClose({success: true, value});
                            })
                            .catch(onError);
                    };

                    const handleCancel = () => {
                        handleClose({success: false});
                    };

                    const dialog = renderDialog({
                        onSuccess: handleSuccess,
                        asyncOnSuccess: handleSuccessPromise,
                        onCancel: handleCancel,
                        key,
                    });

                    requestAnimationFrame(() => {
                        setDialogs({
                            ...dialogsRef.current,
                            [key]: dialog,
                        });
                    });
                }),
        }),
        [],
    );

    return (
        <PromiseDialogContext.Provider value={contextValue}>
            {children}
            {Object.values(dialogs)}
        </PromiseDialogContext.Provider>
    );
};
