import React from 'react';

export interface BodyScrollLockProps {
    enabled: boolean;
}

let locks = 0;
let storedBodyStyle: string | undefined;

export function useBodyScrollLock({enabled}: BodyScrollLockProps) {
    React.useLayoutEffect(() => {
        if (enabled) {
            locks++;

            if (locks === 1) {
                setBodyStyles();
            }

            return () => {
                locks--;
                if (locks === 0) {
                    restoreBodyStyles();
                }
            };
        }

        return undefined;
    }, [enabled]);
}

function setBodyStyles() {
    const yScrollbarWidth = getYScrollbarWidth();
    const xScrollbarWidth = getXScrollbarWidth();
    const bodyPadding = getBodyComputedPadding();

    storedBodyStyle = document.body.style.cssText;
    document.body.style.overflow = 'hidden';

    if (yScrollbarWidth) {
        document.body.style.paddingRight = `${bodyPadding.right + yScrollbarWidth}px`;
    }
    if (xScrollbarWidth) {
        document.body.style.paddingBottom = `${bodyPadding.bottom + xScrollbarWidth}px`;
    }
}

function restoreBodyStyles() {
    if (storedBodyStyle) {
        document.body.style.cssText = storedBodyStyle;
    } else {
        document.body.removeAttribute('style');
    }
}

function getYScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
}

function getXScrollbarWidth() {
    return window.innerHeight - document.documentElement.clientHeight;
}

function getBodyComputedPadding() {
    const computedStyle = window.getComputedStyle(document.body);
    return {
        top: Number.parseFloat(computedStyle.paddingTop),
        right: Number.parseFloat(computedStyle.paddingRight),
        bottom: Number.parseFloat(computedStyle.paddingBottom),
        left: Number.parseFloat(computedStyle.paddingLeft),
    };
}
