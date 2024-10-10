import React from 'react';

export interface UseBodyScrollLockProps {
    enabled: boolean;
}

export type BodyScrollLockProps = UseBodyScrollLockProps;

interface StoredBodyStyle {
    overflow?: string;
    paddingRight?: string;
    paddingBottom?: string;
}

let locks = 0;
let storedBodyStyle: StoredBodyStyle = {};

export function useBodyScrollLock({enabled}: UseBodyScrollLockProps) {
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

    storedBodyStyle = {
        overflow: document.body.style.overflow,
        paddingRight: document.body.style.paddingRight,
        paddingBottom: document.body.style.paddingBottom,
    };

    document.body.style.overflow = 'hidden';

    if (yScrollbarWidth) {
        document.body.style.paddingRight = `${bodyPadding.right + yScrollbarWidth}px`;
    }
    if (xScrollbarWidth) {
        document.body.style.paddingBottom = `${bodyPadding.bottom + xScrollbarWidth}px`;
    }
}

function restoreBodyStyles() {
    for (const property of ['overflow', 'paddingRight', 'paddingBottom'] as const) {
        const storedProperty = storedBodyStyle[property];
        if (storedProperty) {
            document.body.style[property] = storedProperty;
        } else {
            document.body.style.removeProperty(property);
        }
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
