import type * as React from 'react';

import {focusable} from 'tabbable';

/**
 * Entering the interactive content of a cell and returning to the row — the
 * keyboard of a grid. This is what makes a button inside a row (a drag handle,
 * a row action) reachable with the keyboard rather than merely valid by role.
 * Returns true when the event has been handled
 */
export function navigateCells(
    event: React.KeyboardEvent,
    rowElement: HTMLElement,
    fromCell: boolean,
    direction: 'ltr' | 'rtl',
): boolean {
    const forwardKey = direction === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
    const backwardKey = direction === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
    if (event.key !== forwardKey && event.key !== backwardKey) {
        return false;
    }
    const targets = focusable(rowElement);
    const currentIndex = fromCell ? targets.indexOf(event.target as HTMLElement) : -1;
    const nextTarget =
        event.key === forwardKey
            ? targets[currentIndex + 1]
            : (targets[currentIndex - 1] ?? (fromCell ? rowElement : undefined));
    if (!nextTarget) {
        return false;
    }
    event.preventDefault();
    nextTarget.focus();
    return true;
}
