import type * as React from 'react';

import {getComponentName} from '../utils/getComponentName';

import type {ThemeContextProps} from './types';
import {useThemeValue} from './useThemeValue';

export interface WithThemeValueProps extends Pick<ThemeContextProps, 'themeValue'> {}

export function withThemeValue<T extends WithThemeValueProps>(
    WrappedComponent: React.ComponentType<T>,
): React.ComponentType<Omit<T, keyof WithThemeValueProps>> {
    const componentName = getComponentName(WrappedComponent);

    const component = function WithThemeValueComponent(props: Omit<T, keyof WithThemeValueProps>) {
        const themeValue = useThemeValue();
        return <WrappedComponent {...(props as T)} themeValue={themeValue} />;
    };

    component.displayName = `withThemeValue(${componentName})`;

    return component;
}
