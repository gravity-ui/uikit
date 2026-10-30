import {act, render, screen, waitFor} from '../../../../test-utils/utils';
import {Modal} from '../Modal';

describe('modal animations', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    test.each([
        [undefined, false],
        [false, false],
        [true, true],
    ] as const)('disableTransition=%s', async (disableTransition, transitionDisabled) => {
        const onTransitionIn = jest.fn();
        const onTransitionInComplete = jest.fn();
        const onTransitionOut = jest.fn();
        const onTransitionOutComplete = jest.fn();
        const props = {
            disableTransition,
            onTransitionIn,
            onTransitionInComplete,
            onTransitionOut,
            onTransitionOutComplete,
        };
        const content = <button>Modal action</button>;
        const {rerender} = render(
            <Modal {...props} open>
                {content}
            </Modal>,
        );

        await act(async () => jest.advanceTimersByTime(32));
        await act(async () => jest.advanceTimersByTime(1));
        expect(onTransitionIn).toHaveBeenCalledTimes(1);
        expect(onTransitionInComplete).toHaveBeenCalledTimes(transitionDisabled ? 1 : 0);

        await act(async () => jest.advanceTimersByTime(150));
        expect(onTransitionInComplete).toHaveBeenCalledTimes(1);
        await waitFor(() => expect(screen.getByRole('dialog')).toHaveFocus());

        rerender(
            <Modal {...props} open={false}>
                {content}
            </Modal>,
        );
        expect(onTransitionOut).toHaveBeenCalledTimes(1);
        expect(onTransitionOutComplete).toHaveBeenCalledTimes(transitionDisabled ? 1 : 0);
        if (transitionDisabled) {
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        } else {
            expect(screen.getByRole('dialog')).toBeInTheDocument();
        }

        await act(async () => jest.advanceTimersByTime(150));
        expect(onTransitionOutComplete).toHaveBeenCalledTimes(1);
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

        rerender(
            <Modal {...props} open>
                {content}
            </Modal>,
        );
        await act(async () => jest.advanceTimersByTime(32));
        await act(async () => jest.advanceTimersByTime(150));
        expect(onTransitionInComplete).toHaveBeenCalledTimes(2);
        await waitFor(() => expect(screen.getByRole('dialog')).toHaveFocus());
    });
});
