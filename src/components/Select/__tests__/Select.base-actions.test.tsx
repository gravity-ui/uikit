import type * as React from 'react';

import userEvent from '@testing-library/user-event';

import {SelectQa} from '..';
import {act, render, screen} from '../../../../test-utils/utils';
import {ListVirtualizer} from '../../Virtualizer/ListVirtualizer';
import {mockLayout} from '../../lab/List/__tests__/helpers';
import {TYPEAHEAD_TIMEOUT} from '../../lab/List/utils';
import {MobileProvider} from '../../mobile';

import {
    ControlledSelect,
    DEFAULT_OPTIONS,
    GROUPED_OPTIONS,
    GROUPED_TYPEAHEAD_OPTIONS,
    SELECT_CONTROL_BUTTON_OPEN_CLASS,
    SELECT_LIST_VIRTUALIZED_CLASS,
    TEST_QA,
    TYPEAHEAD_OPTIONS,
    generateOptions,
    setup,
    timeout,
} from './utils';

const toggleSelectPopup = async () => {
    const user = userEvent.setup();
    const selectControl = screen.getByTestId(TEST_QA);
    await user.click(selectControl);
};

describe('Select base actions', () => {
    describe('open popup by', () => {
        test('click', async () => {
            const {getByTestId} = setup();
            const user = userEvent.setup();
            const selectControl = getByTestId(TEST_QA);
            await user.click(selectControl);
            getByTestId(SelectQa.POPUP);
        });

        test('Enter', async () => {
            const {getByTestId} = setup();
            const user = userEvent.setup();
            await user.keyboard('[Tab]');
            await user.keyboard('[Enter]');
            getByTestId(SelectQa.POPUP);
        });

        test('Space', async () => {
            const {getByTestId} = setup();
            const user = userEvent.setup();
            await user.keyboard('[Tab]');
            await user.keyboard('[Space]');
            getByTestId(SelectQa.POPUP);
        });

        test('ArrowUp', async () => {
            const {getByTestId} = setup();
            const user = userEvent.setup();
            await user.keyboard('[Tab]');
            await user.keyboard('[ArrowUp]');
            getByTestId(SelectQa.POPUP);
        });

        test('ArrowDown', async () => {
            const {getByTestId} = setup();
            const user = userEvent.setup();
            await user.keyboard('[Tab]');
            await user.keyboard('[ArrowDown]');
            getByTestId(SelectQa.POPUP);
        });
    });

    describe('initial state', () => {
        test('should be closed while rendering with default props', async () => {
            await act(async () => {
                setup();
            });
            const selectControl = screen.getByTestId(TEST_QA);
            expect(selectControl).not.toHaveClass(SELECT_CONTROL_BUTTON_OPEN_CLASS);
            expect(screen.queryByTestId(SelectQa.POPUP)).toBeNull();
        });
        test('should have [type="button"] attribute in root button', async () => {
            await act(async () => {
                setup();
            });
            const selectControl = screen.getByTestId(TEST_QA);
            expect(selectControl).toHaveAttribute('type', 'button');
        });
    });

    describe('open', () => {
        test('should be opened while rendering with defaultOpen prop', async () => {
            await act(async () => {
                setup({defaultOpen: true});
            });
            const selectControl = screen.getByTestId(TEST_QA);
            expect(selectControl).toHaveClass(SELECT_CONTROL_BUTTON_OPEN_CLASS);
            screen.getByTestId(SelectQa.POPUP);
        });

        test('open prop dominates over defaultOpen prop', async () => {
            await act(async () => {
                setup({defaultOpen: false, open: true});
            });

            const selectControl = screen.getByTestId(TEST_QA);
            expect(selectControl).toHaveClass(SELECT_CONTROL_BUTTON_OPEN_CLASS);
        });

        test('shoult open/close by open prop', async () => {
            const {rerender, getByTestId} = render(<ControlledSelect open={true} />);

            const selectControl = getByTestId(TEST_QA);
            expect(selectControl).toHaveClass(SELECT_CONTROL_BUTTON_OPEN_CLASS);

            rerender(<ControlledSelect open={false} />);

            const rerenderedSelectControl = getByTestId(TEST_QA);
            expect(rerenderedSelectControl).not.toHaveClass(SELECT_CONTROL_BUTTON_OPEN_CLASS);
        });
        test('should not close when open=true prop passed', async () => {
            setup({open: true});
            const selectControl = screen.getByTestId(TEST_QA);

            expect(selectControl).toHaveClass(SELECT_CONTROL_BUTTON_OPEN_CLASS);

            await toggleSelectPopup();

            expect(selectControl).toHaveClass(SELECT_CONTROL_BUTTON_OPEN_CLASS);
        });

        test('should call onOpenChange while closing', async () => {
            const onOpenChange = jest.fn();
            setup({onOpenChange});

            await toggleSelectPopup();
            expect(onOpenChange).toHaveBeenCalledWith(true);
            await toggleSelectPopup();
            expect(onOpenChange).toHaveBeenCalledWith(false);
            expect(onOpenChange).toHaveBeenCalledTimes(2);
        });
        test('should call onOpenChange whith controlled open', async () => {
            const onOpenChange = jest.fn();
            setup({open: true, onOpenChange});

            await toggleSelectPopup();

            expect(onOpenChange).toHaveBeenCalledWith(false);
            expect(onOpenChange).toHaveBeenCalledTimes(1);
        });
    });

    describe('navigate in flat list by', () => {
        test('ArrowDown', async () => {
            const {getByTestId} = setup();
            const user = userEvent.setup();
            const selectControl = getByTestId(TEST_QA);
            const optionLabels = DEFAULT_OPTIONS.map(({content}) => content).concat(
                DEFAULT_OPTIONS[0].content,
            );

            await user.click(selectControl);

            for await (const content of optionLabels) {
                const selectedItem = getByTestId(SelectQa.ACTIVE_ITEM);
                expect(selectedItem.textContent).toBe(content);
                await user.keyboard('[ArrowDown]');
            }
        });

        test('ArrowUp', async () => {
            const {getByTestId} = setup();
            const user = userEvent.setup();
            const selectControl = getByTestId(TEST_QA);
            const optionLabels = DEFAULT_OPTIONS.map(({content}) => content).concat(
                DEFAULT_OPTIONS[0].content,
            );
            optionLabels.reverse();

            await user.click(selectControl);

            for await (const content of optionLabels) {
                const selectedItem = getByTestId(SelectQa.ACTIVE_ITEM);
                expect(selectedItem.textContent).toBe(content);
                await user.keyboard('[ArrowUp]');
            }
        });
    });

    describe('navigate in grouped list by', () => {
        test('ArrowDown', async () => {
            const {getByTestId} = setup({options: GROUPED_OPTIONS});
            const user = userEvent.setup();
            const selectControl = getByTestId(TEST_QA);
            const optionLabels = GROUPED_OPTIONS.reduce((acc, group, index) => {
                if (group.options) {
                    acc.push(...group.options.map(({content}) => content));
                }

                if (GROUPED_OPTIONS[0].options && index === GROUPED_OPTIONS.length - 1) {
                    acc.push(GROUPED_OPTIONS[0].options[0].content);
                }

                return acc;
            }, [] as React.ReactNode[]);

            await user.click(selectControl);

            for await (const content of optionLabels) {
                const selectedItem = getByTestId(SelectQa.ACTIVE_ITEM);
                expect(selectedItem.textContent).toBe(content);
                await user.keyboard('[ArrowDown]');
            }
        });

        test('ArrowUp', async () => {
            const {getByTestId} = setup({options: GROUPED_OPTIONS});
            const user = userEvent.setup();
            const selectControl = getByTestId(TEST_QA);
            const optionLabels = GROUPED_OPTIONS.reduce((acc, group, index) => {
                if (group.options) {
                    acc.push(...group.options.map(({content}) => content));
                }

                if (GROUPED_OPTIONS[0].options && index === GROUPED_OPTIONS.length - 1) {
                    acc.push(GROUPED_OPTIONS[0].options[0].content);
                }

                return acc;
            }, [] as React.ReactNode[]);
            optionLabels.reverse();

            await user.click(selectControl);

            for await (const content of optionLabels) {
                const selectedItem = getByTestId(SelectQa.ACTIVE_ITEM);
                expect(selectedItem.textContent).toBe(content);
                await user.keyboard('[ArrowUp]');
            }
        });
    });

    // The search by the first letters belongs to the List: a prefix, a buffer of 500 ms and the
    // APG cycling over the matches of a repeated character
    describe('typeahead', () => {
        test('a prefix moves the activity, and the buffer resets after a pause', async () => {
            const {getByTestId} = setup({options: TYPEAHEAD_OPTIONS});
            const user = userEvent.setup();
            await user.click(getByTestId(TEST_QA));

            await user.keyboard('ru');
            expect(getByTestId(SelectQa.ACTIVE_ITEM)).toHaveTextContent('Ruby');

            await timeout(TYPEAHEAD_TIMEOUT);

            await user.keyboard('rus');
            expect(getByTestId(SelectQa.ACTIVE_ITEM)).toHaveTextContent('Rust');
        });

        test('a repeated character cycles through the options starting with it', async () => {
            const {getByTestId} = setup({options: TYPEAHEAD_OPTIONS});
            const user = userEvent.setup();
            await user.click(getByTestId(TEST_QA));

            await user.keyboard('r');
            expect(getByTestId(SelectQa.ACTIVE_ITEM)).toHaveTextContent('Ruby');

            await user.keyboard('r');
            expect(getByTestId(SelectQa.ACTIVE_ITEM)).toHaveTextContent('Rust');
        });

        test('the search walks a grouped list, headers aside', async () => {
            const {getByTestId} = setup({options: GROUPED_TYPEAHEAD_OPTIONS});
            const user = userEvent.setup();
            await user.click(getByTestId(TEST_QA));

            await user.keyboard('py');

            expect(getByTestId(SelectQa.ACTIVE_ITEM)).toHaveTextContent('Python');
        });

        test('with a filter the characters go to the input instead', async () => {
            const {getByTestId} = setup({options: generateOptions(40), filterable: true});
            const user = userEvent.setup();
            await user.click(getByTestId(TEST_QA));

            await user.keyboard('3');

            // The list is filtered and the activity falls back to the first option left
            expect(getByTestId(SelectQa.ACTIVE_ITEM)).toHaveTextContent('Value 3');
        });
    });

    // There is no option count threshold any more: virtualization is opt-in from the outside
    describe('virtualization', () => {
        const OPTIONS_COUNT = 60;
        mockLayout({viewport: 100, row: 28});

        test('every option is a DOM row without the wrapper', async () => {
            const {getByTestId, getAllByRole} = setup({
                options: generateOptions(OPTIONS_COUNT),
            });
            const user = userEvent.setup();
            await user.click(getByTestId(TEST_QA));

            expect(getByTestId(SelectQa.LIST)).not.toHaveClass(SELECT_LIST_VIRTUALIZED_CLASS);
            expect(getAllByRole('option')).toHaveLength(OPTIONS_COUNT);
        });

        test('inside ListVirtualizer only the visible window is rendered', async () => {
            const {getByTestId, getAllByRole} = render(
                <MobileProvider mobile={false}>
                    <ListVirtualizer>
                        <ControlledSelect options={generateOptions(OPTIONS_COUNT)} />
                    </ListVirtualizer>
                </MobileProvider>,
            );
            const user = userEvent.setup();
            await user.click(getByTestId(TEST_QA));

            expect(getByTestId(SelectQa.LIST)).toHaveClass(SELECT_LIST_VIRTUALIZED_CLASS);
            expect(getAllByRole('option').length).toBeLessThan(OPTIONS_COUNT);
        });
    });
});
