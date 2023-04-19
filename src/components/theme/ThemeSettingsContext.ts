import React from 'react';

import type {RealTheme} from './types';

export type ThemeSettings = {
    systemLightTheme: RealTheme;
    systemDarkTheme: RealTheme;
};

export type ThemeSettingsContextProps =
    | {
          themeSettings: ThemeSettings;
          /** @deprecated Set theme settings in your app and pass it to context, instead of managing it via context methods */
          setThemeSettings: (themeSettings: ThemeSettings) => void;
      }
    | undefined;

export const ThemeSettingsContext = React.createContext<ThemeSettingsContextProps>(undefined);
ThemeSettingsContext.displayName = 'ThemeSettingsContext';
