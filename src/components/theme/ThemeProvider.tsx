import React, {PropsWithChildren, useEffect, useMemo, useState} from 'react';

import {DEFAULT_THEME} from './constants';
import {getThemeValue} from './getThemeValue';
import {ThemeContext} from './ThemeContext';
import {ThemeValueContext} from './ThemeValueContext';
import type {Theme} from './types';
import {updateBodyClassName} from './updateBodyClassName';
import {useSystemTheme} from './useSystemTheme';

interface ThemeProviderExternalProps {}

interface ThemeProviderDefaultProps {
    theme: Theme;
}

export interface ThemeProviderProps
    extends ThemeProviderExternalProps,
        Partial<ThemeProviderDefaultProps>,
        PropsWithChildren<{}> {}

export function ThemeProvider({theme: themeProp = DEFAULT_THEME, children}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(themeProp);
    useEffect(() => {
        setTheme(themeProp);
    }, [themeProp]);

    const [themeValue, setThemeValue] = useState(getThemeValue(theme));
    const systemTheme = useSystemTheme();
    useEffect(() => {
        if (systemTheme && theme === 'system') {
            setThemeValue(systemTheme);

            return;
        }

        setThemeValue(getThemeValue(theme));
    }, [systemTheme, theme]);
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

    return (
        <ThemeContext.Provider value={contextValue}>
            <ThemeValueContext.Provider value={{themeValue}}>{children}</ThemeValueContext.Provider>
        </ThemeContext.Provider>
    );
}

ThemeProvider.displayName = 'ThemeProvider';
