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
        expect(flattenItems(data)).toEqual(['0', '1', '1-0', '1-1', '1-1-0', '1-2', '2']);
    });

    test('should return expected result with expanded state', () => {
        expect(
            flattenItems(data, {
                '1': false,
            }),
        ).toEqual(['0', '1', '2']);
    });
    test('should return expected result with expanded state 2', () => {
        expect(
            flattenItems(data, {
                '1-1': false,
            }),
        ).toEqual(['0', '1', '1-0', '1-1', '1-2', '2']);
    });

    test('should return expected result with expanded state and id getter override', () => {
        expect(
            flattenItems(
                data,
                {
                    'item-1': false,
                },
                ({title}) => title,
            ),
        ).toEqual(['item-0', 'item-1', 'item-2']);
    });
});
