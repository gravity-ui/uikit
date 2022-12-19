import React from 'react';
import {LayoutTheme} from '../types';
import {LayoutContext} from './LayoutContext';
import {makeDataUiTheme} from './makeDataUiTheme';
import {useMediaQuery} from './useMediaQuery';

interface LayoutThemeProviderProps {
    value?: Partial<LayoutTheme>;
}

/**
 * Provide context with default props what will be computed depends of current media query and passed to corresponding componnet. You can override this props during override corresponding prop on component level
 */
export const LayoutProvider: React.FC<LayoutThemeProviderProps> = ({children, value}) => {
    const medias = useMediaQuery();

    return (
        <LayoutContext.Provider
            value={{
                medias,
                theme: value || makeDataUiTheme(),
            }}
        >
            {children}
        </LayoutContext.Provider>
    );
};
