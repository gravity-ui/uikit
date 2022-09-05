import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {HelpPopover} from '../HelpPopover';

const qaId = 'help-popover-component';

describe('HelpPopover', () => {
    test('render popup when hover help icon', async () => {
        const title = 'HelpPopover title';

        render(<HelpPopover qa={qaId} title={title} />);

        const icon = screen.getByTestId(qaId);
        expect(icon).toBeVisible();

        userEvent.hover(icon);

        const popoverTitle = await screen.findByText(title);
        expect(popoverTitle).toBeVisible();
    });
});
