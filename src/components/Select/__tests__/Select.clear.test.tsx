import userEvent from '@testing-library/user-event';

import {cleanup} from '../../../../test-utils/utils';
import {SelectQa} from '../constants';
import type {SelectProps} from '../types';

import {DEFAULT_OPTIONS, renderControl, setup} from './utils';

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
});

const onUpdate = jest.fn();

describe('Select clear', () => {
    test.each<[string, Partial<SelectProps>]>([
        ['single', {hasClear: true, multiple: false}],
        ['multiple', {hasClear: true, multiple: true}],
    ])('hide clear icon with hasClear and no selected value', async () => {
        const {queryByTestId} = setup({hasClear: true});
        expect(queryByTestId(SelectQa.CLEAR)).toBeNull();
    });

    test.each<[string, Partial<SelectProps>]>([
        ['single', {hasClear: true, multiple: false}],
        ['multiple', {hasClear: true, multiple: true}],
    ])('display clear icon with hasClear and with selected value', async () => {
        const {getByTestId} = setup({hasClear: true, value: [DEFAULT_OPTIONS[0].value]});
        getByTestId(SelectQa.CLEAR);
    });

    test.each<[string, Partial<SelectProps>]>([
        ['single', {hasClear: true, multiple: false}],
        ['multiple', {hasClear: true, multiple: true}],
    ])('hide clear icon for disabled select with hasClear and with selected value', async () => {
        const {queryByTestId} = setup({
            hasClear: true,
            disabled: true,
            value: [DEFAULT_OPTIONS[0].value],
        });
        expect(queryByTestId(SelectQa.CLEAR)).toBeNull();
    });

    test.each<[string, Partial<SelectProps>]>([
        ['single', {hasClear: true, multiple: false}],
        ['multiple', {hasClear: true, multiple: true}],
    ])('click on clear icon will remove selected value', async () => {
        const {getByTestId} = setup({
            hasClear: true,
            value: [DEFAULT_OPTIONS[0].value],
            onUpdate,
        });

        const user = userEvent.setup();
        await user.click(getByTestId(SelectQa.CLEAR));
        expect(onUpdate).toHaveBeenCalledWith([]);
    });

    test.each<[string, Partial<SelectProps>]>([
        ['single', {hasClear: true, multiple: false}],
        ['multiple', {hasClear: true, multiple: true}],
    ])('check for correct focus on tab with hasClear and with selected value', async () => {
        setup({
            hasClear: true,
            value: [DEFAULT_OPTIONS[0].value],
            onUpdate,
        });
        const user = userEvent.setup();
        await user.keyboard('[Tab]');
        await user.keyboard('[Tab]');
        // check that after double tab clear icon is focused and press enter will clear the value
        await user.keyboard('[Enter]');
        expect(onUpdate).toHaveBeenCalledWith([]);
    });

    test.each([[{multiple: false}], [{multiple: true}]])(
        'check for correct onClear invocation in case of using renderControl without basic clear button (args: %j)',
        async (props) => {
            const {getByText} = setup({
                ...props,
                options: DEFAULT_OPTIONS,
                value: [DEFAULT_OPTIONS[0].value],
                renderControl,
                onUpdate,
            });
            const user = userEvent.setup();
            const clearButton = getByText('Clear');
            await user.click(clearButton);
            expect(onUpdate).toHaveBeenCalledWith([]);
        },
    );
});
