import * as React from 'react';

import {act, cleanup, fireEvent, render, screen} from '../../../../test-utils/utils';
import {getLayersCount} from '../../utils/layer-manager';
import {Sheet} from '../Sheet';
import {SHEET_TRANSITION_DURATION_MS} from '../constants';

function finishPresenceTransition() {
    act(() => {
        jest.advanceTimersByTime(SHEET_TRANSITION_DURATION_MS);
    });
}

function pressEscape() {
    fireEvent.keyDown(document, {key: 'Escape', code: 'Escape'});
}

describe('Sheet lifecycle', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        cleanup();
        jest.clearAllTimers();
        jest.useRealTimers();

        expect(getLayersCount()).toBe(0);
        expect(document.body.style.overflow).toBe('');
    });

    test('keeps the exiting top sheet above lower layers until unmount', () => {
        const lowerOnOpenChange = jest.fn();
        const upperOnOpenChange = jest.fn();

        function LayeredSheets() {
            const [upperVisible, setUpperVisible] = React.useState(true);

            return (
                <React.Fragment>
                    <Sheet visible onOpenChange={lowerOnOpenChange} qa="lower-sheet">
                        Lower sheet
                    </Sheet>
                    <Sheet
                        visible={upperVisible}
                        onOpenChange={(open, event, reason) => {
                            upperOnOpenChange(open, event, reason);
                            setUpperVisible(open);
                        }}
                        qa="upper-sheet"
                    >
                        Upper sheet
                    </Sheet>
                </React.Fragment>
            );
        }

        render(<LayeredSheets />);

        pressEscape();

        expect(upperOnOpenChange).toHaveBeenCalledWith(false, expect.any(Event), 'escape-key');
        expect(upperOnOpenChange).toHaveBeenCalledTimes(1);
        expect(screen.getByText('Upper sheet')).toBeInTheDocument();

        pressEscape();

        expect(lowerOnOpenChange).not.toHaveBeenCalled();
        expect(screen.getByTestId('upper-sheet')).toHaveAttribute(
            'data-floating-ui-status',
            'close',
        );

        finishPresenceTransition();

        expect(screen.queryByText('Upper sheet')).not.toBeInTheDocument();

        pressEscape();

        expect(lowerOnOpenChange).toHaveBeenCalledWith(false, expect.any(Event), 'escape-key');
        expect(lowerOnOpenChange).toHaveBeenCalledTimes(1);
    });

    test('releases the layer only after a legacy dismissal finishes its exit', () => {
        const onClose = jest.fn();

        render(
            <Sheet visible onClose={onClose} qa="legacy-sheet">
                Content
            </Sheet>,
        );

        expect(getLayersCount()).toBe(1);
        expect(document.body.style.overflow).toBe('hidden');

        pressEscape();

        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(getLayersCount()).toBe(1);
        expect(document.body.style.overflow).toBe('hidden');
        expect(onClose).not.toHaveBeenCalled();

        finishPresenceTransition();

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        expect(getLayersCount()).toBe(0);
        expect(document.body.style.overflow).toBe('');
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    test('reopens when visible becomes true during an unfinished exit', () => {
        const onClose = jest.fn();
        const onOpenChange = jest.fn();
        const {rerender} = render(
            <Sheet visible onClose={onClose} onOpenChange={onOpenChange} qa="sheet">
                Content
            </Sheet>,
        );

        rerender(
            <Sheet visible={false} onClose={onClose} onOpenChange={onOpenChange} qa="sheet">
                Content
            </Sheet>,
        );

        expect(screen.getByTestId('sheet')).toHaveAttribute('data-floating-ui-status', 'close');
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(onClose).not.toHaveBeenCalled();

        act(() => {
            jest.advanceTimersByTime(SHEET_TRANSITION_DURATION_MS / 2);
        });

        rerender(
            <Sheet visible onClose={onClose} onOpenChange={onOpenChange} qa="sheet">
                Content
            </Sheet>,
        );

        finishPresenceTransition();

        expect(screen.getByTestId('sheet')).toHaveAttribute('data-floating-ui-status', 'open');
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByTestId('sheet-veil')).toHaveStyle({opacity: '1'});
        expect(onClose).not.toHaveBeenCalled();
    });

    test('calls deprecated onClose once after completed exit', () => {
        const onClose = jest.fn();
        const {rerender} = render(
            <Sheet visible onClose={onClose}>
                Content
            </Sheet>,
        );

        rerender(
            <Sheet visible={false} onClose={onClose}>
                Content
            </Sheet>,
        );

        act(() => {
            jest.advanceTimersByTime(SHEET_TRANSITION_DURATION_MS - 1);
        });

        expect(onClose).not.toHaveBeenCalled();
        expect(screen.getByRole('dialog')).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(1);
        });

        expect(onClose).toHaveBeenCalledTimes(1);
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

        finishPresenceTransition();

        expect(onClose).toHaveBeenCalledTimes(1);
    });
});
