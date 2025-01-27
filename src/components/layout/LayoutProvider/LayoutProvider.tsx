'use client';

/* eslint-disable valid-jsdoc */
import * as React from 'react';

import {LayoutContext} from '../contexts/LayoutContext';
import {useCurrentActiveMediaQuery} from '../hooks/useCurrentActiveMediaQuery';
import type {LayoutTheme, MediaType, RecursivePartial} from '../types';
import {overrideLayoutTheme} from '../utils/overrideLayoutTheme';

export interface PrivateLayoutProviderProps {
    config?: RecursivePartial<LayoutTheme>;
    /**
     * During ssr you can override default (`s`) media screen size if needed
     */
    initialMediaQuery?: MediaType;
    children: React.ReactNode;
}

export function PrivateLayoutProvider({
    children,
    config: override,
    initialMediaQuery,
}: PrivateLayoutProviderProps) {
    const parentContext = React.useContext(LayoutContext);
    const theme = React.useMemo(
        () => overrideLayoutTheme({theme: parentContext.theme, override}),
        [override, parentContext.theme],
    );
    const activeMediaQuery = useCurrentActiveMediaQuery(theme.breakpoints, initialMediaQuery);

    const value = React.useMemo(() => ({activeMediaQuery, theme}), [activeMediaQuery, theme]);
    return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
}
