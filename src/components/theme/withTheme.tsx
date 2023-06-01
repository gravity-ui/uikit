import React from 'react';

import type {Subtract} from 'utility-types';

import {getComponentName} from '../utils/getComponentName';

import {ThemeContext} from './ThemeContext';
import type {ThemeContextProps} from './ThemeContext';

export interface WithThemeProps extends ThemeContextProps {}

export function withTheme<T extends WithThemeProps>(
    WrappedComponent: React.ComponentType<T>,
): React.ComponentType<Subtract<T, WithThemeProps>> {
    const componentName = getComponentName(WrappedComponent);

    return class WithThemeComponent extends React.Component<Subtract<T, WithThemeProps>> {
        static displayName = `withTheme(${componentName})`;
        static contextType = ThemeContext;
        context!: React.ContextType<typeof ThemeContext>;

        render() {
            return (
                <WrappedComponent
                    {...(this.props as T)}
                    theme={this.context.theme}
                    setTheme={this.context.setTheme}
                />
            );
        }
    };
}
