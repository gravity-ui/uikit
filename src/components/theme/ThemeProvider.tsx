import React from 'react';

import {block, blockNew} from '../utils/cn';

import {ThemeContext} from './ThemeContext';
import {ThemeSettingsContext} from './ThemeSettingsContext';
import type {ThemeSettings} from './ThemeSettingsContext';
import {
    DEFAULT_DARK_THEME,
    DEFAULT_DIRECTION,
    DEFAULT_LIGHT_THEME,
    DEFAULT_THEME,
    ROOT_CLASS_NAME,
} from './constants';
import {updateBodyClassName, updateBodyDirection} from './dom-helpers';
import type {Direction, RealTheme, Theme, ThemeContextProps} from './types';
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
    theme: themeProp,
    systemLightTheme: systemLightThemeProp,
    systemDarkTheme: systemDarkThemeProp,
    direction: directionProp,
    nativeScrollbar,
    scoped: scopedProp = false,
    rootClassName = '',
    children,
}: ThemeProviderProps) {
    const parentThemeState = React.useContext(ThemeContext);
    const systemThemeState = React.useContext(ThemeSettingsContext);

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

    React.useLayoutEffect(() => {
        if (!scoped) {
            updateBodyClassName({
                theme: themeValue,
                nativeScrollbar,
                className: rootClassName,
            });
            updateBodyDirection(direction);
        }
    }, [scoped, themeValue, direction, nativeScrollbar, rootClassName]);

    const contextValue = React.useMemo(
        () =>
            ({
                theme,
                themeValue,
                direction,
            } satisfies ThemeContextProps),
        [theme, themeValue, direction],
    );

    const themeSettingsContext = React.useMemo(
        () => ({systemLightTheme, systemDarkTheme} satisfies ThemeSettings),
        [systemLightTheme, systemDarkTheme],
    );

    const isNeedToSetTheme = !hasParentProvider || themeValue !== parentThemeState.themeValue;
    return (
        <ThemeContext.Provider value={contextValue}>
            <ThemeSettingsContext.Provider value={themeSettingsContext}>
                {scoped ? (
                    <div
                        className={bNew(
                            {
                                theme: isNeedToSetTheme && themeValue,
                                'native-scrollbar': nativeScrollbar !== false,
                            },
                            [b({theme: isNeedToSetTheme && themeValue}), rootClassName],
                        )}
                        dir={
                            hasParentProvider && direction === parentDirection
                                ? undefined
                                : direction
                        }
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
