import React from 'react';

import {RealTheme} from './types';

export type ThemeSettings = {
    systemLightTheme: RealTheme;
    systemDarkTheme: RealTheme;
};

export type ThemeSettingsContextProps =
    | {
          themeSettings: ThemeSettings;
          setThemeSettings: (themeSettings: ThemeSettings) => void;
      }
    | undefined;

export const ThemeSettingsContext = React.createContext<ThemeSettingsContextProps>(undefined);
ThemeSettingsContext.displayName = 'ThemeSettingsContext';
