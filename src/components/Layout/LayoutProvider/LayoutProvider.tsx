/* eslint-disable valid-jsdoc */
import React from 'react';
import {RecursivePartial, LayoutTheme} from '../types';
import {LayoutContext} from '../contexts/LayoutContext';
import {makeDefaultTheme} from '../utils/makeDefaultTheme';
import {useCurrentActiveMediaQuery} from '../hooks/useCurrentActiveMediaQuery';

interface LayoutProviderProps {
    value?: RecursivePartial<LayoutTheme>;
    children: React.ReactNode;
}

/**
 * Provide context for layout components and current media queries.
 */
export const LayoutProvider: React.FC<LayoutProviderProps> = React.memo(({children, value}) => {
    const theme = makeDefaultTheme({override: value});
    const activeMediaQuery = useCurrentActiveMediaQuery(theme.breakpoints);

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
});

LayoutProvider.displayName = 'LayoutProvider';
