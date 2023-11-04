import React from 'react';

export function useAsyncActionHandler<Result>(
    action: (...args: any[]) => Promise<Result>,
): [boolean, typeof action] {
    const mounted = React.useRef(true);
    const [isLoading, setLoading] = React.useState(false);

    React.useEffect(() => {
        mounted.current = true;

        return () => {
            mounted.current = false;
        };
    }, []);

    const handleAction: typeof action = React.useCallback(
        (...args) => {
            setLoading(true);
            return action(...args).finally(() => {
                if (mounted.current) {
                    setLoading(false);
                }
            });
        },
        [action],
    );

    return [isLoading, handleAction];
}
