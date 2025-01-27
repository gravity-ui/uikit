import type * as React from 'react';

import {getComponentName} from '../utils/getComponentName';

import type {ThemeContextProps} from './types';
import {useDirection} from './useDirection';

export interface WithDirectionProps extends Pick<ThemeContextProps, 'direction'> {}

export function withDirection<T extends WithDirectionProps>(
    WrappedComponent: React.ComponentType<T>,
): React.ComponentType<Omit<T, keyof WithDirectionProps>> {
    const componentName = getComponentName(WrappedComponent);

    const component = function WithDirectionComponent(props: Omit<T, keyof WithDirectionProps>) {
        const direction = useDirection();
        return <WrappedComponent {...(props as T)} direction={direction} />;
    };

    component.displayName = `withDirection(${componentName})`;

    return component;
}
