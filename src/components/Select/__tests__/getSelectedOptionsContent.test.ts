import {getSelectedOptionsContent} from '../utils';

const options = [
    {value: 'val1', content: 'content1'},
    {value: 'val2', content: 'content2'},
];

const presenceValue = ['val1'];
const notPresenceValue = ['val3'];
const getKey = (value: unknown) => String(value);

describe('getSelectedOptionsContent', () => {
    describe('default appearance', () => {
        test('option presence. Should return content', async () => {
            const result = getSelectedOptionsContent(options, presenceValue, getKey);

            expect(result).toEqual('content1');
        });
        test('option NOT presence. Should return value', async () => {
            const result = getSelectedOptionsContent(options, notPresenceValue, getKey);

            expect(result).toEqual('val3');
        });
        test('some of option NOT presence. Should return value', async () => {
            const result = getSelectedOptionsContent(
                options,
                [...presenceValue, ...notPresenceValue],
                getKey,
            );

            expect(result).toEqual('content1, val3');
        });
    });
    describe('renderSelectedOptions callback', () => {
        const renderSelectedOptions = jest.fn(() => 'from callback');

        beforeEach(() => renderSelectedOptions.mockClear());

        test('single. Should be called once with an array of the option', async () => {
            getSelectedOptionsContent(options, presenceValue, getKey, renderSelectedOptions);

            expect(renderSelectedOptions).toBeCalledTimes(1);
            expect(renderSelectedOptions).toBeCalledWith([options[0]]);
        });
        test('multiple. Should be called once with the options in the order of value', async () => {
            getSelectedOptionsContent(options, ['val2', 'val1'], getKey, renderSelectedOptions);

            expect(renderSelectedOptions).toBeCalledTimes(1);
            expect(renderSelectedOptions).toBeCalledWith([options[1], options[0]]);
        });
        test('option NOT presence. Should be called with generated object', async () => {
            getSelectedOptionsContent(
                options,
                [...presenceValue, ...notPresenceValue],
                getKey,
                renderSelectedOptions,
            );

            expect(renderSelectedOptions).toBeCalledWith([
                options[0],
                {value: notPresenceValue[0]},
            ]);
        });
        test('empty value. Should not be called', async () => {
            const result = getSelectedOptionsContent(options, [], getKey, renderSelectedOptions);

            expect(result).toBeNull();
            expect(renderSelectedOptions).not.toBeCalled();
        });
    });
});
