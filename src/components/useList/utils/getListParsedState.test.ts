import type {ListItemType} from '../types';

import {getListParsedState} from './getListParsedState';

describe('getListParsedState', () => {
    test('get expected result with tree structure items', () => {
        const data: ListItemType<any>[] = [
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

        expect(getListParsedState(data)).toEqual({
            byId: {
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
                '1-1': {childrenIds: ['1-1-0'], expanded: false},
                '1-1-0': {childrenIds: []},
                '2': {childrenIds: []},
            },
            itemsState: {
                0: {indentation: 0, disabled: true},
                1: {indentation: 0},
                '1-0': {parentId: '1', indentation: 1},
                '1-1': {parentId: '1', indentation: 1},
                '1-1-0': {parentId: '1-1', indentation: 2},
                '1-2': {parentId: '1', indentation: 1},
                '2': {indentation: 0, selected: true},
            },
            lastItemId: '2',
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

        expect(getListParsedState(data)).toEqual({
            byId: {
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
                0: {indentation: 0, disabled: true},
                1: {indentation: 0, selected: true},
                2: {indentation: 0},
            },
            lastItemId: '2',
        });
    });

    test('get expected result with getId function passed', () => {
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
                        expanded: false,
                        children: [{data: {title: 'child-1-2-1', id: 'id-5'}, children: []}],
                    },
                ],
            },
        ];

        expect(getListParsedState(data, ({id}) => id)).toEqual({
            byId: {
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
                    expanded: false,
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
            lastItemId: 'id-5',
        });
    });
});
