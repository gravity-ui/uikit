import {DARK_THEMES} from './constants';
import type {RealTheme, ThemeType} from './types';

export function getThemeType(theme: RealTheme): ThemeType {
    return DARK_THEMES.includes(theme) ? 'dark' : 'light';
}
