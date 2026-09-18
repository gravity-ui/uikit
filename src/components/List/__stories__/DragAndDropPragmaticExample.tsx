/**
 * Drag and drop with @atlaskit/pragmatic-drag-and-drop — an example of
 * plugging another library into the adapter contract (the recommended library
 * is @hello-pangea/dnd, see the DragAndDrop stories). This is the "full" form
 * of an adapter: both the props (ref registration of the rows) and the state
 * arrive through the single `dnd` prop. A drag starts from the Grip handle
 * only (the `dragHandle` of the library; the ref of the handle is provided by
 * the `getHandleRef` method of the adapter); the insertion point is shown by
 * the indicator the list draws itself from ctx.state.dropTarget.
 *
 * In an application the list is imported from the package:
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

export function DragAndDropPragmaticExample() {
    const [items, setItems] = React.useState(tracks);
    // The consumer's own wrapper around their dnd library
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
                // The style of the dragged row comes from the data-dragging of
                // getItemProps; the insertion indicator is drawn by the list
                // itself from ctx.state.dropTarget
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
