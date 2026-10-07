'use client';

import * as React from 'react';

import {DEFAULT_LAYOUT_CONTEXT, LayoutContext} from '../contexts/LayoutContext';
import {useCurrentActiveMediaQuery} from '../hooks/useCurrentActiveMediaQuery';
import type {LayoutTheme, MediaType, RecursivePartial} from '../types';
import {overrideLayoutTheme} from '../utils/overrideLayoutTheme';

export interface LayoutProviderProps {
    config?: RecursivePartial<LayoutTheme>;
    /**
     * Initial breakpoint for SSR. Inherits the parent breakpoint; without a parent,
     * defaults to `s` (`xs` when fixBreakpoints is enabled).
     */
    initialMediaQuery?: MediaType;
    // TODO BREAKING CHANGE: Make it default behaviour
    /**
     * Fixes "s" media breakpoint behaviour with introducing "xs" media.
     * Inherits the parent setting; defaults to false without a parent.
     * Will be default in the next major release.
     */
    fixBreakpoints?: boolean;
    children: React.ReactNode;
}

export function LayoutProvider({
    children,
    config: override,
    initialMediaQuery,
    fixBreakpoints: fixBreakpointsProp,
}: LayoutProviderProps) {
    const parentContext = React.useContext(LayoutContext);
    const fixBreakpoints = fixBreakpointsProp ?? parentContext.fixBreakpoints;
    const inheritedMediaQuery =
        parentContext !== DEFAULT_LAYOUT_CONTEXT &&
        initialMediaQuery === undefined &&
        override?.breakpoints === undefined &&
        fixBreakpoints === parentContext.fixBreakpoints
            ? parentContext.activeMediaQuery
            : undefined;
    const theme = React.useMemo(
        () => overrideLayoutTheme({theme: parentContext.theme, override}),
        [override, parentContext.theme],
    );
    const activeMediaQuery = useCurrentActiveMediaQuery(
        theme.breakpoints,
        fixBreakpoints,
        initialMediaQuery ??
            (parentContext !== DEFAULT_LAYOUT_CONTEXT &&
            fixBreakpoints === parentContext.fixBreakpoints
                ? parentContext.activeMediaQuery
                : undefined),
        inheritedMediaQuery,
    );

    const value = React.useMemo(
        () => ({activeMediaQuery, theme, fixBreakpoints}),
        [activeMediaQuery, theme, fixBreakpoints],
    );
    return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
}
