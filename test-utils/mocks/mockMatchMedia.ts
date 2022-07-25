import {act} from '@testing-library/react';

export function mockMatchMedia() {
    const initialMatchMedia = window.matchMedia;
    const currentMatches: Record<string, boolean> = {};
    const matchMediaMock = jest
        .fn((mediaQueryString: string) => {
            const addEventListener = jest
                .fn<undefined, Parameters<MediaQueryList['addEventListener']>>()
                .mockName('matchMedia#addEventListener');
            const addListener = jest.fn().mockName('matchMedia#addListener');
            const onchange = jest.fn().mockName('matchMedia#onchange');
            const removeEventListener = jest
                .fn<undefined, Parameters<MediaQueryList['removeEventListener']>>()
                .mockName('matchMedia#removeEventListener');
            const removeListener = jest.fn().mockName('matchMedia#removeListener');
            const dispatchEvent = jest.fn().mockName('matchMedia#dispatchEvent');

            return {
                media: mediaQueryString,
                matches: currentMatches[mediaQueryString],
                addEventListener,
                addListener,
                onchange,
                removeEventListener,
                removeListener,
                dispatchEvent,
            };
        })
        .mockName('matchMedia');
    window.matchMedia = matchMediaMock;

    return {
        mockMatches(mediaQueryString: string, nextMatches: boolean) {
            currentMatches[mediaQueryString] = nextMatches;
        },

        changeMedia(mediaQueryString: string, nextMatches: boolean) {
            this.mockMatches(mediaQueryString, nextMatches);

            matchMediaMock.mock.calls.forEach(([mediaQuery]) => {
                matchMediaMock.mock.results.forEach((result) => {
                    if (result.type !== 'return' || result.value.media !== mediaQuery) {
                        return;
                    }

                    const {addEventListener} = result.value;

                    addEventListener.mock.calls.forEach(([, handler]) => {
                        if (typeof handler !== 'function') {
                            return;
                        }

                        act(() => {
                            handler({
                                matches: currentMatches[mediaQueryString],
                                media: mediaQueryString,
                            } as MediaQueryListEvent);
                        });
                    });
                });
            });
        },

        uninstall() {
            window.matchMedia = initialMatchMedia;
        },
    };
}
