import React from 'react';

import {act, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {setupTimersMock} from '../../../../test-utils/setupTimersMock';
import {PopoverBehavior} from '../../Popover';
import {delayByBehavior} from '../../Popover/config';
import {HelpPopover} from '../HelpPopover';

const qaId = 'help-popover-component';

function waitForTooltipOpenedStateChange(shouldOpen?: boolean) {
    jest.advanceTimersByTime(delayByBehavior[PopoverBehavior.Delayed][shouldOpen ? 0 : 1]);
}

setupTimersMock();

describe('HelpPopover', () => {
    test('render popup when hover help icon', async () => {
        const title = 'HelpPopover title';

        render(<HelpPopover qa={qaId} title={title} />);

        const icon = screen.getByTestId(qaId);
        expect(icon).toBeVisible();

        userEvent.hover(icon);

        act(() => {
            waitForTooltipOpenedStateChange(true);
        });

        const popoverTitle = await screen.findByText(title);
        expect(popoverTitle).toBeVisible();
    });
});
