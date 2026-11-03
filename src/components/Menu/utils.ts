import * as React from 'react';

export function isComponentType<P = unknown>(
    component: unknown,
    type: string,
): component is React.ReactElement<P> {
    if (!React.isValidElement(component)) {
        return false;
    }

    if (typeof component.type === 'string') {
        return false;
    }

    return (component.type as React.ComponentType).displayName === type;
}
