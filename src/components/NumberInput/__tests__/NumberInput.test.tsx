import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {act, fireEvent, render, screen} from '../../../../test-utils/utils';
import {KeyCode} from '../../../constants';
import {CONTROL_ERROR_ICON_QA} from '../../controls/utils';
import {NumberInput} from '../NumberInput';
import {CONTROL_BUTTONS_QA, DECREMENT_BUTTON_QA, INCREMENT_BUTTON_QA} from '../utils';

describe('NumberInput input', () => {
    const getUpButton = () => screen.getByTestId(INCREMENT_BUTTON_QA);
    const getDownButton = () => screen.getByTestId(DECREMENT_BUTTON_QA);
    const getClearButton = () => screen.queryByRole('button', {name: 'Clear'});
    const getControls = () => screen.queryByTestId(CONTROL_BUTTONS_QA);
    const getInput = () => screen.getByRole('spinbutton');

    describe('basic', () => {
        test('render input by default', () => {
            render(<NumberInput />);
            const input = getInput();

            expect(input).toBeVisible();
            expect(input.tagName.toLowerCase()).toBe('input');
        });

        it('calls onUpdate and onChange on input change', async () => {
            const handleUpdate = jest.fn();
            const handleChange = jest.fn();
            render(<NumberInput onUpdate={handleUpdate} onChange={handleChange} />);
            fireEvent.change(getInput(), {target: {value: '1'}});

            expect(handleUpdate).toHaveBeenCalledWith(1);
            expect(handleChange).toHaveBeenCalled();
        });

        it('updates displayed input value when value prop changes', async () => {
            const handleUpdate = jest.fn();
            const {rerender} = render(<NumberInput value={1} onUpdate={handleUpdate} />);

            expect(getInput()).toHaveValue('1');

            rerender(<NumberInput value={123} onUpdate={handleUpdate} />);
            expect(getInput()).toHaveValue('123');
        });

        it('updates displayed input value when value prop does not change after input change', async () => {
            render(<NumberInput value={1} />);

            fireEvent.change(getInput(), {target: {value: '123'}});

            expect(getInput()).toHaveValue('1');
        });

        it('calls onUpdate and onChange on input paste', async () => {
            const handleUpdate = jest.fn();
            const handleChange = jest.fn();
            render(<NumberInput allowDecimal onUpdate={handleUpdate} onChange={handleChange} />);
            fireEvent.change(getInput(), {target: {value: '- $123.45k'}});

            expect(handleUpdate).toHaveBeenCalledWith(-123.45);
            expect(handleChange).toHaveBeenCalled();
        });

        it('shows empty input with undefined value', async () => {
            const handleUpdate = jest.fn();
            const handleChange = jest.fn();
            render(
                <NumberInput value={undefined} onUpdate={handleUpdate} onChange={handleChange} />,
            );

            expect(getInput()).toHaveValue('');
        });

        it('calls onUpdate and onChange only with valid chars', async () => {
            const handleUpdate = jest.fn();
            const handleChange = jest.fn();
            render(<NumberInput allowDecimal onUpdate={handleUpdate} onChange={handleChange} />);
            fireEvent.change(getInput(), {target: {value: '123abc4.5'}});

            expect(handleUpdate).toHaveBeenCalledWith(1234.5);
        });

        it('assumes comma as dot', async () => {
            const handleUpdate = jest.fn();
            render(<NumberInput allowDecimal onUpdate={handleUpdate} />);

            fireEvent.change(getInput(), {target: {value: '1,2'}});

            expect(handleUpdate).toHaveBeenCalledWith(1.2);
        });

        it('does not call onUpdate with incomplete number input (with minus sign only or trailing dot)', async () => {
            const handleUpdate = jest.fn();
            const handleChange = jest.fn();
            render(<NumberInput allowDecimal onUpdate={handleUpdate} onChange={handleChange} />);
            fireEvent.change(getInput(), {target: {value: '-'}});
            fireEvent.change(getInput(), {target: {value: '-1.'}});

            expect(handleUpdate).toHaveBeenCalledTimes(1);
            expect(handleUpdate).toHaveBeenCalledWith(-1);
        });

        it('calls onFocus on increment/decrement button click', async () => {
            const user = userEvent.setup();
            const handleFocus = jest.fn();
            render(<NumberInput value={1} onFocus={handleFocus} />);

            await user.click(getUpButton());
            expect(handleFocus).toHaveBeenCalledTimes(1);
        });

        it('ignores trailing dot when pasting uncomplete value', async () => {
            const handleUpdate = jest.fn();
            render(<NumberInput allowDecimal onUpdate={handleUpdate} />);
            fireEvent.change(getInput(), {target: {value: '1.'}});

            expect(handleUpdate).toHaveBeenCalledWith(1);
        });

        it('removes trailling dot on blur', async () => {
            const handleUpdate = jest.fn();
            render(<NumberInput allowDecimal onUpdate={handleUpdate} />);
            const input = getInput();
            input.focus();
            fireEvent.change(getInput(), {target: {value: '1.'}});
            input.blur();

            expect(handleUpdate).toHaveBeenLastCalledWith(1);
        });

        it('removes redundant zeros on blur', async () => {
            const handleUpdate = jest.fn();
            render(<NumberInput allowDecimal step={0.1} onUpdate={handleUpdate} />);
            const input = getInput();
            input.focus();
            fireEvent.change(getInput(), {target: {value: '00001.10000'}});
            input.blur();

            expect(handleUpdate).toHaveBeenLastCalledWith(1.1);
        });

        it('sets min value on HOME button pressed when min defined', async () => {
            const handleUpdate = jest.fn();
            const user = userEvent.setup();
            render(<NumberInput onUpdate={handleUpdate} min={5} value={100} />);

            await user.click(getInput());
            await user.keyboard(`{${KeyCode.HOME}}`);

            expect(handleUpdate).toHaveBeenCalledWith(5);
        });

        it('ignores HOME button press when min is not defined', async () => {
            const handleUpdate = jest.fn();
            const user = userEvent.setup();
            render(<NumberInput onUpdate={handleUpdate} value={100} />);

            await user.click(getInput());
            await user.keyboard(`{${KeyCode.HOME}}`);

            expect(handleUpdate).not.toHaveBeenCalled();
        });

        it('sets max value on END button pressed when max defined', async () => {
            const handleUpdate = jest.fn();
            const user = userEvent.setup();
            render(<NumberInput onUpdate={handleUpdate} max={123} value={100} />);

            await user.click(getInput());
            await user.keyboard(`{${KeyCode.END}}`);

            expect(handleUpdate).toHaveBeenCalledWith(123);
        });

        it('ignores END button press when max is not defined', async () => {
            const handleUpdate = jest.fn();
            const user = userEvent.setup();
            render(<NumberInput onUpdate={handleUpdate} value={100} />);

            await user.click(getInput());
            await user.keyboard(`{${KeyCode.END}}`);

            expect(handleUpdate).not.toHaveBeenCalled();
        });
    });

    describe('min/max', () => {
        it('clamps to custom min value on blur', () => {
            const handleUpdate = jest.fn();
            render(<NumberInput min={-1} max={1000} value={-100000000} onUpdate={handleUpdate} />);
            const input = getInput();
            act(() => {
                input.focus();
                input.blur();
            });

            expect(handleUpdate).toHaveBeenLastCalledWith(-1);
        });
        it('clamps to custom max value on blur', () => {
            const handleUpdate = jest.fn();
            render(<NumberInput min={-1} max={1000} value={100000000} onUpdate={handleUpdate} />);
            const input = getInput();
            act(() => {
                input.focus();
                input.blur();
            });

            expect(handleUpdate).toHaveBeenLastCalledWith(1000);
        });
        it('clamps to default min value on blur', async () => {
            const handleUpdate = jest.fn();
            render(<NumberInput value={-10000000000000000000000} onUpdate={handleUpdate} />);
            const input = getInput();
            act(() => {
                input.focus();
                input.blur();
            });

            expect(handleUpdate).toHaveBeenLastCalledWith(Number.MIN_SAFE_INTEGER);
        });
        it('clamps to default max value on blur', async () => {
            const handleUpdate = jest.fn();
            render(<NumberInput value={10000000000000000000000} onUpdate={handleUpdate} />);
            const input = getInput();
            act(() => {
                input.focus();
                input.blur();
            });

            expect(handleUpdate).toHaveBeenLastCalledWith(Number.MAX_SAFE_INTEGER);
        });
        it('clamps to divisible value on blur', async () => {
            const handleUpdate = jest.fn();
            render(<NumberInput min={-2} value={7} step={4} onUpdate={handleUpdate} />);
            const input = getInput();
            act(() => {
                input.focus();
                input.blur();
            });

            expect(handleUpdate).toHaveBeenLastCalledWith(6);
        });
        it('does not clamp decimal without defined step on blur', async () => {
            const handleUpdate = jest.fn();
            render(<NumberInput value={7.123} allowDecimal onUpdate={handleUpdate} />);
            const input = getInput();

            act(() => {
                input.focus();
                input.blur();
            });

            expect(getInput()).toHaveValue('7.123');
        });
        it('swaps min/max if max < min', async () => {
            const handleUpdate = jest.fn();
            render(<NumberInput min={1000} max={-1} value={100000000} onUpdate={handleUpdate} />);
            const input = getInput();
            act(() => {
                input.focus();
                input.blur();
            });

            expect(handleUpdate).toHaveBeenLastCalledWith(1000);
        });

        it('does not treats empty value as zero when clearing input', async () => {
            const handleUpdate = jest.fn();
            render(
                <NumberInput
                    min={-10.25}
                    max={1000}
                    value={0.75}
                    allowDecimal
                    onUpdate={handleUpdate}
                />,
            );

            fireEvent.change(getInput(), {target: {value: ''}});
            expect(handleUpdate).toHaveBeenLastCalledWith(null);
        });
    });

    describe('render controls', () => {
        it('render clear button', () => {
            render(<NumberInput value={123} hasClear />);
            expect(getClearButton()).toBeInTheDocument();
        });

        it('do not render clear button without hasClear prop', () => {
            render(<NumberInput value={123} />);
            expect(getClearButton()).not.toBeInTheDocument();
        });

        it('render increment/decrement control buttons', () => {
            render(<NumberInput />);
            expect(getControls()).toBeInTheDocument();
        });

        it('do not render increment/decrement control buttons with hiddenControls prop set to "true"', () => {
            render(<NumberInput hiddenControls={true} />);
            expect(getControls()).not.toBeInTheDocument();
        });

        it('render error with inside placement', () => {
            render(
                <NumberInput
                    validationState="invalid"
                    errorMessage="A validation error has occurred"
                    errorPlacement="inside"
                />,
            );
            expect(screen.getByTestId(CONTROL_ERROR_ICON_QA)).toBeInTheDocument();
        });

        it('render additional end content with default onClick handler', async () => {
            const handleFocus = jest.fn();
            render(
                <NumberInput onFocus={handleFocus} endContent={<div>my awesome endContent</div>} />,
            );
            const customContent = await screen.findByText('my awesome endContent');
            expect(customContent).toBeInTheDocument();

            const user = userEvent.setup();
            await user.click(customContent);
            expect(handleFocus).toHaveBeenCalled();
        });
    });

    describe('increment/decrement', () => {
        it('increments value on arrowUp button click', async () => {
            const user = userEvent.setup();
            const handleUpdate = jest.fn();
            render(<NumberInput value={1} onUpdate={handleUpdate} />);

            await user.click(getUpButton());
            expect(handleUpdate).toHaveBeenCalledWith(2);
        });

        it('decrements value on arrowDown button click', async () => {
            const user = userEvent.setup();
            const handleUpdate = jest.fn();
            render(<NumberInput value={2} onUpdate={handleUpdate} />);

            await user.click(getDownButton());
            expect(handleUpdate).toHaveBeenCalledWith(1);
        });

        it('clamps value to divisible on incrementation', async () => {
            const user = userEvent.setup();
            const handleUpdate = jest.fn();
            render(<NumberInput min={-2} step={5} value={2} onUpdate={handleUpdate} />);

            await user.click(getUpButton());
            expect(handleUpdate).toHaveBeenCalledWith(3);
        });

        it('treats empty value as zero when incrementing/decrementing', async () => {
            const user = userEvent.setup();
            const handleUpdate = jest.fn();
            render(<NumberInput value={undefined} onUpdate={handleUpdate} />);

            await user.click(getUpButton());
            expect(handleUpdate).toHaveBeenCalledWith(1);
        });

        it('increments values by keyboard arrowUp', async () => {
            const user = userEvent.setup();
            const handleUpdate = jest.fn();
            render(<NumberInput value={1} onUpdate={handleUpdate} />);
            await user.click(getInput());

            await user.keyboard(`{${KeyCode.ARROW_UP}}`);
            expect(handleUpdate).toHaveBeenCalledWith(2);
        });

        it('decrements values by keyboard arrowDown', async () => {
            const user = userEvent.setup();
            const handleUpdate = jest.fn();
            render(<NumberInput value={2} onUpdate={handleUpdate} />);
            await user.click(getInput());

            await user.keyboard(`{${KeyCode.ARROW_DOWN}}`);
            expect(handleUpdate).toHaveBeenCalledWith(1);
        });

        it('uses external step value in controls', async () => {
            const user = userEvent.setup();
            const handleUpdate = jest.fn();
            render(
                <NumberInput min={1} value={1} step={0.2} allowDecimal onUpdate={handleUpdate} />,
            );

            await user.click(getUpButton());
            expect(handleUpdate).toHaveBeenCalledWith(1.2);
        });

        it('rounds down external step value without allowDecimal prop', async () => {
            const user = userEvent.setup();
            const handleUpdate = jest.fn();
            render(<NumberInput min={1} value={1} step={2.2} onUpdate={handleUpdate} />);

            await user.click(getUpButton());
            expect(handleUpdate).toHaveBeenCalledWith(3);
        });

        it('uses external step value for keyboard events', async () => {
            const user = userEvent.setup();
            const handleUpdate = jest.fn();
            render(
                <NumberInput min={1} value={1} step={0.2} allowDecimal onUpdate={handleUpdate} />,
            );
            await user.click(getInput());

            await user.keyboard(`{${KeyCode.ARROW_UP}}`);
            expect(handleUpdate).toHaveBeenCalledWith(1.2);
        });

        it('uses shiftMultiplier with Shift button pressed in incrementation with rendered control button', async () => {
            const user = userEvent.setup();
            const handleUpdate = jest.fn();
            render(
                <NumberInput
                    value={1}
                    step={0.2}
                    shiftMultiplier={30}
                    allowDecimal
                    onUpdate={handleUpdate}
                />,
            );
            await user.click(getInput());

            await user.keyboard(`{${KeyCode.SHIFT}>}`);
            await user.click(getUpButton());
            await user.keyboard(`{/${KeyCode.SHIFT}}`);
            expect(handleUpdate).toHaveBeenCalledWith(7);
        });

        it('rounds down shiftMultiplier without allowDecimal prop', async () => {
            const user = userEvent.setup();
            const handleUpdate = jest.fn();
            render(<NumberInput value={1} shiftMultiplier={7.5} onUpdate={handleUpdate} />);
            await user.click(getInput());

            await user.keyboard(`{${KeyCode.SHIFT}>}{${KeyCode.ARROW_UP}}{/${KeyCode.SHIFT}}`);
            expect(handleUpdate).toHaveBeenCalledWith(8);
        });

        it('rounds down step and shiftMultiplier before multiplication', async () => {
            const user = userEvent.setup();
            const handleUpdate = jest.fn();
            const {rerender} = render(
                <NumberInput
                    min={1}
                    value={1}
                    step={2.2}
                    shiftMultiplier={7.5}
                    onUpdate={handleUpdate}
                />,
            );
            await user.click(getInput());

            await user.click(getUpButton());
            expect(handleUpdate).toHaveBeenNthCalledWith(1, 3);

            rerender(
                <NumberInput
                    min={1}
                    value={3}
                    step={2.2}
                    shiftMultiplier={7.5}
                    onUpdate={handleUpdate}
                />,
            );
            await user.keyboard(`{${KeyCode.SHIFT}>}`);
            await user.keyboard(`{${KeyCode.ARROW_UP}}`);
            await user.keyboard(`{/${KeyCode.SHIFT}}`);
            expect(handleUpdate).toHaveBeenNthCalledWith(2, 17);
        });
    });

    describe('form', () => {
        test('should submit empty value by default', async () => {
            let value;
            const onSubmit = jest.fn((e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                value = [...formData.entries()];
            });
            render(
                <form data-qa="form" onSubmit={onSubmit}>
                    <NumberInput name="numeric-field" />
                    <button type="submit" data-qa="submit">
                        submit
                    </button>
                </form>,
            );
            await userEvent.click(screen.getByTestId('submit'));
            expect(onSubmit).toHaveBeenCalledTimes(1);
            expect(value).toEqual([['numeric-field', '']]);
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
                    <NumberInput name="numeric-field" defaultValue={123} />
                    <button type="submit" data-qa="submit">
                        submit
                    </button>
                </form>,
            );
            await userEvent.click(screen.getByTestId('submit'));
            expect(onSubmit).toHaveBeenCalledTimes(1);
            expect(value).toEqual([['numeric-field', '123']]);
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
                    <NumberInput name="numeric-field" value={123} />
                    <button type="submit" data-qa="submit">
                        submit
                    </button>
                </form>,
            );
            await userEvent.click(screen.getByTestId('submit'));
            expect(onSubmit).toHaveBeenCalledTimes(1);
            expect(value).toEqual([['numeric-field', '123']]);
        });

        test('supports form reset', async () => {
            function Test() {
                const [value, setValue] = React.useState<number | null>(123);
                return (
                    <form>
                        <NumberInput name="numeric-field" value={value} onUpdate={setValue} />
                        <input type="reset" data-qa="reset" />
                    </form>
                );
            }

            render(<Test />);
            // eslint-disable-next-line testing-library/no-node-access
            const inputs = document.querySelectorAll('[name=numeric-field]');
            expect(inputs.length).toBe(1);
            expect(inputs[0]).toHaveValue('123');

            await userEvent.tab();
            await userEvent.keyboard('456');

            expect(inputs[0]).toHaveValue('456');

            const button = screen.getByTestId('reset');
            await userEvent.click(button);
            expect(inputs[0]).toHaveValue('123');
        });

        test('should submit decimal value', async () => {
            let value;
            const handleSubmit = jest.fn((e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                value = [...formData.entries()];
            });
            render(
                <form data-qa="form" onSubmit={handleSubmit}>
                    <NumberInput allowDecimal name="numeric-field" value={123.45} />
                    <button type="submit" data-qa="submit">
                        submit
                    </button>
                </form>,
            );
            await userEvent.click(screen.getByTestId('submit'));
            expect(handleSubmit).toHaveBeenCalledTimes(1);
            expect(value).toEqual([['numeric-field', '123.45']]);
        });
    });
});
