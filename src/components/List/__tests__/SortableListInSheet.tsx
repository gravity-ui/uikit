import * as React from 'react';

import {Button} from '../../Button';
import {Sheet} from '../../Sheet';
import {List} from '../List';

const items = ['one', 'two', 'three'];

export function SortableListInSheet({virtualized}: {virtualized: boolean}) {
    const [visible, setVisible] = React.useState(false);
    const [order, setOrder] = React.useState('');

    return (
        <React.Fragment>
            <Button onClick={() => setVisible(true)}>Open sheet</Button>
            <Sheet visible={visible} onClose={() => setVisible(false)} title="Sortable list">
                <List
                    items={items}
                    itemKey={(item) => item}
                    itemHeight={40}
                    itemsHeight={160}
                    filterable={false}
                    sortable
                    virtualized={virtualized}
                    dragPreviewStyle={{zIndex: 100001}}
                    onSortEnd={({oldIndex, newIndex}) => {
                        setOrder(`${oldIndex}:${newIndex}`);
                    }}
                />
                <output>{order}</output>
            </Sheet>
        </React.Fragment>
    );
}
