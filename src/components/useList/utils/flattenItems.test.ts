import type {ParsedFlattenState} from './../types';
import {flattenItems} from './flattenItems';

const data = [
    {
        data: {title: 'item-0'},
        disabled: true,
        willNotBeIncluded: '123',
    },
    {
        data: {title: 'item-1'},
        children: [
            {
                data: {title: 'child-1-1'},
            },
            {
                data: {title: 'child-1-2'},
                expanded: false,
                children: [{data: {title: 'child-1-2-1'}, children: []}],
            },
            {
                data: {title: 'child-1-3'},
            },
        ],
    },
    {
        data: {title: 'item-2'},
        children: [],
        selected: true,
    },
];

describe('flattenItems', () => {
    test('should return expected result', () => {
        const result: ParsedFlattenState = {
            visibleFlattenIds: ['0', '1', '1-0', '1-1', '1-1-0', '1-2', '2'],
            idToFlattenIndex: {0: 0, 1: 1, '1-0': 2, '1-1': 3, '1-1-0': 4, '1-2': 5, 2: 6},
            rootIds: ['0', '1', '2'],
        };

        expect(flattenItems({items: data})).toEqual(result);
    });

    test('should return expected result with expanded state', () => {
        const result: ParsedFlattenState = {
            visibleFlattenIds: ['0', '1', '2'],
            idToFlattenIndex: {0: 0, 1: 1, 2: 2},
            rootIds: ['0', '1', '2'],
        };

        expect(
            flattenItems({
                items: data,
                expandedById: {
                    '1': false,
                },
            }),
        ).toEqual(result);
    });
    test('should return expected result with expanded state 2', () => {
        const result: ParsedFlattenState = {
            visibleFlattenIds: ['0', '1', '1-0', '1-1', '1-2', '2'],
            idToFlattenIndex: {0: 0, 1: 1, '1-0': 2, '1-1': 3, '1-2': 4, 2: 5},
            rootIds: ['0', '1', '2'],
        };

        expect(
            flattenItems({
                items: data,
                expandedById: {
                    '1-1': false,
                },
            }),
        ).toEqual(result);
    });

    test('should return expected result with expanded state and id getter override', () => {
        const result: ParsedFlattenState = {
            visibleFlattenIds: ['item-0', 'item-1', 'item-2'],
            idToFlattenIndex: {
                'item-0': 0,
                'item-1': 1,
                'item-2': 2,
            },
            rootIds: ['item-0', 'item-1', 'item-2'],
        };

        expect(
            flattenItems({
                items: data,
                expandedById: {
                    'item-1': false,
                },
                getItemId: ({title}) => title,
            }),
        ).toEqual(result);
    });

    test('should return empty state for empty items array', () => {
        const result: ParsedFlattenState = {
            visibleFlattenIds: [],
            idToFlattenIndex: {},
            rootIds: [],
        };

        expect(flattenItems({items: []})).toEqual(result);
    });

    test('should handle flat items without children', () => {
        const flatData = [{data: {title: 'a'}}, {data: {title: 'b'}}, {data: {title: 'c'}}];

        const result: ParsedFlattenState = {
            visibleFlattenIds: ['0', '1', '2'],
            idToFlattenIndex: {0: 0, 1: 1, 2: 2},
            rootIds: ['0', '1', '2'],
        };

        expect(flattenItems({items: flatData})).toEqual(result);
    });

    test('should use explicit id from item.id when present', () => {
        const itemsWithId = [
            {id: 'custom-a', data: {title: 'a'}},
            {id: 'custom-b', data: {title: 'b'}},
        ];

        const result: ParsedFlattenState = {
            visibleFlattenIds: ['custom-a', 'custom-b'],
            idToFlattenIndex: {'custom-a': 0, 'custom-b': 1},
            rootIds: ['custom-a', 'custom-b'],
        };

        expect(flattenItems({items: itemsWithId})).toEqual(result);
    });

    test('should collapse all groups when all are set to false in expandedById', () => {
        const result: ParsedFlattenState = {
            visibleFlattenIds: ['0', '1', '2'],
            idToFlattenIndex: {0: 0, 1: 1, 2: 2},
            rootIds: ['0', '1', '2'],
        };

        expect(
            flattenItems({
                items: data,
                expandedById: {'1': false, '2': false},
            }),
        ).toEqual(result);
    });

    test('idToFlattenIndex should map id to its position in visibleFlattenIds', () => {
        const result = flattenItems({items: data});

        for (const [index, id] of result.visibleFlattenIds.entries()) {
            expect(result.idToFlattenIndex[id]).toBe(index);
        }
    });

    test('rootIds should only contain top-level item ids', () => {
        const result = flattenItems({items: data});

        expect(result.rootIds).toEqual(['0', '1', '2']);
        expect(result.rootIds).toHaveLength(data.length);
    });

    test('should handle a group with large number of children without RangeError', () => {
        // push(...spread) inside reduce throws RangeError when children count exceeds ~200k in Node 20
        const children = Array.from({length: 300_000}, (_, i) => ({data: {title: `child-${i}`}}));
        const items = [{data: {title: 'group'}, children}];

        expect(() => flattenItems({items})).not.toThrow();

        const result = flattenItems({items});

        expect(result.visibleFlattenIds).toHaveLength(300_001); // group + 300k children
        expect(result.idToFlattenIndex['0-0']).toBe(1);
        expect(result.idToFlattenIndex['0-299999']).toBe(300_000);
    });

    test('should handle deeply nested structure', () => {
        const deepItems = [
            {
                data: {title: 'l0'},
                children: [
                    {
                        data: {title: 'l1'},
                        children: [
                            {
                                data: {title: 'l2'},
                                children: [{data: {title: 'l3'}}],
                            },
                        ],
                    },
                ],
            },
        ];

        const result: ParsedFlattenState = {
            visibleFlattenIds: ['0', '0-0', '0-0-0', '0-0-0-0'],
            idToFlattenIndex: {0: 0, '0-0': 1, '0-0-0': 2, '0-0-0-0': 3},
            rootIds: ['0'],
        };

        expect(flattenItems({items: deepItems})).toEqual(result);
    });
});
