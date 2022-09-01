import {ThemeType} from './types';
import {getThemeType} from './getThemeType';
import {useThemeValue} from './useThemeValue';

export function useThemeType(): ThemeType {
    const themeValue = useThemeValue();
    return getThemeType(themeValue);
}
