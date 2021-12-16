import React from 'react';

import {DEFAULT_THEME} from './constants';

export interface ThemeContextProps {
    theme: string;
    setTheme: (newTheme: string) => void;
}

const initialValue: ThemeContextProps = {
    theme: DEFAULT_THEME,
    setTheme: () => {},
};

export const ThemeContext = React.createContext(initialValue);
