/* eslint-disable valid-jsdoc */
import React from 'react';

import {LayoutContext} from '../contexts/LayoutContext';
import {useCurrentActiveMediaQuery} from '../hooks/useCurrentActiveMediaQuery';
import type {LayoutTheme, MediaType, RecursivePartial} from '../types';
import {makeLayoutDefaultTheme} from '../utils/makeLayoutDefaultTheme';

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
    const theme = React.useMemo(() => makeLayoutDefaultTheme({override}), [override]);
    const activeMediaQuery = useCurrentActiveMediaQuery(theme.breakpoints, initialMediaQuery);

    return (
        <LayoutContext.Provider
            value={{
                activeMediaQuery,
                theme,
            }}
        >
            {children}
        </LayoutContext.Provider>
    );
}

interface LayoutProviderProps {
    theme?: RecursivePartial<LayoutTheme>;
    /**
     * During ssr you can override default (`s`) media screen size if needed
     */
    initialMediaQuery?: MediaType;
    children: React.ReactNode;
}

/**
 * @deprecated - already used as part of ThemeProvider. To override layout theme use `layout` prop
 *
 * Provide context for layout components and current media queries.
 * ---
 * Storybook - https://preview.gravity-ui.com/uikit/?path=/docs/layout--playground#layoutprovider-and-layouttheme
 */
export function LayoutProvider({children}: LayoutProviderProps) {
    return children;
}
