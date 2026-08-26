/**
 * Drag and drop with @atlaskit/pragmatic-drag-and-drop on top of
 * virtualization — an example of plugging another library into the adapter
 * contract (the recommended library is @hello-pangea/dnd, see the DragAndDrop
 * stories). The integration is the same as in the flat example — a single
 * `dnd` prop and a drag from the Grip handle only; the window of rows is
 * transparent for the adapter (rows are registered as they mount).
 *
 * Stable identities of the getters and of renderItem (useCallback) are the
 * condition for memoizing the rows: dragover then re-renders the insertion
 * target only rather than the whole window.
 *
 * In an application the list is imported from the package:
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

export function DragAndDropPragmaticVirtualizedExample() {
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
            {/* The List root is the scroll container: the consumer MUST limit its height */}
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
