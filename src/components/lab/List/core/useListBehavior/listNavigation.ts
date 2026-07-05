import {KeyCode} from '../../../../../constants';

/**
 * Pure keyboard-navigation primitives over the ordered list of navigable ids (a slice of
 * `visibleIds` with non-navigable nodes — section labels — already filtered out). Kept free of React
 * and DOM so the movement/typeahead rules can be unit-tested in isolation.
 */

/** Returns the id one step (`delta` of `+1`/`-1`) from `fromId`, or `undefined` past an edge. */
export function getAdjacentId(
    navigableIds: string[],
    fromId: string | undefined,
    delta: number,
): string | undefined {
    if (navigableIds.length === 0) {
        return undefined;
    }
    const from = fromId === undefined ? -1 : navigableIds.indexOf(fromId);
    // No current position — enter from the matching edge (down → first, up → last).
    if (from === -1) {
        return delta > 0 ? navigableIds[0] : navigableIds[navigableIds.length - 1];
    }
    const next = from + delta;
    if (next < 0 || next >= navigableIds.length) {
        return undefined;
    }
    return navigableIds[next];
}

/**
 * Resolves a horizontal arrow to a logical inline direction, inverted for RTL: `ArrowRight` is
 * `forward` in LTR and `backward` in RTL (and vice versa). The shared primitive for inline
 * navigation — tree expand/collapse, grid cell entry; the listbox machine has no inline axis and
 * does not consume it.
 */
export function resolveInlineArrow(
    key: string,
    direction: 'ltr' | 'rtl',
): 'forward' | 'backward' | undefined {
    if (key !== KeyCode.ARROW_RIGHT && key !== KeyCode.ARROW_LEFT) {
        return undefined;
    }
    const rightIsForward = direction !== 'rtl';
    const forward = key === KeyCode.ARROW_RIGHT ? rightIsForward : !rightIsForward;
    return forward ? 'forward' : 'backward';
}

/** Returns the first or last navigable id, or `undefined` when there are none. */
export function getEdgeId(navigableIds: string[], edge: 'first' | 'last'): string | undefined {
    if (navigableIds.length === 0) {
        return undefined;
    }
    return edge === 'first' ? navigableIds[0] : navigableIds[navigableIds.length - 1];
}

/**
 * Resolves the next typeahead match. The buffer grows while the user keeps typing within the timeout
 * window; a buffer of one repeated character cycles to the next match (press `a` repeatedly to walk
 * the `a…` items), a multi-character buffer refines from the current item. Matching is a
 * case-insensitive prefix test on `getText`, wrapping around the end.
 *
 * Returns the next buffer plus the matched id (or `undefined` when nothing matches — the buffer still
 * advances so a follow-up key can complete a longer prefix).
 */
export function resolveTypeahead(
    navigableIds: string[],
    getText: (id: string) => string,
    prevBuffer: string,
    char: string,
    activeId: string | undefined,
): {buffer: string; matchId: string | undefined} {
    const buffer = prevBuffer + char;
    if (navigableIds.length === 0) {
        return {buffer, matchId: undefined};
    }

    // Case-insensitive, to match the prefix test below — `a` then `A` still counts as repeated.
    const lower = buffer.toLowerCase();
    const repeated = lower.split('').every((c) => c === lower[0]);
    // A single/repeated key cycles: search a single char starting after the current item. A distinct
    // multi-char buffer refines: search the whole prefix starting at the current item.
    const search = (repeated ? char : buffer).toLowerCase();
    const activeIndex = activeId === undefined ? -1 : navigableIds.indexOf(activeId);
    const start = repeated ? activeIndex + 1 : Math.max(activeIndex, 0);

    for (let i = 0; i < navigableIds.length; i++) {
        const id = navigableIds[(start + i) % navigableIds.length];
        if (getText(id).toLowerCase().startsWith(search)) {
            return {buffer, matchId: id};
        }
    }
    return {buffer, matchId: undefined};
}
