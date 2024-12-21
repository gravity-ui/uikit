import userEvent from '@testing-library/user-event';

import {setupTimersMock} from '../../../../test-utils/setupTimersMock';
import {act, render, screen} from '../../../../test-utils/utils';
import {HelpMark} from '../HelpMark';

const qaId = 'help-mark-component';

function waitForTooltipOpenedStateChange() {
    jest.advanceTimersByTime(300);
}

setupTimersMock();

describe('HelpMark', () => {
    test('render popup when hover help icon', async () => {
        const title = 'HelpMark title';

        render(<HelpMark qa={qaId}>{title}</HelpMark>);

        const icon = screen.getByTestId(qaId);
        expect(icon).toBeVisible();

        // eslint-disable-next-line testing-library/await-async-events
        userEvent.hover(icon);

        act(() => {
            waitForTooltipOpenedStateChange();
        });

        const popoverTitle = await screen.findByText(title);
        expect(popoverTitle).toBeVisible();
    });
});
