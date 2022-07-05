import React, {ContextType} from 'react';
import {Subtract} from 'utility-types';

import {ThemeContext, ThemeContextProps} from './ThemeContext';

export interface WithThemeProps extends ThemeContextProps {}

export function withTheme<T extends WithThemeProps>(
    WrappedComponent: React.ComponentType<T>,
): React.ComponentType<Subtract<T, WithThemeProps>> {
    const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    return class WithThemeComponent extends React.Component<Subtract<T, WithThemeProps>> {
        static displayName = `withTheme(${componentName})`;
        static contextType = ThemeContext;
        context!: ContextType<typeof ThemeContext>;

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
