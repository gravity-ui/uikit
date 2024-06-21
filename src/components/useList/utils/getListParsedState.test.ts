import type {ListItemType} from '../types';

import {getListParsedState} from './getListParsedState';

describe('getListParsedState', () => {
    test('get expected result with tree structure items', () => {
        const data: ListItemType<any>[] = [
            {
                data: {title: 'item-0'},
                expanded: true,
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

        expect(getListParsedState({items: data})).toEqual({
            initialState: {
                selectedById: {
                    2: true,
                },
                disabledById: {
                    0: true,
                },
                expandedById: {
                    '1': true,
                    '1-1': false,
                    '1-1-0': true,
                    '2': true,
                },
            },
            itemsById: {
                0: {title: 'item-0'},
                1: {title: 'item-1'},
                '1-0': {title: 'child-1-1'},
                '1-1': {title: 'child-1-2'},
                '1-1-0': {title: 'child-1-2-1'},
                '1-2': {title: 'child-1-3'},
                '2': {title: 'item-2'},
            },
            groupsState: {
                1: {
                    childrenIds: ['1-0', '1-1', '1-2'],
                },
                '1-1': {childrenIds: ['1-1-0']},
                '1-1-0': {childrenIds: []},
                '2': {childrenIds: []},
            },
            itemsState: {
                0: {indentation: 0},
                1: {indentation: 0},
                '1-0': {parentId: '1', indentation: 1},
                '1-1': {parentId: '1', indentation: 1},
                '1-1-0': {parentId: '1-1', indentation: 2},
                '1-2': {parentId: '1', indentation: 1},
                '2': {indentation: 0},
            },
        });
    });

    test('get expected result with flatten structure items', () => {
        const data: ListItemType<any>[] = [
            {
                a: 'item-1',
                children: [],
                disabled: true,
            },
            {
                a: 'item-2',
                selected: true,
            },
            {
                c: 'item-3',
            },
        ];

        expect(getListParsedState({items: data})).toEqual({
            initialState: {
                selectedById: {
                    1: true,
                },
                disabledById: {
                    0: true,
                },
                expandedById: {},
            },
            itemsById: {
                0: {
                    a: 'item-1',
                    children: [],
                    disabled: true,
                },
                1: {
                    a: 'item-2',
                    selected: true,
                },
                2: {
                    c: 'item-3',
                },
            },
            groupsState: {},
            itemsState: {
                0: {indentation: 0},
                1: {indentation: 0},
                2: {indentation: 0},
            },
        });
    });

    test('get expected result with getItemId function passed', () => {
        const data: ListItemType<{title: string; id: string}>[] = [
            {
                data: {title: 'item-0', id: 'id-1'},
            },
            {
                data: {title: 'item-1', id: 'id-2'},
                children: [
                    {
                        data: {title: 'child-1-1', id: 'id-3'},
                    },
                    {
                        data: {title: 'child-1-2', id: 'id-4'},
                        expanded: true,
                        children: [{data: {title: 'child-1-2-1', id: 'id-5'}, children: []}],
                    },
                ],
            },
        ];

        expect(
            getListParsedState({
                items: data,
                defaultExpandedState: 'closed',
                getItemId: ({id}) => id,
            }),
        ).toEqual({
            initialState: {
                selectedById: {},
                disabledById: {},
                expandedById: {
                    'id-2': false,
                    'id-4': true,
                    'id-5': false,
                },
            },
            itemsById: {
                'id-1': {title: 'item-0', id: 'id-1'},
                'id-2': {title: 'item-1', id: 'id-2'},
                'id-3': {title: 'child-1-1', id: 'id-3'},
                'id-4': {title: 'child-1-2', id: 'id-4'},
                'id-5': {title: 'child-1-2-1', id: 'id-5'},
            },
            groupsState: {
                'id-2': {
                    childrenIds: ['id-3', 'id-4'],
                },
                'id-4': {
                    childrenIds: ['id-5'],
                },
                'id-5': {
                    childrenIds: [],
                },
            },
            itemsState: {
                'id-1': {indentation: 0},
                'id-2': {indentation: 0},
                'id-3': {indentation: 1, parentId: 'id-2'},
                'id-4': {indentation: 1, parentId: 'id-2'},
                'id-5': {indentation: 2, parentId: 'id-4'},
            },
        });
    });
});
