import type {ThemeContextProps} from './types';
import {useThemeContext} from './useThemeContext';

export function useThemeValue(): ThemeContextProps['themeValue'] {
    return useThemeContext().themeValue;
}
