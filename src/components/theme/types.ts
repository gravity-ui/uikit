// Use (string & {}) for better autocomplete https://stackoverflow.com/a/61048124
export type RealTheme = 'light' | 'light-hc' | 'dark' | 'dark-hc' | (string & {});
export type ThemeType = 'light' | 'dark';
export type Theme = 'system' | RealTheme;
export type Direction = 'ltr' | 'rtl';

export interface ThemeContextProps {
    theme: Theme;
    themeValue: RealTheme;
    direction: Direction;
}
