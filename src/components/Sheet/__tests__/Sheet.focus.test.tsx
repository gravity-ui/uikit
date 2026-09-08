import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {fireEvent, render, screen, waitFor} from '../../../../test-utils/utils';
import type {History, Location} from '../../mobile';
import {MobileProvider, Platform} from '../../mobile';
import type {SheetProps} from '../Sheet';
import {Sheet} from '../Sheet';

function FocusSheet(props: Partial<SheetProps>) {
    const [visible, setVisible] = React.useState(false);

    return (
        <React.Fragment>
            <button onClick={() => setVisible(true)}>Open</button>
            <Sheet visible={visible} onClose={() => setVisible(false)} title="Example" {...props}>
                <button>First</button>
                <button>Last</button>
            </Sheet>
        </React.Fragment>
    );
}

describe('Sheet focus management', () => {
    beforeEach(() => {
        // JSDOM has no layout; tabbable uses client rects to detect visible controls.
        jest.spyOn(HTMLElement.prototype, 'getClientRects').mockReturnValue([
            {width: 10, height: 10},
        ] as unknown as DOMRectList);
    });

    afterEach(() => jest.restoreAllMocks());

    test('focuses the first control and hides the background from assistive technology', async () => {
        const user = userEvent.setup();
        render(<FocusSheet />);
        const trigger = screen.getByRole('button', {name: 'Open'});

        await user.click(trigger);

        await waitFor(() => expect(screen.getByRole('button', {name: 'First'})).toHaveFocus());
        expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
        expect(screen.queryByRole('button', {name: 'Open'})).not.toBeInTheDocument();
    });

    test('supports a custom initial focus index', async () => {
        const user = userEvent.setup();
        render(<FocusSheet initialFocus={1} />);

        await user.click(screen.getByRole('button', {name: 'Open'}));

        await waitFor(() => expect(screen.getByRole('button', {name: 'Last'})).toHaveFocus());
    });

    test('focuses the sheet when there are no tabbable controls', async () => {
        render(
            <Sheet visible title="Information">
                Content
            </Sheet>,
        );

        await waitFor(() => expect(screen.getByRole('dialog')).toHaveFocus());
    });

    test('closes on Escape and restores focus to the trigger', async () => {
        const user = userEvent.setup();
        render(<FocusSheet />);
        const trigger = screen.getByRole('button', {name: 'Open'});

        await user.click(trigger);
        await user.keyboard('{Escape}');

        await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
        await waitFor(() => expect(trigger).toHaveFocus());
    });

    test('can return focus to a custom element', async () => {
        const returnFocus = React.createRef<HTMLButtonElement>();
        const user = userEvent.setup();
        render(
            <React.Fragment>
                <button ref={returnFocus}>Return here</button>
                <FocusSheet returnFocus={returnFocus} />
            </React.Fragment>,
        );

        await user.click(screen.getByRole('button', {name: 'Open'}));
        await waitFor(() => expect(screen.getByRole('button', {name: 'First'})).toHaveFocus());
        await user.keyboard('{Escape}');

        await waitFor(() => expect(returnFocus.current).toHaveFocus());
    });

    test('provides an accessible dismiss control', async () => {
        const onClose = jest.fn();
        render(
            <Sheet visible onClose={onClose}>
                Content
            </Sheet>,
        );

        await waitFor(() =>
            expect(screen.getAllByRole('button', {name: 'Close'})).not.toHaveLength(0),
        );
        fireEvent.click(screen.getAllByRole('button', {name: 'Close'})[0]);

        await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    test('keeps a controlled sheet open when its owner rejects accessible dismissal', async () => {
        const onOpenChange = jest.fn();
        render(
            <Sheet visible onOpenChange={onOpenChange}>
                <button>Keep open</button>
            </Sheet>,
        );

        await waitFor(() => expect(screen.getByRole('button', {name: 'Keep open'})).toHaveFocus());
        fireEvent.click(screen.getAllByRole('button', {name: 'Close'})[0]);

        expect(onOpenChange).toHaveBeenCalledWith(false, expect.any(MouseEvent), 'dismiss');
        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    test('does not move focus, hide the background, or handle Escape when modal is false', async () => {
        const user = userEvent.setup();
        render(<FocusSheet modal={false} />);
        const trigger = screen.getByRole('button', {name: 'Open'});

        await user.click(trigger);
        await user.keyboard('{Escape}');

        expect(trigger).toHaveFocus();
        expect(screen.getByRole('dialog')).not.toHaveAttribute('aria-modal');
        expect(screen.getByRole('button', {name: 'Open'})).toBeVisible();
    });

    test.each([Platform.IOS, Platform.ANDROID])(
        'restores the platform history when dismissed on %s',
        async (platform) => {
            const location: Location = {pathname: '/', search: '', hash: ''};
            const updateLocation = (next: Partial<Location>) => {
                Object.assign(location, next, {
                    hash: next.hash ? `#${next.hash.replace(/^#/, '')}` : '',
                });
            };
            const history: History = {
                action: '',
                replace: jest.fn(updateLocation),
                push: jest.fn(updateLocation),
                goBack: jest.fn(),
            };
            const user = userEvent.setup();
            render(
                <MobileProvider
                    mobile
                    platform={platform}
                    useHistory={() => history}
                    useLocation={() => location}
                >
                    <Sheet visible id="example">
                        Content
                    </Sheet>
                </MobileProvider>,
            );

            await user.keyboard('{Escape}');

            await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
            if (platform === Platform.IOS) {
                expect(location.hash).toBe('');
            } else {
                expect(history.goBack).toHaveBeenCalledTimes(1);
            }
        },
    );
});
