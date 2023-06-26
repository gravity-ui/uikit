import React from 'react';

import {ThemeContext} from './ThemeContext';
import type {ThemeContextProps} from './ThemeContext';

export function useTheme(): ThemeContextProps['theme'] {
    const {theme} = React.useContext(ThemeContext);
    return theme;
}
