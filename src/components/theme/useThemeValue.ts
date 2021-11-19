import React from 'react';

import {ThemeValueContext, ThemeValueContextProps} from './ThemeValueContext';

export function useThemeValue(): ThemeValueContextProps['themeValue'] {
    const {themeValue} = React.useContext(ThemeValueContext);
    return themeValue;
}
