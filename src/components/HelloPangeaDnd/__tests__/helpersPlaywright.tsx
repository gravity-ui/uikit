import * as React from 'react';

import {List} from '../../List';
import {Sheet} from '../../Sheet';
import {ListVirtualizer} from '../../Virtualizer/ListVirtualizer';
import {ListHelloPangeaDnd} from '../ListHelloPangeaDnd';

const ITEMS = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo'];

/** The page under the Sheet: the sheet opens lower than the top of the viewport */
function Page() {
    return <div style={{height: 300}}>Page</div>;
}

/** A reorderable list inside a Sheet: an ancestor with `will-change: transform` */
export function SheetKitFlat() {
    const [items, setItems] = React.useState(ITEMS);
    return (
        <React.Fragment>
            <Page />
            <Sheet visible onClose={() => {}}>
                <ListHelloPangeaDnd items={items} onItemsChange={setItems}>
                    <List role="grid" aria-label="Probe" items={items} />
                </ListHelloPangeaDnd>
            </Sheet>
        </React.Fragment>
    );
}

export function SheetKitVirtual() {
    const [items, setItems] = React.useState(ITEMS);
    return (
        <React.Fragment>
            <Page />
            <Sheet visible onClose={() => {}}>
                <ListVirtualizer estimateItemSize={28}>
                    <ListHelloPangeaDnd items={items} onItemsChange={setItems}>
                        <List role="grid" aria-label="Probe" items={items} style={{height: 200}} />
                    </ListHelloPangeaDnd>
                </ListVirtualizer>
            </Sheet>
        </React.Fragment>
    );
}
