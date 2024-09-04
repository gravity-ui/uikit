export function isTouchDevice(): boolean {
    if (typeof window === 'undefined') {
        return false;
    }

    if ('PointerEvent' in window && 'maxTouchPoints' in navigator) {
        return navigator.maxTouchPoints > 0;
    }

    if (window.matchMedia && window.matchMedia('(any-pointer:coarse)').matches) {
        return true;
    }

    return 'ontouchstart' in window;
}
