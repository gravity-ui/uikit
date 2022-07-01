import {getSystemTheme} from './getSystemTheme';

export function getThemeValue(themeSetting: string) {
    return themeSetting === 'system' ? getSystemTheme() : themeSetting;
}
