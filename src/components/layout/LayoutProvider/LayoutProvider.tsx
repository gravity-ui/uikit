/* eslint-disable valid-jsdoc */
import React from 'react';
import {RecursivePartial, LayoutTheme} from '../types';
import {LayoutContext} from '../contexts/LayoutContext';
import {makeLayoutDefaultTheme} from '../utils/makeLayoutDefaultTheme';
import {useCurrentActiveMediaQuery} from '../hooks/useCurrentActiveMediaQuery';

interface LayoutProviderProps {
    theme?: RecursivePartial<LayoutTheme>;
    children: React.ReactNode;
}

/**
 * Provide context for layout components and current media queries.
 */
export const LayoutProvider: React.FC<LayoutProviderProps> = ({children, theme: override}) => {
    const theme = makeLayoutDefaultTheme({override});
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
};
