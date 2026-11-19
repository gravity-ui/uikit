import type * as React from 'react';

import {forwardDetachedTouches} from '../forwardDetachedTouches';

function arm() {
    const handle = document.createElement('span');
    document.body.appendChild(handle);
    forwardDetachedTouches({currentTarget: handle} as unknown as React.TouchEvent<HTMLElement>);
    return handle;
}

const touch = (type: string) => new TouchEvent(type, {bubbles: true, cancelable: true});

describe('forwardDetachedTouches', () => {
    const received: Event[] = [];
    const listener = (event: Event) => {
        received.push(event);
        event.preventDefault();
    };

    beforeEach(() => {
        received.length = 0;
        window.addEventListener('touchmove', listener);
        window.addEventListener('touchend', listener);
    });
    afterEach(() => {
        window.removeEventListener('touchmove', listener);
        window.removeEventListener('touchend', listener);
        document.body.innerHTML = '';
    });

    test('a connected handle lets the events bubble on their own', () => {
        const handle = arm();
        handle.dispatchEvent(touch('touchmove'));
        // The original event itself, not a copy
        expect(received).toHaveLength(1);
        expect(received[0].target).toBe(handle);
    });

    test('a detached handle forwards the events to window and passes preventDefault back', () => {
        const handle = arm();
        handle.remove();

        const move = touch('touchmove');
        handle.dispatchEvent(move);
        expect(received.map((event) => event.type)).toEqual(['touchmove']);
        expect(received[0]).not.toBe(move);
        expect(move.defaultPrevented).toBe(true);

        handle.dispatchEvent(touch('touchend'));
        expect(received.map((event) => event.type)).toEqual(['touchmove', 'touchend']);

        // Released at the end of the gesture
        handle.dispatchEvent(touch('touchmove'));
        expect(received).toHaveLength(2);
    });

    test('without the TouchEvent constructor a plain event carries the touches', () => {
        const handle = arm();
        handle.remove();
        const move = touch('touchmove');

        const original = window.TouchEvent;
        const throwing = function () {
            throw new TypeError('Illegal constructor');
        } as unknown as typeof TouchEvent;
        Object.defineProperty(window, 'TouchEvent', {value: throwing, configurable: true});
        try {
            handle.dispatchEvent(move);
        } finally {
            Object.defineProperty(window, 'TouchEvent', {value: original, configurable: true});
        }

        expect(received).toHaveLength(1);
        expect((received[0] as TouchEvent).touches).toBe(move.touches);
        expect(move.defaultPrevented).toBe(true);
    });
});
