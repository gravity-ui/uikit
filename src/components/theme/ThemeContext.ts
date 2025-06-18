'use client';
import * as React from 'react';

import type {ThemeContextProps} from './types';

export const ThemeContext = React.createContext<ThemeContextProps | undefined>(undefined);
ThemeContext.displayName = 'ThemeContext';
