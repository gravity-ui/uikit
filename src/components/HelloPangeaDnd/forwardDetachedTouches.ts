import type * as React from 'react';

const FORWARDED_TYPES = ['touchmove', 'touchend', 'touchcancel'] as const;

/**
 * Under virtualization the library draws the dragged row by a clone and unmounts the original —
 * together with the handle under the finger. The touch events of the finger keep going to that
 * detached handle and never reach the listeners of the library on `window`, so the clone would
 * freeze. The handle forwards them to `window` while it is out of the document, and passes the
 * `preventDefault` of the library back (it keeps the page from scrolling under the drag)
 */
export function forwardDetachedTouches(event: React.TouchEvent<HTMLElement>) {
    const handle = event.currentTarget;
    if (typeof TouchEvent === 'undefined') {
        return;
    }

    const forward = (touch: TouchEvent) => {
        if (handle.isConnected) {
            return;
        }
        const copy = new TouchEvent(touch.type, {
            bubbles: true,
            cancelable: true,
            touches: Array.from(touch.touches),
            targetTouches: Array.from(touch.targetTouches),
            changedTouches: Array.from(touch.changedTouches),
        });
        window.dispatchEvent(copy);
        if (copy.defaultPrevented && touch.cancelable) {
            touch.preventDefault();
        }
    };
    const release = () => {
        for (const type of FORWARDED_TYPES) {
            handle.removeEventListener(type, forward);
        }
        handle.removeEventListener('touchend', release);
        handle.removeEventListener('touchcancel', release);
    };

    for (const type of FORWARDED_TYPES) {
        handle.addEventListener(type, forward, {passive: false});
    }
    // Registered after `forward`, so the last event is forwarded before the release
    handle.addEventListener('touchend', release);
    handle.addEventListener('touchcancel', release);
}
