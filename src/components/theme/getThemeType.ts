import {LIGHT_THEMES} from './constants';
import {RealTheme, ThemeType} from './types';

export function getThemeType(theme: RealTheme): ThemeType {
    return LIGHT_THEMES.includes(theme) ? 'light' : 'dark';
}
