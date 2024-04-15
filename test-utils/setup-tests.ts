import {configure} from '@testing-library/dom';

import {Lang, configure as libConfigure} from '../src';

import {setupIntersectionObserverMock} from './setupIntersectionObserverMock';

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

setupIntersectionObserverMock();

// mock AutoSizer to properly test functionality related to virtualization
// 400 x 400 is a random size and might be changed if needed
jest.mock(
    'react-virtualized-auto-sizer',
    () =>
        //@ts-ignore
        ({children}) =>
            children({height: 400, width: 400}),
);
