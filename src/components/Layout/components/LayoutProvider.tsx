import React from 'react';
import {PartialLayoutTheme} from '../types';
import {LayoutContext} from './LayoutContext';
import {makeDefaultTheme} from './makeDefaultTheme';
import {useMediaQuery} from './useMediaQuery';

interface LayoutThemeProviderProps {
    value?: PartialLayoutTheme;
    children: React.ReactNode;
}

/**
 * Provide context with default props what will be computed depends of current media query and passed to corresponding componnet. You can override this props during override corresponding prop on component level
 */
export const LayoutProvider: React.FC<LayoutThemeProviderProps> = ({children, value: value}) => {
    const theme = makeDefaultTheme({override: value});
    const medias = useMediaQuery(theme.breakpoints);

    return (
        <LayoutContext.Provider
            value={{
                medias,
                theme,
            }}
        >
            {children}
        </LayoutContext.Provider>
    );
};
