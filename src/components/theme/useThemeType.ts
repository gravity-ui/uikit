import {getThemeType} from './getThemeType';
import type {ThemeType} from './types';
import {useThemeValue} from './useThemeValue';

export function useThemeType(): ThemeType {
    return getThemeType(useThemeValue());
}
