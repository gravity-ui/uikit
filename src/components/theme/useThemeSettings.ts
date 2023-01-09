import React from 'react';

import {ThemeSettingsContext} from './ThemeSettingsContext';
import type {ThemeSettings} from './ThemeSettingsContext';

export function useThemeSettings(): [ThemeSettings, (s: ThemeSettings) => void] {
    const settings = React.useContext(ThemeSettingsContext);
    if (settings === undefined) {
        throw new Error('useThemeSettings must be used within ThemeProvider');
    }
    const {themeSettings, setThemeSettings} = settings;
    return [themeSettings, setThemeSettings];
}
