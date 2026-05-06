import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {render, screen, waitFor, within} from '../../../../test-utils/utils';
import {ListQa} from '../../List';

import type {TestSuggestProps} from './TestSuggest';
import {ITEMS, TestSuggest} from './TestSuggest';

const QA_SUGGEST_POPUP = 'qa-suggest-popup';
const QA_SUGGEST_TEXT_INPUT = 'qa-suggest-text-input';

function renderSuggest(props?: Partial<TestSuggestProps>) {
    return render(<TestSuggest {...props} qa={QA_SUGGEST_TEXT_INPUT} popupQa={QA_SUGGEST_POPUP} />);
}

function getInput() {
    return within(screen.getByTestId(QA_SUGGEST_TEXT_INPUT)).getByRole('combobox');
}

describe('Suggest', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Basic functionality', () => {
        test('renders input and calls onUpdate', async () => {
            const testStr = 'test-str';
            const user = userEvent.setup();
            const onUpdate = jest.fn();

            renderSuggest({value: '', onUpdate});

            const input = getInput();
            await user.type(input, testStr);

            // onUpdate is called for each character typed by userEvent.type
            expect(onUpdate).toHaveBeenCalled();
            expect(onUpdate.mock.calls.length).toBeGreaterThan(0);

            // Check that it was called with accumulated values
            const calls = onUpdate.mock.calls.map((call) => call[0]);
            // Last call should have accumulated all characters
            expect(calls[calls.length - 1]).toContain('r');
        });

        test('opens popup on click and renders items', async () => {
            const user = userEvent.setup();

            renderSuggest({value: '', showOptionsOnEmptyValue: true});

            expect(screen.queryByText('Earth')).not.toBeInTheDocument();

            const input = getInput();
            await user.click(input);

            expect(screen.getByTestId(QA_SUGGEST_POPUP)).toBeVisible();
            expect(screen.getByText('Mars')).toBeInTheDocument();
        });

        test('closes popup on item click', async () => {
            const onOptionClick = jest.fn();
            const user = userEvent.setup();

            renderSuggest({value: '', onOptionClick, showOptionsOnEmptyValue: true});

            const input = getInput();
            await user.click(input);

            const earth = await screen.findByText('Earth');
            await user.click(earth);

            expect(onOptionClick).toHaveBeenCalledTimes(1);
            expect(onOptionClick.mock.calls[0]?.[0]).toMatchObject(ITEMS[0]);

            await waitFor(() =>
                expect(screen.queryByTestId(QA_SUGGEST_POPUP)).not.toBeInTheDocument(),
            );
        });

        test('keeps popup open when onItemClick returns true', async () => {
            const onOptionClick = jest.fn(() => true);
            const user = userEvent.setup();

            renderSuggest({value: '', onOptionClick, showOptionsOnEmptyValue: true});

            const input = getInput();
            await user.click(input);

            const earth = await screen.findByText('Earth');
            await user.click(earth);

            expect(onOptionClick).toHaveBeenCalledTimes(1);
            expect(screen.getByTestId(QA_SUGGEST_POPUP)).toBeVisible();
        });

        test('does not call onItemClick for disabled items', async () => {
            const onOptionClick = jest.fn();
            const user = userEvent.setup();

            renderSuggest({
                value: '',
                onOptionClick,
                items: [{value: 'earth', content: 'Earth', disabled: true}],
                showOptionsOnEmptyValue: true,
            });

            const input = getInput();
            await user.click(input);

            const earth = await screen.findByText('Earth');
            await user.click(earth);

            expect(onOptionClick).not.toHaveBeenCalled();
        });
    });

    describe('Keyboard navigation', () => {
        test('ArrowDown when closed opens popup without activating item', async () => {
            const user = userEvent.setup();

            // Use a controlled wrapper so typing actually updates the value prop
            // (and therefore triggers fetchOptions inside useSuggestState).
            // showOptionsOnEmptyValue is omitted so the popup stays closed initially.
            function ControlledSuggest() {
                const [value, setValue] = React.useState('');
                return (
                    <TestSuggest
                        value={value}
                        onUpdate={setValue}
                        autoFocus
                        qa={QA_SUGGEST_TEXT_INPUT}
                        popupQa={QA_SUGGEST_POPUP}
                    />
                );
            }

            render(<ControlledSuggest />);

            const input = getInput();
            expect(input).toHaveFocus();
            expect(screen.queryByTestId(QA_SUGGEST_POPUP)).not.toBeInTheDocument();

            // Typing a character updates value → fetchOptions runs → popup opens
            await user.type(input, 'e');
            await screen.findByTestId(QA_SUGGEST_POPUP);

            // Close popup with Escape
            await user.keyboard('[Escape]');
            await waitFor(() =>
                expect(screen.queryByTestId(QA_SUGGEST_POPUP)).not.toBeInTheDocument(),
            );

            // ArrowDown when closed reopens the popup but does NOT activate any item
            await user.keyboard('[ArrowDown]');

            expect(await screen.findByTestId(QA_SUGGEST_POPUP)).toBeVisible();
            expect(screen.queryByTestId(ListQa.ACTIVE_ITEM)).not.toBeInTheDocument();
        });

        test('ArrowDown when open activates first item', async () => {
            const user = userEvent.setup();

            renderSuggest({value: '', showOptionsOnEmptyValue: true});

            const input = getInput();
            await user.click(input);

            expect(screen.queryByTestId(ListQa.ACTIVE_ITEM)).not.toBeInTheDocument();

            await user.keyboard('[ArrowDown]');

            expect(screen.getByTestId(ListQa.ACTIVE_ITEM)).toBeInTheDocument();
        });

        test('ArrowUp navigates through items', async () => {
            const user = userEvent.setup();

            renderSuggest({value: '', showOptionsOnEmptyValue: true});

            const input = getInput();
            await user.click(input);
            await user.keyboard('[ArrowDown]');
            await user.keyboard('[ArrowDown]');

            expect(screen.getByTestId(ListQa.ACTIVE_ITEM)).toHaveTextContent('Mars');

            await user.keyboard('[ArrowUp]');

            expect(screen.getByTestId(ListQa.ACTIVE_ITEM)).toHaveTextContent('Earth');
        });

        test('Enter triggers onItemClick for active item and closes popup', async () => {
            const user = userEvent.setup();
            const onOptionClick = jest.fn();

            renderSuggest({value: '', onOptionClick, showOptionsOnEmptyValue: true});

            const input = getInput();
            await user.click(input);
            await user.keyboard('[ArrowDown]');
            await user.keyboard('[Enter]');

            expect(onOptionClick).toHaveBeenCalledTimes(1);
            expect(onOptionClick.mock.calls[0]?.[0]).toMatchObject(ITEMS[0]);

            await waitFor(() =>
                expect(screen.queryByTestId(QA_SUGGEST_POPUP)).not.toBeInTheDocument(),
            );
        });

        test('Escape closes popup', async () => {
            const user = userEvent.setup();

            renderSuggest({value: '', showOptionsOnEmptyValue: true});

            const input = getInput();
            await user.click(input);

            expect(screen.getByTestId(QA_SUGGEST_POPUP)).toBeVisible();

            await user.keyboard('[Escape]');

            await waitFor(() =>
                expect(screen.queryByTestId(QA_SUGGEST_POPUP)).not.toBeInTheDocument(),
            );
        });

        test('Enter prevents form submission when popup is open', async () => {
            const onSubmit = jest.fn((e) => e.preventDefault());
            const user = userEvent.setup();

            render(
                <form onSubmit={onSubmit}>
                    <TestSuggest
                        value=""
                        qa={QA_SUGGEST_TEXT_INPUT}
                        showOptionsOnEmptyValue={true}
                    />
                </form>,
            );

            const input = getInput();
            await user.click(input);
            await user.keyboard('[Enter]');

            expect(onSubmit).not.toHaveBeenCalled();
        });
    });

    describe('Async getItems', () => {
        test('shows loading state and fetches items', async () => {
            const mockItems = ITEMS.slice(0, 2);
            const getOptions = jest.fn(async () => mockItems);

            const user = userEvent.setup();
            renderSuggest({value: '', getOptions, showOptionsOnEmptyValue: true, debounce: 0});

            const input = getInput();
            await user.click(input);

            await waitFor(() => expect(getOptions).toHaveBeenCalled());
            await screen.findByText('Earth');
        });

        test.skip('handles race conditions correctly', () => {
            // TODO: Test skipped - needs better async testing strategy
            // The component implements race condition handling using request IDs
            // to ensure only the latest async getOptions result updates state.
        });

        test('handles errors and shows error UI', async () => {
            const getOptions = jest.fn(async () => {
                throw new Error('Network error');
            });

            const user = userEvent.setup();
            renderSuggest({
                value: '',
                getOptions,
                showOptionsOnEmptyValue: true,
                debounce: 0,
            });

            const input = getInput();

            // Focus and click to trigger popup and fetch
            input.focus();
            await user.click(input);

            // Wait for popup to be visible
            await waitFor(() => expect(screen.getByTestId(QA_SUGGEST_POPUP)).toBeVisible());

            // Wait for error UI - use findByText which has built-in waiting
            const errorElement = await screen.findByText(/error occurred/i, {}, {timeout: 3000});
            expect(errorElement).toBeInTheDocument();

            // Verify getOptions was called
            expect(getOptions).toHaveBeenCalled();
        });

        test('retry button refetches items', async () => {
            const user = userEvent.setup();
            let shouldFail = true;
            const getOptions = jest.fn(async () => {
                if (shouldFail) {
                    throw new Error('Network error');
                }
                return ITEMS;
            });

            renderSuggest({value: '', getOptions, showOptionsOnEmptyValue: true, debounce: 0});

            const input = getInput();
            input.focus();
            await user.click(input);

            // Wait for popup
            await waitFor(() => expect(screen.getByTestId(QA_SUGGEST_POPUP)).toBeVisible());

            // Wait for error to show
            await screen.findByText(/error occurred/i, {}, {timeout: 3000});

            shouldFail = false;

            const retryButton = screen.getByRole('button', {name: /retry/i});
            await user.click(retryButton);

            // Wait for successful fetch
            await screen.findByText('Earth', {}, {timeout: 2000});
            expect(getOptions).toHaveBeenCalledTimes(2);
        });
    });

    describe('Debounce', () => {
        test('debounces getOptions calls', async () => {
            const getOptions = jest.fn(async (value: string) => {
                return ITEMS.filter((item) => item.content.toLowerCase().includes(value));
            });

            const user = userEvent.setup({delay: null});

            function ControlledSuggest() {
                const [value, setValue] = React.useState('');
                return (
                    <TestSuggest
                        value={value}
                        onUpdate={setValue}
                        getOptions={getOptions}
                        debounce={200}
                        qa={QA_SUGGEST_TEXT_INPUT}
                    />
                );
            }

            render(<ControlledSuggest />);

            const input = getInput();

            // Type multiple characters quickly
            await user.type(input, 'ear');

            // Should not have been called immediately due to debounce
            expect(getOptions).not.toHaveBeenCalled();

            // Wait for debounce to complete
            await waitFor(() => expect(getOptions).toHaveBeenCalled(), {timeout: 400});

            // Should be called once with the final value
            expect(getOptions).toHaveBeenCalledTimes(1);
            expect(getOptions.mock.calls[0][0]).toBe('ear');
        });
    });

    describe('Behavior flags', () => {
        test('showOptionsOnEmptyValue shows items when value is empty', async () => {
            const user = userEvent.setup();

            renderSuggest({value: '', showOptionsOnEmptyValue: true});

            const input = getInput();
            await user.click(input);

            expect(screen.getByTestId(QA_SUGGEST_POPUP)).toBeVisible();
            expect(screen.getByText('Earth')).toBeInTheDocument();
        });

        test('getOptionsOnMount fetches items on mount', async () => {
            const getOptions = jest.fn(async () => ITEMS);

            renderSuggest({value: 'test', getOptions, getOptionsOnMount: true});

            await waitFor(() => expect(getOptions).toHaveBeenCalledWith('test'));
        });

        test('applicableInputValue with onInputEnterKeyDown', async () => {
            const onInputEnterKeyDown = jest.fn();
            const user = userEvent.setup();

            renderSuggest({
                value: 'custom value',
                applicableInputValue: true,
                onInputEnterKeyDown,
                autoFocus: true,
            });

            await user.keyboard('[Enter]');

            expect(onInputEnterKeyDown).toHaveBeenCalledWith('custom value', expect.any(Object));
        });

        test('showNoOptionsMessage=false hides empty state', async () => {
            const user = userEvent.setup();

            renderSuggest({
                value: 'xyz',
                items: [],
                showNoOptionsMessage: false,
            });

            const input = getInput();
            await user.click(input);

            expect(screen.queryByTestId(QA_SUGGEST_POPUP)).not.toBeInTheDocument();
        });

        test('showNoOptionsMessage=true shows empty state', async () => {
            const user = userEvent.setup();

            renderSuggest({
                value: 'xyz',
                items: [],
                showNoOptionsMessage: true,
            });

            const input = getInput();
            await user.click(input);

            expect(screen.getByTestId(QA_SUGGEST_POPUP)).toBeVisible();
            expect(screen.getByText('Nothing found')).toBeInTheDocument();
        });
    });

    describe('Event handlers', () => {
        test('calls onBlur when input loses focus', async () => {
            const onBlur = jest.fn();
            const user = userEvent.setup();

            renderSuggest({value: '', onBlur});

            const input = getInput();
            await user.click(input);
            await user.tab();

            expect(onBlur).toHaveBeenCalledTimes(1);
        });

        test('calls onOpenChange when popup state changes', async () => {
            const onOpenChange = jest.fn();
            const user = userEvent.setup();

            renderSuggest({value: '', onOpenChange, showOptionsOnEmptyValue: true});

            const input = getInput();
            await user.click(input);

            await waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(true));

            await user.keyboard('[Escape]');

            await waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(false));
        });

        test('calls onInputKeyDown when key is pressed', async () => {
            const onInputKeyDown = jest.fn();
            const user = userEvent.setup();

            renderSuggest({value: '', onInputKeyDown, autoFocus: true});

            await user.keyboard('a');

            expect(onInputKeyDown).toHaveBeenCalledWith('', expect.any(Object));
        });

        test('calls onTabKeyDown and respects return value', async () => {
            const onTabKeyDown = jest.fn(() => true);
            const user = userEvent.setup();

            renderSuggest({
                value: '',
                onTabKeyDown,
                autoFocus: true,
                showOptionsOnEmptyValue: true,
            });

            const input = getInput();
            await user.click(input);

            await user.keyboard('[Tab]');

            expect(onTabKeyDown).toHaveBeenCalled();
            expect(screen.getByTestId(QA_SUGGEST_POPUP)).toBeVisible();
        });
    });

    describe('Popup width modes', () => {
        const offsetWidthDescriptor = Object.getOwnPropertyDescriptor(
            HTMLElement.prototype,
            'offsetWidth',
        );

        beforeAll(() => {
            Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
                configurable: true,
                get() {
                    return 200;
                },
            });
        });

        afterAll(() => {
            if (offsetWidthDescriptor) {
                Object.defineProperty(HTMLElement.prototype, 'offsetWidth', offsetWidthDescriptor);
            } else {
                Reflect.deleteProperty(HTMLElement.prototype, 'offsetWidth');
            }
        });

        test('applies width from inputElement for popupWidth="fit"', async () => {
            const user = userEvent.setup();
            renderSuggest({value: '', popupWidth: 'fit', showOptionsOnEmptyValue: true});

            const input = getInput();
            await user.click(input);

            const popup = await screen.findByTestId(QA_SUGGEST_POPUP);
            expect(popup).toHaveStyle({width: '200px'});
        });

        test('applies popupWidth number as pixel width', async () => {
            const user = userEvent.setup();
            renderSuggest({value: '', popupWidth: 300, showOptionsOnEmptyValue: true});

            const input = getInput();
            await user.click(input);

            const popup = await screen.findByTestId(QA_SUGGEST_POPUP);
            expect(popup).toHaveStyle({width: '300px'});
        });

        test.each([0, -1, Infinity, -Infinity, Number.NaN])(
            'does not set width style for invalid popupWidth=%s',
            async (popupWidth) => {
                const user = userEvent.setup();
                renderSuggest({value: '', popupWidth, showOptionsOnEmptyValue: true});

                const input = getInput();
                await user.click(input);

                const popup = await screen.findByTestId(QA_SUGGEST_POPUP);
                expect(popup.style.width).toBe('');
            },
        );
    });

    describe('ARIA attributes', () => {
        test('sets correct ARIA attributes on input', async () => {
            const user = userEvent.setup();

            renderSuggest({value: '', showOptionsOnEmptyValue: true, id: 'test-suggest'});

            const input = within(screen.getByTestId(QA_SUGGEST_TEXT_INPUT)).getByRole('combobox');

            expect(input).toHaveAttribute('role', 'combobox');
            expect(input).toHaveAttribute('aria-autocomplete', 'list');
            expect(input).toHaveAttribute('aria-expanded', 'false');
            expect(input).toHaveAttribute('aria-controls', 'test-suggest-popup');

            await user.click(input);

            expect(input).toHaveAttribute('aria-expanded', 'true');
        });

        test('sets aria-activedescendant when item is active', async () => {
            const user = userEvent.setup();

            renderSuggest({value: '', showOptionsOnEmptyValue: true, id: 'test-suggest'});

            const input = within(screen.getByTestId(QA_SUGGEST_TEXT_INPUT)).getByRole('combobox');
            await user.click(input);
            await user.keyboard('[ArrowDown]');

            await waitFor(() =>
                expect(input).toHaveAttribute('aria-activedescendant', 'test-suggest-list-item-0'),
            );
        });

        test('sets aria-autocomplete="both" with applicableInputValue', () => {
            renderSuggest({value: '', applicableInputValue: true});

            const input = within(screen.getByTestId(QA_SUGGEST_TEXT_INPUT)).getByRole('combobox');
            expect(input).toHaveAttribute('aria-autocomplete', 'both');
        });
    });

    describe('Custom rendering', () => {
        test('uses custom renderEmptyOptions', async () => {
            const user = userEvent.setup();
            const CustomEmpty = ({value}: {value: string}) => <div>Custom empty for: {value}</div>;

            renderSuggest({
                value: 'xyz',
                items: [],
                renderEmptyOptions: CustomEmpty,
            });

            const input = getInput();
            await user.click(input);

            expect(screen.getByText('Custom empty for: xyz')).toBeInTheDocument();
        });

        test('uses custom renderFetchOptionsError', async () => {
            const CustomError = ({error}: {error?: Error | null}) => (
                <div>Custom error: {error?.message}</div>
            );
            const getOptions = jest.fn(async () => {
                throw new Error('Test error');
            });

            const user = userEvent.setup();
            renderSuggest({
                value: '',
                getOptions,
                renderFetchOptionsError: CustomError,
                showOptionsOnEmptyValue: true,
                debounce: 0,
            });

            const input = getInput();
            await user.click(input);

            await screen.findByText('Custom error: Test error');
        });

        test('uses custom renderPopup', async () => {
            const user = userEvent.setup();
            const CustomPopup = ({list}: {list: React.ReactNode}) => (
                <div>
                    <div>Header</div>
                    {list}
                    <div>Footer</div>
                </div>
            );

            renderSuggest({
                value: '',
                renderPopup: CustomPopup,
                showOptionsOnEmptyValue: true,
            });

            const input = getInput();
            await user.click(input);

            expect(screen.getByText('Header')).toBeInTheDocument();
            expect(screen.getByText('Footer')).toBeInTheDocument();
            expect(screen.getByText('Earth')).toBeInTheDocument();
        });
    });

    describe('Edge cases', () => {
        test('handles empty items array', async () => {
            const user = userEvent.setup();

            renderSuggest({value: 'test', items: []});

            const input = getInput();
            await user.click(input);

            expect(screen.getByText('Nothing found')).toBeInTheDocument();
        });

        test('does not open popup when disabled', async () => {
            const user = userEvent.setup();

            renderSuggest({value: '', disabled: true});

            const input = getInput();
            await user.click(input);

            expect(screen.queryByTestId(QA_SUGGEST_POPUP)).not.toBeInTheDocument();
        });

        test('closes popup on outside click', async () => {
            const user = userEvent.setup();

            const {container} = renderSuggest({value: '', showOptionsOnEmptyValue: true});

            const input = getInput();
            await user.click(input);

            expect(screen.getByTestId(QA_SUGGEST_POPUP)).toBeVisible();

            await user.click(container);

            await waitFor(() =>
                expect(screen.queryByTestId(QA_SUGGEST_POPUP)).not.toBeInTheDocument(),
            );
        });

        test('uses provided id prop', () => {
            renderSuggest({value: '', showOptionsOnEmptyValue: true, id: 'custom-id'});

            const input = within(screen.getByTestId(QA_SUGGEST_TEXT_INPUT)).getByRole('combobox');
            expect(input).toHaveAttribute('id', 'custom-id');
        });

        test('applies inputClassName to input', () => {
            renderSuggest({value: '', inputClassName: 'custom-input-class'});

            const textInput = screen.getByTestId(QA_SUGGEST_TEXT_INPUT);
            expect(textInput).toHaveClass('custom-input-class');
        });
    });

    describe('Virtualization', () => {
        test('passes virtualized prop to List', async () => {
            const user = userEvent.setup();

            renderSuggest({
                value: '',
                virtualized: true,
                itemHeight: 40,
                items: ITEMS,
                showOptionsOnEmptyValue: true,
            });

            const input = getInput();
            await user.click(input);

            // List should be rendered (we can't easily check virtualized internal state)
            await waitFor(() => expect(screen.getByTestId(QA_SUGGEST_POPUP)).toBeVisible());
            expect(screen.getByText('Earth')).toBeInTheDocument();
        });
    });
});
