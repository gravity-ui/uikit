import userEvent from '@testing-library/user-event';

import {render, screen, waitFor} from '../../../../test-utils/utils';
import {ActionTooltip} from '../ActionTooltip';

test('should preserve ref on anchor element', () => {
    const ref = jest.fn();
    render(
        <ActionTooltip title="test">
            <button ref={ref} />
        </ActionTooltip>,
    );

    expect(ref).toHaveBeenCalledTimes(1);
});

test('should show tooltip on hover and hide on unhover', async () => {
    const user = userEvent.setup();

    render(
        <ActionTooltip title="test" qa="tooltip">
            <button />
        </ActionTooltip>,
    );

    const button = await screen.findByRole('button');

    await user.hover(button);

    const tooltip = await screen.findByTestId('tooltip');

    expect(tooltip).toBeVisible();

    await user.unhover(button);

    await waitFor(() => {
        expect(tooltip).not.toBeInTheDocument();
    });
});

test('should show tooltip on focus and hide on blur', async () => {
    const user = userEvent.setup();
    render(
        <ActionTooltip title="test" qa="tooltip">
            <button />
        </ActionTooltip>,
    );

    const button = await screen.findByRole('button');

    await user.tab();
    expect(button).toHaveFocus();

    const tooltip = await screen.findByTestId('tooltip');

    expect(tooltip).toBeVisible();

    await user.tab();

    expect(button).not.toHaveFocus();
    await waitFor(() => {
        expect(tooltip).not.toBeInTheDocument();
    });
});

test('should show on focus and hide on unhover', async () => {
    const user = userEvent.setup();
    render(
        <ActionTooltip title="test" qa="tooltip">
            <button />
        </ActionTooltip>,
    );

    const button = screen.getByRole('button');

    button.focus();

    const tooltip = await screen.findByTestId('tooltip');

    expect(tooltip).toBeVisible();

    await user.hover(button);

    expect(tooltip).toBeVisible();

    await user.unhover(button);

    expect(button).toHaveFocus();
    await waitFor(() => {
        expect(tooltip).not.toBeInTheDocument();
    });
});
