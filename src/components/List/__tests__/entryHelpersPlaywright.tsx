import {ListVirtualizer} from '../../Virtualizer/ListVirtualizer';
import {List} from '../List';

interface Row {
    id: string;
}

const ROWS: Row[] = Array.from({length: 100}, (_, index) => ({id: `Item ${index + 1}`}));

export interface EntryTestListProps {
    selectionMode: 'single' | 'multiple';
    selectedIds?: string[];
    disabledIds?: string[];
    virtualized?: boolean;
}

/** A list between two buttons, with nothing active: the focus comes in by Tab or Shift+Tab */
export function EntryTestList({
    selectionMode,
    selectedIds = [],
    disabledIds = [],
    virtualized = false,
}: EntryTestListProps) {
    const list = (
        <List<Row>
            aria-label="Items"
            items={ROWS}
            getItemContent={(row) => row.id}
            getItemDisabled={(row) => disabledIds.includes(row.id)}
            selectionMode={selectionMode}
            defaultSelectedIds={selectedIds}
            style={{maxHeight: 280, overflowY: 'auto'}}
        />
    );

    return (
        <div style={{width: 260}}>
            <button type="button">Before</button>
            {virtualized ? <ListVirtualizer>{list}</ListVirtualizer> : list}
            <button type="button">After</button>
        </div>
    );
}
