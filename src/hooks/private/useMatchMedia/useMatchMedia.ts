import * as React from 'react';

export interface UseMatchMediaProps {
    query: string;
}

export function useMatchMedia({query}: UseMatchMediaProps) {
    const media = React.useMemo(
        () => (typeof window === 'undefined' ? null : window.matchMedia(query)),
        [query],
    );
    const [matches, setMatches] = React.useState(Boolean(media?.matches));

    React.useEffect(() => {
        const handleChange = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        media?.addEventListener('change', handleChange);
        return () => media?.removeEventListener('change', handleChange);
    }, [media]);

    return matches;
}
