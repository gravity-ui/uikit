/**
 * Text selection is suppressed for the duration of a press (react-aria
 * interactions/textSelection): inline user-select on the pressed element on desktop;
 * on iOS WebKit on the documentElement with a deferred restore (a long press selects neighbours).
 */

const modifiedElements = new WeakMap<HTMLElement, string>();

type IOSRestoreState = 'default' | 'disabled' | 'restoring';
let iosState: IOSRestoreState = 'default';
let savedDocumentUserSelect = '';

// iPadOS masquerades as MacIntel
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
