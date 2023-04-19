import React from 'react';
import userEvent from '@testing-library/user-event';
import {render, screen, fireEvent} from '@testing-library/react';
import {TextInput} from '../TextInput';

describe('TextInput input', () => {
    describe('without label prop', () => {
        describe('basic', () => {
            test('render input by default', () => {
                render(<TextInput />);
                const input = screen.getByRole('textbox');

                expect(input).toBeVisible();
                expect(input.tagName.toLowerCase()).toBe('input');
            });

            test('render error message with error prop', () => {
                const {container} = render(<TextInput error="Some Error" />);

                // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
                expect(container.querySelector('.yc-text-input__error')).toBeInTheDocument();
                expect(screen.getByText('Some Error')).toBeVisible();
            });

            test('do not show error without error prop', () => {
                const {container} = render(<TextInput />);

                // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
                expect(container.querySelector('.yc-text-input__error')).not.toBeInTheDocument();
            });

            test('do not render clear button without hasClear prop', () => {
                render(<TextInput />);

                expect(
                    screen.queryByRole('button', {name: 'Clear input value'}),
                ).not.toBeInTheDocument();
            });

            test('call onChange when input changes value', () => {
                const onChangeFn = jest.fn();

                render(<TextInput onChange={onChangeFn} />);
                fireEvent.change(screen.getByRole('textbox'), {target: {value: '1'}});

                expect(onChangeFn).toBeCalled();
            });

            test('call onUpdate with certain value when input changes value', () => {
                const onUpdateFn = jest.fn();
                const value = 'some';

                render(<TextInput onUpdate={onUpdateFn} />);
                fireEvent.change(screen.getByRole('textbox'), {target: {value}});

                expect(onUpdateFn).toBeCalledWith(value);
            });

            test('call onChange when click to clean button', async () => {
                const onChangeFn = jest.fn();
                const user = userEvent.setup();
                render(<TextInput hasClear onChange={onChangeFn} />);
                const input = screen.getByRole('textbox');
                await user.type(input, 'abc');
                const clear = screen.getByRole('button', {name: 'Clear input value'});

                if (clear) {
                    await user.click(clear);
                }

                expect(onChangeFn).toBeCalled();
            });
        });

        describe('autocomplete', () => {
            test('render no autocomplete attribute when no autoComplete, no id, no name props', () => {
                render(<TextInput />);
                const input = screen.getByRole('textbox');

                expect(input.getAttribute('autocomplete')).toBeNull();
            });

            test('render autocomplete=on attribute with autoComplete prop', () => {
                render(<TextInput autoComplete />);
                const input = screen.getByRole('textbox');

                expect(input.getAttribute('autocomplete')).toBe('on');
            });

            test('render autocomplete=off attribute with autoComplete=false prop', () => {
                render(<TextInput autoComplete={false} />);
                const input = screen.getByRole('textbox');

                expect(input.getAttribute('autocomplete')).toBe('off');
            });
        });
    });

    describe('with label prop', () => {
        describe('basic', () => {
            test('render input with label', () => {
                const {container} = render(<TextInput label="Label:" />);

                // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
                const label = container.querySelector('.yc-text-input__label');

                expect(label).toBeInTheDocument();
                expect(label?.tagName.toLowerCase()).toBe('label');
                expect(screen.getByText('Label:')).toBeVisible();
            });
        });

        describe('autocomplete', () => {
            test('render autocomplete=off attribute when no autoComplete, no id, no name props', () => {
                render(<TextInput label="Label:" />);
                const input = screen.getByRole('textbox');

                expect(input.getAttribute('autocomplete')).toBe('off');
            });

            test('render no autocomplete attribute when no autoComplete prop, but id prop set', () => {
                render(<TextInput id="yc-id" label="Label:" />);
                const input = screen.getByRole('textbox');

                expect(input.getAttribute('autocomplete')).toBeNull();
            });

            test('render no autocomplete attribute when no autoComplete prop, but name prop set', () => {
                render(<TextInput name="yc-name" label="Label:" />);
                const input = screen.getByRole('textbox');

                expect(input.getAttribute('autocomplete')).toBeNull();
            });

            test('render autocomplete=on attribute when autoComplete prop "on"', () => {
                render(<TextInput autoComplete="on" label="Label:" />);
                const input = screen.getByRole('textbox');

                expect(input.getAttribute('autocomplete')).toBe('on');
            });

            test('render autocomplete=off attribute when autoComplete prop "off"', () => {
                render(<TextInput autoComplete="off" label="Label:" />);
                const input = screen.getByRole('textbox');

                expect(input.getAttribute('autocomplete')).toBe('off');
            });
        });
    });
});
