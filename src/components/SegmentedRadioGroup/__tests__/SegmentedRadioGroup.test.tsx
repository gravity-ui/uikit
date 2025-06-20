import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {SegmentedRadioGroup} from '../';
import type {
    SegmentedRadioGroupOptionProps,
    SegmentedRadioGroupProps,
    SegmentedRadioGroupSize,
    SegmentedRadioGroupWidth,
} from '../';
import {render, screen, within} from '../../../../test-utils/utils';
import {block} from '../../../components/utils/cn';

const qaId = 'segmented-radio-group-component';
const b = block('segmented-radio-group');

const options: SegmentedRadioGroupOptionProps[] = [
    {value: 'Value 1', content: 'Value 1'},
    {value: 'Value 2', content: 'Value 2'},
    {value: 'Value 3', content: 'Value 3'},
];

const renderSegmentedRadioGroup = (props: SegmentedRadioGroupProps = {}) => {
    render(
        <SegmentedRadioGroup
            defaultValue={options[0].value}
            options={options}
            qa={qaId}
            {...props}
        />,
    );
};

describe('SegmentedRadioGroup', () => {
    test('use passed ref for component', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<SegmentedRadioGroup ref={ref} qa={qaId} />);
        const component = screen.getByTestId(qaId);

        expect(ref.current).toBe(component);
    });

    describe('visibility', () => {
        test('render SegmentedRadioGroup by default', () => {
            renderSegmentedRadioGroup();
            const component = screen.getByTestId(qaId);

            expect(component).toBeVisible();
        });

        test('show given children passed as prop', () => {
            renderSegmentedRadioGroup();

            const component = screen.getByTestId(qaId);
            const radios = within(component).getAllByRole('radio');
            const text = screen.getByText(options[0].content as string);

            expect(radios).toHaveLength(options.length);
            expect(text).toBeVisible();
        });

        test('show given children passed as nested components', async () => {
            render(
                <SegmentedRadioGroup qa={qaId} defaultValue={options[0].value}>
                    {options.map((opt) => (
                        <SegmentedRadioGroup.Option key={opt.value} {...opt} />
                    ))}
                </SegmentedRadioGroup>,
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
            renderSegmentedRadioGroup({disabled: true});
            const component = screen.getByTestId(qaId);
            const radios = within(component).getAllByRole('radio');

            radios.forEach((radio) => {
                expect(radio).toBeDisabled();
            });
        });

        test('all children are not disabled when disabled=false prop is given', () => {
            renderSegmentedRadioGroup({disabled: false});
            const component = screen.getByTestId(qaId);
            const radios = within(component).getAllByRole('radio');

            radios.forEach((radio) => {
                expect(radio).not.toBeDisabled();
            });
        });

        test('a proper radio is disabled when disabled=false prop is given to one of the option', () => {
            const customOptions: SegmentedRadioGroupOptionProps[] = [
                {value: 'Disabled', content: 'Disabled', disabled: true},
                ...options,
            ];

            render(
                <SegmentedRadioGroup
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

            renderSegmentedRadioGroup();
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
            renderSegmentedRadioGroup({onBlur: handleOnBlur, onFocus: handleOnFocus});

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
            renderSegmentedRadioGroup({onChange: handleOnChange, onUpdate: handleOnUpdate});

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
                renderSegmentedRadioGroup({[attr]: 'custom-text'});
                const component = screen.getByTestId(qaId);

                expect(component).toHaveAttribute(attr);
            },
        );
    });

    describe('styles', () => {
        test('add style attribute', () => {
            const style = {color: 'red'};

            renderSegmentedRadioGroup({style});
            const component = screen.getByTestId(qaId);

            expect(component).toHaveStyle(style);
        });

        test('add className attribute', () => {
            const className = 'my-class';

            renderSegmentedRadioGroup({className});
            const component = screen.getByTestId(qaId);

            expect(component).toHaveClass(className);
        });

        test.each(new Array<SegmentedRadioGroupWidth>('auto', 'max'))(
            'render with given "%s" width',
            (width) => {
                renderSegmentedRadioGroup({width});
                const component = screen.getByTestId(qaId);

                expect(component).toHaveClass(b({width}));
            },
        );

        test.each(new Array<SegmentedRadioGroupSize>('s', 'm', 'l', 'xl'))(
            'render with given "%s" size',
            (size) => {
                renderSegmentedRadioGroup({size});
                const component = screen.getByTestId(qaId);

                expect(component).toHaveClass(b({size}));
            },
        );
    });

    describe('in form', () => {
        test('should support form reset', async () => {
            function Test() {
                const [value, setValue] = React.useState('Value 2');
                return (
                    <form aria-label="Test form">
                        <SegmentedRadioGroup
                            name="radio-field"
                            options={options}
                            value={value}
                            onUpdate={setValue}
                        />
                        <button type="reset">Reset</button>
                    </form>
                );
            }

            render(<Test />);
            const form = screen.getByRole('form', {name: 'Test form'});
            expect(form).toHaveFormValues({'radio-field': 'Value 2'});

            await userEvent.tab();
            await userEvent.keyboard('{ArrowLeft}');

            expect(form).toHaveFormValues({'radio-field': 'Value 1'});

            const button = screen.getByRole('button', {name: 'Reset'});
            await userEvent.click(button);
            expect(form).toHaveFormValues({'radio-field': 'Value 2'});
        });
    });
});
