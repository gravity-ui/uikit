import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {setupIntersectionObserverMock} from '../../../../../test-utils/setupIntersectionObserverMock';
import {act, render, screen, waitFor, within} from '../../../../../test-utils/utils';
import {Suggest} from '../Suggest';

import type {TestSuggestProps} from './TestSuggest';
import {ITEMS, TestSuggest} from './TestSuggest';

const QA_POPUP = 'suggest-popup';
const QA_INPUT = 'qa-suggest-input';

function renderSuggest(props?: Partial<TestSuggestProps>) {
    return render(<TestSuggest qa={QA_INPUT} {...props} />);
}

describe('Suggest', () => {
    beforeEach(() => setupIntersectionObserverMock());
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('forwards flat input props and refs and associates an external label', async () => {
        const user = userEvent.setup();
        const ref = React.createRef<HTMLSpanElement>();
        const controlRef = React.createRef<HTMLInputElement>();
        const onFocus = jest.fn();
        const onClick = jest.fn();
        render(
            <React.Fragment>
                <label htmlFor="city">City</label>
                <Suggest
                    id="city"
                    options={ITEMS}
                    ref={ref}
                    controlRef={controlRef}
                    className="city-input"
                    style={{width: 320}}
                    qa="city-input"
                    onFocus={onFocus}
                    controlProps={{onClick}}
                />
            </React.Fragment>,
        );
        const input = screen.getByRole('combobox', {name: 'City'});
        expect(input).toHaveAttribute('id', 'city');
        expect(controlRef.current).toBe(input);
        expect(ref.current).toBe(screen.getByTestId('city-input'));
        expect(ref.current).toHaveClass('city-input');
        expect(ref.current).toHaveStyle({width: '320px'});
        await user.click(screen.getByText('City'));
        expect(input).toHaveFocus();
        expect(onFocus).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(screen.getByRole('listbox')).toBeVisible();
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

    test('calls onOptionAction and closes popup on item click', async () => {
        const onOptionAction = jest.fn();
        const onOpenChange = jest.fn();
        const user = userEvent.setup();
        renderSuggest({onOptionAction, onOpenChange});

        const input = within(screen.getByTestId(QA_INPUT)).getByRole('combobox');
        await user.type(input, 'e');

        const earth = await screen.findByText('Earth');
        await user.click(earth);

        expect(onOptionAction).toHaveBeenCalledTimes(1);
        expect(onOptionAction).toHaveBeenCalledWith(
            'earth',
            ITEMS[0],
            expect.objectContaining({type: 'click'}),
        );
        expect(onOpenChange).toHaveBeenLastCalledWith(
            false,
            expect.any(MouseEvent),
            'option-action',
        );
        await waitFor(() => expect(screen.queryByTestId(QA_POPUP)).not.toBeInTheDocument());
    });

    test.each(['click', 'Enter'])(
        'lets the parent ignore an option action close request: %s',
        async (gesture) => {
            const onOptionAction = jest.fn();
            const onOpenChange = jest.fn();
            const user = userEvent.setup();
            renderSuggest({open: true, onOptionAction, onOpenChange});

            const input = within(screen.getByTestId(QA_INPUT)).getByRole('combobox');
            await user.type(input, 'e');

            const earth = await screen.findByText('Earth');
            if (gesture === 'click') {
                await user.click(earth);
            } else {
                await user.keyboard('[ArrowDown][Enter]');
            }

            expect(onOptionAction).toHaveBeenCalledTimes(1);
            expect(onOpenChange).toHaveBeenLastCalledWith(
                false,
                expect.any(gesture === 'click' ? MouseEvent : KeyboardEvent),
                'option-action',
            );
            expect(screen.getByTestId(QA_POPUP)).toBeVisible();
        },
    );

    test('reports input-change when typing opens or clearing closes the popup', async () => {
        const user = userEvent.setup();
        const onOpenChange = jest.fn();
        renderSuggest({onOpenChange});
        const input = screen.getByRole('combobox');
        await user.tab();
        await user.keyboard('e');
        expect(onOpenChange).toHaveBeenLastCalledWith(true, undefined, 'input-change');
        await user.clear(input);
        expect(onOpenChange).toHaveBeenLastCalledWith(false, undefined, 'input-change');
    });

    test('does not call onOptionAction for disabled items', async () => {
        const onOptionAction = jest.fn();
        const user = userEvent.setup();
        renderSuggest({
            options: [{value: 'earth', content: 'Earth', disabled: true}],
            onOptionAction,
        });

        const input = within(screen.getByTestId(QA_INPUT)).getByRole('combobox');
        await user.type(input, 'e');

        const earth = await screen.findByText('Earth');
        await user.click(earth);

        expect(onOptionAction).not.toHaveBeenCalled();
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

    test('renders custom empty content with the input filter inside the popup wrapper', async () => {
        const user = userEvent.setup();
        const renderEmptyOptions = jest.fn(() => <span>No results</span>);
        renderSuggest({
            options: [],
            renderEmptyOptions,
            renderPopup: ({renderList}) => <div>{renderList()}</div>,
        });
        await user.type(screen.getByRole('combobox'), 'unknown');

        expect(screen.getByTestId(QA_POPUP)).toBeVisible();
        expect(screen.getByText('No results')).toBeVisible();
        expect(renderEmptyOptions).toHaveBeenLastCalledWith({filter: 'unknown'});
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    test('does not open a popup when its renderer returns null', () => {
        renderSuggest({open: true, renderPopup: () => null});
        expect(screen.queryByTestId(QA_POPUP)).not.toBeInTheDocument();
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
            renderSuggest({autoFocus: true});

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
            renderSuggest({autoFocus: true});

            const input = within(screen.getByTestId(QA_INPUT)).getByRole('combobox');
            await user.type(input, 'e');
            await user.keyboard('[ArrowDown]');

            expect(input).toHaveAttribute(
                'aria-activedescendant',
                screen.getByRole('option', {name: 'Earth'}).id,
            );
        });

        test('Enter selects active item and closes popup', async () => {
            const onOptionAction = jest.fn();
            const onOpenChange = jest.fn();
            const user = userEvent.setup();
            renderSuggest({onOptionAction, onOpenChange, autoFocus: true});

            const input = within(screen.getByTestId(QA_INPUT)).getByRole('combobox');
            await user.type(input, 'e');
            await user.keyboard('[ArrowDown]');
            await user.keyboard('[Enter]');

            expect(onOptionAction).toHaveBeenCalledTimes(1);
            expect(onOpenChange).toHaveBeenLastCalledWith(
                false,
                expect.any(KeyboardEvent),
                'option-action',
            );
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

    describe('input props', () => {
        test('passes placeholder to input', () => {
            renderSuggest({placeholder: 'Search here\u2026'});
            expect(screen.getByPlaceholderText('Search here\u2026')).toBeInTheDocument();
        });

        test('disabled input cannot open popup', async () => {
            const user = userEvent.setup();
            renderSuggest({disabled: true});

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
        const onOptionAction = jest.fn();
        renderSuggest({
            options: [{...ITEMS[0], disabled: true}, ...ITEMS.slice(1)],
            onOptionAction,
        });
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
        expect(onOptionAction).toHaveBeenCalledWith(
            ITEMS[1].value,
            ITEMS[1],
            expect.objectContaining({type: 'keydown'}),
        );
        expect(input).toHaveFocus();
    });

    test('clicking an option keeps DOM focus on the input', async () => {
        const user = userEvent.setup();
        renderSuggest({open: true});
        const input = screen.getByRole('combobox');
        await user.type(input, 'e');
        await user.click(screen.getByRole('option', {name: 'Earth'}));
        expect(input).toHaveFocus();
    });

    test('clears activity on closing without emitting an additional update', async () => {
        const user = userEvent.setup();
        const onActiveOptionUpdate = jest.fn();
        renderSuggest({onActiveOptionUpdate});
        const input = screen.getByRole('combobox');
        await user.type(input, 'e');
        await user.keyboard('[ArrowDown]');
        expect(onActiveOptionUpdate).toHaveBeenLastCalledWith('earth');
        await user.keyboard('[Escape]');
        expect(input).toHaveAttribute('aria-expanded', 'false');
        expect(input).not.toHaveAttribute('aria-activedescendant');
        expect(screen.queryByRole('listbox', {hidden: true})).not.toBeInTheDocument();
        expect(onActiveOptionUpdate).toHaveBeenCalledTimes(1);
        await user.keyboard('[ArrowDown]');
        expect(input).not.toHaveAttribute('aria-activedescendant');
    });

    test('keeps an available option active when typing', async () => {
        const user = userEvent.setup();
        const onOptionAction = jest.fn();
        const onActiveOptionUpdate = jest.fn();
        renderSuggest({onOptionAction, onActiveOptionUpdate});
        const input = screen.getByRole('combobox');
        await user.type(input, 'e');
        await user.keyboard('[ArrowDown]');
        await user.type(input, 'a');
        expect(input).toHaveAttribute(
            'aria-activedescendant',
            screen.getByRole('option', {name: 'Earth'}).id,
        );
        expect(onActiveOptionUpdate).toHaveBeenCalledTimes(1);
        expect(onActiveOptionUpdate).toHaveBeenLastCalledWith('earth');
        await user.keyboard('[Enter]');
        expect(onOptionAction).toHaveBeenCalledWith(
            ITEMS[0].value,
            ITEMS[0],
            expect.objectContaining({type: 'keydown'}),
        );
    });

    test('Enter without an active option reaches the consumer', async () => {
        const user = userEvent.setup();
        const onOptionAction = jest.fn();
        const onKeyDown = jest.fn();
        renderSuggest({onOptionAction, onKeyDown});
        const input = screen.getByRole('combobox');
        await user.type(input, 'ea');
        expect(input).not.toHaveAttribute('aria-activedescendant');
        onKeyDown.mockClear();
        await user.keyboard('[Enter]');
        expect(onOptionAction).not.toHaveBeenCalled();
        expect(onKeyDown).toHaveBeenCalledTimes(1);
        expect(onKeyDown.mock.calls[0][0].key).toBe('Enter');
    });

    test('tracks an option by value across reordering and clears a removed option', async () => {
        const user = userEvent.setup();
        const onActiveOptionUpdate = jest.fn();
        const {rerender} = render(
            <Suggest options={ITEMS} open onActiveOptionUpdate={onActiveOptionUpdate} />,
        );
        const input = screen.getByRole('combobox');
        await user.click(input);
        await user.keyboard('[ArrowDown]');
        const earthId = screen.getByRole('option', {name: 'Earth'}).id;
        rerender(
            <Suggest
                options={[ITEMS[1], ITEMS[0]]}
                open
                onActiveOptionUpdate={onActiveOptionUpdate}
            />,
        );
        expect(input).toHaveAttribute('aria-activedescendant', earthId);
        expect(onActiveOptionUpdate).toHaveBeenCalledTimes(1);
        rerender(<Suggest options={[ITEMS[1]]} open onActiveOptionUpdate={onActiveOptionUpdate} />);
        expect(input).not.toHaveAttribute('aria-activedescendant');
        expect(onActiveOptionUpdate).toHaveBeenCalledTimes(1);
    });

    test('keeps a disabled active option highlighted but does not select it', async () => {
        const user = userEvent.setup();
        const onOptionAction = jest.fn();
        const onActiveOptionUpdate = jest.fn();
        const {rerender} = render(
            <Suggest
                open
                options={ITEMS}
                onOptionAction={onOptionAction}
                onActiveOptionUpdate={onActiveOptionUpdate}
            />,
        );
        const input = screen.getByRole('combobox');
        await user.click(input);
        await user.keyboard('[ArrowDown]');
        const id = screen.getByRole('option', {name: 'Earth'}).id;
        rerender(
            <Suggest
                open
                options={[{...ITEMS[0], disabled: true}, ...ITEMS.slice(1)]}
                onOptionAction={onOptionAction}
                onActiveOptionUpdate={onActiveOptionUpdate}
            />,
        );
        expect(input).toHaveAttribute('aria-activedescendant', id);
        expect(onActiveOptionUpdate).toHaveBeenCalledTimes(1);
        await user.keyboard('[Enter]');
        expect(onOptionAction).not.toHaveBeenCalled();
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

    test('passes Select-like renderer parameters and preserves row semantics', async () => {
        const user = userEvent.setup();
        const renderOption = jest.fn((option, {isItemActive}) => (
            <span>{`${option.content}:${isItemActive}`}</span>
        ));
        renderSuggest({renderOption, getOptionHeight: () => 48});
        await user.type(screen.getByRole('combobox'), 'e');
        await user.keyboard('[ArrowDown]');
        expect(screen.getByRole('option', {name: 'Earth:true'})).toHaveStyle({
            height: '48px',
            minHeight: '48px',
        });
        expect(renderOption).toHaveBeenCalledWith(ITEMS[0], {
            itemHeight: 48,
            isItemActive: true,
            selected: false,
        });
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
                placeholder="Search"
                aria-label="Planets"
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
                label="Planet"
                placeholder="Type to search"
            />,
        );
        expect(screen.getByRole('combobox')).toHaveAccessibleName('Planet');
        expect(screen.getByRole('listbox')).toHaveAccessibleName('Planet');
    });

    test('uses the placeholder when no explicit label is provided', () => {
        render(<Suggest open value="earth" options={ITEMS} placeholder="Search planets" />);
        expect(screen.getByRole('listbox')).toHaveAccessibleName('Search planets');
    });

    test('prefers the consumer labelledby over the label and placeholder', () => {
        render(
            <div>
                <span id="planet-label">Choose a planet</span>
                <Suggest
                    open
                    options={ITEMS}
                    placeholder="Search"
                    aria-label="Planets"
                    aria-labelledby="planet-label"
                />
            </div>,
        );
        expect(screen.getByRole('listbox')).toHaveAccessibleName('Choose a planet');
    });
});
