import type {AutocompleteSafeString} from '../../utils/autocomplete-safe-string';

export type RealTheme = 'light' | 'light-hc' | 'dark' | 'dark-hc' | AutocompleteSafeString;
export type ThemeType = 'light' | 'dark';
export type Theme = 'system' | RealTheme;
export type Direction = 'ltr' | 'rtl';

export interface ThemeContextProps {
    theme: Theme;
    themeValue: RealTheme;
    direction: Direction;
    scoped?: boolean;
}
