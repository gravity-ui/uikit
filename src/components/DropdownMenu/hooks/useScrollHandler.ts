import * as React from 'react';

export function useScrollHandler(
    onScroll: (event: Event) => void,
    anchorRef: React.RefObject<HTMLDivElement>,
    disabled?: boolean,
) {
    React.useEffect(() => {
        if (disabled) {
            return undefined;
        }

        const handleScroll = (event: Event) => {
            if ((event.target as Node).contains(anchorRef.current)) {
                onScroll(event);
            }
        };

        document.addEventListener('scroll', handleScroll, true);

        return () => {
            document.removeEventListener('scroll', handleScroll, true);
        };
    }, [anchorRef, onScroll, disabled]);
}
