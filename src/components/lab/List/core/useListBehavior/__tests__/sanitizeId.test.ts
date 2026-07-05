import {buildItemDomId, sanitizeItemIdForDom} from '../sanitizeId';

describe('sanitizeItemIdForDom', () => {
    it('keeps id tokens made of letters, digits and hyphens intact', () => {
        expect(sanitizeItemIdForDom('option-1')).toBe('option-1');
        expect(sanitizeItemIdForDom('ABC123')).toBe('ABC123');
    });

    it('escapes whitespace, quotes and other unsafe characters', () => {
        expect(sanitizeItemIdForDom('a b')).toBe('a_20_b');
        expect(sanitizeItemIdForDom('a"b')).toBe('a_22_b');
        expect(sanitizeItemIdForDom('a.b#c')).toBe('a_2e_b_23_c');
    });

    it('escapes the underscore delimiter so it cannot collide with an escape sequence', () => {
        expect(sanitizeItemIdForDom('a_b')).toBe('a_5f_b');
    });

    it('never maps two distinct ids to the same token', () => {
        const distinct = ['a b', 'a_b', 'a-b', 'a.b', 'ab', 'a_20_b'];
        const sanitized = distinct.map(sanitizeItemIdForDom);
        expect(new Set(sanitized).size).toBe(distinct.length);
    });
});

describe('buildItemDomId', () => {
    it('composes the container id, the `item` segment and the sanitized item id', () => {
        expect(buildItemDomId('list-1', 'opt')).toBe('list-1-item-opt');
        expect(buildItemDomId('list-1', 'a b')).toBe('list-1-item-a_20_b');
    });
});
