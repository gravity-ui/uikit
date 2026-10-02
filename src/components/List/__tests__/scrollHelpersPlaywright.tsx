import * as React from 'react';

import {ListVirtualizer} from '../../Virtualizer/ListVirtualizer';
import {List} from '../List';

interface Row {
    id: string;
    label: string;
    children?: Row[];
}

/** A test drives the list from the page: a button to press would take the pointer away */
export interface ScrollTestControls {
    activate(id: string): void;
    insertAbove(): void;
}

declare global {
    interface Window {
        scrollTestControls: ScrollTestControls;
    }
}

export interface ScrollTestListProps {
    virtualized?: boolean;
    /** The rows come in sections of ten */
    sections?: boolean;
    /** The root limits its height and scrolls; without it the list lies on the page at full height */
    scrolling?: boolean;
    padding?: number;
    activeItemId?: string;
    activateOnHover?: boolean;
    /** How far down the page the list starts: far enough, and it hangs off the viewport edge */
    top?: number;
    /** Every fourth row wraps, so the rows are of different height */
    wrap?: boolean;
}

const WRAPPED = ' — a title long enough to take more than one line of a list this narrow';

function makeRows(prefix: string, count: number, wrap: boolean): Row[] {
    return Array.from({length: count}, (_, index) => ({
        id: `${prefix} ${index + 1}`,
        label: `${prefix} ${index + 1}${wrap && index % 4 === 0 ? WRAPPED : ''}`,
    }));
}

function makeSections(rows: Row[]): Row[] {
    const groups: Row[] = [];
    for (let start = 0; start < rows.length; start += 10) {
        const id = `Section ${start / 10 + 1}`;
        groups.push({id, label: id, children: rows.slice(start, start + 10)});
    }
    return groups;
}

const getItemContent = (row: Row) => row.label;

/**
 * A list for the tests of the scroll: 200 rows, the state lives here. The root is not positioned on
 * purpose — its rows are offset from the wrapper around it
 */
export function ScrollTestList({
    virtualized = false,
    sections = false,
    scrolling = true,
    padding = 0,
    activeItemId,
    activateOnHover,
    top = 0,
    wrap = false,
}: ScrollTestListProps) {
    const [rows, setRows] = React.useState(() => makeRows('Item', 200, wrap));
    const [active, setActive] = React.useState<string | null>(activeItemId ?? null);

    React.useEffect(() => {
        window.scrollTestControls = {
            activate: setActive,
            insertAbove: () =>
                setRows((current) => [...makeRows('Earlier', 30, false), ...current]),
        };
    }, []);

    const items = React.useMemo(() => (sections ? makeSections(rows) : rows), [rows, sections]);

    const list = (
        <List<Row>
            aria-label="Items"
            items={items}
            getItemContent={getItemContent}
            activeItemId={active}
            onActiveItemUpdate={setActive}
            activateOnHover={activateOnHover}
            style={{
                boxSizing: 'border-box',
                padding,
                ...(scrolling ? {maxHeight: 280, overflowY: 'auto'} : undefined),
            }}
        />
    );

    return (
        // Tall enough for the page to scroll, so that a test can tell whether the page has moved
        <div style={{position: 'relative', width: 260, paddingTop: top, paddingBottom: 3000}}>
            {virtualized ? <ListVirtualizer>{list}</ListVirtualizer> : list}
        </div>
    );
}
