import React from 'react';

import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {TEST_CHILDREN, TEST_CLASS_NAME, TEST_STYLE} from '@uikit/__fixtures__/consts';

import {Switch} from '../Switch';

const qaId = 'switch';

describe('Switch', () => {
    test('render switch with the unchecked state by default', () => {
        render(<Switch />);
        const component = screen.getByRole('checkbox');

        expect(component).toBeVisible();
        expect(component).not.toBeDisabled();
        expect(component).not.toBeChecked();
    });

    test('render switch with the checked state when defaultChecked', () => {
        render(<Switch defaultChecked />);
        const component = screen.getByRole('checkbox');

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
        render(<Switch style={TEST_STYLE} qa={qaId} />);
        const component = screen.getByTestId(qaId);

        expect(component).toHaveStyle(TEST_STYLE);
    });

    test('use passed className', () => {
        render(<Switch className={TEST_CLASS_NAME} qa={qaId} />);
        const component = screen.getByTestId(qaId);

        expect(component).toHaveClass(TEST_CLASS_NAME);
    });

    test('display passed content', () => {
        render(<Switch content={TEST_CHILDREN} />);
        const text = screen.getByText(TEST_CHILDREN);

        expect(text).toBeVisible();
    });

    test('display passed children', () => {
        render(
            <Switch>
                <span>{TEST_CHILDREN}</span>
            </Switch>,
        );
        const text = screen.getByText(TEST_CHILDREN);

        expect(text).toBeVisible();
    });

    test('toggle on click', async () => {
        const user = userEvent.setup();

        render(<Switch />);
        const component = screen.getByRole('checkbox');

        await user.click(component);
        expect(component).toBeChecked();

        await user.click(component);
        expect(component).not.toBeChecked();
    });

    test('not toggle on click when disabled', async () => {
        const user = userEvent.setup();

        render(<Switch disabled={true} />);
        const component = screen.getByRole('checkbox');

        await user.click(component);

        expect(component).not.toBeChecked();
        expect(component).toBeDisabled();
    });

    test('toggle on pressed spacebar', async () => {
        render(<Switch />);
        const component = screen.getByRole('checkbox');

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
        const component = screen.getByRole('checkbox');

        await user.click(component);
        expect(onUpdateFn).toBeCalledWith(true);

        await user.click(component);
        expect(onUpdateFn).toBeCalledWith(false);
    });

    test('set checked=true attribute for controlled component', () => {
        render(<Switch checked={true} />);
        const component = screen.getByRole('checkbox');

        expect(component).toBeChecked();
    });

    test('set checked=false attribute for controlled component', () => {
        render(<Switch checked={false} />);
        const component = screen.getByRole('checkbox');

        expect(component).not.toBeChecked();
    });
});
