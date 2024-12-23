import {createContext} from 'react';

import type {ThemeContextProps} from './types';

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);
ThemeContext.displayName = 'ThemeContext';
