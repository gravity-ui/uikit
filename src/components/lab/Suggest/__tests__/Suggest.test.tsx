import userEvent from '@testing-library/user-event';

import {setupIntersectionObserverMock} from '../../../../../test-utils/setupIntersectionObserverMock';
import {act, render, screen, waitFor, within} from '../../../../../test-utils/utils';
import {Suggest} from '../Suggest';

import type {TestSuggestProps} from './TestSuggest';
import {ITEMS, TestSuggest} from './TestSuggest';

const QA_POPUP = 'qa-suggest-popup';
const QA_INPUT = 'qa-suggest-input';

function renderSuggest(props?: Partial<TestSuggestProps>) {
    return render(<TestSuggest qa={QA_INPUT} popupProps={{qa: QA_POPUP}} {...props} />);
}

describe('Suggest', () => {
    beforeEach(() => setupIntersectionObserverMock());
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
        render(<Suggest defaultValue="" options={ITEMS} onUpdate={onUpdate} />);

        const input = screen.getByRole('combobox');
        await user.type(input, 'ear');

        expect(input).toHaveValue('ear');
        expect(onUpdate).toHaveBeenLastCalledWith('ear');
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

    test('opens custom empty content and passes list=null to renderPopup', async () => {
        const user = userEvent.setup();
        const renderPopup = jest.fn(() => <span>No results</span>);
        renderSuggest({options: [], renderPopup});
        await user.type(screen.getByRole('combobox'), 'unknown');

        expect(screen.getByTestId(QA_POPUP)).toBeVisible();
        expect(screen.getByText('No results')).toBeVisible();
        expect(renderPopup).toHaveBeenLastCalledWith({list: null});
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    test('forwards the event and reason when closing on an outside press', async () => {
        const user = userEvent.setup();
        const onOpenChange = jest.fn();
        renderSuggest({defaultOpen: true, onOpenChange});
        expect(screen.getByTestId(QA_POPUP)).toBeVisible();
        await user.click(document.body);

        expect(onOpenChange).toHaveBeenCalledTimes(1);
        expect(onOpenChange).toHaveBeenCalledWith(false, expect.any(Event), 'outside-press');
        await waitFor(() => expect(screen.queryByTestId(QA_POPUP)).not.toBeInTheDocument());
    });

    test('shows loading indicator when loading=true', async () => {
        const user = userEvent.setup();
        renderSuggest({loading: true, options: []});

        const input = within(screen.getByTestId(QA_INPUT)).getByRole('combobox');
        await user.type(input, 'e');

        // Loader has no accessible role or label.
        // eslint-disable-next-line testing-library/no-node-access
        expect(screen.getByTestId(QA_POPUP).querySelector('.g-loader')).toBeVisible();
    });

    describe('controlled open', () => {
        test('typing and clearing do not request opening or closing', async () => {
            const onOpenChange = jest.fn();
            const user = userEvent.setup();
            renderSuggest({open: false, onOpenChange});

            await user.tab();
            await user.keyboard('e[Backspace]');

            expect(screen.getByRole('combobox')).toHaveValue('');
            expect(onOpenChange).not.toHaveBeenCalled();
        });

        test.each([
            {gesture: 'ArrowDown', eventType: 'keydown', reason: 'list-navigation'},
            {gesture: 'ArrowUp', eventType: 'keydown', reason: 'list-navigation'},
            {gesture: 'click', eventType: 'click', reason: 'click'},
        ])(
            '$gesture requests opening an empty input without applying it',
            async ({gesture, eventType, reason}) => {
                const user = userEvent.setup();
                const onOpenChange = jest.fn();
                const {rerender} = render(
                    <Suggest options={ITEMS} open={false} onOpenChange={onOpenChange} />,
                );
                const input = screen.getByRole('combobox');
                await user.tab();
                if (gesture === 'click') {
                    await user.click(input);
                } else {
                    await user.keyboard(`[${gesture}]`);
                }

                expect(onOpenChange).toHaveBeenCalledTimes(1);
                expect(onOpenChange).toHaveBeenLastCalledWith(
                    true,
                    expect.objectContaining({type: eventType}),
                    reason,
                );
                expect(input).toHaveAttribute('aria-expanded', 'false');
                expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

                rerender(<Suggest options={ITEMS} open onOpenChange={onOpenChange} />);
                expect(screen.getByRole('listbox')).toBeVisible();
                await user.keyboard('[Escape]');
                expect(onOpenChange).toHaveBeenLastCalledWith(
                    false,
                    expect.objectContaining({type: 'keydown'}),
                    'escape-key',
                );
                rerender(<Suggest options={ITEMS} open={false} onOpenChange={onOpenChange} />);
                onOpenChange.mockClear();

                if (gesture === 'click') {
                    await user.click(input);
                } else {
                    await user.keyboard(`[${gesture}]`);
                }
                expect(onOpenChange).toHaveBeenCalledTimes(1);
                expect(onOpenChange).toHaveBeenLastCalledWith(
                    true,
                    expect.objectContaining({type: eventType}),
                    reason,
                );
                expect(input).toHaveAttribute('aria-expanded', 'false');
            },
        );
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

            expect(input).toHaveAttribute(
                'aria-activedescendant',
                screen.getByRole('option', {name: 'Earth'}).id,
            );
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
            const offsetWidth = jest
                .spyOn(HTMLElement.prototype, 'offsetWidth', 'get')
                .mockReturnValue(512);
            try {
                const user = userEvent.setup();
                renderSuggest({popupWidth: 'fit'});
                await user.type(screen.getByRole('combobox'), 'e');
                expect(await screen.findByTestId(QA_POPUP)).toHaveStyle({width: '512px'});
            } finally {
                offsetWidth.mockRestore();
            }
        });

        test('applies popupWidth as pixel number', async () => {
            const user = userEvent.setup();
            renderSuggest({popupWidth: 300});

            const input = within(screen.getByTestId(QA_INPUT)).getByRole('combobox');
            await user.type(input, 'e');

            const popup = await screen.findByTestId(QA_POPUP);
            expect(popup).toHaveStyle({width: '300px'});
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

describe('Suggest: new List integration', () => {
    beforeEach(() => setupIntersectionObserverMock());

    test('opens without preselection, skips disabled options and keeps focus on the input', async () => {
        const user = userEvent.setup();
        const onOptionClick = jest.fn();
        renderSuggest({options: [{...ITEMS[0], disabled: true}, ...ITEMS.slice(1)], onOptionClick});
        const input = screen.getByRole('combobox');
        await user.type(input, 'e');
        expect(input).not.toHaveAttribute('aria-activedescendant');
        expect(input).toHaveAttribute('aria-controls', screen.getByRole('listbox').id);
        await user.keyboard('[ArrowDown]');
        expect(input).toHaveAttribute(
            'aria-activedescendant',
            screen.getByRole('option', {name: 'Europa'}).id,
        );
        expect(input).toHaveFocus();
        await user.keyboard('[Enter]');
        expect(onOptionClick).toHaveBeenCalledWith(ITEMS[1], 1);
        expect(input).toHaveFocus();
    });

    test('clicking an option keeps DOM focus on the input', async () => {
        const user = userEvent.setup();
        renderSuggest({onOptionClick: () => true});
        const input = screen.getByRole('combobox');
        await user.type(input, 'e');
        await user.click(screen.getByRole('option', {name: 'Earth'}));
        expect(input).toHaveFocus();
    });

    test('clears the active index and ARIA when closed, even with keepMounted', async () => {
        const user = userEvent.setup();
        const onActiveIndexChange = jest.fn();
        renderSuggest({onActiveIndexChange, popupProps: {keepMounted: true}});
        const input = screen.getByRole('combobox');
        await user.type(input, 'e');
        await user.keyboard('[ArrowDown]');
        expect(onActiveIndexChange).toHaveBeenLastCalledWith(0);
        await user.keyboard('[Escape]');
        expect(input).toHaveAttribute('aria-expanded', 'false');
        expect(input).not.toHaveAttribute('aria-activedescendant');
        expect(screen.queryByRole('listbox', {hidden: true})).not.toBeInTheDocument();
        expect(onActiveIndexChange).toHaveBeenLastCalledWith(undefined);
        await user.keyboard('[ArrowDown]');
        expect(input).not.toHaveAttribute('aria-activedescendant');
    });

    test('keeps an available option active when typing', async () => {
        const user = userEvent.setup();
        const onOptionClick = jest.fn();
        const onActiveIndexChange = jest.fn();
        renderSuggest({onOptionClick, onActiveIndexChange});
        const input = screen.getByRole('combobox');
        await user.type(input, 'e');
        await user.keyboard('[ArrowDown]');
        await user.type(input, 'a');
        expect(input).toHaveAttribute(
            'aria-activedescendant',
            screen.getByRole('option', {name: 'Earth'}).id,
        );
        expect(onActiveIndexChange).toHaveBeenCalledTimes(1);
        expect(onActiveIndexChange).toHaveBeenLastCalledWith(0);
        await user.keyboard('[Enter]');
        expect(onOptionClick).toHaveBeenCalledWith(ITEMS[0], 0);
    });

    test('Enter without an active option reaches the consumer', async () => {
        const user = userEvent.setup();
        const onOptionClick = jest.fn();
        const onKeyDown = jest.fn();
        renderSuggest({onOptionClick, inputProps: {onKeyDown}});
        const input = screen.getByRole('combobox');
        await user.type(input, 'ea');
        expect(input).not.toHaveAttribute('aria-activedescendant');
        onKeyDown.mockClear();
        await user.keyboard('[Enter]');
        expect(onOptionClick).not.toHaveBeenCalled();
        expect(onKeyDown).toHaveBeenCalledTimes(1);
        expect(onKeyDown.mock.calls[0][0].key).toBe('Enter');
    });

    test('tracks an option by value across reordering and clears a removed option', async () => {
        const user = userEvent.setup();
        const onActiveIndexChange = jest.fn();
        const {rerender} = render(
            <Suggest options={ITEMS} open onActiveIndexChange={onActiveIndexChange} />,
        );
        const input = screen.getByRole('combobox');
        await user.click(input);
        await user.keyboard('[ArrowDown]');
        const earthId = screen.getByRole('option', {name: 'Earth'}).id;
        rerender(
            <Suggest
                options={[ITEMS[1], ITEMS[0]]}
                open
                onActiveIndexChange={onActiveIndexChange}
            />,
        );
        expect(input).toHaveAttribute('aria-activedescendant', earthId);
        expect(onActiveIndexChange).toHaveBeenLastCalledWith(1);
        rerender(<Suggest options={[ITEMS[1]]} open onActiveIndexChange={onActiveIndexChange} />);
        expect(input).not.toHaveAttribute('aria-activedescendant');
        expect(onActiveIndexChange).toHaveBeenLastCalledWith(undefined);
    });

    test('Home and End edit the input caret without moving list activity', async () => {
        const user = userEvent.setup();
        renderSuggest();
        const input = screen.getByRole('combobox');
        await user.type(input, 'earth');
        await user.keyboard('[ArrowDown][End]');
        expect(input).toHaveAttribute(
            'aria-activedescendant',
            screen.getByRole('option', {name: 'Earth'}).id,
        );
        expect((input as HTMLInputElement).selectionStart).toBe(5);
        await user.keyboard('[Home]');
        expect((input as HTMLInputElement).selectionStart).toBe(0);
        expect(input).toHaveAttribute(
            'aria-activedescendant',
            screen.getByRole('option', {name: 'Earth'}).id,
        );
    });

    test('supports reopening an uncontrolled defaultValue', async () => {
        const user = userEvent.setup();
        render(<Suggest defaultValue="earth" options={ITEMS} />);
        const input = screen.getByRole('combobox');
        await user.click(input);
        await user.keyboard('[Escape][ArrowDown]');
        expect(screen.getByRole('listbox')).toBeVisible();
        expect(input).toHaveValue('earth');
    });

    test('preserves the custom content renderer arguments and row semantics', async () => {
        const user = userEvent.setup();
        const renderOption = jest.fn(
            (option, active, index) => `${option.content}:${index}:${active}`,
        );
        renderSuggest({renderOption, getOptionHeight: () => 48});
        await user.type(screen.getByRole('combobox'), 'e');
        await user.keyboard('[ArrowDown]');
        expect(screen.getByRole('option', {name: 'Earth:0:true'})).toHaveStyle({
            height: '48px',
            minHeight: '48px',
        });
        expect(renderOption).toHaveBeenCalledWith(ITEMS[0], true, 0);
    });

    test('renders React children as option content rather than nested sections', () => {
        render(<Suggest open options={[{value: 'a', children: [<span key="a">Alpha</span>]}]} />);
        expect(screen.getByRole('option', {name: 'Alpha'})).toBeInTheDocument();
    });
});

describe('Suggest: pagination', () => {
    test('observes the loading row and disconnects it when the popup closes', () => {
        const observe = jest.fn();
        const unobserve = jest.fn();
        let notify: (() => void) | undefined;
        const original = window.IntersectionObserver;
        window.IntersectionObserver = class {
            observe = observe;
            unobserve = unobserve;
            constructor(callback: IntersectionObserverCallback) {
                notify = () =>
                    callback(
                        [{isIntersecting: true} as IntersectionObserverEntry],
                        this as unknown as IntersectionObserver,
                    );
            }
        } as unknown as typeof IntersectionObserver;
        try {
            const onLoadMore = jest.fn();
            const {rerender} = render(
                <Suggest open loading options={[]} onLoadMore={onLoadMore} />,
            );
            expect(observe).not.toHaveBeenCalled();
            rerender(<Suggest open options={ITEMS} onLoadMore={onLoadMore} />);
            expect(observe).not.toHaveBeenCalled();
            rerender(<Suggest open loading options={ITEMS} onLoadMore={onLoadMore} />);
            expect(observe).toHaveBeenLastCalledWith(screen.getByRole('option', {name: ''}));
            expect(onLoadMore).not.toHaveBeenCalled();
            act(() => notify?.());
            expect(onLoadMore).toHaveBeenCalledTimes(1);
            const nextOnLoadMore = jest.fn();
            const observations = observe.mock.calls.length;
            const disconnections = unobserve.mock.calls.length;
            rerender(<Suggest open loading options={ITEMS} onLoadMore={() => nextOnLoadMore()} />);
            expect(observe).toHaveBeenCalledTimes(observations);
            expect(unobserve).toHaveBeenCalledTimes(disconnections);
            expect(nextOnLoadMore).not.toHaveBeenCalled();
            act(() => notify?.());
            expect(nextOnLoadMore).toHaveBeenCalledTimes(1);
            expect(onLoadMore).toHaveBeenCalledTimes(1);
            rerender(<Suggest open={false} options={ITEMS} onLoadMore={nextOnLoadMore} />);
            expect(unobserve).toHaveBeenCalled();
        } finally {
            window.IntersectionObserver = original;
        }
    });
});

describe('Suggest: list accessible name', () => {
    beforeEach(() => setupIntersectionObserverMock());

    test('uses the explicit label instead of the input value or placeholder', () => {
        render(
            <Suggest
                open
                value="earth"
                options={ITEMS}
                inputProps={{placeholder: 'Search', controlProps: {'aria-label': 'Planets'}}}
            />,
        );
        expect(screen.getByRole('listbox')).toHaveAccessibleName('Planets');
    });

    test('prefers the visible label over the placeholder', () => {
        render(
            <Suggest
                open
                value="earth"
                options={ITEMS}
                inputProps={{label: 'Planet', placeholder: 'Type to search'}}
            />,
        );
        expect(screen.getByRole('combobox')).toHaveAccessibleName('Planet');
        expect(screen.getByRole('listbox')).toHaveAccessibleName('Planet');
    });

    test('uses the placeholder when no explicit label is provided', () => {
        render(
            <Suggest
                open
                value="earth"
                options={ITEMS}
                inputProps={{placeholder: 'Search planets'}}
            />,
        );
        expect(screen.getByRole('listbox')).toHaveAccessibleName('Search planets');
    });

    test('prefers the consumer labelledby over the label and placeholder', () => {
        render(
            <div>
                <span id="planet-label">Choose a planet</span>
                <Suggest
                    open
                    options={ITEMS}
                    inputProps={{
                        placeholder: 'Search',
                        controlProps: {'aria-label': 'Planets', 'aria-labelledby': 'planet-label'},
                    }}
                />
            </div>,
        );
        expect(screen.getByRole('listbox')).toHaveAccessibleName('Choose a planet');
    });
});
