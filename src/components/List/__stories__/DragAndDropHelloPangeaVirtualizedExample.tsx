/**
 * Drag and drop with @hello-pangea/dnd on top of virtualization: the same kit
 * as in the DragAndDrop story, with `ListVirtualizer` OUTSIDE the wrapper — the
 * wrapper reads the virtualization of the list below it and switches the
 * Droppable to the virtual mode. There, while a row is dragged, the library
 * draws a clone of it outside the list: the kit renders the clone from the
 * last render of the Row, inside the themed tree.
 *
 * Rows of variable height work through measure, but the measurements must not
 * CHANGE while dragging — the library snapshots the geometry on lift.
 *
 * The wiring the kit does is in "Drag and drop integrations / Hello Pangea
 * under the hood virtualized".
 *
 * In an application:
 * `import {List} from '@gravity-ui/uikit'`
 * `import {ListHelloPangeaDnd} from '@gravity-ui/uikit/hello-pangea-dnd'`
 * `import {ListVirtualizer} from '@gravity-ui/uikit/virtualizer'`
 */
import * as React from 'react';

import {faker} from '@faker-js/faker/locale/en';

import {ListHelloPangeaDnd} from '../../HelloPangeaDnd';
import {ListVirtualizer} from '../../Virtualizer/ListVirtualizer';
import {List} from '../List';

interface TrackRecord {
    id: string;
    title: string;
}

const vinylArchive: TrackRecord[] = Array.from({length: 1000}, (_, index) => ({
    id: `vinyl-${index + 1}`,
    // Every fourth title is long enough to wrap: rows of variable height
    title: `${String(index + 1).padStart(4, '0')} · ${faker.music.songName()}${
        index % 4 === 0 ? ` (${faker.music.genre()} remaster — ${faker.company.catchPhrase()})` : ''
    }`,
}));

const getTrackContent = (record: TrackRecord) => record.title;

export function DragAndDropHelloPangeaVirtualizedExample() {
    const [items, setItems] = React.useState(vinylArchive);
    return (
        <ListVirtualizer<TrackRecord> estimateItemSize={28}>
            <ListHelloPangeaDnd items={items} onItemsChange={setItems}>
                <List
                    role="grid"
                    aria-label="Vinyl archive"
                    style={{height: 480, width: 400}}
                    items={items}
                    getItemContent={getTrackContent}
                />
            </ListHelloPangeaDnd>
        </ListVirtualizer>
    );
}
