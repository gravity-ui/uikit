import userEvent from '@testing-library/user-event';

import {GROUP_ITEM_MARGIN_TOP, SelectQa} from '../constants';
import type {SelectSize} from '../types';

import {DEFAULT_OPTIONS, GROUPED_OPTIONS, TEST_QA, setup} from './utils';

const onUpdate = jest.fn();
describe('Select popup', () => {
    test.each([
        {
            attribute: SelectQa.SHEET,
            mode: 'mobile',
        },
        {
            attribute: SelectQa.POPUP,
            mode: 'desktop',
        },
    ])('should render $attribute, when mode is $mode', async ({mode, attribute}) => {
        const mobile = mode === 'mobile';
        const {getByTestId, queryByTestId} = setup(
            {
                options: DEFAULT_OPTIONS,
                onUpdate,
            },
            mobile,
        );

        const user = userEvent.setup();
        const selectControl = getByTestId(TEST_QA);
        // open select popup
        await user.click(selectControl);
        // looking for popup
        const popup = queryByTestId(attribute);

        expect(popup).not.toBeNull();
    });

    test.each([
        ['s', {mobile: false, size: 's', height: 28}],
        ['m', {mobile: false, size: 'm', height: 28}],
        ['l', {mobile: false, size: 'l', height: 32}],
        ['xl', {mobile: false, size: 'xl', height: 36}],
        ['mobile', {mobile: true, size: undefined, height: 32}],
    ])(
        'should return correct height for option depends on size (%s)',
        async (_type, {size, height, mobile}) => {
            const renderOption = jest.fn();

            const {getByTestId} = setup(
                {size: size as SelectSize, renderOption, onUpdate, options: DEFAULT_OPTIONS},
                mobile,
            );

            const user = userEvent.setup();
            const selectControl = getByTestId(TEST_QA);
            // open select popup
            await user.click(selectControl);

            expect(renderOption).toHaveBeenCalledWith(
                expect.anything(),
                expect.objectContaining({itemHeight: height}),
            );
        },
    );

    test.each([
        ['s', {mobile: false, size: 's', height: 28}],
        ['m', {mobile: false, size: 'm', height: 28}],
        ['l', {mobile: false, size: 'l', height: 32}],
        ['xl', {mobile: false, size: 'xl', height: 36}],
        ['mobile', {mobile: true, size: undefined, height: 32}],
    ])(
        'should return correct height for option group depends on size (%s)',
        async (_type, {size, height, mobile}) => {
            expect.assertions(2);

            const renderOptionGroup = jest.fn();

            const {getByTestId} = setup(
                {size: size as SelectSize, renderOptionGroup, onUpdate, options: GROUPED_OPTIONS},
                mobile,
            );

            const user = userEvent.setup();
            const selectControl = getByTestId(TEST_QA);
            // open select popup
            await user.click(selectControl);

            expect(renderOptionGroup).toHaveBeenCalledWith(
                expect.anything(),
                expect.objectContaining({itemHeight: height}),
            );
            expect(renderOptionGroup).toHaveBeenCalledWith(
                expect.anything(),
                expect.objectContaining({itemHeight: height + GROUP_ITEM_MARGIN_TOP}),
            );
        },
    );

    test('should use getOptionHeight for render with correct size', async () => {
        const getOptionHeight = () => 32;
        const renderOption = jest.fn();

        const {getByTestId} = setup({
            renderOption,
            getOptionHeight,
            onUpdate,
            options: DEFAULT_OPTIONS,
        });

        const user = userEvent.setup();
        const selectControl = getByTestId(TEST_QA);
        // open select popup
        await user.click(selectControl);

        expect(renderOption).toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({itemHeight: getOptionHeight()}),
        );
    });

    test('should use getOptionGroupHeight for render with correct size', async () => {
        const getOptionGroupHeight = () => 32;
        const renderOptionGroup = jest.fn();

        const {getByTestId} = setup({
            renderOptionGroup,
            getOptionGroupHeight,
            onUpdate,
            options: GROUPED_OPTIONS,
        });

        const user = userEvent.setup();
        const selectControl = getByTestId(TEST_QA);
        // open select popup
        await user.click(selectControl);

        expect(renderOptionGroup).toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({itemHeight: getOptionGroupHeight()}),
        );
    });
});
