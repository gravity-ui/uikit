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

type Props = PropsWithChildren<ThemeProviderExternalProps & ThemeProviderDefaultProps>;

export function ThemeProvider({theme = DEFAULT_THEME, children}: Props) {
    const [_theme, _setTheme] = useState(theme);
    useEffect(() => {
        _setTheme(theme);
    }, [theme]);

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
