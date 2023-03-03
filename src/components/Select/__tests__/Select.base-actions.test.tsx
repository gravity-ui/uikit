import React from 'react';
import userEvent from '@testing-library/user-event';
import {ListQa} from '../../List';
import {SelectQa} from '..';
import {QUICK_SEARCH_TIMEOUT, DEFAULT_VIRTUALIZATION_THRESHOLD} from '../constants';
import {
    TEST_QA,
    DEFAULT_OPTIONS,
    QUICK_SEARCH_OPTIONS,
    GROUPED_OPTIONS,
    GROUPED_QUICK_SEARCH_OPTIONS,
    SELECT_LIST_VIRTUALIZED_CLASS,
    setup,
    timeout,
    generateOptions,
    SELECT_CONTROL_OPEN_CLASS,
    ControlledSelect,
} from './utils';
import {act, render, screen} from '@testing-library/react';

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
    });

    describe('initial state', () => {
        test('should be closed while rendering with default props', async () => {
            await act(async () => {
                setup();
            });
            const selectControl = screen.getByTestId(TEST_QA);
            expect(selectControl).not.toHaveClass(SELECT_CONTROL_OPEN_CLASS);
            expect(screen.queryByTestId(SelectQa.POPUP)).toBeNull();
        });
    });

    describe('open', () => {
        test('should be opened while rendering with defaultOpen prop', async () => {
            await act(async () => {
                setup({defaultOpen: true});
            });
            const selectControl = screen.getByTestId(TEST_QA);
            expect(selectControl).toHaveClass(SELECT_CONTROL_OPEN_CLASS);
            screen.getByTestId(SelectQa.POPUP);
        });

        test('open prop dominates over defaultOpen prop', async () => {
            await act(async () => {
                setup({defaultOpen: false, open: true});
            });

            const selectControl = screen.getByTestId(TEST_QA);
            expect(selectControl).toHaveClass(SELECT_CONTROL_OPEN_CLASS);
        });

        test('shoult open/close by open prop', async () => {
            const {rerender, getByTestId} = render(<ControlledSelect open={true} />);

            const selectControl = getByTestId(TEST_QA);
            expect(selectControl).toHaveClass(SELECT_CONTROL_OPEN_CLASS);

            rerender(<ControlledSelect open={false} />);

            const rerenderedSelectControl = getByTestId(TEST_QA);
            expect(rerenderedSelectControl).not.toHaveClass(SELECT_CONTROL_OPEN_CLASS);
        });
        test('should not close when open=true prop passed', async () => {
            setup({open: true});
            const selectControl = screen.getByTestId(TEST_QA);

            expect(selectControl).toHaveClass(SELECT_CONTROL_OPEN_CLASS);

            await toggleSelectPopup();

            expect(selectControl).toHaveClass(SELECT_CONTROL_OPEN_CLASS);
        });

        test('should call onClose while closing', async () => {
            const onClose = jest.fn();
            setup({onClose});

            await toggleSelectPopup();
            await toggleSelectPopup();

            expect(onClose).toHaveBeenCalledTimes(1);
        });
        test('should call onClose whith controlled open', async () => {
            const onClose = jest.fn();
            setup({open: true, onClose});

            await toggleSelectPopup();

            expect(onClose).toHaveBeenCalledTimes(1);
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
                const selectedItem = getByTestId(ListQa.ACTIVE_ITEM);
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
                const selectedItem = getByTestId(ListQa.ACTIVE_ITEM);
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
                const selectedItem = getByTestId(ListQa.ACTIVE_ITEM);
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
                const selectedItem = getByTestId(ListQa.ACTIVE_ITEM);
                expect(selectedItem.textContent).toBe(content);
                await user.keyboard('[ArrowUp]');
            }
        });
    });

    describe('find elements in flat list by "quick search"', () => {
        test('with instant input', async () => {
            const {getByTestId} = setup({options: QUICK_SEARCH_OPTIONS});
            const user = userEvent.setup();
            const selectControl = getByTestId(TEST_QA);
            await user.click(selectControl);

            await user.keyboard('3');
            let selectedItem = getByTestId(ListQa.ACTIVE_ITEM);
            expect(selectedItem.textContent).toBe('Value 3');

            await user.keyboard('5');
            selectedItem = getByTestId(ListQa.ACTIVE_ITEM);
            expect(selectedItem.textContent).toBe('Value 35');

            await user.keyboard('[Backspace]');
            selectedItem = getByTestId(ListQa.ACTIVE_ITEM);
            expect(selectedItem.textContent).toBe('Value 3');
        });

        test('with delayed input', async () => {
            const {getByTestId} = setup({options: QUICK_SEARCH_OPTIONS});
            const user = userEvent.setup();
            const selectControl = getByTestId(TEST_QA);
            await user.click(selectControl);

            await user.keyboard('3');
            let selectedItem = getByTestId(ListQa.ACTIVE_ITEM);
            expect(selectedItem.textContent).toBe('Value 3');

            await timeout(QUICK_SEARCH_TIMEOUT);

            await user.keyboard('5');
            selectedItem = getByTestId(ListQa.ACTIVE_ITEM);
            expect(selectedItem.textContent).toBe('Value 5');
        });
    });

    describe('find elements in grouped list by "quick search"', () => {
        test('with instant input', async () => {
            const {getByTestId} = setup({options: GROUPED_QUICK_SEARCH_OPTIONS});
            const user = userEvent.setup();
            const selectControl = getByTestId(TEST_QA);
            await user.click(selectControl);

            await user.keyboard('3');
            let selectedItem = getByTestId(ListQa.ACTIVE_ITEM);
            expect(selectedItem.textContent).toBe('Value 3');

            await user.keyboard('5');
            selectedItem = getByTestId(ListQa.ACTIVE_ITEM);
            expect(selectedItem.textContent).toBe('Value 35');

            await user.keyboard('[Backspace]');
            selectedItem = getByTestId(ListQa.ACTIVE_ITEM);
            expect(selectedItem.textContent).toBe('Value 3');
        });

        test('with delayed input', async () => {
            const {getByTestId} = setup({options: GROUPED_QUICK_SEARCH_OPTIONS});
            const user = userEvent.setup();
            const selectControl = getByTestId(TEST_QA);
            await user.click(selectControl);

            await user.keyboard('3');
            let selectedItem = getByTestId(ListQa.ACTIVE_ITEM);
            expect(selectedItem.textContent).toBe('Value 3');

            await timeout(QUICK_SEARCH_TIMEOUT);

            await user.keyboard('5');
            selectedItem = getByTestId(ListQa.ACTIVE_ITEM);
            expect(selectedItem.textContent).toBe('Value 5');
        });
    });

    test('"quick search" don`t work in case of filterable', async () => {
        const {getByTestId} = setup({options: QUICK_SEARCH_OPTIONS, filterable: true});
        const user = userEvent.setup();
        const selectControl = getByTestId(TEST_QA);
        await user.click(selectControl);
        await user.keyboard('3');
        const selectedItem = getByTestId(ListQa.ACTIVE_ITEM);
        // active item didn`t changed
        expect(selectedItem.textContent).toBe('Value 3');
    });

    test.each<[number, number | undefined]>([
        [DEFAULT_VIRTUALIZATION_THRESHOLD - 1, undefined],
        [DEFAULT_VIRTUALIZATION_THRESHOLD, DEFAULT_VIRTUALIZATION_THRESHOLD + 1],
    ])(
        'select list shouldn`t have virtualization',
        async (optionsCount, virtualizationThreshold) => {
            const {getByTestId} = setup({
                options: generateOptions(optionsCount),
                virtualizationThreshold,
            });
            const user = userEvent.setup();
            const selectControl = getByTestId(TEST_QA);
            await user.click(selectControl);
            const selectList = getByTestId(SelectQa.LIST);
            expect(selectList).not.toHaveClass(SELECT_LIST_VIRTUALIZED_CLASS);
        },
    );

    test.each<[number, number | undefined]>([
        [DEFAULT_VIRTUALIZATION_THRESHOLD, undefined],
        [DEFAULT_VIRTUALIZATION_THRESHOLD - 1, DEFAULT_VIRTUALIZATION_THRESHOLD - 2],
    ])('select list should have virtualization', async (optionsCount, virtualizationThreshold) => {
        const {getByTestId} = setup({
            options: generateOptions(optionsCount),
            virtualizationThreshold,
        });
        const user = userEvent.setup();
        const selectControl = getByTestId(TEST_QA);
        await user.click(selectControl);
        const selectList = getByTestId(SelectQa.LIST);
        expect(selectList).toHaveClass(SELECT_LIST_VIRTUALIZED_CLASS);
    });
});
