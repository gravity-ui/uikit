import React from 'react';

import {fireEvent, queryHelpers, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {CONTROL_ERROR_ICON_QA, CONTROL_ERROR_MESSAGE_QA} from '../../utils';
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
                render(<TextInput error="Some Error" />);

                expect(screen.getByText('Some Error')).toBeVisible();
            });

            test('render note container with note prop', () => {
                render(<TextInput note={<div>Additional</div>} />);

                expect(screen.getByText('Additional')).toBeVisible();
            });

            test('do not show error without error prop', () => {
                const {container} = render(<TextInput />);

                // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
                expect(container.querySelector('.yc-text-input__error')).not.toBeInTheDocument();
            });

            test('check clear button visibility with hasClear prop', async () => {
                render(<TextInput hasClear />);
                const user = userEvent.setup();
                const input = screen.getByRole('textbox');
                let clearButton = screen.queryByRole('button', {name: 'Clear input value'});
                expect(clearButton).not.toBeInTheDocument();
                await user.type(input, 'abc');
                clearButton = screen.queryByRole('button', {name: 'Clear input value'});
                expect(clearButton).toBeInTheDocument();
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

        describe('error', () => {
            test('render error message with error prop (if it is not an empty string)', () => {
                render(<TextInput error="Some Error" />);

                expect(screen.getByText('Some Error')).toBeVisible();
            });

            test('render error message with errorMessage prop (if it is not an empty string)', () => {
                render(<TextInput errorMessage="Some Error with errorMessage prop" />);

                expect(
                    screen.queryByText('Some Error with errorMessage prop'),
                ).not.toBeInTheDocument();
            });

            test('render error message with errorMessage prop and invalid state (if it is not an empty string)', () => {
                render(
                    <TextInput
                        errorMessage="Some Error with errorMessage prop"
                        validationState="invalid"
                    />,
                );

                expect(screen.getByText('Some Error with errorMessage prop')).toBeVisible();
            });

            test('render error icon if tooltip option is selected for errorPlacement prop', () => {
                render(
                    <TextInput
                        errorMessage="Some Error"
                        validationState="invalid"
                        errorPlacement="inside"
                    />,
                );

                expect(screen.getByTestId(CONTROL_ERROR_ICON_QA)).toBeInTheDocument();
            });

            test('do not show error message without error/errorMessage prop', () => {
                render(<TextInput />);

                expect(screen.queryByTestId(CONTROL_ERROR_MESSAGE_QA)).not.toBeInTheDocument();
            });

            test('do not show error message if error prop value is an empty string', () => {
                render(<TextInput error={''} />);

                expect(screen.queryByTestId(CONTROL_ERROR_MESSAGE_QA)).not.toBeInTheDocument();
            });

            test('do not show error message if errorMessage prop value is an empty string', () => {
                render(<TextInput errorMessage={''} />);

                expect(screen.queryByTestId(CONTROL_ERROR_MESSAGE_QA)).not.toBeInTheDocument();
            });

            test('do not show error icon if error prop is an empty string', () => {
                render(<TextInput error={''} errorPlacement="inside" />);

                expect(screen.queryByTestId(CONTROL_ERROR_ICON_QA)).not.toBeInTheDocument();
            });

            test('do not show error icon if errorMessage prop is an empty string', () => {
                render(<TextInput errorMessage={''} errorPlacement="inside" />);

                expect(screen.queryByTestId(CONTROL_ERROR_ICON_QA)).not.toBeInTheDocument();
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

            test('render described input with error message and note', () => {
                const errorText = 'Some error text';
                const noteText = 'Note text';
                const {container} = render(<TextInput error={errorText} note={noteText} />);

                const input = screen.getByRole('textbox');
                const [noteId = '', errorMessageId = ''] = (
                    input.getAttribute('aria-describedby') ?? ''
                ).split(/\s+/);
                expect(noteId).not.toBe('');
                expect(errorMessageId).not.toBe('');

                const errorTextElement = queryHelpers.queryByAttribute(
                    'id',
                    container,
                    errorMessageId,
                );
                const noteTextElement = queryHelpers.queryByAttribute('id', container, noteId);
                if (!errorTextElement || !noteTextElement) {
                    throw new Error('Both error message and note elements should be present');
                }
                expect(errorTextElement?.textContent).toBe(errorText);
                expect(noteTextElement?.textContent).toBe(noteText);
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
