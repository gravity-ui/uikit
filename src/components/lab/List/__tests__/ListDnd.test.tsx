import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {fireEvent, render, screen} from '../../../../../test-utils/utils';
import {List} from '../List';
import type {ListDndAdapter, ListDndProps, ListItemContext, ListItemHelpers} from '../types';

import {FRUITS, GROUPS, createTracker} from './helpers';

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
            expect(screen.getByText('Recent')).not.toHaveAttribute('data-dragging');
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
});
