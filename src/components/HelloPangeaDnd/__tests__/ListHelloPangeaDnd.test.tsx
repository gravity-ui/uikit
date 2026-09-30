import * as React from 'react';

// eslint-disable-next-line no-restricted-imports
import {DragDropContext} from '@hello-pangea/dnd';

import {act, fireEvent, render, screen, within} from '../../../../test-utils/utils';
import {Lang, configure} from '../../../utils/configure';
import {List} from '../../List';
import {mockLayout, mockTabbableDisplayCheck} from '../../List/__tests__/helpers';
import type {ListItemContext, ListItemHelpers, ListProps} from '../../List/types';
import {Modal} from '../../Modal';
import {ListVirtualizer} from '../../Virtualizer/ListVirtualizer';
import {ListHelloPangeaDnd} from '../ListHelloPangeaDnd';
import type {ListHelloPangeaDndProps} from '../ListHelloPangeaDnd';
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

mockTabbableDisplayCheck();

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

/** The wrapper around a grid of TRACKS; `wrap` puts it into a Modal or a ListVirtualizer */
function renderKit(
    props: Partial<ListHelloPangeaDndProps<Track>> = {onItemsChange: jest.fn()},
    {
        wrap = (kit) => kit,
        list,
    }: {
        wrap?: (kit: React.ReactElement) => React.ReactElement;
        list?: Partial<ListProps<Track>>;
    } = {},
) {
    return render(
        wrap(
            <ListHelloPangeaDnd items={TRACKS} {...props}>
                <List
                    role="grid"
                    aria-label="Playlist"
                    items={TRACKS}
                    getItemContent={getTitle}
                    {...list}
                />
            </ListHelloPangeaDnd>,
        ),
    );
}

const inVirtualizer = (kit: React.ReactElement) => (
    <ListVirtualizer estimateItemSize={24}>{kit}</ListVirtualizer>
);

const rowTitles = () =>
    screen.getAllByRole('row').map((row) => within(row).getAllByRole('gridcell')[1].textContent);

const getHandle = (title: string) =>
    within(screen.getByRole('row', {name: new RegExp(title)})).getByRole('button', {
        name: 'Drag to reorder',
    });

const getCloneContainer = () =>
    document.querySelector<HTMLElement>('.g-hello-pangea-dnd__clone-container');

// Under virtualization the original renders nothing after the lift: the keys go to the clone
const focused = () => (document.activeElement as HTMLElement | null) ?? document.body;

const press = (key: string, keyCode: number) =>
    fireEvent.keyDown(focused(), {key, code: key === ' ' ? 'Space' : key, keyCode});

/** Lets the library commit a keyboard step */
const flush = () => act(() => Promise.resolve());

/** The drop of the keyboard sensor lands in a timeout */
const settle = () => act(() => new Promise((resolve) => setTimeout(resolve, 0)));

async function lift(handle: HTMLElement) {
    act(() => handle.focus());
    press(' ', 32);
    await flush();
}

async function dragWithKeyboard(handle: HTMLElement, key: 'ArrowDown' | 'ArrowUp', times = 1) {
    await lift(handle);
    for (let i = 0; i < times; i++) {
        press(key, key === 'ArrowDown' ? 40 : 38);
        await flush();
    }
    press(' ', 32);
    await settle();
}

function Playlist(props: Pick<ListHelloPangeaDndProps<Track>, 'onItemsChange' | 'isDragDisabled'>) {
    const [items, setItems] = React.useState(TRACKS);
    return (
        <ListHelloPangeaDnd
            items={items}
            isDragDisabled={props.isDragDisabled}
            onItemsChange={(next) => {
                setItems(next);
                props.onItemsChange?.(next);
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
            expect(getHandle('Alpha').closest('.g-list-item-view__slot')).toHaveClass(
                'g-list-item-view__slot_name_drag-handle',
            );
        });

        test('a keyboard drag reorders the items and gives the focus back', async () => {
            const onItemsChange = jest.fn();
            render(<Playlist onItemsChange={onItemsChange} />);

            await dragWithKeyboard(getHandle('Alpha'), 'ArrowDown', 2);

            expect(onItemsChange).toHaveBeenCalledTimes(1);
            expect(rowTitles()).toEqual(['Bravo', 'Charlie', 'Alpha']);
            expect(getHandle('Alpha')).toHaveFocus();
        });

        test('while dragging the core marks the row and the list, the placeholder keeps the gap', async () => {
            render(<Playlist />);
            await lift(getHandle('Bravo'));

            // A plain list drags the original itself: no clone
            expect(getCloneContainer()).toBeNull();
            expect(screen.getByRole('row', {name: /Bravo/})).toHaveAttribute('data-dragging');
            const grid = screen.getByRole('grid');
            expect(grid).toHaveAttribute('data-drag-active');
            expect(grid.lastElementChild).toHaveAttribute('data-rfd-placeholder-context-id');

            press('Escape', 27);
            await settle();
            expect(grid).not.toHaveAttribute('data-drag-active');
        });

        test('isDragDisabled leaves a decorative handle that ←/→ skip', () => {
            render(<Playlist isDragDisabled={(track) => track.id === 'c'} />);

            const alpha = screen.getByRole('row', {name: /Alpha/});
            act(() => alpha.focus());
            fireEvent.keyDown(alpha, {key: 'ArrowRight'});
            expect(getHandle('Alpha')).toHaveFocus();

            const charlie = screen.getByRole('row', {name: /Charlie/});
            expect(within(charlie).queryByRole('button')).not.toBeInTheDocument();
            act(() => charlie.focus());
            fireEvent.keyDown(charlie, {key: 'ArrowRight'});
            expect(charlie).toHaveFocus();
        });

        test('onDrop receives the drop as ids and an edge', async () => {
            const onDrop = jest.fn();
            renderKit({onDrop});
            await dragWithKeyboard(getHandle('Charlie'), 'ArrowUp');
            expect(onDrop).toHaveBeenCalledWith('c', 'b', 'before');
        });

        test('numeric ids are read the way the List reads them', async () => {
            const numbered = [
                {id: 1, title: 'One'},
                {id: 2, title: 'Two'},
            ];
            const onItemsChange = jest.fn();
            render(
                <ListHelloPangeaDnd items={numbered} onItemsChange={onItemsChange}>
                    <List
                        role="grid"
                        aria-label="Numbers"
                        items={numbered}
                        getItemContent={(item) => item.title}
                    />
                </ListHelloPangeaDnd>,
            );
            expect(
                screen.getAllByRole('row').map((row) => row.getAttribute('data-rfd-draggable-id')),
            ).toEqual(['1', '2']);

            await dragWithKeyboard(getHandle('One'), 'ArrowDown');
            expect(onItemsChange.mock.calls[0][0].map((item: {id: number}) => item.id)).toEqual([
                2, 1,
            ]);
        });

        test('the screen reader instructions of the handle follow the language', () => {
            configure({lang: Lang.Ru});
            try {
                render(<Playlist />);
                const handle = within(screen.getAllByRole('row')[0]).getByRole('button');
                const hintId = handle.getAttribute('aria-describedby') ?? '';

                expect(document.getElementById(hintId)).toHaveTextContent(
                    /Нажмите пробел, чтобы начать перетаскивание/,
                );
            } finally {
                configure({lang: Lang.En});
            }
        });
    });

    describe('inside a modal', () => {
        mockLayout({viewport: 120, row: 24});

        test.each([
            ['plain', false],
            ['virtualized', true],
        ])('%s: the lifted row stays in the focus scope of the modal', async (_name, virtual) => {
            renderKit(undefined, {
                wrap: (kit) => <Modal open>{virtual ? inVirtualizer(kit) : kit}</Modal>,
            });
            await lift(getHandle('Alpha'));

            expect(focused()).toHaveAttribute('data-rfd-drag-handle-draggable-id', 'a');
            // The modal hides everything outside of it from assistive technology

            expect(focused().closest('[aria-hidden="true"]')).toBeNull();

            press('Escape', 27);
            await settle();
        });
    });

    describe('Row in renderItem', () => {
        test('fills the slots of the view and places the handle at the end', () => {
            renderKit(undefined, {
                list: {
                    renderItem: (ctx, helpers) => (
                        <ListHelloPangeaDnd.Row
                            ctx={ctx}
                            helpers={helpers}
                            description={`#${ctx.id}`}
                            endContent={<span data-qa="end" />}
                            handleLabel="Move"
                            handlePlacement="end"
                            qa={`row-${ctx.id}`}
                        />
                    ),
                },
            });
            const row = screen.getByTestId('row-a');
            expect(row).toHaveAttribute('data-rfd-draggable-id', 'a');
            expect(within(row).getByText('#a')).toBeInTheDocument();

            const handle = within(row).getByRole('button', {name: 'Move'});

            const endSlot = handle.closest('.g-list-item-view__slot') as HTMLElement;
            expect(endSlot).toHaveClass('g-list-item-view__slot_name_end-content');
            expect(within(endSlot).getByTestId('end').compareDocumentPosition(handle)).toBe(
                Node.DOCUMENT_POSITION_FOLLOWING,
            );
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
        function WithState() {
            const state = useListHelloPangeaDnd({ids: ['a', 'b', 'c'], onDrop: jest.fn()});
            return (
                <DragDropContext onDragStart={state.onDragStart} onDragEnd={state.onDragEnd}>
                    <ListHelloPangeaDnd items={TRACKS} state={state} onItemsChange={jest.fn()}>
                        <List
                            role="grid"
                            aria-label="Playlist"
                            items={TRACKS}
                            getItemContent={getTitle}
                        />
                    </ListHelloPangeaDnd>
                </DragDropContext>
            );
        }

        test.each<[string, () => void, string]>([
            [
                'a listbox',
                () => renderKit(undefined, {list: {role: 'listbox'}}),
                'Pass `role="grid"` to the List',
            ],
            [
                'neither onItemsChange nor onDrop',
                () => renderKit({}),
                'Pass `onItemsChange` or `onDrop`',
            ],
            [
                'state with the callbacks of the wrapper',
                () => render(<WithState />),
                'are not called',
            ],
        ])('%s', (_name, run, message) => {
            run();
            expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining(message));
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
    });

    describe('under an external DragDropContext: the state prop', () => {
        test('each list is a droppable of the shared context and reorders itself only', async () => {
            const firstDrop = jest.fn();
            const secondDrop = jest.fn();
            const second = [
                {id: 'x', title: 'X-ray'},
                {id: 'y', title: 'Yankee'},
            ];
            function TwoLists() {
                const first = useListHelloPangeaDnd({ids: ['a', 'b', 'c'], onDrop: firstDrop});
                const other = useListHelloPangeaDnd({ids: ['x', 'y'], onDrop: secondDrop});
                return (
                    <DragDropContext
                        onDragStart={(start) => {
                            first.onDragStart(start);
                            other.onDragStart(start);
                        }}
                        onDragEnd={(result) => {
                            first.onDragEnd(result);
                            other.onDragEnd(result);
                        }}
                    >
                        <ListHelloPangeaDnd items={TRACKS} state={first} droppableId="first">
                            <List
                                role="grid"
                                aria-label="First"
                                items={TRACKS}
                                getItemContent={getTitle}
                            />
                        </ListHelloPangeaDnd>
                        <ListHelloPangeaDnd items={second} state={other} droppableId="second">
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
            render(<TwoLists />);

            expect(screen.getByRole('grid', {name: 'First'})).toHaveAttribute(
                'data-rfd-droppable-id',
                'first',
            );
            expect(screen.getByRole('grid', {name: 'Second'})).toHaveAttribute(
                'data-rfd-droppable-id',
                'second',
            );

            await dragWithKeyboard(getHandle('Yankee'), 'ArrowUp');
            expect(secondDrop).toHaveBeenCalledWith('y', 'x', 'before');
            expect(firstDrop).not.toHaveBeenCalled();
        });
    });

    describe('the virtual mode', () => {
        mockLayout({viewport: 120, row: 24});

        test('a keyboard drag draws the clone from the Row, without a placeholder', async () => {
            const onItemsChange = jest.fn();
            renderKit({onItemsChange}, {wrap: inVirtualizer});
            await lift(getHandle('Alpha'));

            expect(getCloneContainer()).toHaveTextContent('Alpha');
            // The virtualizer keeps the gap: the virtual mode of the library takes no placeholder
            const grid = screen.getByRole('grid');
            expect(grid.querySelector('[data-rfd-placeholder-context-id]')).toBeNull();

            press('ArrowDown', 40);
            await flush();
            press(' ', 32);
            await settle();

            expect(onItemsChange.mock.calls[0][0].map((track: Track) => track.id)).toEqual([
                'b',
                'a',
                'c',
            ]);
        });

        test('the virtual prop turns the mode on without the virtualizer in sight', () => {
            renderKit({onItemsChange: jest.fn(), virtual: true});
            expect(getCloneContainer()).not.toBeNull();
        });
    });
});
