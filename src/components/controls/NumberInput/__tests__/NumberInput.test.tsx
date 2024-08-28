import React from 'react';

import userEvent from '@testing-library/user-event';

import {act, fireEvent, render, screen} from '../../../../../test-utils/utils';
import {KeyCode} from '../../../../constants';
import {CONTROL_ERROR_ICON_QA} from '../../utils';
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

            expect(handleUpdate).toHaveBeenCalledWith('1');
            expect(handleChange).toHaveBeenCalled();
        });

        it('calls onUpdate and onChange on input paste', async () => {
            const handleUpdate = jest.fn();
            const handleChange = jest.fn();
            render(<NumberInput onUpdate={handleUpdate} onChange={handleChange} />);
            fireEvent.change(getInput(), {target: {value: '- $123.45k'}});

            expect(handleUpdate).toHaveBeenCalledWith('-123.45');
            expect(handleChange).toHaveBeenCalled();
        });

        it('does not call onUpdate and onChange with invalid chars', async () => {
            const handleUpdate = jest.fn();
            const handleChange = jest.fn();
            render(<NumberInput onUpdate={handleUpdate} onChange={handleChange} />);
            fireEvent.change(getInput(), {target: {value: '123abc45'}});

            expect(handleUpdate).not.toHaveBeenCalled();
            expect(handleChange).not.toHaveBeenCalled();
        });

        it('assumes comma as dot', async () => {
            const user = userEvent.setup();
            const handleUpdate = jest.fn();
            render(<NumberInput value="1,2" onUpdate={handleUpdate} />);

            await user.click(getUpButton());
            expect(handleUpdate).toHaveBeenCalledWith('2.2');
        });

        it('calls onUpdate with incomplete number input (with - or trailing dot)', async () => {
            const handleUpdate = jest.fn();
            const handleChange = jest.fn();
            render(<NumberInput onUpdate={handleUpdate} onChange={handleChange} />);
            fireEvent.change(getInput(), {target: {value: '-'}});
            fireEvent.change(getInput(), {target: {value: '-1.'}});

            expect(handleUpdate).toHaveBeenNthCalledWith(1, '-');
            expect(handleUpdate).toHaveBeenNthCalledWith(2, '-1.');
            expect(handleChange).toHaveBeenCalledTimes(2);
        });

        it('calls onFocus on increment/decrement button click', async () => {
            const user = userEvent.setup();
            const handleFocus = jest.fn();
            render(<NumberInput value="1" onFocus={handleFocus} />);

            await user.click(getUpButton());
            expect(handleFocus).toHaveBeenCalledTimes(1);
        });
    });

    describe('min/max', () => {
        it('clamps to custom min value on blur', () => {
            const handleUpdate = jest.fn();
            render(<NumberInput min={-1} max={1000} value="-100000000" onUpdate={handleUpdate} />);
            const input = getInput();
            act(() => {
                input.focus();
                input.blur();
            });

            expect(handleUpdate).toHaveBeenLastCalledWith('-1');
        });
        it('clamps to custom max value on blur', () => {
            const handleUpdate = jest.fn();
            render(<NumberInput min={-1} max={1000} value="100000000" onUpdate={handleUpdate} />);
            const input = getInput();
            act(() => {
                input.focus();
                input.blur();
            });

            expect(handleUpdate).toHaveBeenLastCalledWith('1000');
        });
        it('clamps to default min value on blur', async () => {
            const handleUpdate = jest.fn();
            render(<NumberInput value="-10000000000000000000000" onUpdate={handleUpdate} />);
            const input = getInput();
            act(() => {
                input.focus();
                input.blur();
            });

            expect(handleUpdate).toHaveBeenLastCalledWith(String(Number.MIN_SAFE_INTEGER));
        });
        it('clamps to default max value on blur', async () => {
            const handleUpdate = jest.fn();
            render(<NumberInput value="10000000000000000000000" onUpdate={handleUpdate} />);
            const input = getInput();
            act(() => {
                input.focus();
                input.blur();
            });

            expect(handleUpdate).toHaveBeenLastCalledWith(String(Number.MAX_SAFE_INTEGER));
        });
        it('swaps min/max if max < min', async () => {
            const handleUpdate = jest.fn();
            render(<NumberInput min={1000} max={-1} value="100000000" onUpdate={handleUpdate} />);
            const input = getInput();
            act(() => {
                input.focus();
                input.blur();
            });

            expect(handleUpdate).toHaveBeenLastCalledWith('1000');
        });
    });
    describe('render controls', () => {
        it('render clear button', () => {
            render(<NumberInput value="123" hasClear />);
            expect(getClearButton()).toBeInTheDocument();
        });

        it('do not render clear button without hasClear prop', () => {
            render(<NumberInput value="123" />);
            expect(getClearButton()).not.toBeInTheDocument();
        });

        it('render increment/decrement control buttons', () => {
            render(<NumberInput />);
            expect(getControls()).toBeInTheDocument();
        });

        it('do not render increment/decrement control buttons with  prop set to "false"', () => {
            render(<NumberInput hasControls={false} />);
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
            render(<NumberInput value="1" onUpdate={handleUpdate} />);

            await user.click(getUpButton());
            expect(handleUpdate).toHaveBeenCalledWith('2');
        });

        it('decrements value on arrowUp button click', async () => {
            const user = userEvent.setup();
            const handleUpdate = jest.fn();
            render(<NumberInput value="2" onUpdate={handleUpdate} />);

            await user.click(getDownButton());
            expect(handleUpdate).toHaveBeenCalledWith('1');
        });

        it('treats empty value as zero', async () => {
            const user = userEvent.setup();
            const handleUpdate = jest.fn();
            render(<NumberInput value="" onUpdate={handleUpdate} />);

            await user.click(getUpButton());
            expect(handleUpdate).toHaveBeenCalledWith('1');
        });

        it('ignores trailing dot', async () => {
            const user = userEvent.setup();
            const handleUpdate = jest.fn();
            render(<NumberInput value="1." onUpdate={handleUpdate} />);

            await user.click(getUpButton());
            expect(handleUpdate).toHaveBeenLastCalledWith('2');
        });

        it('increments values by keyboard arrowUp', async () => {
            const user = userEvent.setup();
            const handleUpdate = jest.fn();
            render(<NumberInput value="1" onUpdate={handleUpdate} />);
            await user.click(getInput());

            await user.keyboard(`{${KeyCode.ARROW_UP}}`);
            expect(handleUpdate).toHaveBeenCalledWith('2');
        });

        it('decrements values by keyboard arrowDown', async () => {
            const user = userEvent.setup();
            const handleUpdate = jest.fn();
            render(<NumberInput value="2" onUpdate={handleUpdate} />);
            await user.click(getInput());

            await user.keyboard(`{${KeyCode.ARROW_DOWN}}`);
            expect(handleUpdate).toHaveBeenCalledWith('1');
        });

        it('uses external step value in controls', async () => {
            const user = userEvent.setup();
            const handleUpdate = jest.fn();
            render(<NumberInput value="1" controlProps={{step: '0.2'}} onUpdate={handleUpdate} />);

            await user.click(getUpButton());
            expect(handleUpdate).toHaveBeenCalledWith('1.2');
        });

        it('uses external step value for keyboard events', async () => {
            const user = userEvent.setup();
            const handleUpdate = jest.fn();
            render(<NumberInput value="1" controlProps={{step: '0.2'}} onUpdate={handleUpdate} />);
            await user.click(getInput());

            await user.keyboard(`{${KeyCode.ARROW_UP}}`);
            expect(handleUpdate).toHaveBeenCalledWith('1.2');
        });

        it('uses shiftMultiplier with Shift button pressed in incrementation with rendered control button', async () => {
            const user = userEvent.setup();
            const handleUpdate = jest.fn();
            render(
                <NumberInput
                    value="1"
                    controlProps={{step: '0.2'}}
                    shiftMultiplier={30}
                    onUpdate={handleUpdate}
                />,
            );
            await user.click(getInput());

            await user.keyboard(`{${KeyCode.SHIFT}>}`);
            await user.click(getUpButton());
            await user.keyboard(`{/${KeyCode.SHIFT}}`);
            expect(handleUpdate).toHaveBeenCalledWith('7');
        });

        it('uses shiftMultiplier with Shift button pressed in incrementation with keyboard arrow button', async () => {
            const user = userEvent.setup();
            const handleUpdate = jest.fn();
            render(
                <NumberInput
                    value="1"
                    controlProps={{step: '0.2'}}
                    shiftMultiplier={30}
                    onUpdate={handleUpdate}
                />,
            );
            await user.click(getInput());

            await user.keyboard(`{${KeyCode.SHIFT}>}{${KeyCode.ARROW_UP}}{/${KeyCode.SHIFT}}`);
            expect(handleUpdate).toHaveBeenCalledWith('7');
        });

        it('increments value with wheel', async () => {
            const user = userEvent.setup();
            const handleUpdate = jest.fn();
            render(<NumberInput value="1" onUpdate={handleUpdate} allowMouseWheel />);

            const input = getInput();
            await user.click(input);

            fireEvent.wheel(input, {deltaY: 4});
            expect(handleUpdate).toHaveBeenCalledWith('2');
        });

        it('decrements value with wheel', async () => {
            const user = userEvent.setup();
            const handleUpdate = jest.fn();
            render(<NumberInput value="2" onUpdate={handleUpdate} allowMouseWheel />);

            const input = getInput();
            await user.click(input);

            fireEvent.wheel(input, {deltaY: -4});
            expect(handleUpdate).toHaveBeenCalledWith('1');
        });

        it('uses shiftMultiplier as step value with wheel', async () => {
            const user = userEvent.setup();
            const handleUpdate = jest.fn();
            render(<NumberInput value="1" onUpdate={handleUpdate} allowMouseWheel />);

            const input = getInput();
            await user.click(input);

            await user.keyboard(`{${KeyCode.SHIFT}>}`);
            fireEvent.wheel(input, {deltaY: 4});
            await user.keyboard(`{/${KeyCode.SHIFT}}`);
            expect(handleUpdate).toHaveBeenCalledWith('11');
        });
    });
});
