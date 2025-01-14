import * as React from 'react';

type AnyAsyncAction = (...args: any[]) => PromiseLike<any>;

export interface UseAsyncActionHandlerProps<Action extends AnyAsyncAction> {
    handler: Action;
}

export interface UseAsyncActionHandlerResult<Action extends AnyAsyncAction> {
    isLoading: boolean;
    handler: (...args: Parameters<Action>) => Promise<Awaited<ReturnType<Action>>>;
}

export function useAsyncActionHandler<Action extends AnyAsyncAction>({
    handler,
}: UseAsyncActionHandlerProps<Action>): UseAsyncActionHandlerResult<Action> {
    const [isLoading, setLoading] = React.useState(false);

    const handleAction = React.useCallback<UseAsyncActionHandlerResult<Action>['handler']>(
        async (...args) => {
            setLoading(true);

            try {
                return await handler(...args);
            } finally {
                setLoading(false);
            }
        },
        [handler],
    );

    return {
        isLoading,
        handler: handleAction,
    };
}
