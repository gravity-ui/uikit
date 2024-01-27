import React from 'react';

export type UseSyncWithLSInputProps<T> = {
    callback: T;
    uniqueKey: string;
    dataSourceName?: string;
};
export type UseSyncWithLSOutputProps = {callback: (...args: unknown[]) => void};

export const useSyncWithLS = <T extends Function>({
    dataSourceName = 'sync-tabs',
    callback,
    uniqueKey,
}: UseSyncWithLSInputProps<T>): UseSyncWithLSOutputProps => {
    const key = `${dataSourceName}.${uniqueKey}`;

    const handler = (event: StorageEvent) => {
        if (event.key === key) {
            return callback();
        }
        return undefined;
    };

    React.useEffect(() => {
        // Action in non-active tab
        window.addEventListener('storage', handler);

        return () => {
            window.removeEventListener('storage', handler);
            localStorage.removeItem(key);
        };
    });

    return {
        callback: React.useCallback(() => {
            localStorage.setItem(key, String(Number(localStorage.getItem(key) || '0') + 1));
            return callback();
        }, [key, callback]),
    };
};
