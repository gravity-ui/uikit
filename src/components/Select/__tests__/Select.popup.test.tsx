import userEvent from '@testing-library/user-event';

import {SelectQa} from '../constants';
import type {SelectSize} from '../types';

import {DEFAULT_OPTIONS, TEST_QA, setup} from './utils';

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
});
