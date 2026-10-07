'use client';
import * as React from 'react';

import {DEFAULT_LAYOUT_THEME} from '../constants';
import type {LayoutTheme, MediaType} from '../types';

interface LayoutContextProps {
    theme: LayoutTheme;
    activeMediaQuery: MediaType;
    fixBreakpoints: boolean;
}

export const DEFAULT_LAYOUT_CONTEXT: LayoutContextProps = {
    theme: DEFAULT_LAYOUT_THEME,
    activeMediaQuery: 's',
    fixBreakpoints: false,
};

export const LayoutContext = React.createContext(DEFAULT_LAYOUT_CONTEXT);
