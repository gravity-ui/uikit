import type {ThemeContextProps} from './types';
import {useThemeContext} from './useThemeContext';

export function useDirection(): ThemeContextProps['direction'] {
    return useThemeContext().direction;
}
