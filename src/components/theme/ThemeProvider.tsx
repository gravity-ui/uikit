import React from 'react';

import {block, blockNew} from '../utils/cn';

import {ThemeContext} from './ThemeContext';
import {ThemeSettingsContext} from './ThemeSettingsContext';
import {
    DEFAULT_DARK_THEME,
    DEFAULT_DIRECTION,
    DEFAULT_LIGHT_THEME,
    DEFAULT_THEME,
    ROOT_CLASS_NAME,
} from './constants';
import type {Direction, RealTheme, Theme} from './types';
import {updateBodyElement} from './updateBodyElement';
import {useSystemTheme} from './useSystemTheme';

const b = block(ROOT_CLASS_NAME);
const bNew = blockNew(ROOT_CLASS_NAME);

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

    React.useEffect(() => {
        if (!scoped) {
            updateBodyElement({
                theme: themeValue,
                direction,
                nativeScrollbar,
                className: rootClassName,
            });
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
                        className={bNew({theme: themeValue, 'native-scrollbar': nativeScrollbar}, [
                            b({theme: themeValue, 'native-scrollbar': nativeScrollbar}),
                            rootClassName,
                        ])}
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
