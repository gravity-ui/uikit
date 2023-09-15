import React from 'react';

import userEvent from '@testing-library/user-event';

import {RadioButton} from '../';
import type {RadioButtonOption, RadioButtonProps, RadioButtonSize, RadioButtonWidth} from '../';
import {render, screen, within} from '../../../../test-utils/utils';
import {block} from '../../../components/utils/cn';

const qaId = 'radio-button-component';
const b = block('radio-button');

const options: RadioButtonOption[] = [
    {value: 'Value 1', content: 'Value 1', 'data-id': 'option1'},
    {value: 'Value 2', content: 'Value 2', 'data-id': 'option2'},
    {value: 'Value 3', content: 'Value 3'},
];

const renderRadioButton = (props: RadioButtonProps = {}) => {
    render(<RadioButton defaultValue={options[0].value} options={options} qa={qaId} {...props} />);
};

describe('RadioButton', () => {
    test('use passed ref for component', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<RadioButton ref={ref} qa={qaId} />);
        const component = screen.getByTestId(qaId);

        expect(ref.current).toBe(component);
    });

    test('passing data attribute', async () => {
        const onChangeFn = jest.fn((event: React.ChangeEvent<HTMLInputElement>) => {
            event.persist();
        });
        const user = userEvent.setup();

        renderRadioButton({onChange: onChangeFn, 'data-id': 'radioButton1'});
        const component = screen.getByTestId(qaId);
        const radio1 = await within(component).findByText(options[1].content as string);

        await user.click(radio1);

        expect(onChangeFn.mock.calls[0][0].target.dataset['id']).toEqual('option2');
    });

    describe('visibility', () => {
        test('render RadioButton by default', () => {
            renderRadioButton();
            const component = screen.getByTestId(qaId);

            expect(component).toBeVisible();
        });

        test('show given children passed as prop', () => {
            renderRadioButton();

            const component = screen.getByTestId(qaId);
            const radios = within(component).getAllByRole('radio');
            const text = screen.getByText(options[0].content as string);

            expect(radios).toHaveLength(options.length);
            expect(text).toBeVisible();
        });

        test('show given children passed as nested components', async () => {
            render(
                <RadioButton qa={qaId} defaultValue={options[0].value}>
                    {options.map((opt) => (
                        <RadioButton.Option key={opt.value} {...opt} />
                    ))}
                </RadioButton>,
            );

            const component = screen.getByTestId(qaId);
            const radios = within(component).getAllByRole('radio');
            const text = screen.getByText(options[0].content as string);

            expect(radios).toHaveLength(options.length);
            expect(text).toBeVisible();
        });
    });

    describe('ControlGroupProps interface', () => {
        test('all children are disabled when disabled=true prop is given', () => {
            renderRadioButton({disabled: true});
            const component = screen.getByTestId(qaId);
            const radios = within(component).getAllByRole('radio');

            radios.forEach((radio) => {
                expect(radio).toBeDisabled();
            });
        });

        test('all children are not disabled when disabled=false prop is given', () => {
            renderRadioButton({disabled: false});
            const component = screen.getByTestId(qaId);
            const radios = within(component).getAllByRole('radio');

            radios.forEach((radio) => {
                expect(radio).not.toBeDisabled();
            });
        });

        test('a proper radio is disabled when disabled=false prop is given to one of the option', () => {
            const customOptions: RadioButtonOption[] = [
                {value: 'Disabled', content: 'Disabled', disabled: true},
                ...options,
            ];

            render(
                <RadioButton
                    defaultValue={customOptions[0].value}
                    options={customOptions}
                    qa={qaId}
                />,
            );
            const component = screen.getByTestId(qaId);
            const radios = within(component).getAllByRole('radio');

            radios.forEach((radio: HTMLElement) => {
                const value = radio.getAttribute('value');
                if (value === customOptions[0].value) {
                    expect(radio).toBeDisabled();
                } else {
                    expect(radio).not.toBeDisabled();
                }
            });
        });

        test('only one child is checked', async () => {
            const user = userEvent.setup();

            renderRadioButton();
            const component = screen.getByTestId(qaId);
            const radios = within(component).getAllByRole('radio');

            const radio1 = await screen.findByText(options[0].content as string);

            await user.click(radio1);

            radios.forEach((radio: HTMLElement) => {
                const value = radio.getAttribute('value');
                if (value === options[0].value) {
                    expect(radio).toBeChecked();
                } else {
                    expect(radio).not.toBeChecked();
                }
            });

            const radio2 = await screen.findByText(options[1].content as string);

            await user.click(radio2);

            radios.forEach((radio: HTMLElement) => {
                const value = radio.getAttribute('value');
                if (value === options[1].value) {
                    expect(radio).toBeChecked();
                } else {
                    expect(radio).not.toBeChecked();
                }
            });
        });

        test('call onFocus/onBlur', async () => {
            const handleOnFocus = jest.fn();
            const handleOnBlur = jest.fn();
            renderRadioButton({onBlur: handleOnBlur, onFocus: handleOnFocus});

            const component = screen.getByTestId(qaId);
            const radios = within(component).getAllByRole('radio');
            const secondRadio = radios[1];

            secondRadio.focus();
            expect(handleOnFocus).toHaveBeenCalledTimes(1);

            secondRadio.blur();
            expect(handleOnBlur).toHaveBeenCalledTimes(1);
        });

        test('call onChange/onUpdate', async () => {
            const user = userEvent.setup();

            const handleOnChange = jest.fn();
            const handleOnUpdate = jest.fn();
            renderRadioButton({onChange: handleOnChange, onUpdate: handleOnUpdate});

            const component = screen.getByTestId(qaId);
            const radios = within(component).getAllByRole('radio');
            const secondRadio = radios[1];

            await user.click(secondRadio);

            expect(handleOnChange).toHaveBeenCalledTimes(1);
            expect(handleOnUpdate).toHaveBeenCalledTimes(1);
            expect(handleOnUpdate).toHaveBeenCalledWith(options[1].value);
        });

        test.each(new Array<string>('aria-label', 'aria-labelledby'))(
            'render with given "%s" attribute',
            (attr) => {
                renderRadioButton({[attr]: 'custom-text'});
                const component = screen.getByTestId(qaId);

                expect(component).toHaveAttribute(attr);
            },
        );
    });

    describe('styles', () => {
        test('add style attribute', () => {
            const style = {color: 'red'};

            renderRadioButton({style});
            const component = screen.getByTestId(qaId);

            expect(component).toHaveStyle(style);
        });

        test('add className attribute', () => {
            const className = 'my-class';

            renderRadioButton({className});
            const component = screen.getByTestId(qaId);

            expect(component).toHaveClass(className);
        });

        test.each(new Array<RadioButtonWidth>('auto', 'max'))(
            'render with given "%s" width',
            (width) => {
                renderRadioButton({width});
                const component = screen.getByTestId(qaId);

                expect(component).toHaveClass(b({width}));
            },
        );

        test.each(new Array<RadioButtonSize>('s', 'm', 'l', 'xl'))(
            'render with given "%s" size',
            (size) => {
                renderRadioButton({size});
                const component = screen.getByTestId(qaId);

                expect(component).toHaveClass(b({size}));
            },
        );
    });
});
