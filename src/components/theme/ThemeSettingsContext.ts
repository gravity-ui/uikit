import {createContext} from 'react';

import type {RealTheme} from './types';

export type ThemeSettings = {
    systemLightTheme: RealTheme;
    systemDarkTheme: RealTheme;
};

export type ThemeSettingsContextProps = ThemeSettings | undefined;

export const ThemeSettingsContext = createContext<ThemeSettingsContextProps>(undefined);
ThemeSettingsContext.displayName = 'ThemeSettingsContext';
