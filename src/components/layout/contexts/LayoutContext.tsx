import React from 'react';

import {DEFAULT_LAYOUT_THEME} from '../constants';
import {LayoutTheme, MediaType} from '../types';

interface LayoutContextProps {
    theme: LayoutTheme;
    activeMediaQuery: MediaType;
}

export const LayoutContext = React.createContext<LayoutContextProps>({
    theme: DEFAULT_LAYOUT_THEME,
    activeMediaQuery: 's',
});
