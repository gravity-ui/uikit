import * as React from 'react';

import {TYPEAHEAD_TIMEOUT, findTypeaheadMatch} from './utils';
import type {ListRow} from './utils';

export interface ListTypeahead {
    /** Добавляет символ в буфер и отдаёт совпадение в onMatch */
    handleChar(char: string): void;
    /** Буфер не пуст: Space — часть поиска, а не жест выделения (APG) */
    hasQuery(): boolean;
}

/**
 * Машина typeahead (§5): буфер символов с таймером сброса. Сам поиск —
 *  чистый findTypeaheadMatch (utils), хук добавляет только состояние буфера.
 *  Как и остальные обработчики клавиатурной машины, замыкает rows/activeId
 *  текущего рендера — события всегда диспатчатся в актуальный рендер
 */
export function useListTypeahead<T>({
    rows,
    activeId,
    onMatch,
}: {
    rows: readonly ListRow<T>[];
    activeId: string | undefined;
    /** Коммит совпадения; undefined («не нашли») ядро игнорирует */
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
