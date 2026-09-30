/**
 * Drag and drop with @hello-pangea/dnd inside a Sheet. The sheet has
 * `will-change: transform`, which makes it the containing block of every
 * `position: fixed` descendant, while the library places a dragged row with
 * `position: fixed` in the coordinates of the viewport. The kit takes the
 * offset of such an ancestor out, so nothing changes for the list: the same
 * wrapper as anywhere else, plain and virtualized, with the mouse, the keyboard
 * and touch (touch drags a plain list only: the virtual mode of the library
 * draws the dragged row by a clone, and touch events do not survive the
 * original being unmounted).
 *
 * In an application:
 * `import {Button, List, Sheet} from '@gravity-ui/uikit'`
 * `import {ListHelloPangeaDnd} from '@gravity-ui/uikit/hello-pangea-dnd'`
 * `import {ListVirtualizer} from '@gravity-ui/uikit/virtualizer'`
 */
import * as React from 'react';

import {faker} from '@faker-js/faker/locale/en';

import {Button} from '../../Button';
import {ListHelloPangeaDnd} from '../../HelloPangeaDnd';
import {Sheet} from '../../Sheet';
import {ListVirtualizer} from '../../Virtualizer/ListVirtualizer';
import {List} from '../List';

interface TrackRecord {
    id: string;
    title: string;
}

const createTracks = (count: number): TrackRecord[] =>
    Array.from({length: count}, (_, index) => ({
        id: `track-${index + 1}`,
        title: `${index + 1} · ${faker.music.songName()}`,
    }));

const tracks = createTracks(6);
const archive = createTracks(500);

const getTrackContent = (record: TrackRecord) => record.title;

export function DragAndDropHelloPangeaSheetExample() {
    const [open, setOpen] = React.useState(false);
    const [items, setItems] = React.useState(tracks);
    return (
        <React.Fragment>
            <Button onClick={() => setOpen(true)}>Open the sheet</Button>
            <Sheet visible={open} onClose={() => setOpen(false)} title="Playlist">
                <ListHelloPangeaDnd items={items} onItemsChange={setItems}>
                    <List
                        role="grid"
                        aria-label="Playlist"
                        items={items}
                        getItemContent={getTrackContent}
                    />
                </ListHelloPangeaDnd>
            </Sheet>
        </React.Fragment>
    );
}

export function DragAndDropHelloPangeaSheetVirtualizedExample() {
    const [open, setOpen] = React.useState(false);
    const [items, setItems] = React.useState(archive);
    return (
        <React.Fragment>
            <Button onClick={() => setOpen(true)}>Open the sheet</Button>
            <Sheet visible={open} onClose={() => setOpen(false)} title="Archive">
                <ListVirtualizer<TrackRecord> estimateItemSize={28}>
                    <ListHelloPangeaDnd items={items} onItemsChange={setItems}>
                        <List
                            role="grid"
                            aria-label="Archive"
                            style={{height: 320}}
                            items={items}
                            getItemContent={getTrackContent}
                        />
                    </ListHelloPangeaDnd>
                </ListVirtualizer>
            </Sheet>
        </React.Fragment>
    );
}
