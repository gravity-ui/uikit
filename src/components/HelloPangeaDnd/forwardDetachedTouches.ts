import type * as React from 'react';

const FORWARDED_TYPES = ['touchmove', 'touchend', 'touchcancel'] as const;

/** The handles that forward the touches of the current gesture already */
const armed = new WeakSet<HTMLElement>();

/**
 * A copy of a touch event for `window`. WebKit may lack the `TouchEvent` constructor: the
 * library reads `touches` and `preventDefault` only, so a plain event carrying them will do
 */
function copyTouchEvent(touch: TouchEvent): Event {
    const init = {bubbles: true, cancelable: true};
    try {
        return new TouchEvent(touch.type, {
            ...init,
            touches: Array.from(touch.touches),
            targetTouches: Array.from(touch.targetTouches),
            changedTouches: Array.from(touch.changedTouches),
        });
    } catch {
        const copy = new Event(touch.type, init);
        for (const key of ['touches', 'targetTouches', 'changedTouches'] as const) {
            Object.defineProperty(copy, key, {value: touch[key]});
        }
        return copy;
    }
}

/**
 * Under virtualization the library draws the dragged row by a clone and unmounts the original —
 * together with the handle under the finger. The touch events of the finger keep going to that
 * detached handle and never reach the listeners of the library on `window`, so the clone would
 * freeze. The handle forwards them to `window` while it is out of the document, and passes the
 * `preventDefault` of the library back (it keeps the page from scrolling under the drag)
 */
export function forwardDetachedTouches(event: React.TouchEvent<HTMLElement>) {
    const handle = event.currentTarget;
    if (armed.has(handle)) {
        return;
    }
    armed.add(handle);

    const forward = (touch: TouchEvent) => {
        if (handle.isConnected) {
            return;
        }
        const copy = copyTouchEvent(touch);
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
        armed.delete(handle);
    };

    for (const type of FORWARDED_TYPES) {
        handle.addEventListener(type, forward, {passive: false});
    }
    // Registered after `forward`, so the last event is forwarded before the release
    handle.addEventListener('touchend', release);
    handle.addEventListener('touchcancel', release);
}
