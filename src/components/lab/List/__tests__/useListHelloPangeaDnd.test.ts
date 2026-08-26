import type {DragStart, DropResult} from '@hello-pangea/dnd';

import {act, renderHook} from '../../../../../test-utils/utils';
import {moveItem} from '../moveItem';
import {useListHelloPangeaDnd} from '../useListHelloPangeaDnd';

const ids = ['a', 'b', 'c', 'd', 'e'];

// The events of the library, reduced to the fields the hook reads. The
// destination index is the index in the RESULTING list (the source is taken
// out first) — the model the hook translates into {toId, position}
const dragStart = (draggableId: string, order: readonly string[] = ids): DragStart => ({
    draggableId,
    mode: 'FLUID',
    type: 'DEFAULT',
    source: {droppableId: 'list', index: order.indexOf(draggableId)},
});

const dropResult = (
    draggableId: string,
    index: number | null,
    order: readonly string[] = ids,
): DropResult => ({
    ...dragStart(draggableId, order),
    destination: index === null ? null : {droppableId: 'list', index},
    reason: 'DROP',
    combine: null,
});

// What the library shows after the drop: the source is taken out and put back
// at the destination index
const expectedOrder = (from: number, to: number) => {
    const next = [...ids];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    return next;
};

describe('useListHelloPangeaDnd', () => {
    test('draggingId follows the drag', () => {
        const {result} = renderHook(() => useListHelloPangeaDnd({ids, onDrop: jest.fn()}));
        expect(result.current.draggingId).toBeNull();

        act(() => result.current.onDragStart(dragStart('b')));
        expect(result.current.draggingId).toBe('b');

        act(() => result.current.onDragEnd(dropResult('b', null)));
        expect(result.current.draggingId).toBeNull();
    });

    test('a drop outside, onto the same place or of an unknown id does not call onDrop', () => {
        const onDrop = jest.fn();
        const {result} = renderHook(() => useListHelloPangeaDnd({ids, onDrop}));

        act(() => result.current.onDragEnd(dropResult('b', null)));
        act(() => result.current.onDragEnd(dropResult('b', 1)));
        act(() => result.current.onDragEnd(dropResult('missing', 3)));

        expect(onDrop).not.toHaveBeenCalled();
    });

    test('translates the destination index into {toId, position} that moveItem turns into the order of the library', () => {
        const onDrop = jest.fn();
        const {result} = renderHook(() => useListHelloPangeaDnd({ids, onDrop}));

        for (let from = 0; from < ids.length; from++) {
            for (let to = 0; to < ids.length; to++) {
                onDrop.mockClear();
                act(() => result.current.onDragEnd(dropResult(ids[from], to)));

                if (from === to) {
                    expect(onDrop).not.toHaveBeenCalled();
                    continue;
                }
                expect(onDrop).toHaveBeenCalledTimes(1);
                const [fromId, toId, position] = onDrop.mock.calls[0];
                expect(fromId).toBe(ids[from]);
                expect(moveItem(ids, fromId, toId, position)).toEqual(expectedOrder(from, to));
            }
        }
    });

    test('reads the fresh ids and onDrop through stable callbacks', () => {
        const onDropFirst = jest.fn();
        const onDropSecond = jest.fn();
        const {result, rerender} = renderHook(
            (props: {ids: readonly string[]; onDrop: jest.Mock}) => useListHelloPangeaDnd(props),
            {initialProps: {ids, onDrop: onDropFirst}},
        );
        const {onDragStart, onDragEnd} = result.current;

        const reversed = [...ids].reverse();
        rerender({ids: reversed, onDrop: onDropSecond});
        expect(result.current.onDragStart).toBe(onDragStart);
        expect(result.current.onDragEnd).toBe(onDragEnd);

        // 'e' is the first item of the reversed order: dropping it at the end
        // lands after the last one, 'a'
        act(() => onDragEnd(dropResult('e', reversed.length - 1, reversed)));
        expect(onDropFirst).not.toHaveBeenCalled();
        expect(onDropSecond).toHaveBeenCalledWith('e', 'a', 'after');
    });
});
