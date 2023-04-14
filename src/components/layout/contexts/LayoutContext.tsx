import React from 'react';
import {LayoutTheme, MediaType} from '../types';
import {DEFAULT_LAYOUT_THEME} from '../constants';

interface LayoutContextProps {
    theme: LayoutTheme;
    activeMediaQuery: MediaType;
}

export const LayoutContext = React.createContext<LayoutContextProps>({
    theme: DEFAULT_LAYOUT_THEME,
    activeMediaQuery: 's',
});
