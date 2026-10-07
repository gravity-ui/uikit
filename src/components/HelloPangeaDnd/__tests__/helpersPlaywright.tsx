import * as React from 'react';

import {List} from '../../List';
import {Sheet} from '../../Sheet';
import {ListVirtualizer} from '../../Virtualizer/ListVirtualizer';
import {ListHelloPangeaDnd} from '../ListHelloPangeaDnd';

const ITEMS = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo'];

/** A reorderable list inside a Sheet (`will-change: transform`) that opens below a page */
export function SheetKit({virtual}: {virtual?: boolean}) {
    const [items, setItems] = React.useState(ITEMS);
    const kit = (
        <ListHelloPangeaDnd items={items} onItemsUpdate={setItems}>
            <List role="grid" aria-label="Probe" items={items} style={{height: 200}} />
        </ListHelloPangeaDnd>
    );
    return (
        <React.Fragment>
            <div style={{height: 300}}>Page</div>
            <Sheet open>
                {virtual ? <ListVirtualizer estimateItemSize={28}>{kit}</ListVirtualizer> : kit}
            </Sheet>
        </React.Fragment>
    );
}
