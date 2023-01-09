import React from 'react';

import {block} from '../utils/cn';

import {ThemeContext} from './ThemeContext';
import {ThemeSettingsContext} from './ThemeSettingsContext';
import type {ThemeSettings} from './ThemeSettingsContext';
import {ThemeValueContext} from './ThemeValueContext';
import {DEFAULT_DARK_THEME, DEFAULT_LIGHT_THEME, DEFAULT_THEME, ROOT_CLASS_NAME} from './constants';
import type {RealTheme, Theme} from './types';
import {updateBodyClassName} from './updateBodyClassName';
import {useSystemTheme} from './useSystemTheme';

const b = block(ROOT_CLASS_NAME);

interface ThemeProviderExternalProps {}

interface ThemeProviderDefaultProps {
    theme: Theme;
    systemLightTheme: RealTheme;
    systemDarkTheme: RealTheme;
    nativeScrollbar: boolean;
    scoped: boolean;
    rootClassName: string;
}

export interface ThemeProviderProps
    extends ThemeProviderExternalProps,
        Partial<ThemeProviderDefaultProps>,
        React.PropsWithChildren<{}> {}

export function ThemeProvider({
    theme: themeProp = DEFAULT_THEME,
    systemLightTheme: systemLightThemeProp = DEFAULT_LIGHT_THEME,
    systemDarkTheme: systemDarkThemeProp = DEFAULT_DARK_THEME,
    nativeScrollbar = false,
    scoped = false,
    rootClassName = '',
    children,
}: ThemeProviderProps) {
    const [theme, setTheme] = React.useState<Theme>(themeProp);
    const [{systemLightTheme, systemDarkTheme}, setThemeSettings] = React.useState<ThemeSettings>({
        systemLightTheme: systemLightThemeProp,
        systemDarkTheme: systemDarkThemeProp,
    });

    React.useLayoutEffect(() => {
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

    React.useEffect(() => {
        if (!scoped) {
            updateBodyClassName(themeValue, {'native-scrollbar': nativeScrollbar}, rootClassName);
        }
    }, [nativeScrollbar, themeValue, scoped, rootClassName]);

    const contextValue = React.useMemo(
        () => ({
            theme,
            themeValue,
            setTheme,
        }),
        [theme, themeValue],
    );

    const themeValueContext = React.useMemo(() => ({themeValue}), [themeValue]);

    const themeSettingsContext = React.useMemo(
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
                    {scoped ? (
                        <div
                            className={b(
                                {
                                    theme: themeValue,
                                    'native-scrollbar': nativeScrollbar,
                                },
                                rootClassName,
                            )}
                        >
                            {children}
                        </div>
                    ) : (
                        children
                    )}
                </ThemeValueContext.Provider>
            </ThemeSettingsContext.Provider>
        </ThemeContext.Provider>
    );
}

ThemeProvider.displayName = 'ThemeProvider';
