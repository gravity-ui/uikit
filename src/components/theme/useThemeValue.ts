import React from 'react';

import {ThemeValueContext} from './ThemeValueContext';
import type {ThemeValueContextProps} from './ThemeValueContext';

export function useThemeValue(): ThemeValueContextProps['themeValue'] {
    const {themeValue} = React.useContext(ThemeValueContext);
    return themeValue;
}
