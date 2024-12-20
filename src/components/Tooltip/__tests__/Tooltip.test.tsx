import React from 'react';

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

    const tooltip = await screen.findByRole('tooltip');

    expect(tooltip).toBeVisible();

    await user.unhover(button);

    await waitFor(() => {
        expect(tooltip).not.toBeInTheDocument();
    });
});
