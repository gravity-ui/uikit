import * as React from 'react';

import {TYPEAHEAD_TIMEOUT, findTypeaheadMatch} from './utils';
import type {ListRow} from './utils';

export interface ListTypeahead {
    handleChar(char: string): void;
    /** The buffer is not empty: a space is part of the search, not a selection gesture (APG) */
    hasQuery(): boolean;
}

export function useListTypeahead<T>({
    rows,
    activeId,
    onMatch,
}: {
    rows: readonly ListRow<T>[];
    activeId: string | undefined;
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
