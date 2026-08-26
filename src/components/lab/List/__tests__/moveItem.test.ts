import {moveItem} from '../moveItem';

const LETTERS = ['a', 'b', 'c', 'd'];

describe('lab List: moveItem', () => {
    test('moves an item down: before and after the target', () => {
        expect(moveItem(LETTERS, 'a', 'c', 'before')).toEqual(['b', 'a', 'c', 'd']);
        expect(moveItem(LETTERS, 'a', 'c', 'after')).toEqual(['b', 'c', 'a', 'd']);
    });

    test('moves an item up: before and after the target', () => {
        expect(moveItem(LETTERS, 'd', 'b', 'before')).toEqual(['a', 'd', 'b', 'c']);
        expect(moveItem(LETTERS, 'd', 'b', 'after')).toEqual(['a', 'b', 'd', 'c']);
    });

    test('does not mutate the input', () => {
        const items = [...LETTERS];
        moveItem(items, 'a', 'd', 'after');
        expect(items).toEqual(LETTERS);
    });

    test('a no-op returns the original array by reference: the same id, or a position that does not change', () => {
        expect(moveItem(LETTERS, 'b', 'b', 'after')).toBe(LETTERS);
        expect(moveItem(LETTERS, 'b', 'a', 'after')).toBe(LETTERS);
        expect(moveItem(LETTERS, 'b', 'c', 'before')).toBe(LETTERS);
    });

    test('an unknown id returns the original array and warns in dev', () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        try {
            expect(moveItem(LETTERS, 'a', 'zzz', 'after')).toBe(LETTERS);
            expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('moveItem'));
        } finally {
            consoleErrorSpy.mockRestore();
        }
    });

    test('reads object ids the way the list does: the `id` field, numeric ids included', () => {
        const items = [{id: 1}, {id: 2}, {id: 3}];
        // The list speaks in string ids (onDrop, dropTarget); a numeric field
        // has to match them
        expect(moveItem(items, '1', '3', 'after')).toEqual([{id: 2}, {id: 3}, {id: 1}]);
    });

    test('a custom getId', () => {
        const items = [{key: 'x'}, {key: 'y'}, {key: 'z'}];
        expect(moveItem(items, 'z', 'x', 'before', (item) => item.key)).toEqual([
            {key: 'z'},
            {key: 'x'},
            {key: 'y'},
        ]);
    });

    test('with duplicate ids the first match is moved', () => {
        expect(moveItem(['a', 'b', 'a', 'c'], 'a', 'c', 'after')).toEqual(['b', 'a', 'c', 'a']);
    });
});
