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
    });
    describe('generic values', () => {
        test('number option presence. Should return content', async () => {
            const result = getSelectedOptionsContent([{value: 42, content: 'Forty-two'}], [42]);

            expect(result).toEqual('Forty-two');
        });
        test('number option without content. Should return serialized value', async () => {
            const result = getSelectedOptionsContent([{value: 42}], [42]);

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
        test('non-finite number without content. Should serialize via String', async () => {
            expect(getSelectedOptionsContent([{value: NaN}], [NaN])).toEqual('NaN');
            expect(getSelectedOptionsContent([{value: Infinity}], [Infinity])).toEqual('Infinity');
        });
    });
    describe('renderSelectedOption callback', () => {
        const renderSelectedOptionPostfix = 'from callback';
        const renderSelectedOption = jest.fn(
            (opt) => `${opt.content || opt.value}${renderSelectedOptionPostfix}` as any,
        );

        test('option presence. Should be called with option', async () => {
            renderSelectedOption.mockClear();
            getSelectedOptionsContent(options, presenceValue, renderSelectedOption);

            expect(renderSelectedOption).toBeCalledTimes(1);
            expect(renderSelectedOption).toBeCalledWith(options[0], 0);
        });
        test('option NOT presence. Should be called with generated object', async () => {
            renderSelectedOption.mockClear();
            getSelectedOptionsContent(options, notPresenceValue, renderSelectedOption);

            expect(renderSelectedOption).toBeCalledTimes(1);
            expect(renderSelectedOption).toBeCalledWith({value: notPresenceValue[0]}, 0);
        });
    });
});
