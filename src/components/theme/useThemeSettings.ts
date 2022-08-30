import React from 'react';

import {ThemeSettings, ThemeSettingsContext} from './ThemeSettingsContext';

export function useThemeSettings(): [ThemeSettings, (s: ThemeSettings) => void] {
    const {themeSettings, setThemeSettings} = React.useContext(ThemeSettingsContext);
    return [themeSettings, setThemeSettings];
}
