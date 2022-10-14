import React from 'react';
import userEvent from '@testing-library/user-event';
import {render} from '@testing-library/react';
import {ListQa} from '../../List';
import {Select, SelectOption, SelectOptionGroup, SelectQa} from '..';
import {QUICK_SEARCH_TIMEOUT} from '../constants';
import {generateOptions, timeout} from './utils';

const TEST_QA = 'select-test-qa';
const DEFAULT_OPTIONS = generateOptions([
    ['js', 'JavaScript'],
    ['python', 'Python'],
    ['ruby', 'Ruby'],
]);
const QUICK_SEARCH_OPTIONS = generateOptions(40);
const GROUPED_QUICK_SEARCH_OPTIONS: SelectOptionGroup[] = [
    {label: 'Group 1', options: generateOptions(40).slice(0, 20)},
    {label: 'Group 2', options: generateOptions(40).slice(20)},
];
const GROUPED_OPTIONS: SelectOptionGroup[] = [
    {label: 'Group 1', options: DEFAULT_OPTIONS.slice(0, 2)},
    {label: 'Group 2', options: DEFAULT_OPTIONS.slice(2)},
];

describe('Select base actions', () => {
    const setup = ({
        options = DEFAULT_OPTIONS,
    }: {options?: (SelectOption | SelectOptionGroup)[]} = {}) => {
        const utils = render(<Select qa={TEST_QA} options={options} />);
        return utils;
    };

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
});
