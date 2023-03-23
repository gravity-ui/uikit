import {DEFAULT_OPTIONS, setup, TEST_QA} from './utils';
import userEvent from '@testing-library/user-event';

const onUpdate = jest.fn();
describe('Select popup', () => {
    test.each([
        {
            attribute: 'select-sheet',
            mode: 'mobile',
        },
        {
            attribute: 'select-popup',
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
});
