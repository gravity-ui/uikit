import type * as React from 'react';

import {focusable} from 'tabbable';

/** ←/→ between the row and the focusable content of its cells (mirrored in RTL); true when handled */
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
