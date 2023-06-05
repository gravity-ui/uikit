import React from 'react';

import type {RealTheme} from './types';

export interface ThemeValueContextProps {
    themeValue: RealTheme;
}

const initialValue: ThemeValueContextProps = {
    themeValue: 'light',
};

export const ThemeValueContext = React.createContext(initialValue);
ThemeValueContext.displayName = 'ThemeValueContext';
