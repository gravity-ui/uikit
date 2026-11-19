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

// ColorPicker is exported from UIKit's root, so register this mock in shared setup.
jest.mock('@uiw/react-color', () => {
    const noopComponent = () => null;
    const hsva = {h: 0, s: 0, v: 0, a: 1};

    return {
        __esModule: true,
        Alpha: noopComponent,
        Hue: noopComponent,
        Saturation: noopComponent,
        EditableInput: noopComponent,
        EditableInputRGBA: noopComponent,
        hsvaToHex: () => '#000000',
        hsvaToHexa: () => '#000000ff',
        hsvaToRgbString: () => 'rgb(0, 0, 0)',
        hsvaToRgbaString: () => 'rgba(0, 0, 0, 1)',
        hexToHsva: () => ({...hsva}),
        hslaStringToHsva: () => ({...hsva}),
        hsvaStringToHsva: () => ({...hsva}),
        rgbaStringToHsva: () => ({...hsva}),
        validHex: () => true,
    };
});
