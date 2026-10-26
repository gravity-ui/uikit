import * as React from 'react';

import {useLayoutEffect} from '../../../hooks';
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
    xl: `(min-width: ${mediaToValue.xl}px) and (max-width: ${mediaToValue['2xl'] - 1}px)`,
    '2xl': `(min-width: ${mediaToValue['2xl']}px) and (max-width: ${mediaToValue['3xl'] - 1}px)`,
    '3xl': `(min-width: ${mediaToValue['3xl']}px)`,
});

const safeMatchMedia = (query: string): MediaQueryList => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
        return mockMediaQueryList;
    }

    return window.matchMedia(query);
};

class Queries {
    private queryListsDecl: [MediaType, MediaQueryList][] = [];

    constructor(breakpointsMap: MediaProps<number>) {
        const mediaToExpressionMap = makeCurrentActiveMediaExpressions(breakpointsMap);

        this.queryListsDecl = [
            // order important here
            ['xs', safeMatchMedia(mediaToExpressionMap.xs)],
            ['s', safeMatchMedia(mediaToExpressionMap.s)],
            ['m', safeMatchMedia(mediaToExpressionMap.m)],
            ['l', safeMatchMedia(mediaToExpressionMap.l)],
            ['xl', safeMatchMedia(mediaToExpressionMap.xl)],
            ['2xl', safeMatchMedia(mediaToExpressionMap['2xl'])],
            ['3xl', safeMatchMedia(mediaToExpressionMap['3xl'])],
        ];
    }

    getCurrentActiveMedia(): MediaType {
        const activeMedia = this.queryListsDecl.find(([_, queryList]) => queryList.matches)?.[0];

        return activeMedia ?? 'xs';
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
    initialMediaQuery?: MediaType,
    inheritedMediaQuery?: MediaType,
) => {
    const [state, _setState] = React.useState<MediaType>(initialMediaQuery ?? 'xs');

    const inheritsMediaQuery = inheritedMediaQuery !== undefined;

    useLayoutEffect(() => {
        if (inheritsMediaQuery) {
            return undefined;
        }

        const queries = new Queries(breakpointsMap);

        const setState = () => {
            _setState(queries.getCurrentActiveMedia());
        };

        queries.addListeners(setState);

        setState();

        return () => {
            queries.removeListeners(setState);
        };
    }, [breakpointsMap, inheritsMediaQuery]);

    return inheritedMediaQuery ?? state;
};
