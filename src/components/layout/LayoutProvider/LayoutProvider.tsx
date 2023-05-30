/* eslint-disable valid-jsdoc */
import React from 'react';

import {LayoutContext} from '../contexts/LayoutContext';
import {useCurrentActiveMediaQuery} from '../hooks/useCurrentActiveMediaQuery';
import {LayoutTheme, MediaType, RecursivePartial} from '../types';
import {makeLayoutDefaultTheme} from '../utils/makeLayoutDefaultTheme';

interface LayoutProviderProps {
    theme?: RecursivePartial<LayoutTheme>;
    /**
     * During ssr you can override default (`s`) media screen size
     */
    initialMediaQuery?: MediaType;
    children: React.ReactNode;
}

/**
 * Provide context for layout components and current media queries.
 * ---
 * Storybook - https://preview.gravity-ui.com/uikit/?path=/docs/layout--playground#layoutprovider-and-layouttheme
 */
export const LayoutProvider: React.FC<LayoutProviderProps> = ({
    children,
    theme: override,
    initialMediaQuery,
}) => {
    const theme = makeLayoutDefaultTheme({override});
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
};
