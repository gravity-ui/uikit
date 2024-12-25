import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {render, screen} from '../../../../test-utils/utils';
import {Radio} from '../Radio';
import type {RadioSize} from '../Radio';

const qaId = 'radio-component';
const value = 'some';

describe('Radio', () => {
    test('render radio by default', () => {
        const value = 'some';
        render(<Radio value={value} />);
        const radio = screen.getByRole('radio');

        expect(radio).toBeVisible();
        expect(radio).not.toBeDisabled();
        expect(radio).not.toBeChecked();
        expect(radio).toHaveAttribute('value', value);
    });

    test.each(new Array<RadioSize>('m', 'l'))('render with given "%s" size', (size) => {
        render(<Radio value={value} size={size} qa={qaId} />);
        const component = screen.getByTestId(qaId);

        expect(component).toHaveClass(`g-radio_size_${size}`);
    });

    test('disabled when disabled=true prop is given', () => {
        render(<Radio value={value} disabled={true} />);
        const radio = screen.getByRole('radio');

        expect(radio).toBeDisabled();
    });

    test('not disabled when disabled=false prop is given', () => {
        render(<Radio value={value} disabled={false} />);
        const radio = screen.getByRole('radio');

        expect(radio).not.toBeDisabled();
    });

    test('set given title to label', () => {
        const title = 'Some title';

        render(<Radio value={value} title={title} />);
        const label = screen.getByTitle(title);

        expect(label).toBeVisible();
    });

    test('show given content', () => {
        const content = 'Some content';

        render(<Radio value={value} content={content} />);
        const text = screen.getByText(content);

        expect(text).toBeVisible();
    });

    test('show given children', () => {
        const childrenText = 'Children content';

        render(
            <Radio value={value}>
                <span>{childrenText}</span>
            </Radio>,
        );
        const text = screen.getByText(childrenText);

        expect(text).toBeVisible();
    });

    test('add className', () => {
        const className = 'my-class';

        render(<Radio value={value} className={className} qa={qaId} />);
        const component = screen.getByTestId(qaId);

        expect(component).toHaveClass(className);
    });

    test('add style', () => {
        const style = {color: 'red'};

        render(<Radio value={value} style={style} qa={qaId} />);
        const component = screen.getByTestId(qaId);

        expect(component).toHaveStyle(style);
    });

    test('use defaultChecked attribute', () => {
        render(<Radio value={value} defaultChecked={true} />);
        const radio = screen.getByRole('radio');

        expect(radio).toBeChecked();
    });

    test('set checked=true attribute for controlled component', () => {
        render(<Radio value={value} checked={true} />);
        const radio = screen.getByRole('radio');

        expect(radio).toBeChecked();
    });

    test('set checked=false attribute for controlled component', () => {
        render(<Radio value={value} checked={false} />);
        const radio = screen.getByRole('radio');

        expect(radio).not.toBeChecked();
    });

    test('set base control props', () => {
        const id = 'my_id';
        const name = 'my name';

        render(<Radio value={value} id={id} name={name} />);
        const radio = screen.getByRole('radio');

        expect(radio).toHaveAttribute('id', id);
        expect(radio).toHaveAttribute('name', name);
    });

    test('use passed ref for component', () => {
        const ref = React.createRef<HTMLLabelElement>();

        render(<Radio value={value} ref={ref} qa={qaId} />);
        const component = screen.getByTestId(qaId);

        expect(ref.current).toBe(component);
    });

    test('set checked attribute on click', async () => {
        const text = 'I agree';
        const user = userEvent.setup();

        render(<Radio value={value} content={text} />);
        const radio = screen.getByRole('radio');
        const caption = screen.getByText(text);

        await user.click(caption);
        expect(radio).toBeChecked();
    });

    test('call onChange when clicked', async () => {
        const onChangeFn = jest.fn();
        const user = userEvent.setup();

        render(<Radio value={value} onChange={onChangeFn} />);
        const radio = screen.getByRole('radio');

        await user.click(radio);

        expect(onChangeFn).toBeCalled();
    });

    test('call onUpdate with checked status', async () => {
        const onUpdateFn = jest.fn();
        const user = userEvent.setup();

        render(<Radio value={value} onUpdate={onUpdateFn} />);
        const radio = screen.getByRole('radio');

        await user.click(radio);
        expect(onUpdateFn).toBeCalledWith(true);
    });

    test('call onFocus/onBlur', async () => {
        const handleOnFocus = jest.fn();
        const handleOnBlur = jest.fn();
        render(<Radio value={value} onFocus={handleOnFocus} onBlur={handleOnBlur} />);
        const radio = screen.getByRole('radio');

        radio.focus();
        expect(handleOnFocus).toHaveBeenCalledTimes(1);

        radio.blur();
        expect(handleOnBlur).toHaveBeenCalledTimes(1);
    });
});
