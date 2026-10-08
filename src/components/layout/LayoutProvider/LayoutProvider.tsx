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
     * defaults to `xs`.
     */
    initialMediaQuery?: MediaType;
    children: React.ReactNode;
}

export function LayoutProvider({
    children,
    config: override,
    initialMediaQuery,
}: LayoutProviderProps) {
    const parentContext = React.useContext(LayoutContext);
    const inheritedMediaQuery =
        parentContext !== DEFAULT_LAYOUT_CONTEXT &&
        initialMediaQuery === undefined &&
        override?.breakpoints === undefined
            ? parentContext.activeMediaQuery
            : undefined;
    const theme = React.useMemo(
        () => overrideLayoutTheme({theme: parentContext.theme, override}),
        [override, parentContext.theme],
    );
    const activeMediaQuery = useCurrentActiveMediaQuery(
        theme.breakpoints,
        initialMediaQuery ??
            (parentContext !== DEFAULT_LAYOUT_CONTEXT ? parentContext.activeMediaQuery : undefined),
        inheritedMediaQuery,
    );

    const value = React.useMemo(() => ({activeMediaQuery, theme}), [activeMediaQuery, theme]);
    return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
}
