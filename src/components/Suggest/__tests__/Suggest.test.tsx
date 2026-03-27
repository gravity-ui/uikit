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

describe('Suggest', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders input and calls onFilterUpdate', async () => {
        const testStr = 'test-str';
        const user = userEvent.setup();
        const onUpdate = jest.fn();

        renderSuggest({onUpdate});

        const input = within(screen.getByTestId(QA_SUGGEST_TEXT_INPUT)).getByRole('textbox');
        await user.type(input, testStr);

        expect(onUpdate).toHaveBeenCalled();
        expect(onUpdate).toHaveBeenLastCalledWith(testStr[testStr.length - 1]);
    });

    test('opens popup on focus and renders items', async () => {
        const user = userEvent.setup();

        renderSuggest();

        expect(screen.queryByText('Earth')).not.toBeInTheDocument();

        const input = within(screen.getByTestId(QA_SUGGEST_TEXT_INPUT)).getByRole('textbox');
        await user.click(input);

        expect(screen.getByTestId(QA_SUGGEST_POPUP)).toBeVisible();
        expect(screen.getByText('Europa')).toBeInTheDocument();
    });

    test('calls onItemClick for enabled items and closes popup', async () => {
        const onItemClick = jest.fn();
        const user = userEvent.setup();

        renderSuggest({onItemClick});

        const input = within(screen.getByTestId(QA_SUGGEST_TEXT_INPUT)).getByRole('textbox');
        await user.click(input);

        const earth = await screen.findByText('Earth');
        await user.click(earth);

        expect(onItemClick).toHaveBeenCalledTimes(1);
        expect(onItemClick.mock.calls[0]?.[0]).toMatchObject(ITEMS[0]);

        await waitFor(() => expect(screen.queryByTestId(QA_SUGGEST_POPUP)).not.toBeInTheDocument());
    });

    test('does not call onItemClick for disabled items', async () => {
        const onItemClick = jest.fn();
        const user = userEvent.setup();

        renderSuggest({
            onItemClick,
            items: [{value: 'earth', content: 'Earth', disabled: true}],
        });

        const input = within(screen.getByTestId(QA_SUGGEST_TEXT_INPUT)).getByRole('textbox');
        await user.click(input);

        const earth = await screen.findByText('Earth');
        await user.click(earth);

        expect(onItemClick).not.toHaveBeenCalled();
    });

    describe('keyboard navigation', () => {
        test('when closed, first ArrowDown only opens popup (early return)', async () => {
            const user = userEvent.setup();

            renderSuggest({autoFocus: true});

            const input = within(screen.getByTestId(QA_SUGGEST_TEXT_INPUT)).getByRole('textbox');
            expect(input).toHaveFocus();

            await user.keyboard('[ArrowDown]');

            expect(await screen.findByTestId(QA_SUGGEST_POPUP)).toBeVisible();
            expect(screen.queryByTestId(ListQa.ACTIVE_ITEM)).not.toBeInTheDocument();

            await user.keyboard('[ArrowDown]');

            expect(screen.getByTestId(ListQa.ACTIVE_ITEM)).toBeInTheDocument();
        });

        test('when open, ArrowDown activates first item', async () => {
            const user = userEvent.setup();

            renderSuggest();

            const input = within(screen.getByTestId(QA_SUGGEST_TEXT_INPUT)).getByRole('textbox');
            await user.click(input);

            expect(screen.queryByTestId(ListQa.ACTIVE_ITEM)).not.toBeInTheDocument();

            await user.keyboard('[ArrowDown]');

            expect(screen.getByTestId(ListQa.ACTIVE_ITEM)).toBeInTheDocument();
        });

        test('when open, Enter triggers onItemClick for active item and closes popup', async () => {
            const user = userEvent.setup();
            const onItemClick = jest.fn();

            renderSuggest({onItemClick});

            const input = within(screen.getByTestId(QA_SUGGEST_TEXT_INPUT)).getByRole('textbox');
            await user.click(input);
            await user.keyboard('[ArrowDown]');
            await user.keyboard('[Enter]');

            expect(onItemClick).toHaveBeenCalledTimes(1);
            expect(onItemClick.mock.calls[0]?.[0]).toMatchObject(ITEMS[0]);

            await waitFor(() =>
                expect(screen.queryByTestId(QA_SUGGEST_POPUP)).not.toBeInTheDocument(),
            );
        });
    });

    describe('popupWidth', () => {
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
            renderSuggest({popupWidth: 'fit'});

            const input = within(screen.getByTestId(QA_SUGGEST_TEXT_INPUT)).getByRole('textbox');
            await user.click(input);

            const popup = await screen.findByTestId(QA_SUGGEST_POPUP);
            expect(popup).toHaveStyle({width: '200px'});
        });

        test('applies popupWidth="auto" as CSS width:auto', async () => {
            const user = userEvent.setup();
            renderSuggest({popupWidth: 'auto'});

            const input = within(screen.getByTestId(QA_SUGGEST_TEXT_INPUT)).getByRole('textbox');
            await user.click(input);

            const popup = await screen.findByTestId(QA_SUGGEST_POPUP);
            expect(popup).toHaveStyle({width: 'auto'});
        });

        test('applies popupWidth number as pixel width', async () => {
            const user = userEvent.setup();
            renderSuggest({popupWidth: 240});

            const input = within(screen.getByTestId(QA_SUGGEST_TEXT_INPUT)).getByRole('textbox');
            await user.click(input);

            const popup = await screen.findByTestId(QA_SUGGEST_POPUP);
            expect(popup).toHaveStyle({width: '240px'});
        });

        test.each([0, -1, Infinity, -Infinity, Number.NaN])(
            'does not set width style for invalid popupWidth=%s',
            async (popupWidth) => {
                const user = userEvent.setup();
                renderSuggest({popupWidth});

                const input = within(screen.getByTestId(QA_SUGGEST_TEXT_INPUT)).getByRole(
                    'textbox',
                );
                await user.click(input);

                const popup = await screen.findByTestId(QA_SUGGEST_POPUP);
                expect(popup.style.width).toBe('');
            },
        );
    });
});
