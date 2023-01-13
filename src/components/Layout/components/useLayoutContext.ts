/* eslint-disable valid-jsdoc */
import React from 'react';
import {LayoutProps, MediaPartial} from '../types';
import {getLayoutThemeValue} from './getLayoutThemeValue';
import {LayoutContext} from './LayoutContext';

interface UseMediaContext {
    /**
     * Map of computed values:
     * @key - media name
     * @value - is media active now
     */
    activeMediasMap: MediaPartial<boolean>;
    theme: LayoutProps;
}

/**
 * Quick access at project level to active media query and current theme prop value
 */
export const useLayoutContext = (): UseMediaContext => {
    const {medias, theme: _theme} = React.useContext(LayoutContext);

    const theme: LayoutProps = React.useMemo(() => {
        return {
            gutters: getLayoutThemeValue('gutters', _theme, medias),
            space: getLayoutThemeValue('space', _theme, medias),
            spaceRow: getLayoutThemeValue('spaceRow', _theme, medias),
        };
    }, [_theme, medias]);

    return {activeMediasMap: medias, theme};
};
