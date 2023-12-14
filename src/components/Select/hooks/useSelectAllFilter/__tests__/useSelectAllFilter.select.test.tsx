import React from 'react';

import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {Select} from '../../../../Select/Select';
import type {SelectProps} from '../../../../Select/types';
import {DEFAULT_OPTIONS, SELECT_CONTROL_BUTTON_OPEN_CLASS, TEST_QA} from '../../../__tests__/utils';
import {SELECT_ALL_QA, useSelectAllFilter} from '../useSelectAllFilter';

const FILTER_PLACEHOLDER = 'Filter placeholder';

export const ControlledSelectWithAll = (props: Partial<SelectProps>) => {
    const [value, setValue] = React.useState<string[]>([]);

    const {onUpdate, filterPlaceholder} = props;

    const handleUpdate = (nextValue: string[]) => {
        onUpdate?.(nextValue);
        setValue(nextValue);
    };

    const renderFilter = useSelectAllFilter({
        value: value,
        options: props.options,
        onUpdate: handleUpdate,
        filterPlaceholder: filterPlaceholder,
        hasClear: true,
        autoFocus: true,
    });

    return (
        <Select
            filterable
            hasClear
            multiple
            renderFilter={renderFilter}
            value={value}
            placeholder={'Select options'}
            options={props.options}
            onUpdate={handleUpdate}
            qa={TEST_QA}
        />
    );
};

export const setup = (props: Partial<SelectProps> = {}) => {
    const utils = render(<ControlledSelectWithAll {...props} />);
    return utils;
};

const onUpdate = jest.fn();
const onOpenChange = jest.fn();

describe('<Select> select all', () => {
    describe('open popup, select option by click and select all, then deselect', () => {
        test('abc', async () => {
            const {getByTestId, getByText, queryAllByRole, getByPlaceholderText} = setup({
                options: DEFAULT_OPTIONS,
                filterPlaceholder: FILTER_PLACEHOLDER,
                multiple: true,
                onUpdate,
                onOpenChange,
            });
            const user = userEvent.setup();
            const selectControl = getByTestId(TEST_QA);

            // open select popup
            await user.click(selectControl);
            expect(selectControl).toHaveClass(SELECT_CONTROL_BUTTON_OPEN_CLASS);
            const option = getByText(DEFAULT_OPTIONS[0].content as string);

            // select first option
            await user.click(option);
            expect(onUpdate).toHaveBeenLastCalledWith([DEFAULT_OPTIONS[0].value]);
            expect(selectControl).toHaveClass(SELECT_CONTROL_BUTTON_OPEN_CLASS);

            // test filter focus and placeholder
            const textInput = getByPlaceholderText(FILTER_PLACEHOLDER);
            await user.click(textInput);
            expect(textInput).toHaveFocus();

            // test filter work
            expect(queryAllByRole('option').length).toBe(3);
            await user.keyboard('y');
            expect(queryAllByRole('option').length).toBe(2);
            await user.keyboard('[Backspace]');
            expect(queryAllByRole('option').length).toBe(3);

            // select all options with first already selected
            const selectAllButton = getByTestId(SELECT_ALL_QA);
            await user.click(selectAllButton);
            expect(onUpdate).toHaveBeenLastCalledWith([
                DEFAULT_OPTIONS[0].value,
                DEFAULT_OPTIONS[1].value,
                DEFAULT_OPTIONS[2].value,
            ]);
            expect(selectControl).toHaveClass(SELECT_CONTROL_BUTTON_OPEN_CLASS);

            // search for and deselect 2 and 3 options
            await user.click(textInput);
            await user.keyboard('y');
            await user.click(selectAllButton);
            expect(onUpdate).toHaveBeenLastCalledWith([DEFAULT_OPTIONS[0].value]);
            expect(selectControl).toHaveClass(SELECT_CONTROL_BUTTON_OPEN_CLASS);

            // close select popup
            await user.keyboard('[Escape]');
            expect(selectControl).not.toHaveClass(SELECT_CONTROL_BUTTON_OPEN_CLASS);
        });
    });
});
