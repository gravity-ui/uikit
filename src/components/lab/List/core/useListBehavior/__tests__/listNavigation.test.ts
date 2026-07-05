import {KeyCode} from '../../../../../../constants';
import {getAdjacentId, getEdgeId, resolveInlineArrow, resolveTypeahead} from '../listNavigation';

const ids = ['a', 'b', 'c'];
const identity = (id: string) => id;

describe('getAdjacentId', () => {
    it('steps forward and backward', () => {
        expect(getAdjacentId(ids, 'a', 1)).toBe('b');
        expect(getAdjacentId(ids, 'b', -1)).toBe('a');
    });

    it('stops at the edges (no wrap)', () => {
        expect(getAdjacentId(ids, 'c', 1)).toBeUndefined();
        expect(getAdjacentId(ids, 'a', -1)).toBeUndefined();
    });

    it('enters from the matching edge when there is no current position', () => {
        expect(getAdjacentId(ids, undefined, 1)).toBe('a');
        expect(getAdjacentId(ids, undefined, -1)).toBe('c');
        // an unknown id behaves like no position
        expect(getAdjacentId(ids, 'x', 1)).toBe('a');
    });

    it('returns undefined for an empty list', () => {
        expect(getAdjacentId([], 'a', 1)).toBeUndefined();
    });
});

describe('getEdgeId', () => {
    it('returns the first / last id', () => {
        expect(getEdgeId(ids, 'first')).toBe('a');
        expect(getEdgeId(ids, 'last')).toBe('c');
    });

    it('returns undefined for an empty list', () => {
        expect(getEdgeId([], 'first')).toBeUndefined();
    });
});

describe('resolveInlineArrow', () => {
    it('maps arrows to logical directions in LTR', () => {
        expect(resolveInlineArrow(KeyCode.ARROW_RIGHT, 'ltr')).toBe('forward');
        expect(resolveInlineArrow(KeyCode.ARROW_LEFT, 'ltr')).toBe('backward');
    });

    it('inverts the mapping in RTL', () => {
        expect(resolveInlineArrow(KeyCode.ARROW_RIGHT, 'rtl')).toBe('backward');
        expect(resolveInlineArrow(KeyCode.ARROW_LEFT, 'rtl')).toBe('forward');
    });

    it('ignores non-horizontal keys', () => {
        expect(resolveInlineArrow(KeyCode.ARROW_DOWN, 'ltr')).toBeUndefined();
        expect(resolveInlineArrow(KeyCode.HOME, 'rtl')).toBeUndefined();
    });
});

describe('resolveTypeahead', () => {
    it('matches the first item with the typed prefix', () => {
        expect(resolveTypeahead(ids, identity, '', 'b', undefined)).toEqual({
            buffer: 'b',
            matchId: 'b',
        });
    });

    it('cycles through same-letter matches on a repeated key', () => {
        const items = ['apple', 'avocado', 'banana'];
        const first = resolveTypeahead(items, identity, '', 'a', undefined);
        expect(first.matchId).toBe('apple');
        const second = resolveTypeahead(items, identity, first.buffer, 'a', 'apple');
        expect(second).toEqual({buffer: 'aa', matchId: 'avocado'});
    });

    it('refines the match as a multi-character buffer grows', () => {
        const items = ['bee', 'bar'];
        const first = resolveTypeahead(items, identity, '', 'b', undefined);
        expect(first.matchId).toBe('bee');
        const second = resolveTypeahead(items, identity, first.buffer, 'a', 'bee');
        expect(second).toEqual({buffer: 'ba', matchId: 'bar'});
    });

    it('is case-insensitive', () => {
        expect(resolveTypeahead(['Apple'], identity, '', 'a', undefined).matchId).toBe('Apple');
    });

    it('keeps cycling when a repeated key changes case', () => {
        const items = ['apple', 'avocado'];
        const first = resolveTypeahead(items, identity, '', 'a', undefined);
        expect(first.matchId).toBe('apple');
        // `a` then `A` (Caps Lock mid-type) must still be treated as a repeated key, not a refine.
        const second = resolveTypeahead(items, identity, first.buffer, 'A', 'apple');
        expect(second.matchId).toBe('avocado');
    });

    it('advances the buffer even without a match', () => {
        expect(resolveTypeahead(ids, identity, '', 'z', undefined)).toEqual({
            buffer: 'z',
            matchId: undefined,
        });
    });
});
