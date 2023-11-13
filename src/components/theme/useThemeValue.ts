import React from 'react';

import {ThemeContext, ThemeContextProps} from './ThemeContext';

export function useThemeValue(): ThemeContextProps['themeValue'] {
    return React.useContext(ThemeContext).themeValue;
}
