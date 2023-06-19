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
