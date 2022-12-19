import React from 'react';
import {LayoutProps, MediaPartial} from '../types';
import {getThemeValue} from './getThemeValue';
import {LayoutContext} from './LayoutContext';

interface UseMediaContext {
    medias: MediaPartial<boolean>;
    theme: LayoutProps;
}

/**
 * Quick access at project level to active media query and current theme prop value
 */
export const useLayoutContext = (): UseMediaContext => {
    const {medias, theme: _theme} = React.useContext(LayoutContext);

    const theme: LayoutProps = React.useMemo(() => {
        return {
            gutters: getThemeValue('gutters', _theme, medias),
            space: getThemeValue('space', _theme, medias),
            spaceRow: getThemeValue('spaceRow', _theme, medias),
        };
    }, [_theme, medias]);

    return {medias, theme};
};
