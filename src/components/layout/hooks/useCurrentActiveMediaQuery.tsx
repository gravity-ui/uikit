/* eslint-disable valid-jsdoc */
import React from 'react';

import {MediaProps, MediaType} from '../types';

export const mockMediaQueryList: MediaQueryList = {
    media: '',
    matches: false,
    onchange: () => {},
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: (_: Event) => true,
};

export const makeCurrentActiveMediaExpressions = (
    mediaToValue: MediaProps<number>,
): MediaProps<string> => ({
    s: `(max-width: ${mediaToValue.m - 1}px)`,
    m: `(min-width: ${mediaToValue.m}px) and (max-width: ${mediaToValue.l - 1}px)`,
    l: `(min-width: ${mediaToValue.l}px) and (max-width: ${mediaToValue.xl - 1}px)`,
    xl: `(min-width: ${mediaToValue.xl}px) and (max-width: ${mediaToValue.xxl - 1}px)`,
    xxl: `(min-width: ${mediaToValue.xxl}px) and (max-width: ${mediaToValue.xxxl - 1}px)`,
    xxxl: `(min-width: ${mediaToValue.xxxl}px)`,
});

const safeMatchMedia = (query: string | number): MediaQueryList => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
        return mockMediaQueryList;
    }

    return window.matchMedia(String(query));
};

class Queries {
    private queryListsDecl: [MediaType, MediaQueryList][] = [];

    constructor(breakpointsMap: MediaProps<number>) {
        const mediaToExpressionMap = makeCurrentActiveMediaExpressions(breakpointsMap);

        this.queryListsDecl = [
            // order important here
            ['s', safeMatchMedia(mediaToExpressionMap.s)],
            ['m', safeMatchMedia(mediaToExpressionMap.m)],
            ['l', safeMatchMedia(mediaToExpressionMap.l)],
            ['xl', safeMatchMedia(mediaToExpressionMap.xl)],
            ['xxl', safeMatchMedia(mediaToExpressionMap.xxl)],
            ['xxxl', safeMatchMedia(mediaToExpressionMap.xxxl)],
        ];
    }

    getCurrentActiveMedia(): MediaType {
        const activeMedia = this.queryListsDecl.find(([_, queryList]) => queryList.matches);

        if (!activeMedia) {
            return 's';
        }

        return activeMedia[0];
    }

    addListeners(fn: () => void) {
        this.queryListsDecl.forEach(([_, queryList]) => queryList.addEventListener('change', fn));
    }

    removeListeners(fn: () => void) {
        this.queryListsDecl.forEach(([_, queryList]) =>
            queryList.removeEventListener('change', fn),
        );
    }
}

/**
 * @private - use `useLayoutContext` hook instead
 */
export const useCurrentActiveMediaQuery = (
    breakpointsMap: MediaProps<number>,
    initialMediaQuery: MediaType = 's',
) => {
    const [state, _setState] = React.useState<MediaType>(initialMediaQuery);

    React.useLayoutEffect(() => {
        let mounted = true;

        const queries = new Queries(breakpointsMap);

        const setState = () => {
            _setState(queries.getCurrentActiveMedia());
        };

        const onChange = () => {
            if (!mounted) {
                return;
            }

            setState();
        };

        queries.addListeners(onChange);

        setState();

        return () => {
            mounted = false;
            queries.removeListeners(onChange);
        };
        // don't support runtime breakpoint redefinition. Breakpoints defined only one at LayoutTheme
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return state;
};
