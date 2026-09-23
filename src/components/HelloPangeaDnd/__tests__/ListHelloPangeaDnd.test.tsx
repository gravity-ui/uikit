import * as React from 'react';

// eslint-disable-next-line no-restricted-imports
import {DragDropContext} from '@hello-pangea/dnd';

import {act, fireEvent, render, screen, within} from '../../../../test-utils/utils';
import {List} from '../../List';
import {mockLayout} from '../../List/__tests__/helpers';
import type {ListItemContext, ListItemHelpers} from '../../List/types';
import {ListVirtualizer} from '../../Virtualizer/ListVirtualizer';
import {ListHelloPangeaDnd} from '../ListHelloPangeaDnd';
import {useListHelloPangeaDnd} from '../useListHelloPangeaDnd';

interface Track {
    id: string;
    title: string;
}

const TRACKS: Track[] = [
    {id: 'a', title: 'Alpha'},
    {id: 'b', title: 'Bravo'},
    {id: 'c', title: 'Charlie'},
];

const getTitle = (track: Track) => track.title;

// Keeps the console readable: the ref cleanups of mergeRefs are a React 19 feature, React 18 of
// the tests warns about every forked ref
let consoleErrorSpy: jest.SpyInstance;
beforeEach(() => {
    const original = console.error;
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation((...args) => {
        if (!String(args[0]).includes('callback ref should not return')) {
            original(...args);
        }
    });
});
afterEach(() => consoleErrorSpy.mockRestore());

const rowTitles = () =>
    screen.getAllByRole('row').map((row) => within(row).getAllByRole('gridcell')[1].textContent);

const getHandle = (title: string) =>
    within(screen.getByRole('row', {name: new RegExp(title)})).getByRole('button', {
        name: 'Drag to reorder',
    });

/** Lets the library commit a keyboard step */
const flush = () => act(() => Promise.resolve());

/** The keyboard sensor of the library: lift, move, drop */
async function dragWithKeyboard(handle: HTMLElement, key: 'ArrowDown' | 'ArrowUp', times = 1) {
    act(() => handle.focus());
    fireEvent.keyDown(handle, {key: ' ', code: 'Space', keyCode: 32});
    await flush();
    for (let i = 0; i < times; i++) {
        fireEvent.keyDown(handle, {key, code: key, keyCode: key === 'ArrowDown' ? 40 : 38});
        await flush();
    }
    fireEvent.keyDown(handle, {key: ' ', code: 'Space', keyCode: 32});
    // The drop animation of the keyboard sensor is skipped, the drop lands in a timeout
    await act(() => new Promise((resolve) => setTimeout(resolve, 0)));
}

function Playlist({
    onItemsChange,
    isDragDisabled,
}: {
    onItemsChange?: (items: Track[]) => void;
    isDragDisabled?: (track: Track) => boolean;
}) {
    const [items, setItems] = React.useState(TRACKS);
    return (
        <ListHelloPangeaDnd
            items={items}
            isDragDisabled={isDragDisabled}
            onItemsChange={(next) => {
                setItems(next);
                onItemsChange?.(next);
            }}
        >
            <List role="grid" aria-label="Playlist" items={items} getItemContent={getTitle} />
        </ListHelloPangeaDnd>
    );
}

describe('ListHelloPangeaDnd', () => {
    describe('everything by default: the wrapper and role="grid"', () => {
        test('wires the droppable, the draggable rows and their handles', () => {
            render(<Playlist />);

            expect(screen.getByRole('grid')).toHaveAttribute('data-rfd-droppable-id');
            const rows = screen.getAllByRole('row');
            expect(rows.map((row) => row.getAttribute('data-rfd-draggable-id'))).toEqual([
                'a',
                'b',
                'c',
            ]);
            for (const row of rows) {
                const handle = within(row).getByRole('button', {name: 'Drag to reorder'});
                expect(handle).toHaveAttribute('tabindex', '-1');
                expect(handle).toHaveAttribute(
                    'data-rfd-drag-handle-draggable-id',
                    row.getAttribute('data-rfd-draggable-id'),
                );
                expect(handle.parentElement).toHaveAttribute('role', 'gridcell');
            }
        });

        test('the handle sits in the outermost slot of the view', () => {
            render(<Playlist />);
            const slot = getHandle('Alpha').closest('.g-list-item-view__slot');
            expect(slot).toHaveClass('g-list-item-view__slot_name_drag-handle');
        });

        test('a keyboard drag reorders the items', async () => {
            const onItemsChange = jest.fn();
            render(<Playlist onItemsChange={onItemsChange} />);

            await dragWithKeyboard(getHandle('Alpha'), 'ArrowDown', 2);

            expect(onItemsChange).toHaveBeenCalledTimes(1);
            expect(onItemsChange.mock.calls[0][0].map((track: Track) => track.id)).toEqual([
                'b',
                'c',
                'a',
            ]);
            expect(rowTitles()).toEqual(['Bravo', 'Charlie', 'Alpha']);
        });

        test('while dragging the core marks the row and the list', async () => {
            render(<Playlist />);
            const handle = getHandle('Bravo');
            act(() => handle.focus());
            fireEvent.keyDown(handle, {key: ' ', code: 'Space', keyCode: 32});
            await flush();

            expect(screen.getByRole('row', {name: /Bravo/})).toHaveAttribute('data-dragging');
            expect(screen.getByRole('grid')).toHaveAttribute('data-drag-active');

            fireEvent.keyDown(handle, {key: 'Escape', code: 'Escape', keyCode: 27});
            await act(() => new Promise((resolve) => setTimeout(resolve, 0)));
            expect(screen.getByRole('grid')).not.toHaveAttribute('data-drag-active');
        });

        test('disabled rows and isDragDisabled take the handle out of the library', () => {
            render(<Playlist isDragDisabled={(track) => track.id === 'c'} />);
            expect(getHandle('Alpha')).toHaveAttribute('data-rfd-drag-handle-draggable-id');
            // A decorative grip: no role, no name, hidden from the tree
            const charlie = screen.getByRole('row', {name: /Charlie/});
            expect(within(charlie).queryByRole('button')).not.toBeInTheDocument();

            const grip = within(charlie).getAllByRole('gridcell')[0].firstElementChild;
            expect(grip).toHaveAttribute('aria-hidden', 'true');
            expect(grip).not.toHaveAttribute('aria-label');
        });

        test('onDrop receives the drop as ids and an edge', async () => {
            const onDrop = jest.fn();
            render(
                <ListHelloPangeaDnd items={TRACKS} onDrop={onDrop}>
                    <List
                        role="grid"
                        aria-label="Playlist"
                        items={TRACKS}
                        getItemContent={getTitle}
                    />
                </ListHelloPangeaDnd>,
            );
            await dragWithKeyboard(getHandle('Charlie'), 'ArrowUp');
            expect(onDrop).toHaveBeenCalledWith('c', 'b', 'before');
        });
    });

    describe('Row in renderItem', () => {
        test('fills the slots of the view and places the handle at the end', () => {
            render(
                <ListHelloPangeaDnd items={TRACKS} onItemsChange={jest.fn()}>
                    <List
                        role="grid"
                        aria-label="Playlist"
                        items={TRACKS}
                        getItemContent={getTitle}
                        renderItem={(ctx, helpers) => (
                            <ListHelloPangeaDnd.Row
                                ctx={ctx}
                                helpers={helpers}
                                description={`#${ctx.id}`}
                                endContent={<span data-qa="end" />}
                                handleLabel="Move"
                                handlePlacement="end"
                                qa={`row-${ctx.id}`}
                            />
                        )}
                    />
                </ListHelloPangeaDnd>,
            );
            const row = screen.getByTestId('row-a');
            expect(row).toHaveAttribute('role', 'row');
            expect(row).toHaveAttribute('data-rfd-draggable-id', 'a');
            expect(within(row).getByText('#a')).toBeInTheDocument();

            const handle = within(row).getByRole('button', {name: 'Move'});
            const endSlot = handle.closest('.g-list-item-view__slot');
            expect(endSlot).toHaveClass('g-list-item-view__slot_name_end-content');
            expect(
                within(endSlot as HTMLElement)
                    .getByTestId('end')
                    .compareDocumentPosition(handle),
            ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
        });

        test('outside the wrapper it throws', () => {
            const renderRow = (ctx: ListItemContext<string>, helpers: ListItemHelpers) => (
                <ListHelloPangeaDnd.Row ctx={ctx} helpers={helpers} />
            );
            expect(() =>
                render(
                    <List role="grid" aria-label="Fruits" items={['a']} renderItem={renderRow} />,
                ),
            ).toThrow('Render the row inside ListHelloPangeaDnd');
        });
    });

    describe('dev warnings', () => {
        test('a listbox is told to be a grid', () => {
            render(
                <ListHelloPangeaDnd items={TRACKS} onItemsChange={jest.fn()}>
                    <List aria-label="Playlist" items={TRACKS} getItemContent={getTitle} />
                </ListHelloPangeaDnd>,
            );
            expect(consoleErrorSpy).toHaveBeenCalledWith(
                expect.stringContaining('Pass `role="grid"` to the List'),
            );
        });

        test('sections are out of the contract: the header renders, the options stay put', () => {
            const groups = [{id: 'g', title: 'Group', children: TRACKS}];
            render(
                <ListHelloPangeaDnd items={groups} onItemsChange={jest.fn()}>
                    <List
                        role="grid"
                        aria-label="Playlist"
                        items={groups}
                        getItemContent={getTitle}
                    />
                </ListHelloPangeaDnd>,
            );
            expect(consoleErrorSpy).toHaveBeenCalledWith(
                expect.stringContaining('Flat lists only'),
            );
            expect(screen.getAllByRole('row')).toHaveLength(TRACKS.length);
            expect(screen.queryByRole('button', {name: 'Drag to reorder'})).not.toBeInTheDocument();
        });

        test('neither onItemsChange nor onDrop', () => {
            render(
                <ListHelloPangeaDnd items={TRACKS}>
                    <List
                        role="grid"
                        aria-label="Playlist"
                        items={TRACKS}
                        getItemContent={getTitle}
                    />
                </ListHelloPangeaDnd>,
            );
            expect(consoleErrorSpy).toHaveBeenCalledWith(
                expect.stringContaining('Pass `onItemsChange` or `onDrop`'),
            );
        });
    });

    describe('under an external DragDropContext: the state prop', () => {
        function TwoLists({onChange}: {onChange: (list: string, ids: string[]) => void}) {
            const [first, setFirst] = React.useState(TRACKS);
            const [second, setSecond] = React.useState([
                {id: 'x', title: 'X-ray'},
                {id: 'y', title: 'Yankee'},
            ]);
            const firstState = useListHelloPangeaDnd({
                ids: first.map((track) => track.id),
                onDrop: () => {
                    const next = [...first].reverse();
                    setFirst(next);
                    onChange(
                        'first',
                        next.map((track) => track.id),
                    );
                },
            });
            const secondState = useListHelloPangeaDnd({
                ids: second.map((track) => track.id),
                onDrop: () => {
                    const next = [...second].reverse();
                    setSecond(next);
                    onChange(
                        'second',
                        next.map((track) => track.id),
                    );
                },
            });
            return (
                <DragDropContext
                    onDragStart={(start, provided) => {
                        firstState.onDragStart(start);
                        secondState.onDragStart(start);
                        return provided;
                    }}
                    onDragEnd={(result) => {
                        firstState.onDragEnd(result);
                        secondState.onDragEnd(result);
                    }}
                >
                    <ListHelloPangeaDnd items={first} state={firstState} droppableId="first">
                        <List
                            role="grid"
                            aria-label="First"
                            items={first}
                            getItemContent={getTitle}
                        />
                    </ListHelloPangeaDnd>
                    <ListHelloPangeaDnd items={second} state={secondState} droppableId="second">
                        <List
                            role="grid"
                            aria-label="Second"
                            items={second}
                            getItemContent={getTitle}
                        />
                    </ListHelloPangeaDnd>
                </DragDropContext>
            );
        }

        test('each list is a droppable of the shared context', async () => {
            const onChange = jest.fn();
            render(<TwoLists onChange={onChange} />);

            expect(screen.getByRole('grid', {name: 'First'})).toHaveAttribute(
                'data-rfd-droppable-id',
                'first',
            );
            expect(screen.getByRole('grid', {name: 'Second'})).toHaveAttribute(
                'data-rfd-droppable-id',
                'second',
            );

            await dragWithKeyboard(getHandle('Yankee'), 'ArrowUp');
            expect(onChange).toHaveBeenCalledTimes(1);
            expect(onChange).toHaveBeenCalledWith('second', ['y', 'x']);
        });
    });

    describe('the virtual mode', () => {
        mockLayout({viewport: 120, row: 24});

        test('under ListVirtualizer: the clone container is in place, no placeholder', () => {
            const {container} = render(
                <ListVirtualizer estimateItemSize={24}>
                    <ListHelloPangeaDnd items={TRACKS} onItemsChange={jest.fn()}>
                        <List
                            role="grid"
                            aria-label="Playlist"
                            items={TRACKS}
                            getItemContent={getTitle}
                        />
                    </ListHelloPangeaDnd>
                </ListVirtualizer>,
            );
            expect(screen.getAllByRole('row')).toHaveLength(TRACKS.length);
            // eslint-disable-next-line testing-library/no-container
            expect(container.querySelector('.g-hello-pangea-dnd__clone-container')).not.toBeNull();
        });

        test('a keyboard drag draws the clone from the Row and reorders the items', async () => {
            const onItemsChange = jest.fn();
            const {container} = render(
                <ListVirtualizer estimateItemSize={24}>
                    <ListHelloPangeaDnd items={TRACKS} onItemsChange={onItemsChange}>
                        <List
                            role="grid"
                            aria-label="Playlist"
                            items={TRACKS}
                            getItemContent={getTitle}
                        />
                    </ListHelloPangeaDnd>
                </ListVirtualizer>,
            );
            const handle = getHandle('Alpha');
            act(() => handle.focus());
            fireEvent.keyDown(handle, {key: ' ', code: 'Space', keyCode: 32});
            await flush();

            // eslint-disable-next-line testing-library/no-container
            const cloneContainer = container.querySelector('.g-hello-pangea-dnd__clone-container');
            expect(cloneContainer).toHaveTextContent('Alpha');

            const cloneHandle = within(cloneContainer as HTMLElement).getByRole('button', {
                name: 'Drag to reorder',
            });
            fireEvent.keyDown(cloneHandle, {key: 'ArrowDown', code: 'ArrowDown', keyCode: 40});
            await flush();
            fireEvent.keyDown(cloneHandle, {key: ' ', code: 'Space', keyCode: 32});
            await act(() => new Promise((resolve) => setTimeout(resolve, 0)));

            expect(onItemsChange.mock.calls[0][0].map((track: Track) => track.id)).toEqual([
                'b',
                'a',
                'c',
            ]);
        });

        test('the virtual prop turns the mode on without the virtualizer', () => {
            const {container} = render(
                <ListHelloPangeaDnd items={TRACKS} onItemsChange={jest.fn()} virtual>
                    <List
                        role="grid"
                        aria-label="Playlist"
                        items={TRACKS}
                        getItemContent={getTitle}
                    />
                </ListHelloPangeaDnd>,
            );
            // eslint-disable-next-line testing-library/no-container
            expect(container.querySelector('.g-hello-pangea-dnd__clone-container')).not.toBeNull();
        });
    });
});
