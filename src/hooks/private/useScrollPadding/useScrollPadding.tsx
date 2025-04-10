import * as React from 'react';

export function useScrollPadding(isOpen: boolean) {
    React.useEffect(() => {
        const htmlElement = document?.querySelector('html');
        if (htmlElement) {
            const hasScrollVertical = window.innerHeight !== htmlElement.scrollHeight;
            const hasScrollHorizontal = window.innerWidth !== htmlElement.scrollWidth;

            if (isOpen) {
                if (hasScrollVertical) {
                    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
                    htmlElement.style.paddingRight ??= `${scrollbarWidth}px`;
                }
                if (hasScrollHorizontal) {
                    const scrollbarHeight =
                        window.innerHeight - document.documentElement.clientHeight;
                    htmlElement.style.paddingBottom ??= `${scrollbarHeight}px`;
                }
            }
        }
    }, [isOpen]);
}
