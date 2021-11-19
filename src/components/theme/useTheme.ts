import React from 'react';

import {ThemeContext, ThemeContextProps} from './ThemeContext';

export function useTheme(): [ThemeContextProps['theme'], ThemeContextProps['setTheme']] {
    const {theme, setTheme} = React.useContext(ThemeContext);
    return [theme, setTheme];
}
