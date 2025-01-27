import * as React from 'react';

import {ThemeContext} from './ThemeContext';

export function useThemeContext() {
    const state = React.useContext(ThemeContext);
    if (state === undefined) {
        throw new Error('useTheme* hooks must be used within ThemeProvider');
    }
    return state;
}
