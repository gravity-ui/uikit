/**
 * Suppressing text selection for the duration of a press — the react-aria
 * model (interactions/textSelection.ts) rather than the `user-select: none`
 * baked into the CSS of the old List: gestures started ON a row (dragging with
 * the mouse, shift+click in the selection mode, starting a drag) create no
 * selection, while at rest the rows stay a part of the page selection (Ctrl+A,
 * dragging from the page).
 *
 * Desktop: an inline `user-select: none` on the pressed element itself — no
 * selection anchor is created, so dragging does not select the neighbouring
 * rows either; the page is left alone (performance, react-spectrum#1609). The
 * previous value is kept in a WeakMap and restored on release.
 *
 * iOS WebKit: `user-select: none` on the documentElement — a long press there
 * selects the neighbours even when selection is suppressed on the target; the
 * restore is deferred (the selection may happen after pointerup as well), and
 * the states guard against races between overlapping presses.
 */

const modifiedElements = new WeakMap<HTMLElement, string>();

type IOSRestoreState = 'default' | 'disabled' | 'restoring';
let iosState: IOSRestoreState = 'default';
let savedDocumentUserSelect = '';

// On iOS every browser is WebKit, so a separate engine check is not needed;
// iPadOS masquerades as MacIntel and can only be told apart by its touch points
function isIOS(): boolean {
    if (typeof navigator === 'undefined') {
        return false;
    }
    return (
        /iPhone|iPad|iPod/.test(navigator.platform ?? '') ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    );
}

export function disableTextSelection(target: HTMLElement): void {
    if (isIOS()) {
        if (iosState === 'default') {
            savedDocumentUserSelect = document.documentElement.style.webkitUserSelect;
            document.documentElement.style.webkitUserSelect = 'none';
        }
        iosState = 'disabled';
        return;
    }
    if (!modifiedElements.has(target)) {
        const style = target.style;
        modifiedElements.set(target, style.userSelect);
        style.userSelect = 'none';
    }
}

export function restoreTextSelection(target: HTMLElement): void {
    if (isIOS()) {
        if (iosState !== 'disabled') {
            return;
        }
        iosState = 'restoring';
        window.setTimeout(() => {
            // A new press during the delay has switched the state back to
            // 'disabled' — its own restore will set its own timer
            if (iosState !== 'restoring') {
                return;
            }
            if (document.documentElement.style.webkitUserSelect === 'none') {
                document.documentElement.style.webkitUserSelect = savedDocumentUserSelect;
            }
            savedDocumentUserSelect = '';
            iosState = 'default';
        }, 300);
        return;
    }
    if (modifiedElements.has(target)) {
        const style = target.style;
        if (style.userSelect === 'none') {
            style.userSelect = modifiedElements.get(target) ?? '';
        }
        if (target.getAttribute('style') === '') {
            target.removeAttribute('style');
        }
        modifiedElements.delete(target);
    }
}
