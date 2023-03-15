import React from 'react';
import {RecursivePartial, LayoutTheme, ActiveMediaQuery} from '../types';

interface LayoutContextProps {
    theme: RecursivePartial<LayoutTheme>;
    activeMediaQuery: ActiveMediaQuery;
}

export const LayoutContext = React.createContext<LayoutContextProps>({
    theme: {},
    activeMediaQuery: '',
});
