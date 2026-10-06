import userEvent from '@testing-library/user-event';

import {Select} from '..';
import {cleanup, render, screen} from '../../../../test-utils/utils';

import {DEFAULT_OPTIONS, SELECT_CONTROL_BUTTON_OPEN_CLASS, TEST_QA, setup} from './utils';

afterEach(cleanup);

const [JS, PYTHON, RUBY] = DEFAULT_OPTIONS.map((option) => option.content as string);

describe('Select: the selection of the List', () => {
    test('single: the selected option closes the popup without an update', async () => {
        const onUpdate = jest.fn();
        setup({onUpdate, value: ['js']});
        const user = userEvent.setup();
        const control = screen.getByTestId(TEST_QA);

        await user.click(control);
        await user.click(screen.getByRole('option', {name: JS}));
        expect(onUpdate).not.toHaveBeenCalled();
        expect(control).not.toHaveClass(SELECT_CONTROL_BUTTON_OPEN_CLASS);
    });

    test('a disabled Select does not change its value', async () => {
        const onUpdate = jest.fn();
        render(
            <Select open disabled options={DEFAULT_OPTIONS} value={['js']} onUpdate={onUpdate} />,
        );
        const user = userEvent.setup();

        await user.click(screen.getByRole('option', {name: PYTHON}));
        expect(onUpdate).not.toHaveBeenCalled();
    });

    test('multiple: Shift+click and Shift+arrows select a range', async () => {
        const onUpdate = jest.fn();
        setup({onUpdate, multiple: true});
        const user = userEvent.setup();

        await user.click(screen.getByTestId(TEST_QA));
        await user.click(screen.getByRole('option', {name: JS}));
        await user.keyboard('{Shift>}');
        await user.click(screen.getByRole('option', {name: RUBY}));
        expect(onUpdate).toHaveBeenLastCalledWith(['js', 'python', 'ruby']);

        await user.keyboard('{ArrowUp}{/Shift}');
        expect(onUpdate).toHaveBeenLastCalledWith(['js', 'python']);
    });
});
