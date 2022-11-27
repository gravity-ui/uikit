import React from 'react';
import {cleanup} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {TextInput} from '../../TextInput';
import type {SelectProps} from '../types';
import {TEST_QA, generateOptions, setup} from './utils';

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
});

const onFilterChange = jest.fn();
const FILTER_PLACEHOLDER = 'Filter placeholder';
const EMPTY_PLACEHOLDER_QA = 'empty-placeholder';

const renderCustomFilter: SelectProps['renderFilter'] = (props) => {
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

describe('Select filter', () => {
    test.each<[string, Partial<SelectProps>]>([
        ['default', {renderFilter: undefined}],
        ['custom', {renderFilter: renderCustomFilter}],
    ])('base functional with %s filter section', async (_, {renderFilter}) => {
        const {getByTestId, getByPlaceholderText, getAllByRole, queryAllByRole} = setup({
            options: generateOptions(40),
            filterPlaceholder: FILTER_PLACEHOLDER,
            filterable: true,
            onFilterChange,
            renderFilter,
        });
        const user = userEvent.setup();
        const selectControl = getByTestId(TEST_QA);
        await user.click(selectControl);
        // check filterPlaceholder property and default filter autofocus
        expect(getByPlaceholderText(FILTER_PLACEHOLDER)).toHaveFocus();
        await user.keyboard('1');
        // 1, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 31
        expect(getAllByRole('listitem').length).toBe(13);
        await user.keyboard('1');
        // 11
        expect(getAllByRole('listitem').length).toBe(1);
        await user.keyboard('1');
        // empty
        expect(queryAllByRole('listitem').length).toBe(0);
        expect(onFilterChange).toBeCalledTimes(3);
    });

    test('should render emptyPlaceholder', async () => {
        const {getByTestId, queryAllByRole} = setup({
            options: generateOptions(40),
            filterable: true,
            emptyPlaceholder: <div data-qa={EMPTY_PLACEHOLDER_QA}>Empty plactholder</div>,
        });
        const user = userEvent.setup();
        const selectControl = getByTestId(TEST_QA);
        await user.click(selectControl);
        await user.keyboard('z');
        expect(queryAllByRole('listitem').length).toBe(0);
        getByTestId(EMPTY_PLACEHOLDER_QA);
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
        expect(queryAllByRole('listitem').length).toBe(40);
    });
});
