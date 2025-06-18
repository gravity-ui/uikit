'use client';
import * as React from 'react';

import {DEFAULT_LAYOUT_THEME} from '../constants';
import type {LayoutTheme, MediaType} from '../types';

interface LayoutContextProps {
    theme: LayoutTheme;
    activeMediaQuery: MediaType;
    fixBreakpoints: boolean;
}

export const LayoutContext = React.createContext<LayoutContextProps>({
    theme: DEFAULT_LAYOUT_THEME,
    activeMediaQuery: 's',
    fixBreakpoints: false,
});
