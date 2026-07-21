/**
 * Референсный dnd-адаптер §8 поверх dnd-kit — «state-only» форма контракта:
 * адаптер несёт только draggingId, props-половину закрывает сам потребитель
 * per-item хуком `useSortable` в СВОЁМ компоненте строки через renderItem
 * (per-item хук невозможно вызвать из метода адаптера — rules of hooks;
 * итог спайка фазы 4).
 *
 * Пример живёт в СДВИГОВОЙ модели (родной для sortable): соседи плавно
 * раздвигаются трансформами dnd-kit, место вставки показывает гэп — поэтому
 * `dropTarget` адаптер НЕ заполняет. Правило слоя — одно из двух:
 * заполняешь dropTarget → лист рисует индикатор вставки; применяешь
 * трансформы соседей → сдвиг; вместе — двойная индикация. Индикаторную
 * модель показывает референс pragmatic-drag-and-drop.
 *
 * Обёртки DndContext/SortableContext рендерит потребитель вокруг листа,
 * спредя на них `contextProps` этого хука. Реордер в onDragEnd переводится
 * в {toId, position} для moveItem сравнением индексов: перенос вниз — after,
 * вверх — before (как у arrayMove).
 */
import * as React from 'react';

import type {DndContextProps} from '@dnd-kit/core';
import {PointerSensor, closestCenter, useSensor, useSensors} from '@dnd-kit/core';

import type {ListDndAdapter} from '../types';

export interface UseDndKitListDndOptions {
    /** Порядок id опций — по нему считается before/after для onDrop */
    ids: readonly string[];
    onDrop: (fromId: string, toId: string, position: 'before' | 'after') => void;
}

export function useDndKitListDnd({ids, onDrop}: UseDndKitListDndOptions): {
    adapter: ListDndAdapter;
    /** Спред на DndContext, которым потребитель оборачивает лист */
    contextProps: DndContextProps;
} {
    const [draggingId, setDraggingId] = React.useState<string | null>(null);

    // distance-констрейнт: клик по строке остаётся кликом (активация,
    // выделение), drag начинается только после смещения указателя
    const sensors = useSensors(useSensor(PointerSensor, {activationConstraint: {distance: 4}}));

    const getPosition = (fromId: string, toId: string): 'before' | 'after' =>
        ids.indexOf(fromId) < ids.indexOf(toId) ? 'after' : 'before';

    const contextProps: DndContextProps = {
        sensors,
        collisionDetection: closestCenter,
        onDragStart: ({active}) => setDraggingId(String(active.id)),
        onDragEnd: ({active, over}) => {
            if (over && over.id !== active.id) {
                onDrop(
                    String(active.id),
                    String(over.id),
                    getPosition(String(active.id), String(over.id)),
                );
            }
            setDraggingId(null);
        },
        onDragCancel: () => setDraggingId(null),
    };

    const adapter = React.useMemo<ListDndAdapter>(() => ({draggingId}), [draggingId]);

    return {adapter, contextProps};
}
