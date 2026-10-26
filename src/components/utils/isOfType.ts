import * as React from 'react';

interface IsOfTypeOptions {
    matchDisplayName?: boolean;
}

export function isOfType<P = {}>(
    Component: React.ComponentType<P> | string,
    {matchDisplayName = true}: IsOfTypeOptions = {},
) {
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

        if (!matchDisplayName || typeof Component === 'string' || typeof type === 'string') {
            return false;
        }

        const displayName = (type as React.ComponentType).displayName;
        return Boolean(displayName && displayName === Component.displayName);
    };
}
