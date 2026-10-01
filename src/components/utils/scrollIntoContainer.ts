/**
 * The distance from the top of the scrollable content of the container to the top of the element.
 * It is summed along the `offsetParent` chain: a row of a virtualized list sits in an absolutely
 * positioned wrapper, so a single `offsetTop` is not the whole way. A container that is not
 * positioned is not a link of that chain — the chain steps over it, and the offset of the
 * container itself is taken off instead. Offsets rather than rects: a popup that scales in while it
 * opens would skew the latter
 */
export function getOffsetTopWithin(container: HTMLElement, element: HTMLElement): number {
    let top = 0;
    let current: HTMLElement | null = element;
    while (current && current !== container) {
        top += current.offsetTop;
        const offsetParent: Element | null = current.offsetParent;
        if (offsetParent === container) {
            break;
        }
        if (!(offsetParent instanceof HTMLElement)) {
            break;
        }
        if (offsetParent.contains(container)) {
            top -= container.offsetTop + container.clientTop;
            break;
        }
        top += offsetParent.clientTop;
        current = offsetParent;
    }
    return top;
}

/**
 * The scroll offset that brings a row into the viewport by the nearest edge, `undefined` when the
 * row is in view already. A row taller than the viewport shows its start when it comes from below
 * and its end when it comes from above, and is in view once it covers the viewport. A pixel of
 * slack: the scroll offset may be fractional, the offsets of the rows never are
 */
export function getNearestEdgeScrollOffset({
    start,
    end,
    scrollOffset,
    viewportSize,
}: {
    /** Where the row starts and ends in the scrollable content */
    start: number;
    end: number;
    scrollOffset: number;
    viewportSize: number;
}): number | undefined {
    const above = start < scrollOffset - 1;
    const below = end > scrollOffset + viewportSize + 1;
    if (above === below) {
        return undefined;
    }
    const fits = end - start <= viewportSize;
    const offset = above === fits ? start : end - viewportSize;
    return Math.abs(offset - scrollOffset) <= 1 ? undefined : offset;
}
