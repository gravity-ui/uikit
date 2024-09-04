export function isTouchDevice(): boolean {
    if (typeof window === 'undefined') {
        return false;
    }

    if (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0) {
        return true;
    }

    if (window.matchMedia && window.matchMedia('(any-pointer:coarse)').matches) {
        return true;
    }

    return 'ontouchstart' in window;
}
