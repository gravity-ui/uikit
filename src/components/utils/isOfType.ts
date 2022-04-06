import {isValidElement, ReactNode, ComponentType, ReactElement} from 'react';

export function isOfType<P = {}>(Component: ComponentType<P>) {
    return function isMatching(
        component: ReactNode,
    ): component is ReactElement<P, typeof Component> {
        if (!isValidElement(component)) {
            return false;
        }

        const {type} = component;

        return type === Component || (type as ComponentType).displayName === Component.displayName;
    };
}
