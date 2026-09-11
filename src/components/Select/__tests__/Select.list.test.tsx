import userEvent from '@testing-library/user-event';

import {render, screen} from '../../../../test-utils/utils';
import {ListVirtualizer} from '../../Virtualizer/ListVirtualizer';
import {TextInput} from '../../controls';
import {getSectionHeader, mockLayout} from '../../lab/List/__tests__/helpers';
import {MobileProvider} from '../../mobile';
import {SelectQa, VIRTUALIZATION_HINT_OPTIONS_COUNT} from '../constants';

import {
    ControlledSelect,
    DEFAULT_OPTIONS,
    GROUPED_OPTIONS,
    TEST_QA,
    generateOptions,
    setup,
} from './utils';

const SELECT_ID = 'test-select';
const POPUP_ID = `select-popup-${SELECT_ID}`;
const FILTER_PLACEHOLDER = 'Filter';

const optionDomId = (value: string) => `${POPUP_ID}-item-${value}`;

const openSelect = async (props: Parameters<typeof setup>[0] = {}, mobile?: boolean) => {
    setup({id: SELECT_ID, ...props}, mobile);
    const user = userEvent.setup();
    const trigger = screen.getByTestId(TEST_QA);
    await user.click(trigger);

    return {user, trigger};
};

describe('Select on the List core', () => {
    describe('aria wiring', () => {
        test('the list is the listbox of the trigger and is named by it', async () => {
            const {trigger} = await openSelect();
            const list = screen.getByTestId(SelectQa.LIST);

            expect(list).toHaveAttribute('id', POPUP_ID);
            expect(list).toHaveAttribute('role', 'listbox');
            expect(list).toHaveAttribute('aria-labelledby', SELECT_ID);
            expect(trigger).toHaveAttribute('aria-controls', POPUP_ID);
            expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');
            expect(trigger).toHaveAttribute('aria-expanded', 'true');
        });

        test('the DOM id of a row is built from the value of the option', async () => {
            const {trigger, user} = await openSelect();

            expect(screen.getByRole('option', {name: 'JavaScript'})).toHaveAttribute(
                'id',
                optionDomId('js'),
            );
            expect(trigger).toHaveAttribute('aria-activedescendant', optionDomId('js'));

            await user.keyboard('{ArrowDown}');

            expect(trigger).toHaveAttribute('aria-activedescendant', optionDomId('python'));
        });

        test('group headers are presentational and name their options', async () => {
            await openSelect({options: GROUPED_OPTIONS});

            // The headers used to be options themselves: three options, not five
            const options = screen.getAllByRole('option');
            expect(options).toHaveLength(3);

            const header = getSectionHeader('Group 1');
            expect(header).toHaveAttribute('role', 'presentation');
            expect(header).toHaveAttribute('aria-hidden', 'true');
            expect(header).toHaveAttribute('data-first-row', '');
            expect(options[0]).toHaveAttribute('aria-describedby', header.id);
        });

        // The check mark of a selected row belongs to the row view and is pinned by the visual
        // tests (`option states › multiple`); here the semantics of the selection are asserted
        test('multiple marks the list and its selected options for a screen reader', async () => {
            await openSelect({multiple: true, value: ['python']});

            expect(screen.getByTestId(SelectQa.LIST)).toHaveAttribute(
                'aria-multiselectable',
                'true',
            );

            const selected = screen.getByRole('option', {name: 'Python'});
            expect(selected).toHaveAttribute('aria-selected', 'true');
            expect(screen.getByRole('option', {name: 'JavaScript'})).toHaveAttribute(
                'aria-selected',
                'false',
            );
        });

        test('the qa of an option lands on the row it belongs to', async () => {
            await openSelect({
                options: [{value: 'js', content: 'JavaScript', qa: 'js-option'}],
            });

            expect(screen.getByTestId('js-option')).toHaveTextContent('JavaScript');
        });

        test('a group with an empty label renders a separator instead of a header', async () => {
            await openSelect({
                options: [
                    {label: 'Group', options: DEFAULT_OPTIONS.slice(0, 1)},
                    {label: '', options: DEFAULT_OPTIONS.slice(1)},
                ],
            });

            const list = screen.getByTestId(SelectQa.LIST);
            const separator =
                // eslint-disable-next-line testing-library/no-node-access
                list.querySelector('[class*="select-list__item_separator"]');

            expect(separator).not.toBeNull();
            expect(separator).toBeEmptyDOMElement();
            expect(screen.getByText('Group')).toBeInTheDocument();
        });
    });

    describe('custom content of an option', () => {
        const TALL_OPTIONS = [
            {value: 'first', content: 'First option'},
            {value: 'second', content: 'Second option'},
        ];

        test('a row of its own height carries no inline height and grows with the content', async () => {
            await openSelect({
                options: TALL_OPTIONS,
                renderOption: (option) => (
                    <div>
                        <div>{option.content}</div>
                        <div>A description of two lines</div>
                    </div>
                ),
            });

            const row = screen.getByRole('option', {name: /First option/});
            expect(row.style.height).toBe('');
            expect(row.style.minHeight).toBe('');
            expect(row).toHaveTextContent('A description of two lines');
        });

        test('a height the consumer asked for wins over the minimum of the size', async () => {
            await openSelect({
                options: TALL_OPTIONS,
                getOptionHeight: () => 20,
                renderOption: (option) => <div>{option.content}</div>,
            });

            const row = screen.getByRole('option', {name: 'First option'});
            // Both, or the min-height of the row view would raise the row back to 28
            expect(row.style.height).toBe('20px');
            expect(row.style.minHeight).toBe('20px');
        });
    });

    describe('getOptionText', () => {
        let warn: jest.SpyInstance;

        beforeEach(() => {
            warn = jest.spyOn(console, 'error').mockImplementation(() => {});
        });

        afterEach(() => {
            warn.mockRestore();
        });

        const OPTIONS = [
            {value: 'first', content: <b>First option</b>},
            {value: 'second', content: <b>Second option</b>},
        ];

        const getOptionText = (option: {value: string}) =>
            option.value === 'first' ? 'First' : 'Second';

        test('feeds the search by the first letters and the trigger', async () => {
            const {user, trigger} = await openSelect({options: OPTIONS, getOptionText});

            // The content of these options is a node: without the getter the search would go by value
            await user.keyboard('sec');
            expect(trigger).toHaveAttribute('aria-activedescendant', optionDomId('second'));

            await user.keyboard('{Enter}');

            expect(trigger).toHaveTextContent('Second');
        });

        test('feeds the filter', async () => {
            const {user} = await openSelect({
                options: OPTIONS,
                filterable: true,
                filterPlaceholder: FILTER_PLACEHOLDER,
                getOptionText,
            });

            await user.keyboard('sec');

            const options = screen.getAllByRole('option');
            expect(options).toHaveLength(1);
            expect(options[0]).toHaveAttribute('id', optionDomId('second'));
        });

        test('without it an option with non-string content falls back to its value', async () => {
            await openSelect({options: OPTIONS});

            expect(screen.getByRole('option', {name: 'First option'})).toHaveAttribute(
                'id',
                optionDomId('first'),
            );
            // The fallback is the value — the dev warning tells about the getter
            expect(warn).toHaveBeenCalledWith(expect.stringContaining('getOptionText'));
        });
    });

    describe('the filter input shares the focus owner with the trigger', () => {
        const openFilterable = (props: Parameters<typeof setup>[0] = {}) =>
            openSelect({filterable: true, filterPlaceholder: FILTER_PLACEHOLDER, ...props});

        test('the input is a combobox pointing at the same list', async () => {
            await openFilterable();
            const input = screen.getByPlaceholderText(FILTER_PLACEHOLDER);

            expect(input).toHaveFocus();
            expect(input).toHaveAttribute('role', 'combobox');
            expect(input).toHaveAttribute('aria-controls', POPUP_ID);
            expect(input).toHaveAttribute('aria-autocomplete', 'list');
            expect(input).toHaveAttribute('aria-activedescendant', optionDomId('js'));
        });

        test('a click on an option leaves the focus in the input', async () => {
            const {user} = await openFilterable({multiple: true});
            const input = screen.getByPlaceholderText(FILTER_PLACEHOLDER);

            await user.click(screen.getByRole('option', {name: 'Python'}));

            expect(input).toHaveFocus();
            expect(screen.getByRole('option', {name: 'Python'})).toHaveAttribute(
                'aria-selected',
                'true',
            );
        });

        test('Enter applies the first option the filter has left', async () => {
            const onUpdate = jest.fn();
            const {user} = await openFilterable({onUpdate});

            // The initially active option is filtered out: the activity falls back to the first
            // navigable one, so Enter applies what the user sees
            await user.keyboard('ru');
            await user.keyboard('{Enter}');

            expect(onUpdate).toHaveBeenCalledWith(['ruby']);
        });

        test('a custom filter on the deprecated onKeyDown still navigates the options', async () => {
            const onUpdate = jest.fn();
            const {user} = await openFilterable({
                onUpdate,
                renderFilter: ({value, ref, onChange, onKeyDown}) => (
                    <TextInput
                        controlRef={ref}
                        placeholder={FILTER_PLACEHOLDER}
                        value={value}
                        onUpdate={onChange}
                        onKeyDown={onKeyDown}
                    />
                ),
            });

            await user.keyboard('{ArrowDown}');
            await user.keyboard('{Enter}');

            expect(onUpdate).toHaveBeenCalledWith(['python']);
        });

        test('Home and End belong to the caret of the input', async () => {
            const {user} = await openFilterable();
            const input = screen.getByPlaceholderText(FILTER_PLACEHOLDER);

            await user.keyboard('{End}');
            expect(input).toHaveAttribute('aria-activedescendant', optionDomId('js'));

            await user.keyboard('{Home}');
            expect(input).toHaveAttribute('aria-activedescendant', optionDomId('js'));
        });
    });

    describe('keyboard of the trigger', () => {
        test('Home and End move the activity: the trigger holds no caret', async () => {
            const {trigger, user} = await openSelect();

            await user.keyboard('{End}');
            expect(trigger).toHaveAttribute('aria-activedescendant', optionDomId('ruby'));

            await user.keyboard('{Home}');
            expect(trigger).toHaveAttribute('aria-activedescendant', optionDomId('js'));
        });

        test('PageDown and PageUp step over ten options', async () => {
            const {trigger, user} = await openSelect({options: generateOptions(25)});

            await user.keyboard('{PageDown}');
            expect(trigger).toHaveAttribute('aria-activedescendant', optionDomId('val11'));

            await user.keyboard('{PageUp}');
            expect(trigger).toHaveAttribute('aria-activedescendant', optionDomId('val1'));
        });

        test('a space continues the search by the first letters instead of applying', async () => {
            const onUpdate = jest.fn();
            const {trigger, user} = await openSelect({
                options: [
                    {value: 'first', content: 'First option'},
                    {value: 'second', content: 'Second option'},
                ],
                onUpdate,
            });

            await user.keyboard('second o');

            expect(trigger).toHaveAttribute('aria-activedescendant', optionDomId('second'));
            expect(onUpdate).not.toHaveBeenCalled();
        });

        test('Space applies the active option without closing the popup in multiple', async () => {
            const onUpdate = jest.fn();
            const {user} = await openSelect({multiple: true, onUpdate});

            await user.keyboard('{ArrowDown}');
            await user.keyboard(' ');

            expect(onUpdate).toHaveBeenCalledWith(['python']);
            expect(screen.getByTestId(SelectQa.POPUP)).toBeInTheDocument();
        });
    });

    describe('loading', () => {
        let observed: Element[] = [];

        beforeEach(() => {
            observed = [];

            // Unlike the shared mock, this one reports an intersection from `observe` rather than
            // from the constructor: a loading row that is never observed has to fail the test
            class TestIntersectionObserver {
                readonly root = null;
                readonly rootMargin = '';
                readonly thresholds: ReadonlyArray<number> = [];
                private callback: IntersectionObserverCallback;

                constructor(callback: IntersectionObserverCallback) {
                    this.callback = callback;
                }

                observe(element: Element) {
                    observed.push(element);
                    this.callback(
                        [{isIntersecting: true, target: element} as IntersectionObserverEntry],
                        this as unknown as IntersectionObserver,
                    );
                }

                unobserve() {}
                disconnect() {}
                takeRecords() {
                    return [];
                }
            }

            window.IntersectionObserver =
                TestIntersectionObserver as unknown as typeof IntersectionObserver;
        });

        afterEach(() => {
            // jsdom has no observer of its own: the rest of the file must not lean on this one
            delete (window as {IntersectionObserver?: unknown}).IntersectionObserver;
        });

        test('the loading row is the last one and asks for more', async () => {
            const onLoadMore = jest.fn();
            await openSelect({loading: true, onLoadMore});

            // Three options plus the loading row, and it is the last one
            const rows = screen.getAllByRole('option');
            expect(rows).toHaveLength(DEFAULT_OPTIONS.length + 1);
            expect(rows[rows.length - 1]).toHaveTextContent('');
            expect(rows[DEFAULT_OPTIONS.length - 1]).toHaveTextContent('Ruby');
            expect(onLoadMore).toHaveBeenCalled();
        });

        test('the indicator of the loading row is really watched', async () => {
            // The row renders once and is memoized after that: an element caught by a ref would
            // never reach the observer, and the paging would be dead without a single test failing
            await openSelect({loading: true, onLoadMore: jest.fn()});

            expect(observed).toHaveLength(1);
            expect(observed[0]).toHaveClass('g-select-list__loading-indicator');
        });
    });

    describe('options that arrive while the popup is open', () => {
        test('the selected option becomes the active one', async () => {
            // The list is empty at the moment of opening — asynchronous options, `loading` — so the
            // choice of the active option has nothing to work with and has to be made again
            const {rerender} = render(
                <MobileProvider mobile={false}>
                    <ControlledSelect id={SELECT_ID} options={[]} value={['ruby']} />
                </MobileProvider>,
            );
            const user = userEvent.setup();
            await user.click(screen.getByTestId(TEST_QA));

            rerender(
                <MobileProvider mobile={false}>
                    <ControlledSelect id={SELECT_ID} options={DEFAULT_OPTIONS} value={['ruby']} />
                </MobileProvider>,
            );

            expect(screen.getByTestId(TEST_QA)).toHaveAttribute(
                'aria-activedescendant',
                optionDomId('ruby'),
            );
        });
    });

    describe('scroll to the active option', () => {
        const ROW_HEIGHT = 28;
        const VIEWPORT = 100;
        const OPTIONS = generateOptions(50);

        mockLayout({viewport: VIEWPORT, row: ROW_HEIGHT});

        let offsetTopSpy: jest.SpyInstance;
        let offsetParentSpy: jest.SpyInstance;

        beforeEach(() => {
            // jsdom has no layout: a row is as far from the top as its position says, and a row of
            // a virtualized list — as far as the inline `top` of its wrapper
            offsetTopSpy = jest
                .spyOn(HTMLElement.prototype, 'offsetTop', 'get')
                .mockImplementation(function (this: HTMLElement) {
                    if (this.style.top) {
                        return Number.parseInt(this.style.top, 10);
                    }

                    // eslint-disable-next-line testing-library/no-node-access
                    const parent = this.parentElement;

                    if (!parent) {
                        return 0;
                    }

                    // eslint-disable-next-line testing-library/no-node-access
                    return Array.prototype.indexOf.call(parent.children, this) * ROW_HEIGHT;
                });
            offsetParentSpy = jest
                .spyOn(HTMLElement.prototype, 'offsetParent', 'get')

                .mockImplementation(function (this: HTMLElement) {
                    // eslint-disable-next-line testing-library/no-node-access
                    return this.parentElement;
                });
        });

        afterEach(() => {
            offsetTopSpy.mockRestore();
            offsetParentSpy.mockRestore();
        });

        // The keyboard scroll belongs to the core (scrollIntoView on its own gesture); the Select
        // scrolls when the popup opens, and it scrolls the list rather than the page
        test('opening scrolls the selected option into view', async () => {
            await openSelect({options: OPTIONS, value: ['val40']});
            const list = screen.getByTestId(SelectQa.LIST);

            // The 40th row of 50: the bottom of the row at the bottom of the viewport
            expect(list.scrollTop).toBe(40 * ROW_HEIGHT - VIEWPORT);
        });

        test('under virtualization the scroll waits for the rows of the first window', async () => {
            render(
                <MobileProvider mobile={false}>
                    <ListVirtualizer>
                        <ControlledSelect id={SELECT_ID} options={OPTIONS} value={['val40']} />
                    </ListVirtualizer>
                </MobileProvider>,
            );
            const user = userEvent.setup();
            await user.click(screen.getByTestId(TEST_QA));

            // The first window of the virtualizer is empty, the row arrives a commit later — and
            // the list ends up scrolled exactly where plain rendering puts it (the test above),
            // not merely "somewhere below zero"
            expect(screen.getByRole('option', {name: 'Value 40'})).toBeInTheDocument();
            expect(screen.getByTestId(SelectQa.LIST).scrollTop).toBe(40 * ROW_HEIGHT - VIEWPORT);
        });
    });

    describe('warnings of the development build', () => {
        let consoleErrorSpy: jest.SpyInstance;

        beforeEach(() => {
            consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        });

        afterEach(() => {
            consoleErrorSpy.mockRestore();
        });

        test('a list too long to render row by row points at the virtualizer', async () => {
            await openSelect({
                options: generateOptions(VIRTUALIZATION_HINT_OPTIONS_COUNT + 1),
            });

            expect(consoleErrorSpy).toHaveBeenCalledWith(
                expect.stringContaining('<ListVirtualizer>'),
            );
        });

        test('the estimate of the wrapper is reported as unused', async () => {
            render(
                <MobileProvider mobile={false}>
                    <ListVirtualizer estimateItemSize={40}>
                        <ControlledSelect id={SELECT_ID} options={DEFAULT_OPTIONS} />
                    </ListVirtualizer>
                </MobileProvider>,
            );
            await userEvent.setup().click(screen.getByTestId(TEST_QA));

            // The height of a row comes from the Select, so the estimate of the wrapper is ignored
            expect(consoleErrorSpy).toHaveBeenCalledWith(
                expect.stringContaining('`estimateItemSize` of `ListVirtualizer`'),
            );
        });
    });

    describe('the popup that is closing', () => {
        test('the list it still holds is no longer the one the trigger talks to', async () => {
            const {trigger, user} = await openSelect({}, true);
            expect(trigger).toHaveAttribute('aria-activedescendant', optionDomId('js'));

            await user.keyboard('{Escape}');

            // The Sheet keeps the list mounted while it animates out — the Select is closed already
            expect(screen.getByRole('option', {name: 'JavaScript'})).toBeInTheDocument();
            expect(trigger).toHaveAttribute('aria-expanded', 'false');
            expect(trigger).not.toHaveAttribute('aria-activedescendant');
            expect(trigger).not.toHaveAttribute('aria-controls');
        });
    });

    describe('the filter that matches nothing', () => {
        test('the input still reports the popup as expanded', async () => {
            const {user} = await openSelect({
                filterable: true,
                filterPlaceholder: FILTER_PLACEHOLDER,
            });
            const input = screen.getByPlaceholderText(FILTER_PLACEHOLDER);

            await user.keyboard('definitely not an option');

            // The list is gone, the popup is not
            expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
            expect(screen.getByTestId(SelectQa.POPUP)).toBeInTheDocument();
            expect(input).toHaveAttribute('aria-expanded', 'true');
        });

        test('clearing the filter does not bring the old activity back', async () => {
            const {trigger, user} = await openSelect({
                filterable: true,
                filterPlaceholder: FILTER_PLACEHOLDER,
            });

            await user.keyboard('{ArrowDown}{ArrowDown}');
            expect(trigger).toHaveAttribute('aria-activedescendant', optionDomId('ruby'));

            await user.keyboard('pyt');
            expect(trigger).toHaveAttribute('aria-activedescendant', optionDomId('python'));

            await user.keyboard('{Backspace}{Backspace}{Backspace}');

            expect(trigger).toHaveAttribute('aria-activedescendant', optionDomId('python'));
        });
    });

    test('the mobile sheet renders the same list', async () => {
        await openSelect({}, true);

        expect(screen.getByTestId(SelectQa.SHEET)).toBeInTheDocument();
        expect(screen.getByTestId(SelectQa.LIST)).toHaveAttribute('role', 'listbox');
        expect(screen.getAllByRole('option')).toHaveLength(DEFAULT_OPTIONS.length);
    });
});
