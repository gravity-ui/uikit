import userEvent from '@testing-library/user-event';

import {render, screen, waitFor, within} from '../../../../../test-utils/utils';
import {ListQa} from '../../../List';

import type {TestSuggestProps} from './TestSuggest';
import {ITEMS, TestSuggest} from './TestSuggest';

const QA_POPUP = 'qa-suggest-popup';
const QA_INPUT = 'qa-suggest-input';

function renderSuggest(props?: Partial<TestSuggestProps>) {
    return render(<TestSuggest qa={QA_INPUT} popupProps={{qa: QA_POPUP}} {...props} />);
}

describe('Suggest', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders input', () => {
        renderSuggest();
        expect(screen.getByTestId(QA_INPUT)).toBeInTheDocument();
    });

    test('calls onUpdate when typing', async () => {
        const onUpdate = jest.fn();
        const user = userEvent.setup();
        renderSuggest({onUpdate});

        const input = within(screen.getByTestId(QA_INPUT)).getByRole('combobox');
        await user.type(input, 'ear');

        expect(onUpdate).toHaveBeenCalled();
        expect(onUpdate).toHaveBeenLastCalledWith('r');
    });

    test('opens popup when typing (items present)', async () => {
        const user = userEvent.setup();
        renderSuggest();

        expect(screen.queryByTestId(QA_POPUP)).not.toBeInTheDocument();

        const input = within(screen.getByTestId(QA_INPUT)).getByRole('combobox');
        await user.type(input, 'e');

        expect(screen.getByTestId(QA_POPUP)).toBeVisible();
    });

    test('shows items in popup after click', async () => {
        const user = userEvent.setup();
        renderSuggest();

        const input = within(screen.getByTestId(QA_INPUT)).getByRole('combobox');
        await user.type(input, 'e');

        expect(screen.getByText('Earth')).toBeInTheDocument();
        expect(screen.getByText('Europa')).toBeInTheDocument();
    });

    test('calls onOptionClick and closes popup on item click', async () => {
        const onOptionClick = jest.fn(() => false);
        const user = userEvent.setup();
        renderSuggest({onOptionClick});

        const input = within(screen.getByTestId(QA_INPUT)).getByRole('combobox');
        await user.type(input, 'e');

        const earth = await screen.findByText('Earth');
        await user.click(earth);

        expect(onOptionClick).toHaveBeenCalledTimes(1);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect((onOptionClick.mock.calls as any)[0][0]).toMatchObject(ITEMS[0]);
        await waitFor(() => expect(screen.queryByTestId(QA_POPUP)).not.toBeInTheDocument());
    });

    test('keeps popup open when onOptionClick returns true', async () => {
        const onOptionClick = jest.fn(() => true);
        const user = userEvent.setup();
        renderSuggest({onOptionClick});

        const input = within(screen.getByTestId(QA_INPUT)).getByRole('combobox');
        await user.type(input, 'e');

        const earth = await screen.findByText('Earth');
        await user.click(earth);

        expect(onOptionClick).toHaveBeenCalledTimes(1);
        expect(screen.getByTestId(QA_POPUP)).toBeVisible();
    });

    test('does not call onOptionClick for disabled items', async () => {
        const onOptionClick = jest.fn();
        const user = userEvent.setup();
        renderSuggest({
            options: [{value: 'earth', content: 'Earth', disabled: true}],
            onOptionClick,
        });

        const input = within(screen.getByTestId(QA_INPUT)).getByRole('combobox');
        await user.type(input, 'e');

        const earth = await screen.findByText('Earth');
        await user.click(earth);

        expect(onOptionClick).not.toHaveBeenCalled();
    });

    test('closes popup on Escape', async () => {
        const user = userEvent.setup();
        renderSuggest();

        const input = within(screen.getByTestId(QA_INPUT)).getByRole('combobox');
        await user.type(input, 'e');
        expect(screen.getByTestId(QA_POPUP)).toBeVisible();

        await user.keyboard('[Escape]');
        await waitFor(() => expect(screen.queryByTestId(QA_POPUP)).not.toBeInTheDocument());
    });

    test('shows loading indicator when loading=true', async () => {
        const user = userEvent.setup();
        renderSuggest({loading: true, options: []});

        const input = within(screen.getByTestId(QA_INPUT)).getByRole('combobox');
        await user.type(input, 'e');

        expect(screen.getByTestId(QA_POPUP)).toBeVisible();
    });

    describe('controlled open', () => {
        test('does not auto-toggle open when open is controlled', async () => {
            const onOpenChange = jest.fn();
            const user = userEvent.setup();
            renderSuggest({open: false, onOpenChange});

            const input = within(screen.getByTestId(QA_INPUT)).getByRole('combobox');
            await user.type(input, 'e');

            // The consumer owns `open`; typing must not request it (uncontrolled would
            // auto-open here). Regression for auto-open/close overriding controlled state.
            expect(onOpenChange).not.toHaveBeenCalled();
        });
    });

    describe('keyboard navigation', () => {
        test('ArrowDown opens popup when closed and value is present', async () => {
            const user = userEvent.setup();
            renderSuggest({inputProps: {autoFocus: true}});

            const input = within(screen.getByTestId(QA_INPUT)).getByRole('combobox');
            // Type a value first so there's something to show
            await user.type(input, 'e');
            // Close popup by pressing Escape
            await user.keyboard('[Escape]');
            await waitFor(() => expect(screen.queryByTestId(QA_POPUP)).not.toBeInTheDocument());

            // Now ArrowDown should reopen
            await user.keyboard('[ArrowDown]');
            expect(await screen.findByTestId(QA_POPUP)).toBeVisible();
        });

        test('ArrowDown then ArrowDown activates first item', async () => {
            const user = userEvent.setup();
            renderSuggest({inputProps: {autoFocus: true}});

            const input = within(screen.getByTestId(QA_INPUT)).getByRole('combobox');
            await user.type(input, 'e');
            await user.keyboard('[ArrowDown]');

            expect(screen.getByTestId(ListQa.ACTIVE_ITEM)).toBeInTheDocument();
        });

        test('Enter selects active item and closes popup', async () => {
            const onOptionClick = jest.fn(() => false);
            const user = userEvent.setup();
            renderSuggest({onOptionClick, inputProps: {autoFocus: true}});

            const input = within(screen.getByTestId(QA_INPUT)).getByRole('combobox');
            await user.type(input, 'e');
            await user.keyboard('[ArrowDown]');
            await user.keyboard('[Enter]');

            expect(onOptionClick).toHaveBeenCalledTimes(1);
            await waitFor(() => expect(screen.queryByTestId(QA_POPUP)).not.toBeInTheDocument());
        });
    });

    describe('popup width', () => {
        test('applies popupWidth="fit"', async () => {
            const user = userEvent.setup();
            renderSuggest({popupWidth: 'fit'});

            const input = within(screen.getByTestId(QA_INPUT)).getByRole('combobox');
            await user.type(input, 'e');

            const popup = await screen.findByTestId(QA_POPUP);
            expect(popup).toBeInTheDocument();
        });

        test('applies popupWidth as pixel number', async () => {
            const user = userEvent.setup();
            renderSuggest({popupWidth: 300});

            const input = within(screen.getByTestId(QA_INPUT)).getByRole('combobox');
            await user.type(input, 'e');

            const popup = await screen.findByTestId(QA_POPUP);
            expect(popup).toBeInTheDocument();
        });
    });

    describe('inputProps', () => {
        test('passes placeholder to input', () => {
            renderSuggest({inputProps: {placeholder: 'Search here\u2026'}});
            expect(screen.getByPlaceholderText('Search here\u2026')).toBeInTheDocument();
        });

        test('disabled input cannot open popup', async () => {
            const user = userEvent.setup();
            renderSuggest({inputProps: {disabled: true}});

            const input = within(screen.getByTestId(QA_INPUT)).getByRole('combobox');
            await user.click(input);

            expect(screen.queryByTestId(QA_POPUP)).not.toBeInTheDocument();
        });
    });
});
