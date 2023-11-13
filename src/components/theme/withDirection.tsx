import React from 'react';

import type {Subtract} from 'utility-types';

import {getComponentName} from '../utils/getComponentName';

import {ThemeContext} from './ThemeContext';
import type {ThemeContextProps} from './ThemeContext';

export interface WithDirectionProps extends Pick<ThemeContextProps, 'direction'> {}

export function withDirection<T extends WithDirectionProps>(
    WrappedComponent: React.ComponentType<T>,
): React.ComponentType<Subtract<T, WithDirectionProps>> {
    const componentName = getComponentName(WrappedComponent);

    return class WithDirectionComponent extends React.Component<Subtract<T, WithDirectionProps>> {
        static displayName = `withDirection(${componentName})`;
        static contextType = ThemeContext;
        context!: React.ContextType<typeof ThemeContext>;

        render() {
            return <WrappedComponent {...(this.props as T)} direction={this.context.direction} />;
        }
    };
}
