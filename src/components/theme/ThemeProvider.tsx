'use client';

import * as React from 'react';

import {PrivateLayoutProvider} from '../layout/LayoutProvider/LayoutProvider';
import type {PrivateLayoutProviderProps} from '../layout/LayoutProvider/LayoutProvider';
import {block} from '../utils/cn';

import {ThemeContext} from './ThemeContext';
import {ThemeSettingsContext} from './ThemeSettingsContext';
import type {ThemeSettings} from './ThemeSettingsContext';
import {
    DEFAULT_DARK_THEME,
    DEFAULT_DIRECTION,
    DEFAULT_LIGHT_THEME,
    DEFAULT_THEME,
    ROOT_CLASSNAME,
} from './constants';
import {updateBodyClassName, updateBodyDirection} from './dom-helpers';
import type {Direction, RealTheme, Theme, ThemeContextProps} from './types';
import type {LangOptions} from './useLang';
import {LangContext, defaultLangOptions} from './useLang';
import {useSystemTheme} from './useSystemTheme';

const b = block(ROOT_CLASSNAME);

export interface ThemeProviderProps extends React.PropsWithChildren<{}>, Partial<LangOptions> {
    theme?: Theme;
    systemLightTheme?: RealTheme;
    systemDarkTheme?: RealTheme;
    direction?: Direction;
    scoped?: boolean;
    rootClassName?: string;
    layout?: Omit<PrivateLayoutProviderProps, 'children'>;
}

export function ThemeProvider({
    theme: themeProp,
    systemLightTheme: systemLightThemeProp,
    systemDarkTheme: systemDarkThemeProp,
    direction: directionProp,
    scoped: scopedProp = false,
    rootClassName = '',
    children,
    layout,
    lang,
    fallbackLang,
}: ThemeProviderProps) {
    const parentThemeState = React.useContext(ThemeContext);
    const systemThemeState = React.useContext(ThemeSettingsContext);
    const langOptionsState = React.useContext(LangContext);

    const hasParentProvider = parentThemeState !== undefined;
    const scoped = hasParentProvider || scopedProp;
    const parentTheme = parentThemeState?.theme ?? DEFAULT_THEME;
    const theme = themeProp ?? parentTheme;
    const systemLightTheme =
        systemLightThemeProp ?? systemThemeState?.systemLightTheme ?? DEFAULT_LIGHT_THEME;
    const systemDarkTheme =
        systemDarkThemeProp ?? systemThemeState?.systemDarkTheme ?? DEFAULT_DARK_THEME;
    const parentDirection = parentThemeState?.direction ?? DEFAULT_DIRECTION;
    const direction = directionProp ?? parentDirection;

    const systemTheme = useSystemTheme() === 'light' ? systemLightTheme : systemDarkTheme;
    const themeValue = theme === 'system' ? systemTheme : theme;

    const prevRootClassName = React.useRef('');

    React.useLayoutEffect(() => {
        if (!scoped) {
            updateBodyClassName({
                theme: themeValue,
                className: rootClassName,
                prevClassName: prevRootClassName.current,
            });
            updateBodyDirection(direction);
            prevRootClassName.current = rootClassName;
        }
    }, [scoped, themeValue, direction, rootClassName]);

    const contextValue = React.useMemo(
        () =>
            ({
                theme,
                themeValue,
                direction,
                scoped,
            }) satisfies ThemeContextProps,
        [theme, themeValue, direction, scoped],
    );

    const themeSettingsContext = React.useMemo(
        () => ({systemLightTheme, systemDarkTheme}) satisfies ThemeSettings,
        [systemLightTheme, systemDarkTheme],
    );

    const langOptionsFinal =
        lang || fallbackLang
            ? {
                  ...defaultLangOptions,
                  ...langOptionsState,
                  ...(lang ? {lang} : undefined),
                  ...(fallbackLang ? {fallbackLang} : undefined),
              }
            : langOptionsState;
    return (
        <PrivateLayoutProvider {...layout}>
            <ThemeContext.Provider value={contextValue}>
                <ThemeSettingsContext.Provider value={themeSettingsContext}>
                    <LangContext.Provider value={langOptionsFinal}>
                        {scoped ? (
                            <div className={b({theme: themeValue}, rootClassName)} dir={direction}>
                                {children}
                            </div>
                        ) : (
                            children
                        )}
                    </LangContext.Provider>
                </ThemeSettingsContext.Provider>
            </ThemeContext.Provider>
        </PrivateLayoutProvider>
    );
}

ThemeProvider.displayName = 'ThemeProvider';
