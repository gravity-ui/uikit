import * as React from 'react';

import type {DefaultPropsMap} from './DefaultPropsProvider';
import {DefaultPropsContext} from './DefaultPropsProvider';

export function useDefaultProps<
    K extends keyof DefaultPropsMap,
    T extends NonNullable<DefaultPropsMap[K]>,
>(componentName: K, componentProps: T): T {
    const ctx = React.useContext(DefaultPropsContext);
    const defaultProps = ctx[componentName];

    if (!defaultProps) {
        return componentProps;
    }

    const cleanedProps: Record<string, unknown> = {};
    for (const k in componentProps) {
        if (componentProps[k as keyof T] !== undefined) {
            cleanedProps[k] = componentProps[k as keyof T];
        }
    }

    return [defaultProps, cleanedProps].reduce((acc: Record<string, unknown>, props) => {
        for (const [key, value] of Object.entries(props)) {
            acc[key] = value;
        }
        return acc;
    }, {}) as unknown as T;
}
