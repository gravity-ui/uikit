import userEvent from '@testing-library/user-event';

import {setupTimersMock} from '../../../../test-utils/setupTimersMock';
import {act, render, screen} from '../../../../test-utils/utils';
import {MobileProvider} from '../../mobile';
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

    test('render sheet with sheet props instead of popup on mobile', async () => {
        const title = 'HelpMark sheet title';
        const content = 'HelpMark content';
        const sheetQa = 'help-mark-sheet';
        const popoverQa = 'help-mark-popover';
        const onOpenChange = jest.fn();

        render(
            <MobileProvider mobile>
                <HelpMark
                    qa={qaId}
                    popoverProps={{qa: popoverQa}}
                    sheetProps={{qa: sheetQa, title, onOpenChange}}
                >
                    {content}
                </HelpMark>
            </MobileProvider>,
        );

        const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
        await user.click(screen.getByTestId(qaId));

        expect(screen.getByTestId(sheetQa)).toBeVisible();
        expect(screen.getByRole('dialog', {name: title})).toBeVisible();
        expect(screen.getByText(content)).toHaveClass('g-help-mark__sheet-content');
        expect(screen.queryByTestId(popoverQa)).not.toBeInTheDocument();
        expect(onOpenChange).toHaveBeenCalledWith(true, expect.any(Event));
    });
});
