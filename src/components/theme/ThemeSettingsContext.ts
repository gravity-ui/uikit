'use client';
import * as React from 'react';

import type {RealTheme} from './types';

export type ThemeSettings = {
    systemLightTheme: RealTheme;
    systemDarkTheme: RealTheme;
};

export type ThemeSettingsContextProps = ThemeSettings | undefined;

export const ThemeSettingsContext = React.createContext<ThemeSettingsContextProps>(undefined);
ThemeSettingsContext.displayName = 'ThemeSettingsContext';
