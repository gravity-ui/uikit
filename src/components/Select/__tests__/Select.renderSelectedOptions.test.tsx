import {DEFAULT_OPTIONS, TEST_QA, setup} from './utils';

const PLACEHOLDER = 'Pick';

describe('Select renderSelectedOptions', () => {
    test('renders the whole selection at once', () => {
        const {getByTestId} = setup({
            multiple: true,
            value: DEFAULT_OPTIONS.map((option) => option.value),
            renderSelectedOptions: (options) =>
                options.length === DEFAULT_OPTIONS.length ? 'All languages' : null,
        });

        expect(getByTestId(TEST_QA)).toHaveTextContent('All languages');
    });

    test('an array of elements without keys renders without a warning', () => {
        const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
        const {getByTestId} = setup({
            multiple: true,
            value: [DEFAULT_OPTIONS[0].value, DEFAULT_OPTIONS[1].value],
            // eslint-disable-next-line react/jsx-key -- the keys are the Select's to set
            renderSelectedOptions: (options) => options.map((option) => <b>{option.content}</b>),
        });

        expect(getByTestId(TEST_QA)).toHaveTextContent('JavaScriptPython');
        expect(consoleError).not.toHaveBeenCalledWith(
            expect.stringContaining('unique "key"'),
            expect.anything(),
            expect.anything(),
            expect.anything(),
        );
        consoleError.mockRestore();
    });

    test('null renders an empty text instead of the placeholder', () => {
        const {getByTestId} = setup({
            placeholder: PLACEHOLDER,
            value: [DEFAULT_OPTIONS[0].value],
            renderSelectedOptions: () => null,
        });

        expect(getByTestId(TEST_QA)).not.toHaveTextContent(PLACEHOLDER);
        expect(getByTestId(TEST_QA)).not.toHaveTextContent(DEFAULT_OPTIONS[0].content as string);
    });

    test('without the prop the texts are joined with a comma', () => {
        const {getByTestId} = setup({
            multiple: true,
            value: [DEFAULT_OPTIONS[1].value, DEFAULT_OPTIONS[0].value],
        });

        expect(getByTestId(TEST_QA)).toHaveTextContent('Python, JavaScript');
    });
});
