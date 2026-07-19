import {getSelectedOptionsContent} from '../utils';

const options = [
    {value: 'val1', content: 'content1'},
    {value: 'val2', content: 'content2'},
];

const presenceValue = ['val1'];
const notPresenceValue = ['val3'];

describe('getSelectedOptionsContent', () => {
    describe('default appearance', () => {
        test('option presence. Should return content', async () => {
            const result = getSelectedOptionsContent(options, presenceValue);

            expect(result).toEqual('content1');
        });
        test('option NOT presence. Should return value', async () => {
            const result = getSelectedOptionsContent(options, notPresenceValue);

            expect(result).toEqual('val3');
        });
        test('some of option NOT presence. Should return value', async () => {
            const result = getSelectedOptionsContent(options, [
                ...presenceValue,
                ...notPresenceValue,
            ]);

            expect(result).toEqual('content1, val3');
        });
        test('option with children string. Should return children', () => {
            expect(getSelectedOptionsContent([{value: 'v', children: 'kid'}], ['v'])).toEqual(
                'kid',
            );
        });
        test('option with text. Should return text', () => {
            expect(getSelectedOptionsContent([{value: 'v', text: 'txt'}], ['v'])).toEqual('txt');
        });
        test('content has priority over text', () => {
            expect(
                getSelectedOptionsContent([{value: 'v', content: 'c', text: 'txt'}], ['v']),
            ).toEqual('c');
        });
        test('empty value. Should return null', () => {
            expect(getSelectedOptionsContent(options, [])).toBeNull();
        });
    });
    describe('generic values', () => {
        test('number option presence. Should return content', async () => {
            const result = getSelectedOptionsContent([{value: 42, content: 'Forty-two'}], [42]);

            expect(result).toEqual('Forty-two');
        });
        test('number value without matching option. Should return serialized value', () => {
            const result = getSelectedOptionsContent([], [42]);

            expect(result).toEqual('42');
        });
        test('object option presence. Should be resolved by reference', async () => {
            const userValue = {id: 1, name: 'Alice'};
            const result = getSelectedOptionsContent(
                [{value: userValue, content: 'Alice'}],
                [userValue],
            );

            expect(result).toEqual('Alice');
        });
        test('object value NOT presence. Should return serialized value', async () => {
            const result = getSelectedOptionsContent([], [{id: 1}]);

            expect(result).toEqual('{"id":1}');
        });
        test('NaN option with content. Should resolve content via lookup', async () => {
            const result = getSelectedOptionsContent(
                [{value: NaN, content: 'Not a number'}],
                [NaN],
            );

            expect(result).toEqual('Not a number');
        });
        test('non-finite number without matching option. Should serialize via String', () => {
            expect(getSelectedOptionsContent([], [NaN])).toEqual('NaN');
            expect(getSelectedOptionsContent([], [Infinity])).toEqual('Infinity');
        });
        test('boolean and null values. Should serialize via JSON', () => {
            expect(getSelectedOptionsContent([], [true, null])).toEqual('true, null');
        });
        test('undefined value. Should serialize via String', () => {
            expect(getSelectedOptionsContent([], [undefined])).toEqual('undefined');
        });
        test('circular object. Should fall back to String', () => {
            const circular: {self?: unknown} = {};
            circular.self = circular;

            expect(getSelectedOptionsContent([], [circular])).toEqual('[object Object]');
        });
    });
    describe('renderSelectedOption callback', () => {
        test('option presence. Should be called with option', () => {
            const renderSelectedOption = jest.fn(() => null as any);
            getSelectedOptionsContent(options, presenceValue, renderSelectedOption);

            expect(renderSelectedOption).toHaveBeenCalledTimes(1);
            expect(renderSelectedOption).toHaveBeenCalledWith(options[0], 0);
        });
        test('option NOT presence. Should be called with generated object', () => {
            const renderSelectedOption = jest.fn(() => null as any);
            getSelectedOptionsContent(options, notPresenceValue, renderSelectedOption);

            expect(renderSelectedOption).toHaveBeenCalledTimes(1);
            expect(renderSelectedOption).toHaveBeenCalledWith({value: notPresenceValue[0]}, 0);
        });
        test('group title items. Should not be resolved as options', () => {
            const renderSelectedOption = jest.fn(() => null as any);
            getSelectedOptionsContent(
                [{label: 'Group', disabled: true} as any, {value: 'v1', content: 'c1'}],
                [undefined],
                renderSelectedOption,
            );

            expect(renderSelectedOption).toHaveBeenCalledWith({value: undefined}, 0);
        });
    });
});
