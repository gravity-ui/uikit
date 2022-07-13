import React, {PropsWithChildren, useEffect, useMemo, useState} from 'react';

import {DEFAULT_THEME} from './constants';
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

    const systemTheme = useSystemTheme();
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

    return (
        <ThemeContext.Provider value={contextValue}>
            <ThemeValueContext.Provider value={themeValueContext}>
                {children}
            </ThemeValueContext.Provider>
        </ThemeContext.Provider>
    );
}

ThemeProvider.displayName = 'ThemeProvider';
