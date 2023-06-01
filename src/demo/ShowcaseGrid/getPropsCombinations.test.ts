import {getPropsCombinations} from './getPropsCombinations';

describe('getPropsCombinations', () => {
    it('Creates props combinations', () => {
        type TestType = React.ElementType<{
            prop1: 'value11' | 'value12';
            prop2: 'value21' | 'value22';
            prop3: 'value31' | 'value32';
            prop4: 'value4';
            prop5: 'value5';
        }>;

        const actual = getPropsCombinations<TestType>({
            propsCombinations: {
                prop1: [
                    {
                        name: 'test1',
                        value: 'value11',
                    },
                    {
                        name: 'test2',
                        value: 'value12',
                    },
                ],
                prop2: [
                    {
                        name: 'test3',
                        value: 'value21',
                    },
                    {
                        name: 'test4',
                        value: 'value22',
                    },
                ],
                prop3: [
                    {
                        name: 'test5',
                        value: 'value31',
                    },
                    {
                        name: 'test6',
                        value: 'value32',
                    },
                ],
            },
            staticProps: {
                prop4: 'value4',
            },
        });

        const expected = [
            {
                names: {
                    prop1: 'test1',
                    prop2: 'test3',
                    prop3: 'test5',
                },
                props: {
                    prop1: 'value11',
                    prop2: 'value21',
                    prop3: 'value31',
                    prop4: 'value4',
                },
            },
            {
                names: {
                    prop1: 'test1',
                    prop2: 'test3',
                    prop3: 'test6',
                },
                props: {
                    prop1: 'value11',
                    prop2: 'value21',
                    prop3: 'value32',
                    prop4: 'value4',
                },
            },
            {
                names: {
                    prop1: 'test1',
                    prop2: 'test4',
                    prop3: 'test5',
                },
                props: {
                    prop1: 'value11',
                    prop2: 'value22',
                    prop3: 'value31',
                    prop4: 'value4',
                },
            },
            {
                names: {
                    prop1: 'test1',
                    prop2: 'test4',
                    prop3: 'test6',
                },
                props: {
                    prop1: 'value11',
                    prop2: 'value22',
                    prop3: 'value32',
                    prop4: 'value4',
                },
            },
            {
                names: {
                    prop1: 'test2',
                    prop2: 'test3',
                    prop3: 'test5',
                },
                props: {
                    prop1: 'value12',
                    prop2: 'value21',
                    prop3: 'value31',
                    prop4: 'value4',
                },
            },
            {
                names: {
                    prop1: 'test2',
                    prop2: 'test3',
                    prop3: 'test6',
                },
                props: {
                    prop1: 'value12',
                    prop2: 'value21',
                    prop3: 'value32',
                    prop4: 'value4',
                },
            },
            {
                names: {
                    prop1: 'test2',
                    prop2: 'test4',
                    prop3: 'test5',
                },
                props: {
                    prop1: 'value12',
                    prop2: 'value22',
                    prop3: 'value31',
                    prop4: 'value4',
                },
            },
            {
                names: {
                    prop1: 'test2',
                    prop2: 'test4',
                    prop3: 'test6',
                },
                props: {
                    prop1: 'value12',
                    prop2: 'value22',
                    prop3: 'value32',
                    prop4: 'value4',
                },
            },
        ];

        expect(actual).toEqual(expected);
    });
});
