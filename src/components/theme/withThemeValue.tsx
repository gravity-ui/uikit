import React from 'react';

import type {Subtract} from 'utility-types';

import {getComponentName} from '../utils/getComponentName';

import {ThemeContext} from './ThemeContext';
import type {ThemeContextProps} from './ThemeContext';

export interface WithThemeValueProps extends ThemeContextProps {}

export function withThemeValue<T extends WithThemeValueProps>(
    WrappedComponent: React.ComponentType<T>,
): React.ComponentType<Subtract<T, WithThemeValueProps>> {
    const componentName = getComponentName(WrappedComponent);

    return class WithThemeValueComponent extends React.Component<Subtract<T, WithThemeValueProps>> {
        static displayName = `withThemeValue(${componentName})`;
        static contextType = ThemeContext;
        context!: React.ContextType<typeof ThemeContext>;

        render() {
            return <WrappedComponent {...(this.props as T)} themeValue={this.context.themeValue} />;
        }
    };
}
