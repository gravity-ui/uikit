import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {render, screen, within} from '../../../../test-utils/utils';
import {RadioGroup} from '../RadioGroup';
import type {RadioGroupDirection, RadioGroupOption, RadioGroupSize} from '../RadioGroup';

const qaId = 'radio-group-component';

const options: RadioGroupOption[] = [
    {value: 'Value 1', content: 'Value 1'},
    {value: 'Value 2', content: 'Value 2'},
    {value: 'Value 3', content: 'Value 3'},
];

describe('RadioGroup', () => {
    test('render RadioGroup by default', () => {
        render(<RadioGroup defaultValue={options[0].value} options={options} qa={qaId} />);
        const component = screen.getByTestId(qaId);

        expect(component).toBeVisible();
    });

    test.each(new Array<RadioGroupSize>('m', 'l'))('render with given "%s" size', (size) => {
        render(
            <RadioGroup defaultValue={options[0].value} options={options} size={size} qa={qaId} />,
        );
        const component = screen.getByTestId(qaId);

        expect(component).toHaveClass(`g-radio-group_size_${size}`);
    });

    test('all children are disabled when disabled=true prop is given', () => {
        render(
            <RadioGroup
                defaultValue={options[0].value}
                options={options}
                disabled={true}
                qa={qaId}
            />,
        );
        const component = screen.getByTestId(qaId);
        const radios = within(component).getAllByRole('radio');

        radios.forEach((radio: HTMLElement) => {
            expect(radio).toBeDisabled();
        });
    });

    test('all children are not disabled when disabled=false prop is given', () => {
        render(
            <RadioGroup
                defaultValue={options[0].value}
                options={options}
                disabled={false}
                qa={qaId}
            />,
        );
        const component = screen.getByTestId(qaId);
        const radios = within(component).getAllByRole('radio');

        radios.forEach((radio: HTMLElement) => {
            expect(radio).not.toBeDisabled();
        });
    });

    test('a proper radio is disabled when disabled=false prop is given to one of the option', () => {
        const customOptions: RadioGroupOption[] = [
            {value: 'Disabled', content: 'Disabled', disabled: true},
            ...options,
        ];

        render(
            <RadioGroup
                defaultValue={customOptions[0].value}
                options={customOptions}
                disabled={false}
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

    test('show given children', () => {
        render(
            <RadioGroup
                defaultValue={options[0].value}
                options={options}
                disabled={false}
                qa={qaId}
            />,
        );
        const text = screen.getByText(options[0].content as string);

        expect(text).toBeVisible();
    });

    test('add className', () => {
        const className = 'my-class';

        render(
            <RadioGroup
                defaultValue={options[0].value}
                options={options}
                className={className}
                disabled={false}
                qa={qaId}
            />,
        );
        const component = screen.getByTestId(qaId);

        expect(component).toHaveClass(className);
    });

    test('add style', () => {
        const style = {color: 'red'};

        render(
            <RadioGroup
                defaultValue={options[0].value}
                options={options}
                style={style}
                disabled={false}
                qa={qaId}
            />,
        );
        const component = screen.getByTestId(qaId);

        expect(component).toHaveStyle(style);
    });

    test('only one child is checked', async () => {
        const user = userEvent.setup();
        render(
            <RadioGroup
                defaultValue={options[0].value}
                options={options}
                disabled={false}
                qa={qaId}
            />,
        );
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

    test.each(new Array<RadioGroupDirection>('vertical', 'horizontal'))(
        'render with given "%s" direction',
        (direction) => {
            render(
                <RadioGroup
                    defaultValue={options[0].value}
                    options={options}
                    direction={direction}
                    qa={qaId}
                />,
            );
            const component = screen.getByTestId(qaId);

            expect(component).toHaveClass(`g-radio-group_direction_${direction}`);
        },
    );

    describe('form', () => {
        test('should submit no value by default', async () => {
            let value;
            const onSubmit = jest.fn((e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                value = [...formData.entries()];
            });
            render(
                <form data-qa="form" onSubmit={onSubmit}>
                    <RadioGroup name="radio-field" options={options} />
                    <button type="submit" data-qa="submit">
                        submit
                    </button>
                </form>,
            );
            await userEvent.click(screen.getByTestId('submit'));
            expect(onSubmit).toHaveBeenCalledTimes(1);
            expect(value).toEqual([]);
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
                    <RadioGroup name="radio-field" options={options} defaultValue="Value 2" />
                    <button type="submit" data-qa="submit">
                        submit
                    </button>
                </form>,
            );
            await userEvent.click(screen.getByTestId('submit'));
            expect(onSubmit).toHaveBeenCalledTimes(1);
            expect(value).toEqual([['radio-field', 'Value 2']]);
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
                    <RadioGroup name="radio-field" options={options} value="Value 2" />
                    <button type="submit" data-qa="submit">
                        submit
                    </button>
                </form>,
            );
            await userEvent.click(screen.getByTestId('submit'));
            expect(onSubmit).toHaveBeenCalledTimes(1);
            expect(value).toEqual([['radio-field', 'Value 2']]);
        });

        test('should support form reset', async () => {
            function Test() {
                const [value, setValue] = React.useState('Value 2');
                return (
                    <form data-qa="form">
                        <RadioGroup
                            name="radio-field"
                            options={options}
                            value={value}
                            onUpdate={setValue}
                        />
                        <input type="reset" data-qa="reset" />
                    </form>
                );
            }

            render(<Test />);
            const form = screen.getByTestId('form');
            expect(form).toHaveFormValues({'radio-field': 'Value 2'});

            await userEvent.tab();
            await userEvent.keyboard('{ArrowLeft}');

            expect(form).toHaveFormValues({'radio-field': 'Value 1'});

            const button = screen.getByTestId('reset');
            await userEvent.click(button);
            expect(form).toHaveFormValues({'radio-field': 'Value 2'});
        });
    });
});
