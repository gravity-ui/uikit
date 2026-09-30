/**
 * Drag and drop with @hello-pangea/dnd through the kit: ListHelloPangeaDnd
 * around the List, `role="grid"` on it.
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
