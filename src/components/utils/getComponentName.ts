import {ComponentType} from 'react';

export function getComponentName<T>(Component: ComponentType<T>) {
    return Component.displayName || Component.name || 'Component';
}
