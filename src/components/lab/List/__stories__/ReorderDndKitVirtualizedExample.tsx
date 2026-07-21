/**
 * Реордер с dnd-kit поверх виртуализации — штатный для dnd-kit рецепт
 * virtual-списков: DragOverlay.
 *
 * - Перетаскиваемое рисует ОВЕРЛЕЙ (летит за курсором), а оригинал на время
 *   drag прячется (opacity 0, слот сохраняется): сдвиговая стратегия — это
 *   превью результата, соседи закрывают исходный слот, и видимый оригинал
 *   перекрывался бы ими. Выгрузка спрятанного оригинала из окна при скролле
 *   безвредна (аналог renderClone у hello-pangea);
 * - соседи в окне сдвигаются трансформами sortable (сдвиговая модель, как
 *   в плоском примере) — dropTarget адаптер не заполняет;
 * - DragOverlay рендерится по месту объявления (портала в body нет) —
 *   держим его внутри темизированного дерева, CSS-переменные доступны;
 * - drag — только за Grip-ручку (listeners + setActivatorNodeRef на ней).
 *
 * В приложении импорты листа — из пакета:
 * `import {unstable_List as List, unstable_moveItem as moveItem} from '@gravity-ui/uikit/unstable'`
 */
import * as React from 'react';

import {DndContext, DragOverlay} from '@dnd-kit/core';
import {SortableContext, useSortable, verticalListSortingStrategy} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {faker} from '@faker-js/faker/locale/en';
import {Grip} from '@gravity-ui/icons';

import {Icon} from '../../../Icon';
import {ListVirtualizer} from '../../Virtualizer/ListVirtualizer';
import {List} from '../List';
import {moveItem} from '../moveItem';
import type {ListItemContext, ListItemHelpers} from '../types';

import {useDndKitListDnd} from './useDndKitListDnd';

interface TrackRecord {
    id: string;
    title: string;
}

const sortableQueue: TrackRecord[] = Array.from({length: 2000}, (_, index) => ({
    id: `sq-${index + 1}`,
    title: `${String(index + 1).padStart(4, '0')} · ${faker.music.songName()}`,
}));

const getTrackContent = (record: TrackRecord) => record.title;

function SortableVirtualRow({
    ctx,
    helpers,
}: {
    ctx: ListItemContext<TrackRecord>;
    helpers: ListItemHelpers;
}) {
    const {setNodeRef, setActivatorNodeRef, listeners, transform, transition, isDragging} =
        useSortable({id: ctx.id});
    return (
        <List.ItemView
            {...helpers.getItemProps({
                ref: setNodeRef,
                // За курсором летит DragOverlay, а оригинал на время drag
                // ПРЯЧЕТСЯ (opacity 0, слот сохраняется): сдвиговая стратегия —
                // это превью результата, соседи закрывают исходный слот,
                // и видимый оригинал перекрывался бы ими. Курсорный transform
                // к оригиналу не применяется; выгрузка его из окна безвредна
                style: isDragging
                    ? {opacity: 0}
                    : {transform: CSS.Transform.toString(transform), transition},
            })}
            {...helpers.getItemViewProps()}
            startContent={
                <span
                    ref={setActivatorNodeRef}
                    {...(listeners as React.DOMAttributes<HTMLElement>)}
                    style={{display: 'flex', cursor: 'grab'}}
                >
                    <Icon data={Grip} size={12} />
                </span>
            }
        >
            {ctx.item.title}
        </List.ItemView>
    );
}

export function ReorderDndKitVirtualizedExample() {
    const [items, setItems] = React.useState(sortableQueue);
    const ids = items.map((record) => record.id);
    const {adapter, contextProps} = useDndKitListDnd({
        ids,
        onDrop: (fromId, toId, position) => setItems(moveItem(items, fromId, toId, position)),
    });
    const draggingItem = adapter.draggingId
        ? items.find((record) => record.id === adapter.draggingId)
        : undefined;
    return (
        <DndContext {...contextProps}>
            <SortableContext items={ids} strategy={verticalListSortingStrategy}>
                <ListVirtualizer estimateItemSize={28}>
                    {/* корень List — скролл-контейнер: потребитель ОБЯЗАН ограничить высоту */}
                    <List
                        aria-label="Big sortable queue"
                        style={{height: 480, width: 400}}
                        items={items}
                        dnd={adapter}
                        getItemContent={getTrackContent}
                        renderItem={(ctx, helpers) => (
                            <SortableVirtualRow ctx={ctx} helpers={helpers} />
                        )}
                    />
                </ListVirtualizer>
            </SortableContext>
            {/* Оверлей — визуальная копия строки вне листа (ghost, как клон
                у hello-pangea); getItemProps здесь нет и не нужен */}
            <DragOverlay>
                {draggingItem ? (
                    <List.ItemView
                        size="m"
                        active
                        style={{opacity: 0.5}}
                        startContent={
                            <span style={{display: 'flex', cursor: 'grabbing'}}>
                                <Icon data={Grip} size={12} />
                            </span>
                        }
                    >
                        {draggingItem.title}
                    </List.ItemView>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}
