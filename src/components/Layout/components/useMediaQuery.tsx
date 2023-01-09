import React from 'react';
import {MediaPartial, MediaProps} from '../types';

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

export const makeMediaExpressions = (mediaToValue: MediaProps<number>): MediaProps<string> => ({
    mobile: `(max-width: ${mediaToValue.mobile}px)`,
    tabletH: `(min-width: ${mediaToValue.mobile + 1}px) and (max-width: ${mediaToValue.tabletH}px)`,
    laptopS: `(min-width: ${mediaToValue.tabletH + 1}px) and (max-width: ${
        mediaToValue.laptopS
    }px)`,
    laptopM: `(min-width: ${mediaToValue.laptopS + 1}px) and (max-width: ${
        mediaToValue.laptopM
    }px)`,
    desktop: `(min-width: ${mediaToValue.laptopM + 1}px) and (max-width: ${
        mediaToValue.desktop
    }px)`,
});

const safeMatchMedia = (query: string | number): MediaQueryList => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
        return mockMediaQueryList;
    }

    return window.matchMedia(String(query));
};

class Queries {
    private readonly _mobileList: MediaQueryList;
    private readonly _tabletHList: MediaQueryList;
    private readonly _laptopSList: MediaQueryList;
    private readonly _laptopMList: MediaQueryList;
    private readonly _desktopList: MediaQueryList;

    constructor(breakpointsMap: MediaProps<number>) {
        const mediaToExpression = makeMediaExpressions(breakpointsMap);

        this._mobileList = safeMatchMedia(mediaToExpression.mobile);
        this._tabletHList = safeMatchMedia(mediaToExpression.tabletH);
        this._laptopSList = safeMatchMedia(mediaToExpression.laptopS);
        this._laptopMList = safeMatchMedia(mediaToExpression.laptopM);
        this._desktopList = safeMatchMedia(mediaToExpression.desktop);
    }

    matches(): MediaProps<boolean> {
        return {
            mobile: this._mobileList.matches,
            tabletH: this._tabletHList.matches,
            laptopS: this._laptopSList.matches,
            laptopM: this._laptopMList.matches,
            desktop: this._desktopList.matches,
        };
    }

    addListeners(fn: () => void) {
        this._mobileList.addEventListener('change', fn);
        this._tabletHList.addEventListener('change', fn);
        this._laptopSList.addEventListener('change', fn);
        this._laptopMList.addEventListener('change', fn);
        this._desktopList.addEventListener('change', fn);
    }

    removeListeners(fn: () => void) {
        this._mobileList.removeEventListener('change', fn);
        this._tabletHList.removeEventListener('change', fn);
        this._laptopSList.removeEventListener('change', fn);
        this._laptopMList.removeEventListener('change', fn);
        this._desktopList.removeEventListener('change', fn);
    }
}

/**
 * @private - use `useMediaContext` hook instead
 */
export const useMediaQuery = (breakpointsMap: MediaProps<number>) => {
    const [state, _setState] = React.useState<MediaPartial<boolean>>({});

    React.useLayoutEffect(() => {
        let mounted = true;

        const queries = new Queries(breakpointsMap);

        const setState = () => {
            _setState(queries.matches());
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
    }, []);

    return state;
};
