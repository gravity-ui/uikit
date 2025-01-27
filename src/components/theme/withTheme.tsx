import type * as React from 'react';

import {getComponentName} from '../utils/getComponentName';

import type {ThemeContextProps} from './types';
import {useTheme} from './useTheme';

export interface WithThemeProps extends Pick<ThemeContextProps, 'theme'> {}

export function withTheme<T extends WithThemeProps>(
    WrappedComponent: React.ComponentType<T>,
): React.ComponentType<Omit<T, keyof WithThemeProps>> {
    const componentName = getComponentName(WrappedComponent);

    const component = function WithThemeComponent(props: Omit<T, keyof WithThemeProps>) {
        const theme = useTheme();
        return <WrappedComponent {...(props as T)} theme={theme} />;
    };

    component.displayName = `withTheme(${componentName})`;

    return component;
}
