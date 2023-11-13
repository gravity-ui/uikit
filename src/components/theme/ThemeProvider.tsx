import React from 'react';

import {ThemeContext} from './ThemeContext';
import {ThemeSettingsContext} from './ThemeSettingsContext';
import {
    DEFAULT_DARK_THEME,
    DEFAULT_DIRECTION,
    DEFAULT_LIGHT_THEME,
    DEFAULT_THEME,
} from './constants';
import {getDeprecatedRootClassName, getRootClassName} from './getBodyClassName';
import type {Direction, RealTheme, Theme} from './types';
import {updateBodyClassName, updateBodyDirection} from './dom-helpers';
import {useSystemTheme} from './useSystemTheme';

export interface ThemeProviderProps extends React.PropsWithChildren<{}> {
    theme?: Theme;
    systemLightTheme?: RealTheme;
    systemDarkTheme?: RealTheme;
    direction?: Direction;
    nativeScrollbar?: boolean;
    scoped?: boolean;
    rootClassName?: string;
}

export function ThemeProvider({
    theme = DEFAULT_THEME,
    systemLightTheme = DEFAULT_LIGHT_THEME,
    systemDarkTheme = DEFAULT_DARK_THEME,
    direction = DEFAULT_DIRECTION,
    nativeScrollbar = false,
    scoped = false,
    rootClassName = '',
    children,
}: ThemeProviderProps) {
    const systemTheme = (
        useSystemTheme() === 'light' ? systemLightTheme : systemDarkTheme
    ) as RealTheme;
    const themeValue = theme === 'system' ? systemTheme : theme;

    const prevRootClassName = React.useRef('');

    React.useEffect(() => {
        if (!scoped) {
            updateBodyClassName({
                theme: themeValue,
                nativeScrollbar,
                className: rootClassName,
                prevClassName: prevRootClassName.current,
            });
            updateBodyDirection(direction);
            prevRootClassName.current = rootClassName;
        }
    }, [scoped, themeValue, direction, nativeScrollbar, rootClassName]);

    const contextValue = React.useMemo(
        () => ({
            theme,
            themeValue,
            direction,
        }),
        [theme, themeValue, direction],
    );

    const themeSettingsContext = React.useMemo(
        () => ({systemLightTheme, systemDarkTheme}),
        [systemLightTheme, systemDarkTheme],
    );

    return (
        <ThemeContext.Provider value={contextValue}>
            <ThemeSettingsContext.Provider value={themeSettingsContext}>
                {scoped ? (
                    <div
                        className={getRootClassName(
                            {theme: themeValue, 'native-scrollbar': nativeScrollbar},
                            [
                                getDeprecatedRootClassName({
                                    theme: themeValue,
                                    'native-scrollbar': nativeScrollbar,
                                }),
                                rootClassName,
                            ],
                        )}
                        dir={direction === DEFAULT_DIRECTION ? undefined : direction}
                    >
                        {children}
                    </div>
                ) : (
                    children
                )}
            </ThemeSettingsContext.Provider>
        </ThemeContext.Provider>
    );
}

ThemeProvider.displayName = 'ThemeProvider';
