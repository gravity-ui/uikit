import userEvent from '@testing-library/user-event';

import {render, screen, waitFor} from '../../../../test-utils/utils';
import {Tooltip} from '../Tooltip';

test('should preserve ref on anchor element', () => {
    const ref = jest.fn();
    render(
        <Tooltip content="test">
            <button ref={ref} />
        </Tooltip>,
    );

    expect(ref).toHaveBeenCalledTimes(1);
});

test('should show tooltip on hover and hide on unhover', async () => {
    const user = userEvent.setup();

    render(
        <Tooltip content="test">
            <button />
        </Tooltip>,
    );

    const button = await screen.findByRole('button');

    await user.hover(button);

    // Default timeout for findByRole is 1000ms, and it's the same time for Tooltip to be shown.
    // Increase the timeout to ensure Tooltip is visible.
    const tooltip = await screen.findByRole('tooltip', {}, {timeout: 2000});

    expect(tooltip).toBeVisible();

    await user.unhover(button);

    await waitFor(() => {
        expect(tooltip).not.toBeInTheDocument();
    });
});
