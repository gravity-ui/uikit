import React from 'react';

import {DEFAULT_THEME} from './constants';
import type {Theme} from './types';

export interface ThemeContextProps {
    theme: Theme;
    setTheme: (newTheme: Theme) => void;
}

const initialValue: ThemeContextProps = {
    theme: DEFAULT_THEME,
    setTheme: () => {},
};

export const ThemeContext = React.createContext(initialValue);
ThemeContext.displayName = 'ThemeContext';
