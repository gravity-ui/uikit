import * as React from 'react';

import {TYPEAHEAD_TIMEOUT, findTypeaheadMatch} from './utils';
import type {ListRow} from './utils';

export interface ListTypeahead {
    /** Appends a character to the buffer and reports the match to onMatch */
    handleChar(char: string): void;
    /** The buffer is not empty: a space is part of the search, not a selection gesture (APG) */
    hasQuery(): boolean;
}

/**
 * The typeahead machine: a buffer of characters with a reset timer. The search
 *  itself is the pure findTypeaheadMatch (utils), the hook only adds the state
 *  of the buffer. Like the rest of the keyboard machinery handlers, it closes
 *  over the rows/activeId of the current render — events are always dispatched
 *  into the current one
 */
export function useListTypeahead<T>({
    rows,
    activeId,
    onMatch,
}: {
    rows: readonly ListRow<T>[];
    activeId: string | undefined;
    /** Commits a match; undefined ("nothing found") is ignored by the core */
    onMatch: (id: string | undefined) => void;
}): ListTypeahead {
    const stateRef = React.useRef<{query: string; timer?: number}>({query: ''});
    React.useEffect(
        () => () => {
            window.clearTimeout(stateRef.current.timer);
        },
        [],
    );
    return {
        handleChar(char) {
            const state = stateRef.current;
            window.clearTimeout(state.timer);
            state.query += char;
            state.timer = window.setTimeout(() => {
                state.query = '';
            }, TYPEAHEAD_TIMEOUT);
            onMatch(findTypeaheadMatch(rows, activeId, state.query));
        },
        hasQuery: () => stateRef.current.query.length > 0,
    };
}
