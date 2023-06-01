import React from 'react';

export function isOfType<P = {}>(Component: React.ComponentType<P>) {
    return function isMatching(
        component: React.ReactNode,
    ): component is React.ReactElement<P, typeof React.Component> {
        if (!React.isValidElement(component)) {
            return false;
        }

        const {type} = component;

        return (
            type === React.Component ||
            (type as React.ComponentType).displayName === Component.displayName
        );
    };
}
