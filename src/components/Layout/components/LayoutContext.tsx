import React from 'react';
import {LayoutTheme, MediaPartial} from '../types';

interface LayoutContextProps {
    theme: Partial<LayoutTheme>;
    medias: MediaPartial<boolean>;
}

const DEFAULT_LAYOUT_CONTEXT: LayoutContextProps = {theme: {}, medias: {}};

export const LayoutContext = React.createContext<LayoutContextProps>(DEFAULT_LAYOUT_CONTEXT);
