import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {fireEvent, render, screen} from '../../../../../test-utils/utils';
import {CONTROL_ERROR_MESSAGE_QA} from '../../utils';
import {TextArea} from '../TextArea';

describe('TextArea', () => {
    describe('basic', () => {
        test('render input by default', () => {
            render(<TextArea />);
            const input = screen.getByRole('textbox');

            expect(input).toBeVisible();
            expect(input.tagName.toLowerCase()).toBe('textarea');
        });

        test('render error message with error prop', () => {
            render(<TextArea error="Some Error" />);

            expect(screen.getByText('Some Error')).toBeVisible();
        });

        test('render note container with note prop', () => {
            render(<TextArea error="Some Error" note={<div>Additional</div>} />);

            expect(screen.getByText('Additional')).toBeVisible();
        });

        test('do not show error without error prop', () => {
            const {container} = render(<TextArea />);

            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            expect(container.querySelector('.g-text-area__error')).not.toBeInTheDocument();
        });

        test('check clear button visibility with hasClear prop', async () => {
            render(<TextArea hasClear />);
            const user = userEvent.setup();
            const input = screen.getByRole('textbox');
            let clearButton = screen.queryByRole('button', {name: 'Clear'});
            expect(clearButton).not.toBeInTheDocument();
            await user.type(input, 'abc');
            clearButton = screen.queryByRole('button', {name: 'Clear'});
            expect(clearButton).toBeInTheDocument();
        });

        test('do not render clear button without hasClear prop', () => {
            render(<TextArea />);

            expect(screen.queryByRole('button', {name: 'Clear'})).not.toBeInTheDocument();
        });

        test('call onChange when input changes value', () => {
            const onChangeFn = jest.fn();

            render(<TextArea onChange={onChangeFn} />);
            fireEvent.change(screen.getByRole('textbox'), {target: {value: '1'}});

            expect(onChangeFn).toBeCalled();
        });

        test('call onUpdate with certain value when input changes value', () => {
            const onUpdateFn = jest.fn();
            const value = 'some';

            render(<TextArea onUpdate={onUpdateFn} />);
            fireEvent.change(screen.getByRole('textbox'), {target: {value}});

            expect(onUpdateFn).toBeCalledWith(value);
        });

        test('call onChange when click to clean button', async () => {
            const onChangeFn = jest.fn();
            const user = userEvent.setup();
            render(<TextArea hasClear onChange={onChangeFn} />);
            const input = screen.getByRole('textbox');
            await user.type(input, 'abc');
            const clear = screen.getByRole('button', {name: 'Clear'});

            if (clear) {
                await user.click(clear);
            }

            expect(onChangeFn).toBeCalled();
        });
    });

    describe('error', () => {
        test('render error message with error prop (if it is not an empty string)', () => {
            render(<TextArea error="Some Error" />);

            expect(screen.getByText('Some Error')).toBeVisible();
        });

        test('render error message with errorMessage prop (if it is not an empty string)', () => {
            render(<TextArea errorMessage="Some Error with errorMessage prop" />);

            expect(screen.queryByText('Some Error with errorMessage prop')).not.toBeInTheDocument();
        });

        test('render error message with errorMessage prop (if it is not an empty string)', () => {
            render(
                <TextArea
                    errorMessage="Some Error with errorMessage prop"
                    validationState="invalid"
                />,
            );

            expect(screen.getByText('Some Error with errorMessage prop')).toBeVisible();
        });

        test('do not show error message without error/errorMessage prop', () => {
            render(<TextArea />);

            expect(screen.queryByTestId(CONTROL_ERROR_MESSAGE_QA)).not.toBeInTheDocument();
        });

        test('do not show error message if error prop value is an empty string', () => {
            render(<TextArea error={''} />);

            expect(screen.queryByTestId(CONTROL_ERROR_MESSAGE_QA)).not.toBeInTheDocument();
        });

        test('do not show error message if errorMessage prop value is an empty string', () => {
            render(<TextArea errorMessage={''} />);

            expect(screen.queryByTestId(CONTROL_ERROR_MESSAGE_QA)).not.toBeInTheDocument();
        });
    });

    describe('autocomplete', () => {
        test('render no autocomplete attribute when no autoComplete, no id, no name props', () => {
            render(<TextArea />);
            const input = screen.getByRole('textbox');

            expect(input.getAttribute('autocomplete')).toBeNull();
        });

        test('render autocomplete=on attribute with autoComplete prop', () => {
            render(<TextArea autoComplete />);
            const input = screen.getByRole('textbox');

            expect(input.getAttribute('autocomplete')).toBe('on');
        });

        test('render autocomplete=off attribute with autoComplete=false prop', () => {
            render(<TextArea autoComplete={false} />);
            const input = screen.getByRole('textbox');

            expect(input.getAttribute('autocomplete')).toBe('off');
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
                    <TextArea name="text-field" />
                    <button type="submit" data-qa="submit">
                        submit
                    </button>
                </form>,
            );
            await userEvent.click(screen.getByTestId('submit'));
            expect(onSubmit).toHaveBeenCalledTimes(1);
            expect(value).toEqual([['text-field', '']]);
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
                    <TextArea name="text-field" defaultValue="default value" />
                    <button type="submit" data-qa="submit">
                        submit
                    </button>
                </form>,
            );
            await userEvent.click(screen.getByTestId('submit'));
            expect(onSubmit).toHaveBeenCalledTimes(1);
            expect(value).toEqual([['text-field', 'default value']]);
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
                    <TextArea name="text-field" value="value" />
                    <button type="submit" data-qa="submit">
                        submit
                    </button>
                </form>,
            );
            await userEvent.click(screen.getByTestId('submit'));
            expect(onSubmit).toHaveBeenCalledTimes(1);
            expect(value).toEqual([['text-field', 'value']]);
        });

        test('supports form reset', async () => {
            function Test() {
                const [value, setValue] = React.useState('value');
                return (
                    <form>
                        <TextArea name="text-field" value={value} onUpdate={setValue} />
                        <input type="reset" data-qa="reset" />
                    </form>
                );
            }

            render(<Test />);
            // eslint-disable-next-line testing-library/no-node-access
            const inputs = document.querySelectorAll('[name=text-field]');
            expect(inputs.length).toBe(1);
            expect(inputs[0]).toHaveValue('value');

            await userEvent.tab();
            await userEvent.keyboard('text');

            expect(inputs[0]).toHaveValue('text');

            const button = screen.getByTestId('reset');
            await userEvent.click(button);
            expect(inputs[0]).toHaveValue('value');
        });
    });

    describe('control props', () => {
        test('should set disabled only on underlying input', async () => {
            render(<TextArea controlProps={{disabled: true}} value="abc" hasClear />);
            const input = screen.getByRole('textbox');
            expect(input.hasAttribute('disabled')).toBe(true);
            const clearButton = screen.getByRole('button', {name: 'Clear'});
            expect(clearButton).toBeInTheDocument();
        });
        test('should set readOnly only on underlying input', async () => {
            render(<TextArea controlProps={{readOnly: true}} value="abc" hasClear />);
            const input = screen.getByRole('textbox');
            expect(input.hasAttribute('readonly')).toBe(true);
            const clearButton = screen.getByRole('button', {name: 'Clear'});
            expect(clearButton).toBeInTheDocument();
        });
    });
});
