import React from 'react';

import {ThemeContext, ThemeContextProps} from './ThemeContext';

export function useThemeValue(): ThemeContextProps['themeValue'] {
    const {themeValue} = React.useContext(ThemeContext);
    return themeValue;
}
