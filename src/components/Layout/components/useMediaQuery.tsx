import React from 'react';
import {MEDIA_TO_VALUE} from '../constants';
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

const MEDIA_QUERIES: MediaProps<string> = {
    mobile: `(max-width: ${MEDIA_TO_VALUE.mobile}px)`,
    tablH: `(min-width: ${MEDIA_TO_VALUE.mobile + 1}px) and (max-width: ${MEDIA_TO_VALUE.tablH}px)`,
    lptpS: `(min-width: ${MEDIA_TO_VALUE.tablH + 1}px) and (max-width: ${MEDIA_TO_VALUE.lptpS}px)`,
    lptpM: `(min-width: ${MEDIA_TO_VALUE.lptpS + 1}px) and (max-width: ${MEDIA_TO_VALUE.lptpM}px)`,
    dsktp: `(min-width: ${MEDIA_TO_VALUE.lptpM + 1}px) and (max-width: ${MEDIA_TO_VALUE.dsktp}px)`,
};

const safeMatchMedia = (query: string): MediaQueryList => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
        return mockMediaQueryList;
    }

    return window.matchMedia(query);
};

class Queries {
    private readonly _mobileQueryList: MediaQueryList;
    private readonly _tablHList: MediaQueryList;
    private readonly _lptpSList: MediaQueryList;
    private readonly _lptpMList: MediaQueryList;
    private readonly _dsktpList: MediaQueryList;

    constructor() {
        this._mobileQueryList = safeMatchMedia(MEDIA_QUERIES.mobile);
        this._tablHList = safeMatchMedia(MEDIA_QUERIES.tablH);
        this._lptpSList = safeMatchMedia(MEDIA_QUERIES.lptpS);
        this._lptpMList = safeMatchMedia(MEDIA_QUERIES.lptpM);
        this._dsktpList = safeMatchMedia(MEDIA_QUERIES.dsktp);
    }

    matches(): MediaProps<boolean> {
        return {
            mobile: this._mobileQueryList.matches,
            tablH: this._tablHList.matches,
            lptpS: this._lptpSList.matches,
            lptpM: this._lptpMList.matches,
            dsktp: this._dsktpList.matches,
        };
    }

    addListeners(fn: () => void) {
        this._mobileQueryList.addEventListener('change', fn);
        this._tablHList.addEventListener('change', fn);
        this._lptpSList.addEventListener('change', fn);
        this._lptpMList.addEventListener('change', fn);
        this._dsktpList.addEventListener('change', fn);
    }

    removeListeners(fn: () => void) {
        this._mobileQueryList.removeEventListener('change', fn);
        this._tablHList.removeEventListener('change', fn);
        this._lptpSList.removeEventListener('change', fn);
        this._lptpMList.removeEventListener('change', fn);
        this._dsktpList.removeEventListener('change', fn);
    }
}

/**
 * @private - use `useMediaContext` hook instead
 */
export const useMediaQuery = () => {
    const [state, _setState] = React.useState<MediaPartial<boolean>>({});

    React.useLayoutEffect(() => {
        let mounted = true;

        const queries = new Queries();

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
