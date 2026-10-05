import userEvent from '@testing-library/user-event';

import {Select} from '..';
import {cleanup, render, screen} from '../../../../test-utils/utils';

import {DEFAULT_OPTIONS, SELECT_CONTROL_BUTTON_OPEN_CLASS, TEST_QA, setup} from './utils';

afterEach(cleanup);

const [JS, PYTHON, RUBY] = DEFAULT_OPTIONS.map((option) => option.content as string);

describe('Select: the selection of the List', () => {
    test('single: an option closes the popup, the selected one does it without an update', async () => {
        const onUpdate = jest.fn();
        setup({onUpdate, value: ['js']});
        const user = userEvent.setup();
        const control = screen.getByTestId(TEST_QA);

        await user.click(control);
        await user.click(screen.getByRole('option', {name: JS}));
        expect(onUpdate).not.toHaveBeenCalled();
        expect(control).not.toHaveClass(SELECT_CONTROL_BUTTON_OPEN_CLASS);

        await user.click(control);
        await user.click(screen.getByRole('option', {name: PYTHON}));
        expect(onUpdate).toHaveBeenLastCalledWith(['python']);
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

    test('a value without an option survives the toggles of the others', async () => {
        const onUpdate = jest.fn();
        setup({onUpdate, multiple: true, value: ['gone', 'js']});
        const user = userEvent.setup();

        await user.click(screen.getByTestId(TEST_QA));
        await user.click(screen.getByRole('option', {name: PYTHON}));
        expect(onUpdate).toHaveBeenLastCalledWith(['gone', 'js', 'python']);

        await user.click(screen.getByRole('option', {name: JS}));
        expect(onUpdate).toHaveBeenLastCalledWith(['gone', 'python']);
    });

    describe('ranges in multiple', () => {
        test('Shift+click selects the options between the anchor and the target', async () => {
            const onUpdate = jest.fn();
            setup({onUpdate, multiple: true});
            const user = userEvent.setup();

            await user.click(screen.getByTestId(TEST_QA));
            await user.click(screen.getByRole('option', {name: JS}));
            await user.keyboard('{Shift>}');
            await user.click(screen.getByRole('option', {name: RUBY}));
            await user.keyboard('{/Shift}');
            expect(onUpdate).toHaveBeenLastCalledWith(['js', 'python', 'ruby']);
        });

        test('Shift+ArrowDown extends the range from the anchor', async () => {
            const onUpdate = jest.fn();
            setup({onUpdate, multiple: true});
            const user = userEvent.setup();

            await user.click(screen.getByTestId(TEST_QA));
            await user.click(screen.getByRole('option', {name: JS}));
            await user.keyboard('{Shift>}{ArrowDown}{ArrowDown}{/Shift}');
            expect(onUpdate).toHaveBeenLastCalledWith(['js', 'python', 'ruby']);
        });

        test('single mode has no ranges', async () => {
            const onUpdate = jest.fn();
            setup({onUpdate, value: ['js']});
            const user = userEvent.setup();

            await user.click(screen.getByTestId(TEST_QA));
            await user.keyboard('{Shift>}');
            await user.click(screen.getByRole('option', {name: RUBY}));
            await user.keyboard('{/Shift}');
            expect(onUpdate).toHaveBeenLastCalledWith(['ruby']);
        });
    });
});
