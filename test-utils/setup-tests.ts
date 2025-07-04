import {configure} from '@testing-library/dom';

import {Lang, configure as libConfigure} from '../src';

libConfigure({
    lang: Lang.En,
});
configure({testIdAttribute: 'data-qa'});

global.ResizeObserver = class implements ResizeObserver {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(_callback: ResizeObserverCallback) {}
    disconnect() {}
    observe(_target: Element, _options?: ResizeObserverOptions) {}
    unobserve(_target: Element) {}
};

global.matchMedia = function matchMedia(media: string) {
    return {
        matches: false,
        media,
        addEventListener() {},
        removeEventListener() {},
        onchange() {},
        dispatchEvent() {
            return true;
        },
        addListener() {},
        removeListener() {},
    } satisfies MediaQueryList;
};

// mock AutoSizer to properly test functionality related to virtualization
// 400 x 400 is a random size and might be changed if needed
jest.mock(
    'react-virtualized-auto-sizer',
    () =>
        //@ts-expect-error
        ({children}) =>
            children({height: 400, width: 400}),
);
