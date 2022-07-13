import {useEffect, useState} from 'react';
import {getDarkMediaMatch} from './getDarkMediaMatch';
import {getSystemTheme} from './getSystemTheme';

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

export function useSystemTheme(): 'light' | 'dark' {
    const [theme, setTheme] = useState<'light' | 'dark'>(getSystemTheme());

    useEffect(() => {
        function onChange(event: MediaQueryListEvent) {
            setTheme(event.matches ? 'dark' : 'light');
        }

        const matcher = getDarkMediaMatch();
        const unsubscribe = addListener(matcher, onChange);

        return () => unsubscribe();
    }, []);

    return theme;
}
