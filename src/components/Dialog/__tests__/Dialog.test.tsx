import {act, render, screen, waitFor} from '../../../../test-utils/utils';
import {Dialog} from '../Dialog';

test('should label dialog with header text', () => {
    const dialogTitleId = 'app-confirmation-dialog-title';
    render(
        <Dialog onClose={() => {}} open={true} aria-labelledby={dialogTitleId}>
            <Dialog.Header caption="Confirm action" id={dialogTitleId} />
        </Dialog>,
    );

    expect(screen.getByRole('dialog', {name: 'Confirm action'})).toBeInTheDocument();
});

describe('independent dialog animations', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    test.each([
        [undefined, false, false],
        [false, false, false],
        [true, true, true],
        ['open', true, false],
        ['close', false, true],
    ] as const)(
        'disableAnimation=%s',
        async (disableAnimation, disableOpenAnimation, disableCloseAnimation) => {
            const onTransitionIn = jest.fn();
            const onTransitionInComplete = jest.fn();
            const onTransitionOut = jest.fn();
            const onTransitionOutComplete = jest.fn();
            const props = {
                onClose: jest.fn(),
                disableAnimation,
                onTransitionIn,
                onTransitionInComplete,
                onTransitionOut,
                onTransitionOutComplete,
            };
            const content = <button>Dialog action</button>;
            const {rerender} = render(
                <Dialog {...props} open>
                    {content}
                </Dialog>,
            );

            await act(async () => jest.advanceTimersByTime(32));
            await act(async () => jest.advanceTimersByTime(1));
            expect(onTransitionIn).toHaveBeenCalledTimes(1);
            expect(onTransitionInComplete).toHaveBeenCalledTimes(disableOpenAnimation ? 1 : 0);

            await act(async () => jest.advanceTimersByTime(150));
            expect(onTransitionInComplete).toHaveBeenCalledTimes(1);
            await waitFor(() => expect(screen.getByRole('dialog')).toHaveFocus());

            rerender(
                <Dialog {...props} open={false}>
                    {content}
                </Dialog>,
            );
            expect(onTransitionOut).toHaveBeenCalledTimes(1);
            expect(onTransitionOutComplete).toHaveBeenCalledTimes(disableCloseAnimation ? 1 : 0);
            if (disableCloseAnimation) {
                expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
            } else {
                expect(screen.getByRole('dialog')).toBeInTheDocument();
            }

            await act(async () => jest.advanceTimersByTime(150));
            expect(onTransitionOutComplete).toHaveBeenCalledTimes(1);
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

            rerender(
                <Dialog {...props} open>
                    {content}
                </Dialog>,
            );
            await act(async () => jest.advanceTimersByTime(32));
            await act(async () => jest.advanceTimersByTime(150));
            expect(onTransitionInComplete).toHaveBeenCalledTimes(2);
            await waitFor(() => expect(screen.getByRole('dialog')).toHaveFocus());
        },
    );
});
