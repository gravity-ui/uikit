import type {StringWithSuggest} from '../../utils/types';

export type RealTheme = StringWithSuggest<'light' | 'light-hc' | 'dark' | 'dark-hc'>;
export type ThemeType = 'light' | 'dark';
export type Theme = 'system' | RealTheme;
export type Direction = 'ltr' | 'rtl';

export interface ThemeContextProps {
    theme: Theme;
    themeValue: RealTheme;
    direction: Direction;
    scoped?: boolean;
}
