import {act} from '@testing-library/react';

export function mockMatchMedia(matches = false) {
    const initialMatchMedia = window.matchMedia;
    const addEventListener = jest.fn().mockName('matchMedia#addEventListener');
    const removeEventListener = jest.fn().mockName('matchMedia#removeEventListener');
    let currentMatches = matches;
    window.matchMedia = jest
        .fn()
        .mockName('matchMedia')
        .mockImplementation(() => ({
            matches: currentMatches,
            addEventListener,
            removeEventListener,
        }));

    return {
        changeMedia(nextMatches: boolean) {
            currentMatches = nextMatches;
            act(() =>
                addEventListener.mock.calls.forEach(([, handler]) => {
                    handler({
                        matches: nextMatches,
                    });
                }),
            );
        },

        uninstall() {
            window.matchMedia = initialMatchMedia;
        },
    };
}
