import type React from 'react';

export type PromiseDialogResult<ResultType> = {
    success: boolean;
    value?: ResultType;
};

export type DialogRendererProps<ResultType> = {
    onSuccess: (value: ResultType) => void;
    asyncOnSuccess: (getValue: Promise<ResultType>, onError: (error: unknown) => void) => void;
    onCancel: () => void;
    key: number;
};

export type PromiseDialogRenderer<ResultType extends unknown> = ({
    onSuccess,
    asyncOnSuccess,
    onCancel,
}: DialogRendererProps<ResultType>) => React.ReactNode;

export type PromiseDialogContextType = {
    openDialog: <ResultType extends unknown>(
        renderDialog: PromiseDialogRenderer<ResultType>,
    ) => Promise<PromiseDialogResult<ResultType>>;
};
