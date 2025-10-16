import * as React from 'react';

import type {MediaProps, MediaType} from '../types';

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
    xs: `(max-width: ${mediaToValue.s - 1}px)`,
    s: `(min-width: ${mediaToValue.s}px) and (max-width: ${mediaToValue.m - 1}px)`,
    m: `(min-width: ${mediaToValue.m}px) and (max-width: ${mediaToValue.l - 1}px)`,
    l: `(min-width: ${mediaToValue.l}px) and (max-width: ${mediaToValue.xl - 1}px)`,
    xl: `(min-width: ${mediaToValue.xl}px) and (max-width: ${mediaToValue.xxl - 1}px)`,
    xxl: `(min-width: ${mediaToValue.xxl}px) and (max-width: ${mediaToValue.xxxl - 1}px)`,
    xxxl: `(min-width: ${mediaToValue.xxxl}px)`,
});

const safeMatchMedia = (query: string): MediaQueryList => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
        return mockMediaQueryList;
    }

    return window.matchMedia(query);
};

class Queries {
    private fix: boolean;
    private queryListsDecl: [MediaType, MediaQueryList][] = [];

    constructor(breakpointsMap: MediaProps<number>, fixBreakpoints: boolean) {
        const mediaToExpressionMap = makeCurrentActiveMediaExpressions(breakpointsMap);

        this.fix = fixBreakpoints;
        this.queryListsDecl = [
            // order important here
            ['xs', safeMatchMedia(mediaToExpressionMap.xs)],
            ['s', safeMatchMedia(mediaToExpressionMap.s)],
            ['m', safeMatchMedia(mediaToExpressionMap.m)],
            ['l', safeMatchMedia(mediaToExpressionMap.l)],
            ['xl', safeMatchMedia(mediaToExpressionMap.xl)],
            ['xxl', safeMatchMedia(mediaToExpressionMap.xxl)],
            ['xxxl', safeMatchMedia(mediaToExpressionMap.xxxl)],
        ];
    }

    getCurrentActiveMedia(): MediaType {
        const activeMedia = this.queryListsDecl.find(([_, queryList]) => queryList.matches)?.[0];

        if (!activeMedia) {
            return this.fix ? 'xs' : 's';
        } else if (activeMedia === 'xs' && !this.fix) {
            return 's';
        }

        return activeMedia;
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
 * @private
 */
export const useCurrentActiveMediaQuery = (
    breakpointsMap: MediaProps<number>,
    fixBreakpoints: boolean,
    initialMediaQuery?: MediaType,
) => {
    const [state, _setState] = React.useState<MediaType>(
        initialMediaQuery ?? (fixBreakpoints ? 'xs' : 's'),
    );

    React.useLayoutEffect(() => {
        const queries = new Queries(breakpointsMap, fixBreakpoints);

        const setState = () => {
            _setState(queries.getCurrentActiveMedia());
        };

        queries.addListeners(setState);

        setState();

        return () => {
            queries.removeListeners(setState);
        };
    }, [breakpointsMap, fixBreakpoints]);

    return state;
};
