/**
 * Реордер с @hello-pangea/dnd поверх виртуализации — модель virtual-режима
 * старого List:
 *
 * - `mode="virtual"`: placeholder не нужен (хак последней строки из плоского
 *   примера уходит), но обязателен `renderClone` — во время drag оригинальный
 *   Draggable рендерит null, строку рисует клон вне дерева листа (переживает
 *   выгрузку оригинала из окна);
 * - `getContainerForClone`: дефолтный document.body лежит вне .g-root —
 *   CSS-переменные темы в клоне не резолвятся (маргины/паддинги/цвета
 *   схлопнутся). Корень листа тоже не годится: contain виртуализатора
 *   делает его containing block'ом для position: fixed;
 * - ghost клона (opacity) — вручную: `[data-dragging]`-стиль листа до
 *   портала не дотягивается, а перетаскиваемое должно выглядеть одинаково
 *   во всех примерах;
 * - строки переменной высоты работают через measure (движок игнорирует
 *   транзиентно опустевшую обёртку оригинала), но замеры не должны МЕНЯТЬСЯ
 *   во время drag — rbd снапшотит геометрию на lift.
 *
 * В приложении импорты листа — из пакета:
 * `import {unstable_List as List, unstable_moveItem as moveItem} from '@gravity-ui/uikit/unstable'`
 */
import * as React from 'react';

import {faker} from '@faker-js/faker/locale/en';
import {Grip} from '@gravity-ui/icons';
import {DragDropContext, Draggable, Droppable} from '@hello-pangea/dnd';
import type {DraggableProvidedDragHandleProps} from '@hello-pangea/dnd';

import {Icon} from '../../../Icon';
import {ListVirtualizer} from '../../Virtualizer/ListVirtualizer';
import {List} from '../List';
import {moveItem} from '../moveItem';
import type {ListItemContext, ListItemHelpers} from '../types';

import {useHelloPangeaListDnd} from './useHelloPangeaListDnd';

interface TrackRecord {
    id: string;
    title: string;
}

const ROW_ESTIMATE = 28;

const vinylArchive: TrackRecord[] = Array.from({length: 1000}, (_, index) => ({
    id: `vinyl-${index + 1}`,
    // каждая четвёртая — длинное название с переносом: строки переменной высоты
    title: `${String(index + 1).padStart(4, '0')} · ${faker.music.songName()}${
        index % 4 === 0 ? ` (${faker.music.genre()} remaster — ${faker.company.catchPhrase()})` : ''
    }`,
}));

const getTrackContent = (record: TrackRecord) => record.title;

function PangeaGrip(props: Partial<DraggableProvidedDragHandleProps>) {
    // rbd делает ручку клавиатурно-перетаскиваемой кнопкой (role="button",
    // tabIndex=0) — ей нужно доступное имя, иначе axe aria-command-name
    return (
        <span {...props} aria-label="Drag to reorder" style={{display: 'flex', cursor: 'grab'}}>
            <Icon data={Grip} size={12} />
        </span>
    );
}

function PangeaVirtualRow({
    ctx,
    helpers,
}: {
    ctx: ListItemContext<TrackRecord>;
    helpers: ListItemHelpers;
}) {
    return (
        <Draggable draggableId={ctx.id} index={ctx.index} isDragDisabled={ctx.state.disabled}>
            {(dragProvided) => (
                <List.ItemView
                    {...dragProvided.draggableProps}
                    {...helpers.getItemProps({
                        ref: dragProvided.innerRef,
                        // per-frame стили сдвига обязана применять строка —
                        // через контракт композиции (shallow-merge style)
                        style: dragProvided.draggableProps.style as React.CSSProperties,
                    })}
                    {...helpers.getItemViewProps()}
                    // dragHandleProps — на отдельной ручке: на строке они
                    // затёрли бы role="option" и перехватили Space листа
                    startContent={<PangeaGrip {...(dragProvided.dragHandleProps ?? undefined)} />}
                >
                    {ctx.item.title}
                </List.ItemView>
            )}
        </Draggable>
    );
}

export function ReorderHelloPangeaVirtualizedExample() {
    const [items, setItems] = React.useState(vinylArchive);
    const ids = items.map((record) => record.id);
    const {draggingId, onDragStart, onDragEnd} = useHelloPangeaListDnd({
        ids,
        onDrop: (fromId, toId, position) => setItems(moveItem(items, fromId, toId, position)),
    });
    const cloneContainerRef = React.useRef<HTMLDivElement>(null);
    return (
        <div ref={cloneContainerRef}>
            <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                <Droppable
                    droppableId="vinyl-archive"
                    mode="virtual"
                    getContainerForClone={() => cloneContainerRef.current ?? document.body}
                    renderClone={(cloneProvided, _snapshot, rubric) => (
                        // Клон — чисто визуальная копия строки вне дерева листа:
                        // getItemProps здесь нет и не нужен (role/id/обработчики
                        // остаются на оригинале)
                        <List.ItemView
                            {...cloneProvided.draggableProps}
                            ref={cloneProvided.innerRef}
                            style={{...cloneProvided.draggableProps.style, opacity: 0.5}}
                            size="m"
                            active
                            startContent={
                                <PangeaGrip {...(cloneProvided.dragHandleProps ?? undefined)} />
                            }
                        >
                            {items[rubric.source.index]?.title}
                        </List.ItemView>
                    )}
                >
                    {(provided) => (
                        <ListVirtualizer<TrackRecord> estimateItemSize={ROW_ESTIMATE}>
                            {/* корень List — скролл-контейнер и одновременно
                                droppable-элемент rbd (innerRef через адаптер) */}
                            <List
                                aria-label="Vinyl archive"
                                style={{height: 480, width: 400}}
                                items={items}
                                dnd={{
                                    getContainerDndProps: () => ({
                                        ...provided.droppableProps,
                                        ref: provided.innerRef,
                                    }),
                                    draggingId,
                                }}
                                getItemContent={getTrackContent}
                                renderItem={(ctx, helpers) => (
                                    <PangeaVirtualRow ctx={ctx} helpers={helpers} />
                                )}
                            />
                        </ListVirtualizer>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}
