import React from 'react';

import type {Subtract} from 'utility-types';

import {getComponentName} from '../utils/getComponentName';

import {ThemeValueContext} from './ThemeValueContext';
import type {ThemeValueContextProps} from './ThemeValueContext';

export interface WithThemeValueProps extends ThemeValueContextProps {}

export function withThemeValue<T extends WithThemeValueProps>(
    WrappedComponent: React.ComponentType<T>,
): React.ComponentType<Subtract<T, WithThemeValueProps>> {
    const componentName = getComponentName(WrappedComponent);

    return class WithThemeValueComponent extends React.Component<Subtract<T, WithThemeValueProps>> {
        static displayName = `withThemeValue(${componentName})`;
        static contextType = ThemeValueContext;
        context!: React.ContextType<typeof ThemeValueContext>;

        render() {
            return <WrappedComponent {...(this.props as T)} themeValue={this.context.themeValue} />;
        }
    };
}
