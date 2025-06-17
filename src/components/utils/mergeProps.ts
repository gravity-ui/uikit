import type * as React from 'react';

export function mergeProps(...propsList: (React.HTMLProps<HTMLElement> & {})[]) {
    const eventMap = new Map<string, Array<(...args: unknown[]) => void>>();

    return propsList.reduce((acc: Record<string, unknown>, props) => {
        Object.entries(props).forEach(([key, value]) => {
            if (
                key.startsWith('on') &&
                key.charCodeAt(2) >= /* A */ 65 &&
                key.charCodeAt(2) <= /* Z */ 90
            ) {
                if (!eventMap.has(key)) {
                    eventMap.set(key, []);
                }

                if (typeof value === 'function') {
                    eventMap.get(key)?.push(value);

                    acc[key] = (...args: unknown[]) => {
                        return eventMap
                            .get(key)
                            ?.map((fn) => fn(...args))
                            .find((v) => v !== undefined);
                    };
                }
            } else {
                acc[key] = value;
            }
        });
        return acc;
    }, {});
}
