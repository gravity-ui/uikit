import {useContext} from 'react';

import {ThemeContext} from './ThemeContext';

export function useThemeContext() {
    const state = useContext(ThemeContext);
    if (state === undefined) {
        throw new Error('useTheme* hooks must be used within ThemeProvider');
    }
    return state;
}
