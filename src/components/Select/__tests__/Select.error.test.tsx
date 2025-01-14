import {render, screen} from '../../../../test-utils/utils';
import {CONTROL_ERROR_MESSAGE_QA} from '../../controls/utils';
import {Select} from '../Select';

import {SELECT_CONTROL_BUTTON_ERROR_CLASS, TEST_QA, setup} from './utils';

describe('Select error', () => {
    test('render error appearance with invalid state and without errorMessage', () => {
        const {getByTestId} = setup({validationState: 'invalid'});
        const selectControl = getByTestId(TEST_QA);

        expect(selectControl).toHaveClass(SELECT_CONTROL_BUTTON_ERROR_CLASS);
    });
    test('render error message with error prop (if it is not an empty string)', () => {
        render(<Select error="Some Error" />);

        expect(screen.getByText('Some Error')).toBeVisible();
    });

    test('render error message with errorMessage prop (if it is not an empty string)', () => {
        render(<Select errorMessage="Some Error with errorMessage prop" />);

        expect(screen.queryByText('Some Error with errorMessage prop')).not.toBeInTheDocument();
    });

    test('render error message with errorMessage prop and invalid state (if it is not an empty string)', () => {
        render(
            <Select errorMessage="Some Error with errorMessage prop" validationState="invalid" />,
        );

        expect(screen.getByText('Some Error with errorMessage prop')).toBeVisible();
    });

    test('render error icon if tooltip option is selected for errorPlacement prop', () => {
        render(
            <Select errorMessage="Some Error" validationState="invalid" errorPlacement="inside" />,
        );

        expect(screen.getByLabelText('Show popup with error info')).toBeInTheDocument();
    });

    test('do not show error message without error/errorMessage prop', () => {
        render(<Select />);

        expect(screen.queryByTestId(CONTROL_ERROR_MESSAGE_QA)).not.toBeInTheDocument();
    });

    test('do not show error message if error prop value is an empty string', () => {
        render(<Select error={''} />);

        expect(screen.queryByTestId(CONTROL_ERROR_MESSAGE_QA)).not.toBeInTheDocument();
    });

    test('do not show error message if errorMessage prop value is an empty string', () => {
        render(<Select errorMessage={''} />);

        expect(screen.queryByTestId(CONTROL_ERROR_MESSAGE_QA)).not.toBeInTheDocument();
    });

    test('do not show error icon if error prop is an empty string', () => {
        render(<Select error={''} errorPlacement="inside" />);

        expect(screen.queryByLabelText('Show popup with error info')).not.toBeInTheDocument();
    });

    test('do not show error icon if errorMessage prop is an empty string', () => {
        render(<Select errorMessage={''} errorPlacement="inside" />);

        expect(screen.queryByLabelText('Show popup with error info')).not.toBeInTheDocument();
    });
});
