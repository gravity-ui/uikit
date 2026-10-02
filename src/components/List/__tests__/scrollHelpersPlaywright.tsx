import * as React from 'react';

import {ListVirtualizer} from '../../Virtualizer/ListVirtualizer';
import type {VirtualizerApi} from '../../Virtualizer/Virtualizer';
import {List} from '../List';

interface Row {
    id: string;
    label: string;
    children?: Row[];
}

/**
 * What a test drives the list with from the page: a button to press would take the pointer away
 * from where the test has put it
 */
export interface ScrollTestControls {
    activate(id: string | null): void;
    insertAbove(count: number): void;
    append(count: number): void;
    scrollToIndex(index: number): void;
}

export interface ScrollTestListProps {
    /** The list is wrapped in `ListVirtualizer` */
    virtualized?: boolean;
    /** The rows come in sections of ten */
    sections?: boolean;
    /**
     * The root limits its height and scrolls. Without it the list lies on the page at its full
     * height, and the page is all there is to scroll
     */
    scrolling?: boolean;
    /** The padding of the root */
    padding?: number;
    /** The active item the list mounts with */
    activeItemId?: string | null;
    activateOnHover?: boolean;
    /** How far down the page the list starts: far enough, and it hangs off the viewport edge */
    top?: number;
    /** Every fourth row is long enough to wrap, so the rows are of different height */
    wrap?: boolean;
}

const COUNT = 200;
const ROOT_HEIGHT = 280;

const WRAPPED =
    ' — a title long enough to take more than one line of a list this narrow, whatever it is';

function makeRows(wrap: boolean): Row[] {
    return Array.from({length: COUNT}, (_, index) => ({
        id: `Item ${index + 1}`,
        label: `Item ${index + 1}${wrap && index % 4 === 0 ? WRAPPED : ''}`,
    }));
}

function makeSections(rows: Row[]): Row[] {
    const groups: Row[] = [];
    for (let start = 0; start < rows.length; start += 10) {
        groups.push({
            id: `Section ${start / 10 + 1}`,
            label: `Section ${start / 10 + 1}`,
            children: rows.slice(start, start + 10),
        });
    }
    return groups;
}

const getItemContent = (row: Row) => row.label;
// The name of a row is its id whatever the label is, so that a test finds a wrapped row as well
const getItemTextValue = (row: Row) => row.id;

/**
 * A list for the tests of the scroll. The list is controlled: its state lives here and is driven
 * from the page through `window.scrollTestControls`. The root is not positioned on purpose — its
 * rows are offset from the wrapper around it
 */
export function ScrollTestList({
    virtualized = false,
    sections = false,
    scrolling = true,
    padding = 0,
    activeItemId = null,
    activateOnHover,
    top = 0,
    wrap = false,
}: ScrollTestListProps) {
    const [rows, setRows] = React.useState(() => makeRows(wrap));
    const [active, setActive] = React.useState<string | null>(activeItemId);
    const apiRef = React.useRef<VirtualizerApi>(null);

    React.useEffect(() => {
        const controls: ScrollTestControls = {
            activate: setActive,
            insertAbove: (count) =>
                setRows((current) => [
                    ...Array.from({length: count}, (_, index) => ({
                        id: `Earlier ${current.length + index}`,
                        label: `Earlier ${current.length + index}`,
                    })),
                    ...current,
                ]),
            append: (count) =>
                setRows((current) => [
                    ...current,
                    ...Array.from({length: count}, (_, index) => ({
                        id: `Later ${current.length + index}`,
                        label: `Later ${current.length + index}`,
                    })),
                ]),
            scrollToIndex: (index) => apiRef.current?.scrollToIndex(index),
        };
        (window as unknown as {scrollTestControls?: ScrollTestControls}).scrollTestControls =
            controls;
        return () => {
            delete (window as unknown as {scrollTestControls?: ScrollTestControls})
                .scrollTestControls;
        };
    }, []);

    const items = React.useMemo(() => (sections ? makeSections(rows) : rows), [rows, sections]);

    const list = (
        <List<Row>
            aria-label="Items"
            items={items}
            getItemContent={getItemContent}
            getItemTextValue={getItemTextValue}
            activeItemId={active}
            onActiveItemUpdate={setActive}
            activateOnHover={activateOnHover}
            style={{
                boxSizing: 'border-box',
                padding,
                ...(scrolling ? {maxHeight: ROOT_HEIGHT, overflowY: 'auto'} : undefined),
            }}
        />
    );

    return (
        // Tall enough for the page to scroll, so that a test can tell whether the page has moved
        <div style={{position: 'relative', width: 260, paddingTop: top, paddingBottom: 3000}}>
            {virtualized ? <ListVirtualizer apiRef={apiRef}>{list}</ListVirtualizer> : list}
        </div>
    );
}
