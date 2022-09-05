import React, {PropsWithChildren, useEffect, useLayoutEffect, useMemo, useState} from 'react';

import {DEFAULT_LIGHT_THEME, DEFAULT_DARK_THEME, DEFAULT_THEME} from './constants';
import {ThemeContext} from './ThemeContext';
import {ThemeValueContext} from './ThemeValueContext';
import {ThemeSettings, ThemeSettingsContext} from './ThemeSettingsContext';
import type {Theme, RealTheme} from './types';
import {updateBodyClassName} from './updateBodyClassName';
import {useSystemTheme} from './useSystemTheme';

interface ThemeProviderExternalProps {}

interface ThemeProviderDefaultProps {
    theme: Theme;
    systemLightTheme: RealTheme;
    systemDarkTheme: RealTheme;
}

export interface ThemeProviderProps
    extends ThemeProviderExternalProps,
        Partial<ThemeProviderDefaultProps>,
        PropsWithChildren<{}> {}

export function ThemeProvider({
    theme: themeProp = DEFAULT_THEME,
    systemLightTheme: systemLightThemeProp = DEFAULT_LIGHT_THEME,
    systemDarkTheme: systemDarkThemeProp = DEFAULT_DARK_THEME,
    children,
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(themeProp);
    const [{systemLightTheme, systemDarkTheme}, setThemeSettings] = useState<ThemeSettings>({
        systemLightTheme: systemLightThemeProp,
        systemDarkTheme: systemDarkThemeProp,
    });

    useLayoutEffect(() => {
        setTheme(themeProp);
        setThemeSettings({
            systemLightTheme: systemLightThemeProp,
            systemDarkTheme: systemDarkThemeProp,
        });
    }, [themeProp, systemLightThemeProp, systemDarkThemeProp]);

    const systemTheme = (
        useSystemTheme() === 'light' ? systemLightTheme : systemDarkTheme
    ) as RealTheme;
    const themeValue = theme === 'system' ? systemTheme : theme;

    useEffect(() => {
        updateBodyClassName(themeValue);
    }, [themeValue]);

    const contextValue = useMemo(
        () => ({
            theme,
            themeValue,
            setTheme,
        }),
        [theme, themeValue],
    );

    const themeValueContext = useMemo(() => ({themeValue}), [themeValue]);

    const themeSettingsContext = useMemo(
        () => ({
            themeSettings: {systemLightTheme, systemDarkTheme},
            setThemeSettings,
        }),
        [systemLightTheme, systemDarkTheme],
    );

    return (
        <ThemeContext.Provider value={contextValue}>
            <ThemeSettingsContext.Provider value={themeSettingsContext}>
                <ThemeValueContext.Provider value={themeValueContext}>
                    {children}
                </ThemeValueContext.Provider>
            </ThemeSettingsContext.Provider>
        </ThemeContext.Provider>
    );
}

ThemeProvider.displayName = 'ThemeProvider';
