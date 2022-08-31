import React from 'react';

import {ThemeSettings, ThemeSettingsContext} from './ThemeSettingsContext';

export function useThemeSettings(): [ThemeSettings, (s: ThemeSettings) => void] {
    const settings = React.useContext(ThemeSettingsContext);
    if (settings === undefined) {
        throw new Error('useThemeSettings must be used within ThemeProvider');
    }
    const {themeSettings, setThemeSettings} = settings;
    return [themeSettings, setThemeSettings];
}
