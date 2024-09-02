export function isTouch(): boolean {
    if (window.PointerEvent) {
        return navigator?.maxTouchPoints > 0;
    }

    if (window.matchMedia && window.matchMedia('(any-pointer:coarse)').matches) {
        return true;
    }

    return Boolean(window.TouchEvent || 'ontouchstart' in window);
}
