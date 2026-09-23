import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {fireEvent, render, screen} from '../../../../test-utils/utils';
import {ListVirtualizer} from '../../Virtualizer/ListVirtualizer';
import {ListDndContext} from '../DndContext';
import {List} from '../List';
import type {ListDndAdapter, ListDndProps, ListItemContext, ListItemHelpers} from '../types';

import {FRUITS, GROUPS, createTracker, getSectionHeader, mockLayout} from './helpers';

/** Stable per-id ref callbacks — the obligation of an adapter */
function createStableRefs(onRef: (id: string, element: HTMLElement | null) => void) {
    const refs = new Map<string, React.RefCallback<HTMLElement>>();
    return (id: string) => {
        let ref = refs.get(id);
        if (!ref) {
            ref = (element) => onRef(id, element);
            refs.set(id, ref);
        }
        return ref;
    };
}

describe('List: dnd layer', () => {
    describe('adapter props: composition into the rows and the root', () => {
        test('getItemDndProps are merged into the row', async () => {
            const user = userEvent.setup();
            const order: string[] = [];
            const onRef = jest.fn();
            const getItemRef = createStableRefs(onRef);
            const dnd: ListDndAdapter = {
                getItemDndProps: (id) => ({
                    ref: getItemRef(id),
                    className: 'dnd-row',
                    'data-dnd-id': id,
                    onClick: () => order.push('adapter'),
                }),
                draggingId: null,
            };
            render(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    dnd={dnd}
                    onItemAction={() => order.push('core')}
                    renderItem={(ctx, {getItemProps, getItemViewProps}) => (
                        <List.ItemView
                            {...getItemProps({
                                className: 'own-row',
                                onClick: () => order.push('override'),
                            })}
                            {...getItemViewProps()}
                        >
                            {ctx.content}
                        </List.ItemView>
                    )}
                />,
            );
            const apple = screen.getByRole('option', {name: 'Apple'});

            expect(onRef).toHaveBeenCalledWith('Apple', apple);
            expect(apple).toHaveClass('dnd-row');
            expect(apple).toHaveClass('own-row');
            expect(apple).toHaveAttribute('data-dnd-id', 'Apple');
            expect(apple).toHaveAttribute('role', 'option');
            expect(apple).toHaveAttribute('tabindex', '0');

            await user.click(apple);
            expect(order).toEqual(['core', 'adapter', 'override']);
        });

        test('getContainerDndProps reach the root', () => {
            const containerRef = jest.fn();
            const onDragOver = jest.fn();
            const outerRef = React.createRef<HTMLDivElement>();
            const dnd: ListDndAdapter = {
                getContainerDndProps: () => ({ref: containerRef, onDragOver, 'data-zone': 'order'}),
                draggingId: null,
            };
            render(<List ref={outerRef} aria-label="Fruits" items={FRUITS} dnd={dnd} />);
            const listbox = screen.getByRole('listbox');

            expect(containerRef).toHaveBeenCalledWith(listbox);
            expect(outerRef.current).toBe(listbox);
            expect(listbox).toHaveAttribute('data-zone', 'order');
            expect(listbox).toHaveAttribute('role', 'listbox');

            fireEvent.dragOver(listbox);
            expect(onDragOver).toHaveBeenCalledTimes(1);
        });

        test('section headers take no dnd props and no state marks', () => {
            const getItemDndProps = jest.fn((_id: string): ListDndProps => ({}));
            render(
                <List
                    aria-label="Groups"
                    items={GROUPS}
                    getItemContent={(item) => item.label}
                    dnd={{getItemDndProps, draggingId: 'recent'}}
                />,
            );

            const ids = getItemDndProps.mock.calls.map(([id]) => id);
            expect(ids).toEqual(expect.arrayContaining(['r1', 'a1', 'a2']));
            expect(ids).not.toContain('recent');
            expect(ids).not.toContain('all');
            expect(getSectionHeader('Recent')).not.toHaveAttribute('data-dragging');
        });

        test('role, id and tabIndex from the adapter are dropped with a dev warning', () => {
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            try {
                const attributes = {
                    role: 'button',
                    id: 'same-for-all',
                    tabIndex: 0,
                } as unknown as ListDndProps;
                render(
                    <List
                        aria-label="Fruits"
                        items={FRUITS}
                        dnd={{getItemDndProps: () => attributes, draggingId: null}}
                    />,
                );

                const options = screen.getAllByRole('option');
                expect(options).toHaveLength(4);
                expect(new Set(options.map((option) => option.id)).size).toBe(4);
                expect(options[0]).toHaveAttribute('tabindex', '0');
                expect(options[1]).toHaveAttribute('tabindex', '-1');
                for (const key of ['role', 'id', 'tabIndex']) {
                    expect(consoleErrorSpy).toHaveBeenCalledWith(
                        expect.stringContaining(`The dnd adapter returned \`${key}\``),
                    );
                }
            } finally {
                consoleErrorSpy.mockRestore();
            }
        });

        test('an unstable adapter ref is reported once it changes for the second time', () => {
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            // Only the tracker warning is asserted: on React 18 every forked
            // ref also triggers the dev warning about a callback ref returning
            // a cleanup function (mergeRefs supports React 19 cleanups)
            const trackerWarning = expect.stringContaining(
                'returns a new `ref` identity from `getItemDndProps`',
            );
            try {
                const stableRef = createStableRefs(() => {});
                const stable = (draggingId: string | null): ListDndAdapter => ({
                    getItemDndProps: (id) => ({ref: stableRef(id)}),
                    draggingId,
                });
                const {rerender: rerenderStable, unmount: unmountStable} = render(
                    <List aria-label="Fruits" items={FRUITS} dnd={stable(null)} />,
                );
                rerenderStable(<List aria-label="Fruits" items={FRUITS} dnd={stable('Apple')} />);
                rerenderStable(<List aria-label="Fruits" items={FRUITS} dnd={stable(null)} />);
                expect(consoleErrorSpy).not.toHaveBeenCalledWith(trackerWarning);
                unmountStable();

                const unstable = (draggingId: string | null): ListDndAdapter => ({
                    getItemDndProps: () => ({ref: () => {}}),
                    draggingId,
                });
                const {rerender: rerenderUnstable} = render(
                    <List aria-label="Fruits" items={FRUITS} dnd={unstable(null)} />,
                );
                rerenderUnstable(
                    <List aria-label="Fruits" items={FRUITS} dnd={unstable('Apple')} />,
                );
                expect(consoleErrorSpy).not.toHaveBeenCalledWith(trackerWarning);
                rerenderUnstable(<List aria-label="Fruits" items={FRUITS} dnd={unstable(null)} />);
                expect(consoleErrorSpy).toHaveBeenCalledWith(trackerWarning);
            } finally {
                consoleErrorSpy.mockRestore();
            }
        });
    });

    describe('state: draggingId and dropTarget', () => {
        test('without the dnd prop the layer does not exist: no state fields, no data attributes', () => {
            const {states, renderItem} = createTracker();
            render(<List aria-label="Fruits" items={FRUITS} renderItem={renderItem} />);

            expect(states.get('Apple')).not.toHaveProperty('dragging');
            expect(states.get('Apple')).not.toHaveProperty('dropTarget');
            expect(screen.getByRole('listbox')).not.toHaveAttribute('data-drag-active');
            expect(screen.getByRole('option', {name: 'Apple'})).not.toHaveAttribute(
                'data-dragging',
            );
        });

        test('draggingId marks the dragged row', () => {
            const {states, renderItem} = createTracker();
            const {rerender} = render(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    renderItem={renderItem}
                    dnd={{draggingId: 'Banana'}}
                />,
            );
            const banana = screen.getByRole('option', {name: 'Banana'});

            expect(states.get('Banana')).toMatchObject({dragging: true, dropTarget: null});
            expect(states.get('Apple')).toMatchObject({dragging: false, dropTarget: null});
            expect(banana).toHaveAttribute('data-dragging', '');
            expect(screen.getByRole('option', {name: 'Apple'})).not.toHaveAttribute(
                'data-dragging',
            );
            expect(screen.getByRole('listbox')).toHaveAttribute('data-drag-active', '');

            rerender(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    renderItem={renderItem}
                    dnd={{draggingId: null}}
                />,
            );
            expect(states.get('Banana')).toMatchObject({dragging: false});
            expect(banana).not.toHaveAttribute('data-dragging');
            expect(screen.getByRole('listbox')).not.toHaveAttribute('data-drag-active');
        });

        test('dropTarget marks the edge', () => {
            const {states, renderItem} = createTracker();
            const {rerender} = render(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    renderItem={renderItem}
                    dnd={{draggingId: 'Apple', dropTarget: {id: 'Cherry', position: 'after'}}}
                />,
            );
            const banana = screen.getByRole('option', {name: 'Banana'});
            const cherry = screen.getByRole('option', {name: 'Cherry'});

            expect(cherry).toHaveAttribute('data-drop-target', 'after');
            expect(states.get('Cherry')).toMatchObject({dropTarget: 'after'});
            expect(states.get('Banana')).toMatchObject({dropTarget: null});
            expect(banana).not.toHaveAttribute('data-drop-target');

            rerender(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    renderItem={renderItem}
                    dnd={{draggingId: 'Apple', dropTarget: {id: 'Banana', position: 'before'}}}
                />,
            );
            expect(banana).toHaveAttribute('data-drop-target', 'before');
            expect(states.get('Banana')).toMatchObject({dropTarget: 'before'});
            expect(cherry).not.toHaveAttribute('data-drop-target');
        });
    });

    describe('a drag in progress', () => {
        test.each<[string, ListDndAdapter]>([
            ['draggingId', {draggingId: 'Apple'}],
            [
                'dropTarget alone (the indicator model)',
                {dropTarget: {id: 'Banana', position: 'before'}},
            ],
        ])(
            '%s suspends hover activation and suppresses the hover of the view',
            async (_name, dnd) => {
                const user = userEvent.setup();
                const onActiveItemUpdate = jest.fn();
                const {view, renderItem} = createTracker();
                const {rerender} = render(
                    <List
                        aria-label="Fruits"
                        items={FRUITS}
                        renderItem={renderItem}
                        dnd={dnd}
                        onActiveItemUpdate={onActiveItemUpdate}
                    />,
                );
                const options = screen.getAllByRole('option');

                await user.hover(options[2]);

                expect(onActiveItemUpdate).not.toHaveBeenCalled();
                expect(options[2]).not.toHaveAttribute('data-active');
                expect(screen.getByRole('listbox')).toHaveAttribute('data-drag-active', '');
                expect(view.get('Cherry')).toMatchObject({hovered: false});

                rerender(
                    <List
                        aria-label="Fruits"
                        items={FRUITS}
                        renderItem={renderItem}
                        dnd={{draggingId: null, dropTarget: null}}
                        onActiveItemUpdate={onActiveItemUpdate}
                    />,
                );
                await user.hover(options[3]);

                expect(onActiveItemUpdate).toHaveBeenLastCalledWith('Melon');
                expect(options[3]).toHaveAttribute('data-active');
                expect(screen.getByRole('listbox')).not.toHaveAttribute('data-drag-active');
                expect(view.get('Melon')).not.toHaveProperty('hovered');
            },
        );
    });

    describe('performance obligation: rows are memoized by their ctx slice', () => {
        test('a moving dropTarget re-renders only the rows whose slice changed', () => {
            const renderItem = jest.fn((ctx: ListItemContext<string>, helpers: ListItemHelpers) => (
                <List.ItemView {...helpers.getItemProps()} {...helpers.getItemViewProps()}>
                    {ctx.content}
                </List.ItemView>
            ));
            const {rerender} = render(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    renderItem={renderItem}
                    dnd={{draggingId: 'Apple', dropTarget: {id: 'Banana', position: 'after'}}}
                />,
            );
            renderItem.mockClear();

            rerender(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    renderItem={renderItem}
                    dnd={{draggingId: 'Apple', dropTarget: {id: 'Banana', position: 'after'}}}
                />,
            );
            expect(renderItem).not.toHaveBeenCalled();

            rerender(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    renderItem={renderItem}
                    dnd={{draggingId: 'Apple', dropTarget: {id: 'Cherry', position: 'after'}}}
                />,
            );
            const rendered = renderItem.mock.calls.map(([ctx]) => ctx.id).sort();
            expect(rendered).toEqual(['Banana', 'Cherry']);
        });
    });

    describe('ListDndContext: the adapter of a wrapper that owns the library', () => {
        test('without the prop the adapter comes from the context', () => {
            render(
                <ListDndContext.Provider
                    value={{
                        draggingId: 'Banana',
                        getContainerDndProps: () => ({'data-zone': 'fruits'}),
                    }}
                >
                    <List aria-label="Fruits" items={FRUITS} />
                </ListDndContext.Provider>,
            );
            expect(screen.getByRole('listbox')).toHaveAttribute('data-zone', 'fruits');
            expect(screen.getByRole('listbox')).toHaveAttribute('data-drag-active');
            expect(screen.getByRole('option', {name: 'Banana'})).toHaveAttribute('data-dragging');
        });

        test('the prop wins over the context, with a dev warning', () => {
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            try {
                render(
                    <ListDndContext.Provider value={{draggingId: 'Banana'}}>
                        <List aria-label="Fruits" items={FRUITS} dnd={{draggingId: 'Cherry'}} />
                    </ListDndContext.Provider>,
                );
                expect(screen.getByRole('option', {name: 'Cherry'})).toHaveAttribute(
                    'data-dragging',
                );
                expect(screen.getByRole('option', {name: 'Banana'})).not.toHaveAttribute(
                    'data-dragging',
                );
                expect(consoleErrorSpy).toHaveBeenCalledWith(
                    expect.stringContaining('Both the `dnd` prop and a ListDndContext'),
                );
            } finally {
                consoleErrorSpy.mockRestore();
            }
        });

        test('a list inside a row does not inherit the adapter', () => {
            render(
                <ListDndContext.Provider
                    value={{
                        draggingId: 'Apple',
                        getContainerDndProps: () => ({'data-zone': 'outer'}),
                    }}
                >
                    <List
                        aria-label="Outer"
                        role="grid"
                        items={['Apple']}
                        renderItem={(_ctx, helpers) => (
                            <List.ItemView
                                {...helpers.getItemProps()}
                                {...helpers.getItemViewProps()}
                            >
                                <div {...helpers.getCellProps()}>
                                    <List aria-label="Inner" items={['Apple', 'Kiwi']} />
                                </div>
                            </List.ItemView>
                        )}
                    />
                </ListDndContext.Provider>,
            );
            const inner = screen.getByRole('listbox', {name: 'Inner'});
            expect(inner).not.toHaveAttribute('data-zone');
            expect(inner).not.toHaveAttribute('data-drag-active');
            expect(screen.getByRole('grid', {name: 'Outer'})).toHaveAttribute('data-zone', 'outer');
        });
    });

    describe('placeholder: the last child of the root', () => {
        test('rendered after the rows', () => {
            render(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    dnd={{placeholder: <div data-qa="gap" />}}
                />,
            );
            // The position among the children of the root is the contract itself
            // eslint-disable-next-line testing-library/no-node-access
            const children = Array.from(screen.getByRole('listbox').children);
            expect(children).toHaveLength(FRUITS.length + 1);
            expect(children[FRUITS.length]).toBe(screen.getByTestId('gap'));
        });

        test('rendered after the rows of the last section', () => {
            render(
                <List
                    aria-label="Groups"
                    items={GROUPS}
                    dnd={{placeholder: <div data-qa="gap" />}}
                />,
            );
            // eslint-disable-next-line testing-library/no-node-access
            const last = screen.getByRole('listbox').lastElementChild;
            expect(last).toBe(screen.getByTestId('gap'));
        });

        describe('under virtualization', () => {
            mockLayout({viewport: 120, row: 24});

            test('ignored', () => {
                render(
                    <ListVirtualizer estimateItemSize={24}>
                        <List
                            aria-label="Fruits"
                            items={FRUITS}
                            dnd={{placeholder: <div data-qa="gap" />}}
                        />
                    </ListVirtualizer>,
                );
                expect(screen.getAllByRole('option')).toHaveLength(FRUITS.length);
                expect(screen.queryByTestId('gap')).not.toBeInTheDocument();
            });
        });
    });

    describe('renderItem of the adapter', () => {
        const renderAdapterRow = (ctx: ListItemContext<string>, helpers: ListItemHelpers) => (
            <List.ItemView
                {...helpers.getItemProps({'data-row': 'adapter'})}
                {...helpers.getItemViewProps()}
            >
                {ctx.content}
            </List.ItemView>
        );

        test('renders the rows while the List has no renderItem of its own', () => {
            render(
                <List aria-label="Fruits" items={FRUITS} dnd={{renderItem: renderAdapterRow}} />,
            );
            for (const option of screen.getAllByRole('option')) {
                expect(option).toHaveAttribute('data-row', 'adapter');
            }
        });

        test('the renderItem of the List wins', () => {
            render(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    dnd={{renderItem: renderAdapterRow}}
                    renderItem={(ctx, helpers) => (
                        <List.ItemView
                            {...helpers.getItemProps({'data-row': 'own'})}
                            {...helpers.getItemViewProps()}
                        >
                            {ctx.content}
                        </List.ItemView>
                    )}
                />,
            );
            for (const option of screen.getAllByRole('option')) {
                expect(option).toHaveAttribute('data-row', 'own');
            }
        });

        test('a stable renderItem keeps the rows memoized across new adapter objects', () => {
            const renderItem = jest.fn(renderAdapterRow);
            const {rerender} = render(
                <List aria-label="Fruits" items={FRUITS} dnd={{renderItem, draggingId: null}} />,
            );
            renderItem.mockClear();

            rerender(
                <List aria-label="Fruits" items={FRUITS} dnd={{renderItem, draggingId: null}} />,
            );
            expect(renderItem).not.toHaveBeenCalled();

            rerender(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    dnd={{renderItem, draggingId: 'Cherry'}}
                />,
            );
            const rendered = renderItem.mock.calls.map(([ctx]) => ctx.id).sort();
            expect(rendered).toEqual(['Apple', 'Banana', 'Cherry', 'Melon']);
        });
    });
});
