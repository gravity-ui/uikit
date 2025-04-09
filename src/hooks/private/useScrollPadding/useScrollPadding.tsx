import * as React from 'react';

export function useScrollPadding(isOpen: boolean) {
    React.useEffect(() => {
        const hasScrollVertical = window.innerHeight !== document.body.scrollHeight;
        const hasScrollHorizontal = window.innerWidth !== document.body.scrollWidth;

        if (isOpen) {
            if (hasScrollVertical) {
                const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
                document.body.style.paddingRight ??= `${scrollbarWidth}px`;
            }
            if (hasScrollHorizontal) {
                const scrollbarHeight = window.innerHeight - document.documentElement.clientHeight;
                document.body.style.paddingBottom ??= `${scrollbarHeight}px`;
            }
        }
    }, [isOpen]);
}
