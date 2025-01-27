import * as React from 'react';

const PROPERTY_PADDING_RIGHT = 'padding-right';
const PROPERTY_PADDING_BOTTOM = 'padding-bottom';

const lockBodyStyles = {
    overflow: 'hidden',
    position: 'fixed',
    inset: '0',
    height: '100%',
};

const STORED_BODY_STYLE_KEYS = [
    PROPERTY_PADDING_RIGHT,
    PROPERTY_PADDING_BOTTOM,
    ...Object.keys(lockBodyStyles),
] as const;

type StoredBodyStyleKeys = (typeof STORED_BODY_STYLE_KEYS)[number];
type StoredBodyStyle = Partial<Record<StoredBodyStyleKeys, string>>;

function getStoredStyles(): StoredBodyStyle {
    const styles: StoredBodyStyle = {};

    for (const property of STORED_BODY_STYLE_KEYS) {
        styles[property] = document.body.style.getPropertyValue(property);
    }

    return styles;
}

export interface UseBodyScrollLockProps {
    enabled: boolean;
}

export type BodyScrollLockProps = UseBodyScrollLockProps;

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

    storedBodyStyle = getStoredStyles();

    for (const [style, value] of Object.entries(lockBodyStyles)) {
        document.body.style.setProperty(style, value);
    }

    if (yScrollbarWidth) {
        document.body.style.setProperty(
            PROPERTY_PADDING_RIGHT,
            `${bodyPadding.right + yScrollbarWidth}px`,
        );
    }
    if (xScrollbarWidth) {
        document.body.style.setProperty(
            PROPERTY_PADDING_BOTTOM,
            `${bodyPadding.bottom + xScrollbarWidth}px`,
        );
    }
}

function restoreBodyStyles() {
    for (const property of STORED_BODY_STYLE_KEYS) {
        const storedProperty = storedBodyStyle[property];
        if (storedProperty) {
            document.body.style.setProperty(property, storedProperty);
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
