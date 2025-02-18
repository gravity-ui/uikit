import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {fireEvent, render, screen} from '../../../../test-utils/utils';
import {SheetQa} from '../../../components/Sheet/constants';
import {TextInput} from '../../controls';
import {MobileProvider} from '../../mobile';
import {Select} from '../Select';
import type {SelectOption, SelectProps, SelectRenderPopup} from '../types';

import {TEST_QA, generateOptions, generateOptionsGroups, setup, timeout} from './utils';

afterEach(() => {
    jest.clearAllMocks();
});

const onFilterChange = jest.fn();
const FILTER_PLACEHOLDER = 'Filter placeholder';
const EMPTY_OPTIONS_QA = 'empty-options';

const RENDER_CUSTOM_FILTER: SelectProps['renderFilter'] = (props) => {
    const {value, ref, onChange, onKeyDown} = props;

    return (
        <TextInput
            controlRef={ref}
            placeholder={FILTER_PLACEHOLDER}
            value={value}
            onUpdate={onChange}
            onKeyDown={onKeyDown}
        />
    );
};

const RENDER_POPUP: SelectRenderPopup = ({renderList, renderFilter}) => {
    return (
        <React.Fragment>
            {renderFilter()}
            {renderList()}
        </React.Fragment>
    );
};

describe('Select filter', () => {
    test.each([
        ['default', undefined, undefined],
        ['custom', RENDER_CUSTOM_FILTER, RENDER_POPUP],
        ['custom', RENDER_CUSTOM_FILTER, undefined],
    ])('base functional with %s filter section', async (_, renderFilter, renderPopup) => {
        const {getByTestId, getByPlaceholderText, getAllByRole, queryAllByRole} = setup({
            options: generateOptions(40),
            filterPlaceholder: FILTER_PLACEHOLDER,
            filterable: true,
            onFilterChange,
            renderFilter,
            renderPopup,
        });
        const user = userEvent.setup();
        const selectControl = getByTestId(TEST_QA);
        await user.click(selectControl);
        // check filterPlaceholder property and default filter autofocus
        expect(getByPlaceholderText(FILTER_PLACEHOLDER)).toHaveFocus();
        await user.keyboard('1');
        // 1, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 31
        expect(getAllByRole('option').length).toBe(13);
        await user.keyboard('1');
        // 11
        expect(getAllByRole('option').length).toBe(1);
        await user.keyboard('1');
        // empty
        expect(queryAllByRole('option').length).toBe(0);
        expect(onFilterChange).toBeCalledTimes(3);
    });

    test('should render node with renderEmptyOptions', async () => {
        const {getByTestId, queryAllByRole} = setup({
            options: generateOptions(40),
            filterable: true,
            renderEmptyOptions: () => <div data-qa={EMPTY_OPTIONS_QA}>Empty options</div>,
        });
        const user = userEvent.setup();
        const selectControl = getByTestId(TEST_QA);
        await user.click(selectControl);
        await user.keyboard('z');
        expect(queryAllByRole('option').length).toBe(0);
        getByTestId(EMPTY_OPTIONS_QA);
    });

    test('should compare options by filterOption', async () => {
        const {getByTestId, queryAllByRole} = setup({
            options: generateOptions(40),
            filterable: true,
            filterOption: () => true,
        });
        const user = userEvent.setup();
        const selectControl = getByTestId(TEST_QA);
        await user.click(selectControl);
        await user.keyboard('[a][b][c][1][2]');
        // filter shouldn`t work due to initialized filterOption
        expect(queryAllByRole('option').length).toBe(40);
    });

    test('should filter options even if filter text is empty', async () => {
        const filterOption = jest.fn((option: SelectOption) => option.value.endsWith('0'));
        const {getByTestId, queryAllByRole} = setup({
            options: generateOptions(40),
            filterable: true,
            filterOption,
        });
        const user = userEvent.setup();
        const selectControl = getByTestId(TEST_QA);
        await user.click(selectControl);
        expect(filterOption).toHaveBeenCalled();
        // 10, 20, 30, 40
        expect(queryAllByRole('option').length).toBe(4);
    });

    test('should not display labels of empty groups during filtering', async () => {
        const {getByTestId, queryAllByRole} = setup({
            options: generateOptionsGroups(4, 1),
            filterable: true,
        });
        const user = userEvent.setup();
        const selectControl = getByTestId(TEST_QA);
        await user.click(selectControl);
        // 4 group labels + 1 option in each group
        expect(queryAllByRole('option').length).toBe(8);
        await user.keyboard('definitely not option');
        expect(queryAllByRole('option').length).toBe(0);
    });

    test('should not clear filter onClose if open is true', async () => {
        const onClose = jest.fn();
        render(
            <MobileProvider mobile>
                <Select
                    open
                    filterable
                    onFilterChange={onFilterChange}
                    onClose={onClose}
                    filterPlaceholder="filter"
                >
                    <Select.Option value="one">One</Select.Option>
                    <Select.Option value="two">Two</Select.Option>
                    <Select.Option value="three">Three</Select.Option>
                </Select>
            </MobileProvider>,
        );

        const sheetVeil = screen.getByTestId(SheetQa.VEIL);

        fireEvent.transitionEnd(sheetVeil);

        await userEvent.click(screen.getByPlaceholderText('filter'));
        await userEvent.keyboard('test');

        expect(onFilterChange).toHaveBeenCalledTimes(4);
        onFilterChange.mockClear();

        await userEvent.click(sheetVeil);
        fireEvent.transitionEnd(sheetVeil);
        await timeout(400);

        expect(onClose).toHaveBeenCalledTimes(1);
        expect(onFilterChange).toHaveBeenCalledTimes(0);
    });

    test('should not clear filter onClose', async () => {
        const onClose = jest.fn();
        render(
            <MobileProvider mobile>
                <Select
                    defaultOpen={true}
                    filterable
                    onFilterChange={onFilterChange}
                    onClose={onClose}
                    filterPlaceholder="filter"
                >
                    <Select.Option value="one">One</Select.Option>
                    <Select.Option value="two">Two</Select.Option>
                    <Select.Option value="three">Three</Select.Option>
                </Select>
            </MobileProvider>,
        );

        const sheetVeil = screen.getByTestId(SheetQa.VEIL);

        fireEvent.transitionEnd(sheetVeil);

        await userEvent.click(screen.getByPlaceholderText('filter'));
        await userEvent.keyboard('test');

        expect(onFilterChange).toHaveBeenCalledTimes(4);
        onFilterChange.mockClear();

        await userEvent.click(sheetVeil);
        fireEvent.transitionEnd(sheetVeil);
        await timeout(400);

        expect(onClose).toHaveBeenCalledTimes(1);
        expect(onFilterChange).toHaveBeenCalledTimes(1);
    });
});
