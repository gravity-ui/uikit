import {isValidElement, ReactNode, ComponentType} from 'react';

export function isOfType<P = {}>(Component: ComponentType<P>) {
    return function isMatching(component: ReactNode): component is typeof Component {
        if (!isValidElement(component)) {
            return false;
        }

        const {type} = component;

        return type === Component || (type as ComponentType).displayName === Component.displayName;
    };
}
