import {useEffect, useState} from 'react';
import {getDarkMediaMatch} from './getDarkMediaMatch';
import {getSystemTheme} from './getSystemTheme';

export function useSystemTheme(): 'light' | 'dark' {
    const [theme, setTheme] = useState<'light' | 'dark'>(getSystemTheme());

    useEffect(() => {
        function onChange(event: MediaQueryListEvent) {
            setTheme(event.matches ? 'dark' : 'light');
        }

        const matcher = getDarkMediaMatch();

        matcher.addEventListener('change', onChange);

        return () => matcher.removeEventListener('change', onChange);
    }, []);

    return theme;
}
