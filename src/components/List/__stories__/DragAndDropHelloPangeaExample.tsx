/**
 * Drag and drop with @hello-pangea/dnd — the recommended library — through the
 * kit of the @gravity-ui/uikit/hello-pangea-dnd entry point: the wrapper owns
 * the DragDropContext and the Droppable and hands the draggable rows to the
 * List inside. The List only needs `role="grid"`: the drag handle is a button,
 * and interactive content inside a row is valid in the grid role model only.
 *
 * The keyboard: `←`/`→` reach the handle, Space lifts the row, `↑`/`↓` move it,
 * Space drops it (Escape cancels).
 *
 * The wiring the kit does is in "Drag and drop integrations / Hello Pangea
 * under the hood".
 *
 * In an application:
 * `import {List} from '@gravity-ui/uikit'`
 * `import {ListHelloPangeaDnd} from '@gravity-ui/uikit/hello-pangea-dnd'`
 */
import * as React from 'react';

import {faker} from '@faker-js/faker/locale/en';

import {ListHelloPangeaDnd} from '../../HelloPangeaDnd';
import {List} from '../List';

interface TrackRecord {
    id: string;
    title: string;
}

const tracks: TrackRecord[] = Array.from({length: 8}, (_, index) => ({
    id: `track-${index + 1}`,
    title: `${index + 1} · ${faker.music.songName()}`,
}));

export function DragAndDropHelloPangeaExample() {
    const [items, setItems] = React.useState(tracks);
    return (
        <ListHelloPangeaDnd items={items} onItemsChange={setItems}>
            <List
                role="grid"
                aria-label="Vinyl"
                items={items}
                style={{width: 320}}
                getItemContent={(record) => record.title}
            />
        </ListHelloPangeaDnd>
    );
}
