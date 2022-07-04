import React, {PropsWithChildren, useEffect, useMemo, useState} from 'react';

import {ThemeContext} from './ThemeContext';
import {ThemeValueContext} from './ThemeValueContext';
import {DEFAULT_THEME} from './constants';
import {getThemeValue} from './getThemeValue';
import {updateBodyClassName} from './updateBodyClassName';
import {useSystemTheme} from './useSystemTheme';

interface ThemeProviderExternalProps {}

interface ThemeProviderDefaultProps {
    theme: string;
}

export interface ThemeProviderProps
    extends ThemeProviderExternalProps,
        Partial<ThemeProviderDefaultProps>,
        PropsWithChildren<{}> {}

export function ThemeProvider({theme: themeProp = DEFAULT_THEME, children}: ThemeProviderProps) {
    const [_theme, _setTheme] = useState(themeProp);
    useEffect(() => {
        _setTheme(themeProp);
    }, [themeProp]);

    const [themeValue, setThemeValue] = useState(getThemeValue(_theme));
    useEffect(() => {
        setThemeValue(getThemeValue(_theme));
    }, [_theme]);
    useEffect(() => {
        updateBodyClassName(themeValue);
    }, [themeValue]);

    const systemTheme = useSystemTheme();
    useEffect(() => {
        if (!systemTheme) {
            return;
        }

        setThemeValue(systemTheme);
    }, [systemTheme]);

    const contextValue = useMemo(
        () => ({
            theme: _theme,
            themeValue,
            setTheme: _setTheme,
        }),
        [_theme, themeValue],
    );

    return (
        <ThemeContext.Provider value={contextValue}>
            <ThemeValueContext.Provider value={{themeValue}}>{children}</ThemeValueContext.Provider>
        </ThemeContext.Provider>
    );
}

ThemeProvider.displayName = 'ThemeProvider';
