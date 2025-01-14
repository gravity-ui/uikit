import * as React from 'react';

import {ThemeSettingsContext} from './ThemeSettingsContext';
import type {ThemeSettings} from './ThemeSettingsContext';

export function useThemeSettings(): ThemeSettings {
    const settings = React.useContext(ThemeSettingsContext);
    if (settings === undefined) {
        throw new Error('useThemeSettings must be used within ThemeProvider');
    }
    return settings;
}
