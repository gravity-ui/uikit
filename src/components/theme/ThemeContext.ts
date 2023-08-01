import React from 'react';

import {DEFAULT_LIGHT_THEME, DEFAULT_THEME} from './constants';
import type {RealTheme, Theme} from './types';

export interface ThemeContextProps {
    theme: Theme;
    themeValue: RealTheme;
}

const initialValue: ThemeContextProps = {
    theme: DEFAULT_THEME,
    themeValue: DEFAULT_LIGHT_THEME,
};

export const ThemeContext = React.createContext(initialValue);
ThemeContext.displayName = 'ThemeContext';
