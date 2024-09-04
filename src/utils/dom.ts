export function isTouchDevice(): boolean {
    if (!window) {
        return false;
    }

    if (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0) {
        return true;
    }

    if (window.matchMedia && window.matchMedia('(any-pointer:coarse)').matches) {
        return true;
    }

    return Boolean(window.TouchEvent || 'ontouchstart' in window);
}
