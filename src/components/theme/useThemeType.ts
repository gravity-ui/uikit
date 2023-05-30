import {getThemeType} from './getThemeType';
import {ThemeType} from './types';
import {useThemeValue} from './useThemeValue';

export function useThemeType(): ThemeType {
    const themeValue = useThemeValue();
    return getThemeType(themeValue);
}
