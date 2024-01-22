import {defaultFilterItems} from './defaultFilterItems';

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
                data: {title: 'Child-1-2'},
                expanded: false,
                children: [{data: {title: 'child-1-2-1'}, children: []}],
            },
            {
                data: {title: 'chilD-1-3'},
            },
        ],
    },
    {
        data: {title: 'item-2'},
        children: [],
        selected: true,
    },
];

describe('defaultFilterItems', () => {
    test('should return expected result', () => {
        expect(
            defaultFilterItems(data, ({title}) => title.toLowerCase().includes('child-1-2')),
        ).toEqual([
            {
                data: {title: 'item-1'},
                children: [
                    {
                        data: {title: 'Child-1-2'},
                        expanded: false,
                        children: [{data: {title: 'child-1-2-1'}, children: []}],
                    },
                ],
            },
        ]);
    });
});
