import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {act, fireEvent, render, screen} from '../../../../test-utils/utils';
import {PinInput} from '../PinInput';
import type {PinInputApi} from '../PinInput';

describe('PinInput', () => {
    let inputs: HTMLElement[];

    function renderComponent(jsx: React.ReactElement) {
        // eslint-disable-next-line testing-library/render-result-naming-convention
        const result = render(jsx);
        // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
        inputs = [...result.container.querySelectorAll('input')];
        return result;
    }

    function expectInputsHaveValues(value: string[]) {
        inputs.forEach((input, i) => {
            expect(input).toHaveValue(value[i]);
        });
    }

    test('render defaults', () => {
        renderComponent(<PinInput />);
        expect(inputs.length).toBe(4);
    });

    test('set default value', () => {
        renderComponent(<PinInput defaultValue={['t', 'e', 's', 't']} />);
        expectInputsHaveValues(['t', 'e', 's', 't']);
    });

    test('set length', () => {
        renderComponent(<PinInput length={6} />);
        expect(inputs.length).toBe(6);
    });

    test('set size', () => {
        const {container} = renderComponent(<PinInput size="l" />);
        // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
        const elements = container.querySelectorAll('.g-text-input_size_l');
        expect(elements.length).toBe(4);
    });

    test('set type=numeric', () => {
        renderComponent(<PinInput type="numeric" />);
        inputs.forEach((input) => expect(input).toHaveAttribute('inputmode', 'numeric'));
    });

    test('set type=alphanumeric', () => {
        renderComponent(<PinInput type="alphanumeric" />);
        inputs.forEach((input) => expect(input).toHaveAttribute('inputmode', 'text'));
    });

    test('set disabled', () => {
        renderComponent(<PinInput disabled />);
        inputs.forEach((input) => expect(input).toHaveAttribute('disabled'));
    });

    test('set placeholder', () => {
        renderComponent(<PinInput placeholder="X" />);
        inputs.forEach((input) => expect(input).toHaveAttribute('placeholder', 'X'));
    });

    test('omit placeholder when focused', () => {
        renderComponent(<PinInput placeholder="X" />);
        act(() => {
            inputs[1].focus();
        });
        inputs.forEach((input, i) => {
            if (i === 1) {
                expect(input).not.toHaveAttribute('placeholder');
            } else {
                expect(input).toHaveAttribute('placeholder', 'X');
            }
        });
    });

    test('set mask', () => {
        const {container} = renderComponent(<PinInput mask />);
        // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
        const elements = container.querySelectorAll('input[type="password"]');
        expect(elements.length).toBeGreaterThan(0);
    });

    test('set otp', () => {
        renderComponent(<PinInput otp />);
        inputs.forEach((input) => expect(input).toHaveAttribute('autocomplete', 'one-time-code'));
    });

    test('set invalid state', () => {
        renderComponent(<PinInput validationState="invalid" />);
        inputs.forEach((input) => expect(input).toHaveAttribute('aria-invalid'));
    });

    test('set error message', () => {
        renderComponent(<PinInput validationState="invalid" errorMessage="test error" />);
        const msg = screen.getByText('test error');
        expect(msg).toBeVisible();
    });

    test('set note', () => {
        renderComponent(<PinInput note="test note" />);
        const note = screen.getByText('test note');
        expect(note).toBeVisible();
    });

    test('call onUpdate when any input changed', async () => {
        const onUpdate = jest.fn();
        renderComponent(<PinInput onUpdate={onUpdate} />);

        fireEvent.change(inputs[1], {target: {value: '1'}});
        fireEvent.change(inputs[3], {target: {value: '2'}});

        expect(onUpdate).toHaveBeenCalledTimes(2);
        expect(onUpdate).toHaveBeenNthCalledWith(1, ['', '1', '', '']);
        expect(onUpdate).toHaveBeenNthCalledWith(2, ['', '1', '', '2']);
    });

    test('call onUpdateComplete only when all inputs filled', async () => {
        const onUpdateComplete = jest.fn();
        renderComponent(<PinInput onUpdateComplete={onUpdateComplete} />);

        fireEvent.change(inputs[0], {target: {value: '0'}});
        fireEvent.change(inputs[1], {target: {value: '1'}});
        fireEvent.change(inputs[2], {target: {value: '2'}});
        expect(onUpdateComplete).not.toHaveBeenCalled();
        fireEvent.change(inputs[3], {target: {value: '3'}});
        expect(onUpdateComplete).toHaveBeenCalledTimes(1);
        expect(onUpdateComplete).toHaveBeenCalledWith(['0', '1', '2', '3']);
        fireEvent.change(inputs[0], {target: {value: ''}});
        expect(onUpdateComplete).toHaveBeenCalledTimes(1);
    });

    test('call onUpdate only for valid value when type=numeric', () => {
        const onUpdate = jest.fn();
        renderComponent(<PinInput onUpdate={onUpdate} type="numeric" />);

        fireEvent.change(inputs[0], {target: {value: '1'}});
        fireEvent.change(inputs[0], {target: {value: 'x'}});
        fireEvent.change(inputs[0], {target: {value: '@'}});

        expect(onUpdate).toHaveBeenCalledTimes(1);
        expect(inputs[0]).toHaveValue('1');
    });

    test('call onUpdate only for valid value when type=alphanumeric', () => {
        const onUpdate = jest.fn();
        renderComponent(<PinInput onUpdate={onUpdate} type="alphanumeric" />);

        fireEvent.change(inputs[0], {target: {value: '1'}});
        fireEvent.change(inputs[0], {target: {value: 'x'}});
        fireEvent.change(inputs[0], {target: {value: '@'}});

        expect(onUpdate).toHaveBeenCalledTimes(2);
        expect(inputs[0]).toHaveValue('x');
    });

    test('typing via keyboard', async () => {
        const user = userEvent.setup();
        const onUpdate = jest.fn();
        renderComponent(<PinInput onUpdate={onUpdate} />);

        await user.click(inputs[0]);
        await user.keyboard('123456');

        expect(onUpdate).toHaveBeenNthCalledWith(1, ['1', '', '', '']);
        expect(onUpdate).toHaveBeenNthCalledWith(2, ['1', '2', '', '']);
        expect(onUpdate).toHaveBeenNthCalledWith(3, ['1', '2', '3', '']);
        expect(onUpdate).toHaveBeenNthCalledWith(4, ['1', '2', '3', '4']);
        expect(onUpdate).toHaveBeenNthCalledWith(5, ['1', '2', '3', '5']);
        expect(onUpdate).toHaveBeenNthCalledWith(6, ['1', '2', '3', '6']);
        expectInputsHaveValues(['1', '2', '3', '6']);
        expect(inputs[3]).toHaveFocus();
    });

    test('paste from clipboard', async () => {
        const user = userEvent.setup();
        const onUpdate = jest.fn();
        renderComponent(<PinInput onUpdate={onUpdate} />);

        // Paste shorter string than input count
        await user.click(inputs[0]);
        await user.paste('123');
        expectInputsHaveValues(['1', '2', '3', '']);
        expect(onUpdate).toHaveBeenLastCalledWith(['1', '2', '3', '']);
        expect(inputs[3]).toHaveFocus();

        // Paste longer string than input count
        await user.click(inputs[0]);
        await user.paste('123456');
        expectInputsHaveValues(['1', '2', '3', '4']);
        expect(onUpdate).toHaveBeenLastCalledWith(['1', '2', '3', '4']);
        expect(inputs[0]).toHaveFocus();

        // Paste while focused at not the first input
        await user.click(inputs[2]);
        await user.paste('9999');
        expectInputsHaveValues(['9', '9', '9', '9']);
        expect(onUpdate).toHaveBeenLastCalledWith(['9', '9', '9', '9']);
        expect(inputs[2]).toHaveFocus();

        // Paste one symbol
        await user.click(inputs[1]);
        await user.paste('0');
        expectInputsHaveValues(['9', '0', '9', '9']);
        expect(onUpdate).toHaveBeenLastCalledWith(['9', '0', '9', '9']);
        expect(inputs[2]).toHaveFocus();
    });

    test('backspace full deletion', async () => {
        const user = userEvent.setup();
        renderComponent(<PinInput defaultValue={['1', '2', '3', '4']} />);

        expectInputsHaveValues(['1', '2', '3', '4']);
        await user.click(inputs[3]);
        // Pressing "backspace" more times than input count
        await user.keyboard('{Backspace}{Backspace}{Backspace}{Backspace}{Backspace}');
        expectInputsHaveValues(['', '', '', '']);
        expect(inputs[0]).toHaveFocus();
    });

    test('move focus via left/right arrows', async () => {
        const user = userEvent.setup();
        renderComponent(<PinInput defaultValue={['0', '1', '2', '3']} />);

        await user.click(inputs[0]);
        expect(inputs[0]).toHaveFocus();
        await user.keyboard('{ArrowRight}');
        expect(inputs[1]).toHaveFocus();
        await user.keyboard('{ArrowRight}');
        expect(inputs[2]).toHaveFocus();
        await user.keyboard('{ArrowRight}');
        expect(inputs[3]).toHaveFocus();
        await user.keyboard('{ArrowRight}');
        expect(inputs[3]).toHaveFocus();
        await user.keyboard('{ArrowLeft}');
        expect(inputs[2]).toHaveFocus();
        await user.keyboard('{ArrowLeft}');
        expect(inputs[1]).toHaveFocus();
        await user.keyboard('{ArrowLeft}');
        expect(inputs[0]).toHaveFocus();
        await user.keyboard('{ArrowLeft}');
        expect(inputs[0]).toHaveFocus();
    });

    test('move focus via up/down arrows', async () => {
        const user = userEvent.setup();
        renderComponent(<PinInput defaultValue={['0', '1', '2', '3']} />);

        await user.click(inputs[0]);
        expect(inputs[0]).toHaveFocus();
        await user.keyboard('{ArrowDown}');
        expect(inputs[1]).toHaveFocus();
        await user.keyboard('{ArrowDown}');
        expect(inputs[2]).toHaveFocus();
        await user.keyboard('{ArrowDown}');
        expect(inputs[3]).toHaveFocus();
        await user.keyboard('{ArrowDown}');
        expect(inputs[3]).toHaveFocus();
        await user.keyboard('{ArrowUp}');
        expect(inputs[2]).toHaveFocus();
        await user.keyboard('{ArrowUp}');
        expect(inputs[1]).toHaveFocus();
        await user.keyboard('{ArrowUp}');
        expect(inputs[0]).toHaveFocus();
        await user.keyboard('{ArrowUp}');
        expect(inputs[0]).toHaveFocus();
    });

    describe('API', () => {
        test('focus', async () => {
            const user = userEvent.setup();
            const apiRef: React.RefObject<PinInputApi> = {current: null};
            renderComponent(<PinInput apiRef={apiRef} defaultValue={['0', '1', '2', '3']} />);

            await user.click(inputs[1]);
            expect(inputs[1]).toHaveFocus();
            await user.tab();
            expect(inputs[1]).not.toHaveFocus();
            act(() => {
                apiRef.current?.focus();
            });
            expect(inputs[1]).toHaveFocus();
        });
    });

    describe('Form', () => {
        test('should submit empty value by default', async () => {
            let value;
            const onSubmit = jest.fn((e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                value = [...formData.entries()];
            });
            render(
                <form data-qa="form" onSubmit={onSubmit}>
                    <PinInput name="pin-field" />
                    <button type="submit" data-qa="submit">
                        submit
                    </button>
                </form>,
            );
            await userEvent.click(screen.getByTestId('submit'));
            expect(onSubmit).toHaveBeenCalledTimes(1);
            expect(value).toEqual([['pin-field', '']]);
        });

        test('should submit default value', async () => {
            let value;
            const onSubmit = jest.fn((e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                value = [...formData.entries()];
            });

            render(
                <form data-qa="form" onSubmit={onSubmit}>
                    <PinInput name="pin-field" defaultValue={['1', '2', '3']} />
                    <button type="submit" data-qa="submit">
                        submit
                    </button>
                </form>,
            );
            await userEvent.click(screen.getByTestId('submit'));
            expect(onSubmit).toHaveBeenCalledTimes(1);
            expect(value).toEqual([['pin-field', '123']]);
        });

        test('should submit controlled value', async () => {
            let value;
            const onSubmit = jest.fn((e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                value = [...formData.entries()];
            });
            render(
                <form data-qa="form" onSubmit={onSubmit}>
                    <PinInput name="pin-field" value={['1', '2', '3']} />
                    <button type="submit" data-qa="submit">
                        submit
                    </button>
                </form>,
            );
            await userEvent.click(screen.getByTestId('submit'));
            expect(onSubmit).toHaveBeenCalledTimes(1);
            expect(value).toEqual([['pin-field', '123']]);
        });
        test('supports form reset', async () => {
            function Test() {
                const [value, setValue] = React.useState(['1', '2', '3']);
                return (
                    <form>
                        <PinInput name="pin-field" value={value} onUpdate={setValue} />
                        <input type="reset" data-qa="reset" />
                    </form>
                );
            }

            render(<Test />);
            // eslint-disable-next-line testing-library/no-node-access
            const inputs = document.querySelectorAll('[name=pin-field]');
            expect(inputs.length).toBe(1);
            expect(inputs[0]).toHaveValue('123');

            await userEvent.tab();
            await userEvent.keyboard('4587');

            expect(inputs[0]).toHaveValue('4587');

            const button = screen.getByTestId('reset');
            await userEvent.click(button);
            expect(inputs[0]).toHaveValue('123');
        });
    });
});
