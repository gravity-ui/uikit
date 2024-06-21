import type {ParsedFlattenState} from '../types';

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
});
