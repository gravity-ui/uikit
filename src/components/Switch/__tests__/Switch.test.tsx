import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {render, screen} from '../../../../test-utils/utils';
import {Switch} from '../Switch';

const qaId = 'switch';

describe('Switch', () => {
    test('render switch with the unchecked state by default', () => {
        render(<Switch />);
        const component = screen.getByRole('switch');

        expect(component).toBeVisible();
        expect(component).not.toBeDisabled();
        expect(component).not.toBeChecked();
    });

    test('render switch with the checked state when defaultChecked', () => {
        render(<Switch defaultChecked />);
        const component = screen.getByRole('switch');

        expect(component).toBeVisible();
        expect(component).not.toBeDisabled();
        expect(component).toBeChecked();
    });

    test('use passed ref', () => {
        const ref = React.createRef<HTMLLabelElement>();

        render(<Switch ref={ref} qa={qaId} />);
        const component = screen.getByTestId(qaId);

        expect(ref.current).toBe(component);
    });

    test('use passed title', () => {
        const title = 'Some title';

        render(<Switch title={title} />);
        const label = screen.getByTitle(title);

        expect(label).toBeVisible();
    });

    test('use passed style', () => {
        const style = {color: 'red'};

        render(<Switch style={style} qa={qaId} />);
        const component = screen.getByTestId(qaId);

        expect(component).toHaveStyle(style);
    });

    test('use passed className', () => {
        const className = 'class-name';

        render(<Switch className={className} qa={qaId} />);
        const component = screen.getByTestId(qaId);

        expect(component).toHaveClass(className);
    });

    test('display passed content', () => {
        const content = 'Some content';

        render(<Switch content={content} />);
        const text = screen.getByText(content);

        expect(text).toBeVisible();
    });

    test('display passed children', () => {
        const childrenText = 'Children content';

        render(
            <Switch>
                <span>{childrenText}</span>
            </Switch>,
        );
        const text = screen.getByText(childrenText);

        expect(text).toBeVisible();
    });

    test('toggle on click', async () => {
        const user = userEvent.setup();

        render(<Switch />);
        const component = screen.getByRole('switch');

        await user.click(component);
        expect(component).toBeChecked();

        await user.click(component);
        expect(component).not.toBeChecked();
    });

    test('not toggle on click when disabled', async () => {
        const user = userEvent.setup();

        render(<Switch disabled={true} />);
        const component = screen.getByRole('switch');

        await user.click(component);

        expect(component).not.toBeChecked();
        expect(component).toBeDisabled();
    });

    test('toggle on pressed spacebar', async () => {
        render(<Switch />);
        const component = screen.getByRole('switch');

        component.focus();

        await userEvent.keyboard('[space]');
        expect(component).toBeChecked();

        await userEvent.keyboard('[space]');
        expect(component).not.toBeChecked();
    });

    test('call onUpdate with checked status', async () => {
        const onUpdateFn = jest.fn();
        const user = userEvent.setup();

        render(<Switch onUpdate={onUpdateFn} />);
        const component = screen.getByRole('switch');

        await user.click(component);
        expect(onUpdateFn).toBeCalledWith(true);

        await user.click(component);
        expect(onUpdateFn).toBeCalledWith(false);
    });

    test('set checked=true attribute for controlled component', () => {
        render(<Switch checked={true} />);
        const component = screen.getByRole('switch');

        expect(component).toBeChecked();
    });

    test('set checked=false attribute for controlled component', () => {
        render(<Switch checked={false} />);
        const component = screen.getByRole('switch');

        expect(component).not.toBeChecked();
    });
});
