import {useEffect} from 'react';
import type {RefObject} from 'react';

export function useScrollHandler(
    onScroll: (event: Event) => void,
    anchorRef: RefObject<HTMLDivElement>,
    disabled?: boolean,
) {
    useEffect(() => {
        if (disabled) {
            return;
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
