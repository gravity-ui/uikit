import {getSelectOptionText} from '../utils';

describe('getSelectOptionText', () => {
    let warn: jest.SpyInstance;

    beforeEach(() => {
        warn = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        warn.mockRestore();
    });

    test('takes the content, the children and then the value', () => {
        expect(getSelectOptionText({value: 'v', content: 'Content'})).toBe('Content');
        expect(getSelectOptionText({value: 'v', children: 'Children'})).toBe('Children');
        expect(getSelectOptionText({value: 'v'})).toBe('v');
    });

    test('a number is text as it is, without a warning', () => {
        expect(getSelectOptionText({value: '10', content: 10})).toBe('10');
        expect(warn).not.toHaveBeenCalled();
    });

    test('content that is a node falls back to the value and asks for getOptionText', () => {
        expect(getSelectOptionText({value: 'v', content: ['Value ', 1]})).toBe('v');
        expect(warn).toHaveBeenCalledWith(expect.stringContaining('getOptionText'));
    });
});
