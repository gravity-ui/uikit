/**
 * Подавление выделения текста на время нажатия — модель react-aria
 * (interactions/textSelection.ts), а не запечённый в CSS `user-select: none`
 * старого List: жесты, начатые НА строке (протяжка, shift+click в
 * selection-режиме, старт drag), выделение не создают, но в покое строки
 * остаются частью выделения страницы (Ctrl+A, протяжка со страницы).
 *
 * Десктоп: инлайновый `user-select: none` на сам нажатый элемент — якорь
 * выделения не создаётся, поэтому протяжка не выделяет и соседние строки;
 * страницу не трогаем (перф, прецедент react-spectrum#1609). Прежнее
 * значение — в WeakMap, восстанавливается по отпусканию.
 *
 * iOS WebKit: `user-select: none` на documentElement — long-press там
 * выделяет соседей даже при подавлении на цели; восстановление отложено
 * (выделение может случиться и после pointerup), состояния защищают от
 * гонок пересекающихся нажатий.
 */

const modifiedElements = new WeakMap<HTMLElement, string>();

type IOSRestoreState = 'default' | 'disabled' | 'restoring';
let iosState: IOSRestoreState = 'default';
let savedDocumentUserSelect = '';

// На iOS все браузеры — WebKit, отдельная проверка движка не нужна;
// iPadOS маскируется под MacIntel и отличим только по touch-точкам
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
            // Новое нажатие за время задержки вернуло 'disabled' — его
            // restore поставит свой таймер
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
