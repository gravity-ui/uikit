/**
 * Реордер с dnd-kit — «state-only» форма адаптера §8: адаптер несёт только
 * draggingId, а props-половину закрывает сам потребитель per-item хуком
 * `useSortable` в СВОЁМ компоненте строки через renderItem (хук нельзя
 * вызвать из метода адаптера — rules of hooks).
 *
 * Визуально пример живёт в СДВИГОВОЙ модели (родной для sortable):
 * трансформы dnd-kit применяются ко всем строкам — соседи плавно
 * раздвигаются, показывая место вставки гэпом, а `dropTarget` адаптер
 * не заполняет (индикатор вставки листа не рисуется — иначе двойная
 * индикация). Индикаторную модель показывает референс pragmatic.
 *
 * В приложении импорты листа — из пакета:
 * `import {unstable_List as List, unstable_moveItem as moveItem} from '@gravity-ui/uikit/unstable'`
 */
import * as React from 'react';

import {DndContext} from '@dnd-kit/core';
import {SortableContext, useSortable, verticalListSortingStrategy} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {faker} from '@faker-js/faker/locale/en';
import {Grip} from '@gravity-ui/icons';

import {Icon} from '../../../Icon';
import {List} from '../List';
import {moveItem} from '../moveItem';
import type {ListItemContext, ListItemHelpers} from '../types';

import {useDndKitListDnd} from './useDndKitListDnd';

interface TrackRecord {
    id: string;
    title: string;
}

const tracks: TrackRecord[] = Array.from({length: 8}, (_, index) => ({
    id: `track-${index + 1}`,
    title: `${index + 1} · ${faker.music.songName()}`,
}));

function SortableRow({
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
                // Сдвиговая модель: трансформы применяются ко ВСЕМ строкам —
                // перетаскиваемая следует за курсором, соседи плавно (transition)
                // раздвигаются, показывая место вставки гэпом
                style: {
                    transform: CSS.Transform.toString(transform),
                    transition,
                    ...(isDragging ? {position: 'relative' as const, zIndex: 2} : undefined),
                },
            })}
            {...helpers.getItemViewProps()}
            startContent={
                // Drag только за ручку: listeners + activator ref живут на ней,
                // а не на строке (паттерн ручки — как в примере hello-pangea).
                // attributes из useSortable (role="button", tabIndex=0) не
                // спредятся и сюда: они нужны только клавиатурному dnd,
                // который вне слоя (§13 плана)
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

export function ReorderDndKitExample() {
    const [items, setItems] = React.useState(tracks);
    const ids = items.map((record) => record.id);
    const {adapter, contextProps} = useDndKitListDnd({
        ids,
        onDrop: (fromId, toId, position) => setItems(moveItem(items, fromId, toId, position)),
    });
    return (
        <DndContext {...contextProps}>
            <SortableContext items={ids} strategy={verticalListSortingStrategy}>
                <List
                    aria-label="Queue"
                    items={items}
                    dnd={adapter}
                    style={{width: 320}}
                    getItemContent={(record) => record.title}
                    renderItem={(ctx, helpers) => <SortableRow ctx={ctx} helpers={helpers} />}
                />
            </SortableContext>
        </DndContext>
    );
}
