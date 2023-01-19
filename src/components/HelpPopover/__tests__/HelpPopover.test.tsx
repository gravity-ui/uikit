import React from 'react';
import {render, screen, act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {HelpPopover} from '../HelpPopover';
import {PopoverBehavior} from '../../Popover';
import {delayByBehavior} from '../../Popover/config';

const qaId = 'help-popover-component';

function waitForTooltipOpenedStateChange(shouldOpen?: boolean) {
    jest.advanceTimersByTime(delayByBehavior[PopoverBehavior.Delayed][shouldOpen ? 0 : 1]);
}

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
