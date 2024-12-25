import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {render, screen} from '../../../../test-utils/utils';
import {Checkbox} from '../Checkbox';
import type {CheckboxSize} from '../Checkbox';

const qaId = 'checkbox-component';

describe('Checkbox', () => {
    test('render checkbox by default', () => {
        render(<Checkbox />);
        const checkbox = screen.getByRole('checkbox');

        expect(checkbox).toBeVisible();
        expect(checkbox).not.toBeDisabled();
        expect(checkbox).not.toBeChecked();
    });

    test.each(new Array<CheckboxSize>('m', 'l'))('render with given "%s" size', (size) => {
        render(<Checkbox size={size} qa={qaId} />);
        const component = screen.getByTestId(qaId);

        expect(component).toHaveClass(`g-checkbox_size_${size}`);
    });

    test('disabled when disabled=true prop is given', () => {
        render(<Checkbox disabled={true} />);
        const checkbox = screen.getByRole('checkbox');

        expect(checkbox).toBeDisabled();
    });

    test('not disabled when disabled=false prop is given', () => {
        render(<Checkbox disabled={false} />);
        const checkbox = screen.getByRole('checkbox');

        expect(checkbox).not.toBeDisabled();
    });

    test('render with indeterminate', () => {
        render(<Checkbox indeterminate={true} />);
        const checkbox = screen.getByRole('checkbox');

        expect(checkbox).toBePartiallyChecked();
    });

    test('set given title to label', () => {
        const title = 'Some title';

        render(<Checkbox title={title} />);
        const label = screen.getByTitle(title);

        expect(label).toBeVisible();
    });

    test('show given content', () => {
        const content = 'Some content';

        render(<Checkbox content={content} />);
        const text = screen.getByText(content);

        expect(text).toBeVisible();
    });

    test('show given children', () => {
        const childrenText = 'Children content';

        render(
            <Checkbox>
                <span>{childrenText}</span>
            </Checkbox>,
        );
        const text = screen.getByText(childrenText);

        expect(text).toBeVisible();
    });

    test('add className', () => {
        const className = 'my-class';

        render(<Checkbox className={className} qa={qaId} />);
        const component = screen.getByTestId(qaId);

        expect(component).toHaveClass(className);
    });

    test('add style', () => {
        const style = {color: 'red'};

        render(<Checkbox style={style} qa={qaId} />);
        const component = screen.getByTestId(qaId);

        expect(component).toHaveStyle(style);
    });

    test('use defaultChecked attribute', () => {
        render(<Checkbox defaultChecked={true} />);
        const checkbox = screen.getByRole('checkbox');

        expect(checkbox).toBeChecked();
    });

    test('set checked=true attribute for controlled component', () => {
        render(<Checkbox checked={true} />);
        const checkbox = screen.getByRole('checkbox');

        expect(checkbox).toBeChecked();
    });

    test('set checked=false attribute for controlled component', () => {
        render(<Checkbox checked={false} />);
        const checkbox = screen.getByRole('checkbox');

        expect(checkbox).not.toBeChecked();
    });

    test('set base control props', () => {
        const id = 'my_id';
        const name = 'my name';
        const value = 'my value';

        render(<Checkbox id={id} name={name} value={value} />);
        const checkbox = screen.getByRole('checkbox');

        expect(checkbox).toHaveAttribute('id', id);
        expect(checkbox).toHaveAttribute('name', name);
        expect(checkbox).toHaveAttribute('value', value);
    });

    test('use passed ref for component', () => {
        const ref = React.createRef<HTMLLabelElement>();

        render(<Checkbox ref={ref} qa={qaId} />);
        const component = screen.getByTestId(qaId);

        expect(ref.current).toBe(component);
    });

    test('toggle checked attribute on click', async () => {
        const text = 'I agree';
        const user = userEvent.setup();

        render(<Checkbox content={text} />);
        const checkbox = screen.getByRole('checkbox');
        const caption = screen.getByText(text);

        await user.click(caption);
        expect(checkbox).toBeChecked();

        await user.click(caption);
        expect(checkbox).not.toBeChecked();
    });

    test('call onChange when clicked', async () => {
        const onChangeFn = jest.fn();
        const user = userEvent.setup();

        render(<Checkbox onChange={onChangeFn} />);
        const checkbox = screen.getByRole('checkbox');

        await user.click(checkbox);

        expect(onChangeFn).toBeCalled();
    });

    test('call onUpdate with checked status', async () => {
        const onUpdateFn = jest.fn();
        const user = userEvent.setup();

        render(<Checkbox onUpdate={onUpdateFn} />);
        const checkbox = screen.getByRole('checkbox');

        await user.click(checkbox);
        expect(onUpdateFn).toBeCalledWith(true);

        await user.click(checkbox);
        expect(onUpdateFn).toBeCalledWith(false);
    });

    test('call onFocus/onBlur', async () => {
        const handleOnFocus = jest.fn();
        const handleOnBlur = jest.fn();
        render(<Checkbox onFocus={handleOnFocus} onBlur={handleOnBlur} />);
        const checkbox = screen.getByRole('checkbox');

        checkbox.focus();
        expect(handleOnFocus).toHaveBeenCalledTimes(1);

        checkbox.blur();
        expect(handleOnBlur).toHaveBeenCalledTimes(1);
    });

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
                    <Checkbox name="checkbox-field" value="value" />
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
                    <Checkbox name="checkbox-field" value="value" defaultChecked />
                    <button type="submit" data-qa="submit">
                        submit
                    </button>
                </form>,
            );
            await userEvent.click(screen.getByTestId('submit'));
            expect(onSubmit).toHaveBeenCalledTimes(1);
            expect(value).toEqual([['checkbox-field', 'value']]);
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
                    <Checkbox name="checkbox-field" value="value" checked />
                    <button type="submit" data-qa="submit">
                        submit
                    </button>
                </form>,
            );
            await userEvent.click(screen.getByTestId('submit'));
            expect(onSubmit).toHaveBeenCalledTimes(1);
            expect(value).toEqual([['checkbox-field', 'value']]);
        });

        test('supports form reset', async () => {
            function Test() {
                const [value, setValue] = React.useState(true);
                return (
                    <form data-qa="form">
                        <Checkbox
                            name="checkbox-field"
                            value="value"
                            checked={value}
                            onUpdate={setValue}
                        />
                        <input type="reset" data-qa="reset" />
                    </form>
                );
            }

            render(<Test />);
            const form = screen.getByTestId('form');
            expect(form).toHaveFormValues({'checkbox-field': true});

            await userEvent.tab();
            await userEvent.keyboard('{Enter}');

            expect(form).toHaveFormValues({});

            const button = screen.getByTestId('reset');
            await userEvent.click(button);
            expect(form).toHaveFormValues({'checkbox-field': true});
        });
    });
});
