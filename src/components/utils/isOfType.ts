import * as React from 'react';

export function isOfType<P = {}>(Component: React.ComponentType<P> | string) {
    return function isMatching(
        component: unknown,
    ): component is React.ReactElement<P, typeof Component> {
        if (!React.isValidElement(component)) {
            return false;
        }

        const {type} = component;
        if (type === Component) {
            return true;
        }

        if (typeof Component === 'string' || typeof type === 'string') {
            return false;
        }

        const displayName = (type as React.ComponentType).displayName;
        return Boolean(displayName && displayName === Component.displayName);
    };
}
