import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {fireEvent, render, screen} from '../../../../../test-utils/utils';
import {List} from '../List';
import type {
    ListDndAdapter,
    ListDndProps,
    ListItemContext,
    ListItemHelpers,
    ListItemViewStateProps,
    ListProps,
} from '../types';

const FRUITS = ['Apple', 'Banana', 'Cherry', 'Melon'];

const GROUPS = [
    {id: 'recent', label: 'Recent', children: [{id: 'r1', label: 'First'}]},
    {
        id: 'all',
        label: 'All',
        children: [
            {id: 'a1', label: 'Second'},
            {id: 'a2', label: 'Third'},
        ],
    },
];

/** Captures the ctx slice and the view props of every rendered row */
function createTracker() {
    const states = new Map<string, ListItemContext<string>['state']>();
    const view = new Map<string, ListItemViewStateProps>();
    const renderItem: ListProps<string>['renderItem'] = (ctx, helpers) => {
        states.set(ctx.id, ctx.state);
        view.set(ctx.id, helpers.getItemViewProps());
        return (
            <List.ItemView {...helpers.getItemProps()} {...helpers.getItemViewProps()}>
                {ctx.content}
            </List.ItemView>
        );
    };
    return {states, view, renderItem};
}

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

describe('lab List: dnd layer', () => {
    describe('adapter props: composition into the rows and the root', () => {
        test('getItemDndProps are merged into the row: the ref registers the element, className is concatenated, handlers run after the core and before the overrides', async () => {
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
            // The core props survive the merge
            expect(apple).toHaveAttribute('role', 'option');
            expect(apple).toHaveAttribute('tabindex', '0');

            await user.click(apple);
            expect(order).toEqual(['core', 'adapter', 'override']);
        });

        test('getContainerDndProps reach the root: the ref (forked with the ref of the component), the handlers and the attributes', () => {
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
            expect(screen.getByText('Recent')).not.toHaveAttribute('data-dragging');
        });

        test('role, id and tabIndex from the adapter are dropped with a dev warning: the ARIA model, the DOM ids and the tab stop stay with the core', () => {
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            try {
                // The `attributes` object of useSortable (dnd-kit) passed
                // through a cast — the practical case of the contract
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

        test('a stable adapter ref is not reported; an unstable one is reported once it changes for the second time', () => {
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            try {
                const stableRef = createStableRefs(() => {});
                const stable = (draggingId: string | null): ListDndAdapter => ({
                    getItemDndProps: (id) => ({ref: stableRef(id)}),
                    draggingId,
                });
                // A change of draggingId re-renders every row, and the getter
                // runs again on each of them
                const {rerender: rerenderStable, unmount: unmountStable} = render(
                    <List aria-label="Fruits" items={FRUITS} dnd={stable(null)} />,
                );
                rerenderStable(<List aria-label="Fruits" items={FRUITS} dnd={stable('Apple')} />);
                rerenderStable(<List aria-label="Fruits" items={FRUITS} dnd={stable(null)} />);
                expect(consoleErrorSpy).not.toHaveBeenCalled();
                unmountStable();

                const unstable = (draggingId: string | null): ListDndAdapter => ({
                    getItemDndProps: () => ({ref: () => {}}),
                    draggingId,
                });
                const {rerender: rerenderUnstable} = render(
                    <List aria-label="Fruits" items={FRUITS} dnd={unstable(null)} />,
                );
                // The first change is allowed (the adapter may be recreated)...
                rerenderUnstable(
                    <List aria-label="Fruits" items={FRUITS} dnd={unstable('Apple')} />,
                );
                expect(consoleErrorSpy).not.toHaveBeenCalled();
                // ...the second one is systematic
                rerenderUnstable(<List aria-label="Fruits" items={FRUITS} dnd={unstable(null)} />);
                expect(consoleErrorSpy).toHaveBeenCalledWith(
                    expect.stringContaining('returns a new `ref` identity from `getItemDndProps`'),
                );
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

        test('draggingId marks the dragged row: ctx.state.dragging and data-dragging by presence, data-drag-active on the root', () => {
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

        test('dropTarget marks the edge: ctx.state.dropTarget and data-drop-target carry before/after', () => {
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
            '%s suspends activation on hover, marks the root and suppresses the hover of the view',
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

                // The drag is over: hover activates again, the marks are gone
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
        test('a dropTarget moving between rows re-renders only the rows whose slice changed', () => {
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

            // A new adapter object with the same state (a dragover that did
            // not cross an edge): the list re-renders, the rows do not
            rerender(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    renderItem={renderItem}
                    dnd={{draggingId: 'Apple', dropTarget: {id: 'Banana', position: 'after'}}}
                />,
            );
            expect(renderItem).not.toHaveBeenCalled();

            // The target moves to another row: exactly the two rows whose
            // slice changed are re-rendered
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
});
