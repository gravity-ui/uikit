/**
 * Реордер с @hello-pangea/dnd — целевой кейс миграции со старого List
 * (он собран на этой либе). Props-контрактом §8 либа невыразима (итог
 * спайка фазы 4) — интеграция композиционная, по образцу старого List:
 *
 * - state-половина адаптера (`draggingId`) едет через проп `dnd` — без неё
 *   ядро не даст ни data-dragging, ни приостановки hover-активации;
 * - `role="grid"`: ручка rbd — настоящая кнопка (role="button", tabIndex=0),
 *   а интерактивные потомки валидны только в grid-модели ролей (§15 плана).
 *   Строки становятся `role="row"`, ручка и контент лежат в своих
 *   `getCellProps()`-ячейках, и `←`/`→` водят фокус между ними — ручка
 *   достижима с клавиатуры, а не только валидна;
 * - `dragHandleProps` — на ОТДЕЛЬНОЙ ручке в startContent (как в старом
 *   List): на самой строке role="button"/tabIndex=0 затёрли бы role строки,
 *   а Space-lift клавиатурного сенсора rbd перехватывал бы Space листа.
 *   `tabIndex={-1}` поверх них — контракт grid (один tab-stop на список):
 *   ручка достижима ←/→, rbd это безразлично (она ищет ручку по своему
 *   data-атрибуту и фокусит программно);
 * - `provided.placeholder` обязан быть последним ребёнком droppable-элемента
 *   (корня листа) — канала в контракте нет, протаскивается через renderItem
 *   последней строки (работает только в плоском режиме);
 * - dropTarget не заполняется: модель либы — сдвиг строк, индикатор листа
 *   не нужен.
 *
 * В приложении импорты листа — из пакета:
 * `import {unstable_List as List, unstable_moveItem as moveItem} from '@gravity-ui/uikit/unstable'`
 */
import * as React from 'react';

import {faker} from '@faker-js/faker/locale/en';
import {Grip} from '@gravity-ui/icons';
import {DragDropContext, Draggable, Droppable} from '@hello-pangea/dnd';

import {Icon} from '../../../Icon';
import {List} from '../List';
import {moveItem} from '../moveItem';
import type {ListItemContext, ListItemHelpers} from '../types';

import {useHelloPangeaListDnd} from './useHelloPangeaListDnd';

interface TrackRecord {
    id: string;
    title: string;
}

const tracks: TrackRecord[] = Array.from({length: 8}, (_, index) => ({
    id: `track-${index + 1}`,
    title: `${index + 1} · ${faker.music.songName()}`,
}));

function PangeaRow({
    ctx,
    helpers,
    isLast,
    placeholder,
}: {
    ctx: ListItemContext<TrackRecord>;
    helpers: ListItemHelpers;
    isLast: boolean;
    placeholder: React.ReactNode;
}) {
    return (
        <React.Fragment>
            <Draggable draggableId={ctx.id} index={ctx.index} isDragDisabled={ctx.state.disabled}>
                {(dragProvided, dragSnapshot) => (
                    <List.ItemView
                        {...dragProvided.draggableProps}
                        {...helpers.getItemProps({
                            ref: dragProvided.innerRef,
                            // per-frame стили сдвига обязана применять строка —
                            // через контракт композиции (shallow-merge style).
                            // На время АКТИВНОГО drag гасим инлайновый
                            // `transition: opacity ...` rbd (он для combine,
                            // которого здесь нет): иначе ghost-стили листа
                            // ([data-dragging]: фон + opacity) применялись бы
                            // вразнобой — фон мгновенно, opacity через
                            // transition — и строка мигала тёмным на старте.
                            // Drop-анимацию не трогаем (штатный приём
                            // кастомизации rbd: патчить style по snapshot)
                            style: {
                                ...(dragProvided.draggableProps.style as React.CSSProperties),
                                ...(dragSnapshot.isDragging && !dragSnapshot.isDropAnimating
                                    ? {transition: 'none'}
                                    : undefined),
                            },
                        })}
                        {...helpers.getItemViewProps()}
                        startContent={
                            // Ячейка с интерактивом: кнопка-ручка валидна
                            // внутри gridcell (в role="option" — нет)
                            <span {...helpers.getCellProps()}>
                                {/* rbd делает ручку клавиатурно-перетаскиваемой
                                    кнопкой (role="button", tabIndex=0), поэтому
                                    ей нужно доступное имя — иначе axe
                                    aria-command-name */}
                                <span
                                    {...(dragProvided.dragHandleProps ?? undefined)}
                                    // Grid — ОДИН tab-stop: интерактив ячейки
                                    // достижим ←/→, а tabIndex=0 из
                                    // dragHandleProps сделал бы ручку каждой
                                    // строки отдельной остановкой Tab
                                    tabIndex={-1}
                                    aria-label="Drag to reorder"
                                    style={{display: 'flex', cursor: 'grab'}}
                                >
                                    <Icon data={Grip} size={12} />
                                </span>
                            </span>
                        }
                    >
                        <span {...helpers.getCellProps()}>{ctx.item.title}</span>
                    </List.ItemView>
                )}
            </Draggable>
            {/* placeholder обязан быть последним ребёнком droppable-элемента
                (корня листа) — протаскиваем через renderItem последней строки */}
            {isLast ? placeholder : null}
        </React.Fragment>
    );
}

export function ReorderHelloPangeaExample() {
    const [items, setItems] = React.useState(tracks);
    const ids = items.map((record) => record.id);
    const {draggingId, onDragStart, onDragEnd} = useHelloPangeaListDnd({
        ids,
        onDrop: (fromId, toId, position) => setItems(moveItem(items, fromId, toId, position)),
    });
    return (
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <Droppable droppableId="playlist">
                {(provided) => (
                    <List
                        role="grid"
                        aria-label="Vinyl"
                        items={items}
                        style={{width: 320}}
                        dnd={{
                            getContainerDndProps: () => ({
                                ...provided.droppableProps,
                                ref: provided.innerRef,
                            }),
                            draggingId,
                        }}
                        getItemContent={(record) => record.title}
                        renderItem={(ctx, helpers) => (
                            <PangeaRow
                                ctx={ctx}
                                helpers={helpers}
                                isLast={ctx.index === items.length - 1}
                                placeholder={provided.placeholder}
                            />
                        )}
                    />
                )}
            </Droppable>
        </DragDropContext>
    );
}
