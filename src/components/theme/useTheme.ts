import type {ThemeContextProps} from './types';
import {useThemeContext} from './useThemeContext';

export function useTheme(): ThemeContextProps['theme'] {
    return useThemeContext().theme;
}
