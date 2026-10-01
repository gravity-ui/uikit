import type * as React from 'react';

/**
 * Whether an element is the containing block of its `position: fixed` descendants instead of the
 * viewport
 */
function containsFixed(style: CSSStyleDeclaration) {
    const isSet = (value: string | undefined) =>
        Boolean(value) && value !== 'none' && value !== 'normal';
    return (
        isSet(style.transform) ||
        isSet(style.translate) ||
        isSet(style.rotate) ||
        isSet(style.scale) ||
        isSet(style.perspective) ||
        isSet(style.filter) ||
        isSet(style.backdropFilter) ||
        isSet(style.containerType) ||
        style.getPropertyValue('content-visibility') === 'auto' ||
        /\b(transform|translate|rotate|scale|perspective|filter|contain)\b/.test(
            style.willChange,
        ) ||
        /\b(paint|layout|strict|content)\b/.test(style.contain)
    );
}

function findContainingBlock(from: Element | null): HTMLElement | null {
    for (let node = from; node && node !== document.documentElement; node = node.parentElement) {
        if (node instanceof HTMLElement && containsFixed(getComputedStyle(node))) {
            return node;
        }
    }
    return null;
}

/**
 * The library places a dragged element with `position: fixed` in the coordinates of the viewport.
 * Under an ancestor with a transform (a Sheet, an animated popup) the ancestor is the containing
 * block of such an element: its offset is taken out of `top`/`left`, so the element stays under
 * the pointer. `from` is the element the search starts at — the parent of the dragged element
 */
export function toContainingBlock(
    style: React.CSSProperties | undefined,
    from: Element | null | undefined,
): React.CSSProperties | undefined {
    if (style?.position !== 'fixed' || !from || typeof window === 'undefined') {
        return style;
    }
    const block = findContainingBlock(from);
    if (!block) {
        return style;
    }
    const rect = block.getBoundingClientRect();
    return {
        ...style,
        top: Number(style.top) - rect.top - block.clientTop + block.scrollTop,
        left: Number(style.left) - rect.left - block.clientLeft + block.scrollLeft,
    };
}

interface TrackedElement {
    ref: (element: HTMLElement | null) => void;
    element: HTMLElement | null;
}

const tracked = new WeakMap<object, TrackedElement>();

/**
 * A stable ref that remembers the element and passes it on to `innerRef` of the library (stable
 * per Draggable itself)
 */
export function trackElement(innerRef: (element: HTMLElement | null) => void): TrackedElement {
    let entry = tracked.get(innerRef);
    if (!entry) {
        const created: TrackedElement = {
            element: null,
            ref: (element) => {
                created.element = element;
                innerRef(element);
            },
        };
        tracked.set(innerRef, created);
        entry = created;
    }
    return entry;
}
