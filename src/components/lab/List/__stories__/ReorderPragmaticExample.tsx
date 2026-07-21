/**
 * К8: реордер с @atlaskit/pragmatic-drag-and-drop — «полная» форма адаптера
 * §8: и props (ref-регистрация строк), и состояние приходят одним пропом
 * `dnd`. Drag — только за Grip-ручку (`dragHandle` либы, ref ручки отдаёт
 * метод адаптера `getHandleRef`); место вставки показывает индикатор,
 * который лист рисует сам по ctx.state.dropTarget.
 *
 * В приложении импорты листа — из пакета:
 * `import {unstable_List as List, unstable_moveItem as moveItem} from '@gravity-ui/uikit/unstable'`
 */
import * as React from 'react';

import {faker} from '@faker-js/faker/locale/en';
import {Grip} from '@gravity-ui/icons';

import {Icon} from '../../../Icon';
import {List} from '../List';
import {moveItem} from '../moveItem';

import {usePragmaticListDnd} from './usePragmaticListDnd';

interface TrackRecord {
    id: string;
    title: string;
}

const tracks: TrackRecord[] = Array.from({length: 8}, (_, index) => ({
    id: `track-${index + 1}`,
    title: `${index + 1} · ${faker.music.songName()}`,
}));

export function ReorderPragmaticExample() {
    const [items, setItems] = React.useState(tracks);
    // useMyDndAdapter из К8 — обёртка потребителя над его dnd-либой
    const dnd = usePragmaticListDnd({
        onDrop: (fromId, toId, position) => setItems(moveItem(items, fromId, toId, position)),
    });
    return (
        <List
            aria-label="Playlist"
            items={items}
            dnd={dnd}
            style={{width: 320}}
            getItemContent={(record) => record.title}
            renderItem={(ctx, {getItemProps, getItemViewProps}) => (
                // стиль перетаскиваемой строки — data-dragging из getItemProps;
                // индикатор вставки лист рисует сам по ctx.state.dropTarget
                <List.ItemView
                    {...getItemProps()}
                    {...getItemViewProps()}
                    startContent={
                        <span
                            ref={dnd.getHandleRef(ctx.id)}
                            style={{display: 'flex', cursor: 'grab'}}
                        >
                            <Icon data={Grip} size={12} />
                        </span>
                    }
                >
                    {ctx.item.title}
                </List.ItemView>
            )}
        />
    );
}
