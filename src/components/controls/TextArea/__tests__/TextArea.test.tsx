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

    describe('auto resize', () => {
        let originalResizeObserver: typeof ResizeObserver;
        let getComputedStyleSpy: jest.SpyInstance;
        let offsetHeightSpy: jest.SpyInstance;
        let scrollHeightSpy: jest.SpyInstance;
        let clientHeightSpy: jest.SpyInstance;
        const observe = jest.fn();
        const disconnect = jest.fn();

        beforeEach(() => {
            originalResizeObserver = global.ResizeObserver;
            global.ResizeObserver = class implements ResizeObserver {
                disconnect = disconnect;
                observe = observe;
                unobserve() {}
            };
            getComputedStyleSpy = jest.spyOn(window, 'getComputedStyle').mockReturnValue({
                getPropertyValue(property: string) {
                    return {
                        'line-height': '20px',
                        'padding-top': '2px',
                        'padding-bottom': '2px',
                    }[property];
                },
            } as CSSStyleDeclaration);
            offsetHeightSpy = jest
                .spyOn(HTMLElement.prototype, 'offsetHeight', 'get')
                .mockReturnValue(24);
            scrollHeightSpy = jest
                .spyOn(HTMLTextAreaElement.prototype, 'scrollHeight', 'get')
                .mockReturnValue(24);
            clientHeightSpy = jest
                .spyOn(HTMLTextAreaElement.prototype, 'clientHeight', 'get')
                .mockReturnValue(20);
        });

        afterEach(() => {
            global.ResizeObserver = originalResizeObserver;
            getComputedStyleSpy.mockRestore();
            offsetHeightSpy.mockRestore();
            scrollHeightSpy.mockRestore();
            clientHeightSpy.mockRestore();
            observe.mockClear();
            disconnect.mockClear();
        });

        test('skips measurement and resize observation for an empty value without clear control', () => {
            const {container} = render(<TextArea minRows={3} value="" />);
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const input = container.querySelector('textarea');

            expect(input).toHaveAttribute('rows', '3');
            expect(input?.style.height).toBe('auto');
            expect(getComputedStyleSpy).not.toHaveBeenCalled();
            expect(offsetHeightSpy).not.toHaveBeenCalled();
            expect(scrollHeightSpy).not.toHaveBeenCalled();
            expect(clientHeightSpy).not.toHaveBeenCalled();
            expect(observe).not.toHaveBeenCalled();
        });

        test('keeps native minRows height for an uncontrolled empty value', () => {
            const {container} = render(<TextArea minRows={3} />);
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const input = container.querySelector('textarea');

            expect(input).toHaveAttribute('rows', '3');
            expect(input?.style.height).toBe('auto');
            expect(getComputedStyleSpy).not.toHaveBeenCalled();
            expect(offsetHeightSpy).not.toHaveBeenCalled();
            expect(scrollHeightSpy).not.toHaveBeenCalled();
            expect(clientHeightSpy).not.toHaveBeenCalled();
            expect(observe).not.toHaveBeenCalled();
        });

        test('auto resizes a non-empty default value', () => {
            render(<TextArea defaultValue="value" />);

            expect(getComputedStyleSpy).toHaveBeenCalled();
            expect(observe).toHaveBeenCalledWith(screen.getByRole('textbox'), {box: undefined});
        });

        test('keeps auto resize and scrollbar offset for a value with clear control', () => {
            const {container} = render(<TextArea hasClear value="value" />);

            expect(getComputedStyleSpy).toHaveBeenCalled();
            expect(offsetHeightSpy).toHaveBeenCalled();
            expect(scrollHeightSpy).toHaveBeenCalled();
            expect(clientHeightSpy).toHaveBeenCalled();
            expect(observe).toHaveBeenCalledWith(screen.getByRole('textbox'), {box: undefined});
            // eslint-disable-next-line testing-library/no-node-access
            expect(container.firstElementChild).toHaveClass('g-text-area_has-scrollbar');
        });

        test('clearing an auto-resized value restores native height without new measurements', () => {
            const {container} = render(<TextArea hasClear minRows={3} defaultValue="value" />);
            const input = screen.getByRole('textbox');
            const clearButton = screen.getByRole('button', {name: 'Clear'});

            expect(input.style.height).toBe('64px');
            expect(getComputedStyleSpy).toHaveBeenCalled();
            expect(observe).toHaveBeenCalledWith(input, {box: undefined});

            getComputedStyleSpy.mockClear();
            offsetHeightSpy.mockClear();
            scrollHeightSpy.mockClear();
            clientHeightSpy.mockClear();
            observe.mockClear();
            disconnect.mockClear();

            fireEvent.click(clearButton);

            expect(input).toHaveAttribute('rows', '3');
            expect(input.style.height).toBe('auto');
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            expect(container.querySelector('.g-text-area__clear')).not.toBeInTheDocument();
            expect(disconnect).toHaveBeenCalled();
            expect(getComputedStyleSpy).not.toHaveBeenCalled();
            expect(offsetHeightSpy).not.toHaveBeenCalled();
            expect(scrollHeightSpy).not.toHaveBeenCalled();
            expect(clientHeightSpy).not.toHaveBeenCalled();
            expect(observe).not.toHaveBeenCalled();
        });

        test('does not auto resize fixed rows', () => {
            const {container} = render(<TextArea rows={3} value="value" />);

            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            expect(container.querySelector('textarea')).toHaveAttribute('rows', '3');
            expect(getComputedStyleSpy).not.toHaveBeenCalled();
            expect(offsetHeightSpy).not.toHaveBeenCalled();
            expect(scrollHeightSpy).not.toHaveBeenCalled();
            expect(clientHeightSpy).not.toHaveBeenCalled();
            expect(observe).not.toHaveBeenCalled();
        });
    });
});
