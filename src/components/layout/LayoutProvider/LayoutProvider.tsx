'use client';

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
    // TODO BREAKING CHANGE: Make it default behaviour
    /**
     * Fixes "s" media breakpoint behaviour with introducing "xs" media.
     * Will be default in the next major release.
     */
    fixBreakpoints?: boolean;
    children: React.ReactNode;
}

export function PrivateLayoutProvider({
    children,
    config: override,
    initialMediaQuery,
    fixBreakpoints = false,
}: PrivateLayoutProviderProps) {
    const parentContext = React.useContext(LayoutContext);
    const theme = React.useMemo(
        () => overrideLayoutTheme({theme: parentContext.theme, override}),
        [override, parentContext.theme],
    );
    const activeMediaQuery = useCurrentActiveMediaQuery(
        theme.breakpoints,
        fixBreakpoints,
        initialMediaQuery,
    );

    const value = React.useMemo(
        () => ({activeMediaQuery, theme, fixBreakpoints}),
        [activeMediaQuery, theme, fixBreakpoints],
    );
    return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
}
