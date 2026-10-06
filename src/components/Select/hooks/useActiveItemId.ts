import * as React from 'react';

import type {FlattenOption, SelectValueKeyGetter} from '../utils';
import {isSelectGroupTitle} from '../utils';

/** The key of the first navigable (non-disabled, not a group title) option the predicate accepts */
function findOptionKey(
    options: FlattenOption[],
    getKey: SelectValueKeyGetter,
    predicate: (key: string) => boolean,
) {
    for (const option of options) {
        if (isSelectGroupTitle(option) || option.disabled) {
            continue;
        }

        const key = getKey(option.value);

        if (predicate(key)) {
            return key;
        }
    }

    return undefined;
}

function getInitialActiveItemId(
    options: FlattenOption[],
    value: unknown[],
    getKey: SelectValueKeyGetter,
) {
    if (value.length === 0) {
        return findOptionKey(options, getKey, () => true);
    }

    const selectedKeys = new Set(value.map(getKey));
    const selectedKey = findOptionKey(options, getKey, (key) => selectedKeys.has(key));

    return selectedKey ?? findOptionKey(options, getKey, () => true);
}

/**
 * The active option of an open popup: the first selected option, otherwise the first navigable one.
 * The choice is made anew on every opening, and while the popup stays open an active option that
 * the filter has taken away falls back to the first navigable one — so `Enter` always applies what
 * the user sees.
 */
export function useActiveItemId({
    options,
    value,
    open,
    getKey,
}: {
    options: FlattenOption[];
    open: boolean;
    value: unknown[];
    getKey: SelectValueKeyGetter;
}) {
    const [activeItemId, setActiveItemId] = React.useState<string | undefined>(() =>
        open ? getInitialActiveItemId(options, value, getKey) : undefined,
    );
    // Not a second copy of `open` — the popup is the only one to own it — but what the previous
    // render saw, so that this one can tell an opening from a re-render (React: adjusting state
    // when a prop changes)
    const [openInLastRender, setOpenInLastRender] = React.useState(open);

    // The state of this very render: the opening picks the active option anew, and the rest of the
    // render has to see that choice rather than the one left from the previous opening
    let currentId = activeItemId;

    if (openInLastRender !== open) {
        setOpenInLastRender(open);

        if (open) {
            currentId = getInitialActiveItemId(options, value, getKey);
            setActiveItemId(currentId);
        }
    }

    let activeItemIdFinal: string | undefined;

    if (open) {
        if (currentId === undefined) {
            // Nothing has been picked yet: the list was empty when the popup opened (asynchronous
            // options, `loading`). The rows that arrive are chosen from as an opening would — the
            // selected option first, so it is the one the popup highlights and scrolls to
            activeItemIdFinal = getInitialActiveItemId(options, value, getKey);
        } else {
            const stillNavigable = findOptionKey(options, getKey, (key) => key === currentId);

            activeItemIdFinal = stillNavigable ?? findOptionKey(options, getKey, () => true);
        }

        // The fallback is written back: an option the filter has taken away loses the activity for
        // good, so clearing the filter does not bring the old highlight back from under the user
        if (activeItemIdFinal !== currentId) {
            setActiveItemId(activeItemIdFinal);
        }
    }

    return [activeItemIdFinal, setActiveItemId] as const;
}
