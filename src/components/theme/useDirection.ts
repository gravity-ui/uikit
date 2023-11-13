import React from 'react';

import {ThemeContext} from './ThemeContext';
import type {ThemeContextProps} from './ThemeContext';

export function useDirection(): ThemeContextProps['direction'] {
    return React.useContext(ThemeContext).direction;
}
