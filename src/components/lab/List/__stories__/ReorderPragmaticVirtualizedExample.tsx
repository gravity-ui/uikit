/**
 * Реордер с @atlaskit/pragmatic-drag-and-drop поверх виртуализации.
 * Интеграция та же, что и в плоском примере, — один проп `dnd`, drag только
 * за Grip-ручку; окно строк прозрачно для адаптера (регистрация строк идёт
 * по факту их маунта).
 *
 * Стабильные identity геттеров и renderItem (useCallback) — условие
 * мемоизации строк (§8): dragover пере-рендеривает только цель вставки,
 * а не всё окно.
 *
 * В приложении импорты листа — из пакета:
 * `import {unstable_List as List, unstable_moveItem as moveItem} from '@gravity-ui/uikit/unstable'`
 */
import * as React from 'react';

import {faker} from '@faker-js/faker/locale/en';
import {Grip} from '@gravity-ui/icons';

import {Icon} from '../../../Icon';
import {ListVirtualizer} from '../../Virtualizer/ListVirtualizer';
import {List} from '../List';
import {moveItem} from '../moveItem';
import type {ListItemContext, ListItemHelpers} from '../types';

import {usePragmaticListDnd} from './usePragmaticListDnd';

interface TrackRecord {
    id: string;
    title: string;
}

const longQueue: TrackRecord[] = Array.from({length: 2000}, (_, index) => ({
    id: `q-${index + 1}`,
    title: `${String(index + 1).padStart(4, '0')} · ${faker.music.songName()}`,
}));

const getTrackContent = (record: TrackRecord) => record.title;

export function ReorderPragmaticVirtualizedExample() {
    const [items, setItems] = React.useState(longQueue);
    const dnd = usePragmaticListDnd({
        onDrop: (fromId, toId, position) => setItems(moveItem(items, fromId, toId, position)),
    });
    const {getHandleRef} = dnd;
    const renderRow = React.useCallback(
        (ctx: ListItemContext<TrackRecord>, {getItemProps, getItemViewProps}: ListItemHelpers) => (
            <List.ItemView
                {...getItemProps()}
                {...getItemViewProps()}
                startContent={
                    <span ref={getHandleRef(ctx.id)} style={{display: 'flex', cursor: 'grab'}}>
                        <Icon data={Grip} size={12} />
                    </span>
                }
            >
                {ctx.item.title}
            </List.ItemView>
        ),
        [getHandleRef],
    );
    return (
        <ListVirtualizer estimateItemSize={28}>
            {/* корень List — скролл-контейнер: потребитель ОБЯЗАН ограничить высоту */}
            <List
                aria-label="Big queue"
                style={{height: 480, width: 400}}
                items={items}
                dnd={dnd}
                getItemContent={getTrackContent}
                renderItem={renderRow}
            />
        </ListVirtualizer>
    );
}
