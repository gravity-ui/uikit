import * as React from 'react';

import {getDarkMediaMatch, getSystemTheme, supportsMatchMedia} from './dom-helpers';
import type {ThemeType} from './types';

function addListener(
    matcher: MediaQueryList,
    handler: (event: MediaQueryListEvent) => void,
): VoidFunction {
    const isLegacyMethod = typeof matcher.addEventListener !== 'function';

    if (isLegacyMethod) {
        matcher.addListener(handler);
    } else {
        matcher.addEventListener('change', handler);
    }

    return () => {
        if (isLegacyMethod) {
            matcher.removeListener(handler);
        } else {
            matcher.removeEventListener('change', handler);
        }
    };
}

export function useSystemTheme(): ThemeType {
    const [theme, setTheme] = React.useState<ThemeType>(getSystemTheme());

    React.useEffect(() => {
        if (!supportsMatchMedia) {
            return undefined;
        }

        function onChange(event: MediaQueryListEvent) {
            setTheme(event.matches ? 'dark' : 'light');
        }

        const matcher = getDarkMediaMatch();
        const unsubscribe = addListener(matcher, onChange);

        return () => unsubscribe();
    }, []);

    return theme;
}
