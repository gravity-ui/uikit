/**
 * ДЕМО-интеграция @hello-pangea/dnd — сознательно ВНЕ референсов контракта §8
 * (итог спайка фазы 4: контрактом либа невыразима). Стори показывает, докуда
 * можно доехать обёртками в renderItem, и цену:
 *
 * - `Droppable`/`Draggable` — компоненты с render-props: строку оборачивает
 *   потребитель в renderItem (как у dnd-kit), контейнерные droppableProps
 *   уезжают через getContainerDndProps;
 * - `provided.placeholder` обязан быть ПОСЛЕДНИМ ребёнком droppable-элемента
 *   (корня листа) — канала в контракте нет, в демо он протаскивается хаком
 *   через renderItem последней строки; работает только в плоском режиме
 *   (под виртуализацией строки лежат в обёртках — хак не выживет);
 * - модель либы — сдвиг строк трансформами, у неё нет понятия before/after:
 *   `dropTarget` адаптер не заполняет (индикатор листа не рисуется — гэп
 *   показывают сами сдвинутые строки), а destination.index из onDragEnd
 *   переводится в {toId, position} для moveItem;
 * - dragHandleProps (role="button", tabIndex=0, обязательные data-rfd-*)
 *   уезжают на ОТДЕЛЬНУЮ ручку в startContent — по образцу интеграции
 *   в старом List: на самой строке они затёрли бы role="option" и roving
 *   tabIndex, а клавиатурный Space-lift либы (capture-фаза на window)
 *   перехватывал бы Space листа. С ручки клавиатурный dnd rbd работает,
 *   не мешая клавиатурной модели листа; цена — вложенный интерактив
 *   внутри role="option" (ARIA-невалидность, унаследованная от старого
 *   List) и потеря drag за любое место строки.
 */
import * as React from 'react';

import type {DragStart, DropResult} from '@hello-pangea/dnd';

export interface UseHelloPangeaListDndOptions {
    /** Порядок id опций — перевод destination.index в {toId, position} */
    ids: readonly string[];
    onDrop: (fromId: string, toId: string, position: 'before' | 'after') => void;
}

export function useHelloPangeaListDnd({ids, onDrop}: UseHelloPangeaListDndOptions): {
    draggingId: string | null;
    /** На DragDropContext потребителя */
    onDragStart: (start: DragStart) => void;
    onDragEnd: (result: DropResult) => void;
} {
    const [draggingId, setDraggingId] = React.useState<string | null>(null);

    const idsRef = React.useRef(ids);
    idsRef.current = ids;
    const onDropRef = React.useRef(onDrop);
    onDropRef.current = onDrop;

    const onDragStart = React.useCallback((start: DragStart) => {
        setDraggingId(start.draggableId);
    }, []);

    const onDragEnd = React.useCallback((result: DropResult) => {
        setDraggingId(null);
        const destination = result.destination;
        if (!destination) {
            return;
        }
        const currentIds = idsRef.current;
        const fromIndex = currentIds.indexOf(result.draggableId);
        if (fromIndex === -1 || destination.index === fromIndex) {
            return;
        }
        // rbd отдаёт индекс в ИТОГОВОМ списке (после изъятия источника) —
        // переводим в декларативную пару контракта {toId, position}
        const withoutFrom = currentIds.filter((id) => id !== result.draggableId);
        if (destination.index >= withoutFrom.length) {
            onDropRef.current(result.draggableId, withoutFrom[withoutFrom.length - 1], 'after');
        } else {
            onDropRef.current(result.draggableId, withoutFrom[destination.index], 'before');
        }
    }, []);

    return {draggingId, onDragStart, onDragEnd};
}
