import React from 'react';
import {ThemeValueContext} from './ThemeValueContext';
import {ThemeType} from './types';
import {getThemeType} from './getThemeType';

export function useThemeType(): ThemeType {
    const {themeValue} = React.useContext(ThemeValueContext);
    return getThemeType(themeValue);
}
