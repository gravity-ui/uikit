import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {fireEvent, render, screen} from '../../../../test-utils/utils';
import {Sheet} from '../Sheet';
import {SheetQa} from '../constants';

const SHEET_HEIGHT = 300;
const TOUCH_START_POINT = 100;

function finishTransition() {
    fireEvent.transitionEnd(screen.getByTestId(SheetQa.VEIL));
}

function swipePastThreshold(area = screen.getByTestId(SheetQa.SWIPE_AREA)) {
    fireEvent.touchStart(area, {touches: [{clientX: 0, clientY: TOUCH_START_POINT}]});
    fireEvent.touchMove(area, {touches: [{clientX: 0, clientY: TOUCH_START_POINT + 70}]});
    fireEvent.touchEnd(area, {touches: [{clientX: 0, clientY: TOUCH_START_POINT + 70}]});
}

function AcceptingSheet({onRequest, onClose}: {onRequest: jest.Mock; onClose: jest.Mock}) {
    const [visible, setVisible] = React.useState(true);

    return (
        <Sheet
            visible={visible}
            onClose={onClose}
            onOpenChange={(open, event, reason) => {
                onRequest(open, event, reason);
                setVisible(open);
            }}
        >
            Content
        </Sheet>
    );
}

function LegacyReopenSheet() {
    const [visible, setVisible] = React.useState(true);

    return (
        <React.Fragment>
            <button onClick={() => setVisible(false)}>Set visible false</button>
            <button onClick={() => setVisible(true)}>Set visible true</button>
            <Sheet visible={visible}>Content</Sheet>
        </React.Fragment>
    );
}

describe('Sheet controlled dismissal', () => {
    let getBoundingClientRectSpy: jest.SpyInstance;

    beforeEach(() => {
        getBoundingClientRectSpy = jest
            .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
            .mockReturnValue({height: SHEET_HEIGHT, width: 0, top: 0, left: 0} as DOMRect);
    });

    afterEach(() => {
        getBoundingClientRectSpy.mockRestore();
    });

    test('keeps the sheet open when controlled veil dismissal is not accepted', () => {
        const onOpenChange = jest.fn();
        const onClose = jest.fn();
        render(
            <Sheet visible onClose={onClose} onOpenChange={onOpenChange}>
                Content
            </Sheet>,
        );

        finishTransition();
        fireEvent.click(screen.getByTestId(SheetQa.VEIL));

        expect(onOpenChange).toHaveBeenCalledWith(false, expect.any(Event), 'outside-press');
        expect(onOpenChange).toHaveBeenCalledTimes(1);
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByTestId(SheetQa.VEIL)).toHaveStyle({opacity: '1'});
        expect(onClose).not.toHaveBeenCalled();
    });

    test('keeps the sheet open when controlled swipe dismissal is not accepted', () => {
        const onOpenChange = jest.fn();
        const onClose = jest.fn();
        render(
            <Sheet visible onClose={onClose} onOpenChange={onOpenChange}>
                Content
            </Sheet>,
        );

        finishTransition();
        swipePastThreshold();

        expect(onOpenChange).toHaveBeenCalledWith(false, expect.any(Event), 'swipe');
        expect(onOpenChange).toHaveBeenCalledTimes(1);
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByTestId(SheetQa.VEIL)).toHaveStyle({opacity: '1'});
        expect(onClose).not.toHaveBeenCalled();
    });

    test('keeps the sheet open when controlled Escape dismissal is not accepted', async () => {
        const user = userEvent.setup();
        const onOpenChange = jest.fn();
        const onClose = jest.fn();
        render(
            <Sheet visible onClose={onClose} onOpenChange={onOpenChange}>
                Content
            </Sheet>,
        );

        finishTransition();
        await user.keyboard('{Escape}');

        expect(onOpenChange).toHaveBeenCalledWith(false, expect.any(Event), 'escape-key');
        expect(onOpenChange).toHaveBeenCalledTimes(1);
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByTestId(SheetQa.VEIL)).toHaveStyle({opacity: '1'});
        expect(onClose).not.toHaveBeenCalled();

        await user.keyboard('{Escape}');

        expect(onOpenChange).toHaveBeenCalledTimes(2);
    });

    test('runs the shared exit after the parent accepts a veil dismissal', () => {
        const onRequest = jest.fn();
        const onClose = jest.fn();
        render(<AcceptingSheet onRequest={onRequest} onClose={onClose} />);

        finishTransition();
        const veil = screen.getByTestId(SheetQa.VEIL);
        fireEvent.click(veil);
        fireEvent.click(veil);

        expect(onRequest).toHaveBeenCalledWith(false, expect.any(Event), 'outside-press');
        expect(onRequest).toHaveBeenCalledTimes(1);
        expect(veil).toHaveStyle({opacity: '0'});
        expect(onClose).not.toHaveBeenCalled();

        fireEvent.transitionEnd(veil);

        expect(onClose).toHaveBeenCalledTimes(1);
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    test.each([
        {gesture: 'swipe area', getArea: () => screen.getByTestId(SheetQa.SWIPE_AREA)},
        {gesture: 'content scroll', getArea: () => screen.getByTestId(SheetQa.CONTENT_AREA)},
    ])('keeps an accepted exit terminal during a $gesture swipe', ({getArea}) => {
        const onRequest = jest.fn();
        const onClose = jest.fn();
        render(<AcceptingSheet onRequest={onRequest} onClose={onClose} />);

        finishTransition();
        const veil = screen.getByTestId(SheetQa.VEIL);
        fireEvent.click(veil);

        expect(onRequest).toHaveBeenCalledTimes(1);
        expect(veil).toHaveStyle({opacity: '0'});

        swipePastThreshold(getArea());

        expect(onRequest).toHaveBeenCalledTimes(1);
        expect(veil).toHaveStyle({opacity: '0'});
        expect(onClose).not.toHaveBeenCalled();

        fireEvent.transitionEnd(veil);

        expect(onClose).toHaveBeenCalledTimes(1);
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    test.each([
        {
            dismiss: async () => {
                await userEvent.setup().keyboard('{Escape}');
            },
            source: 'Escape',
        },
        {
            dismiss: async () => {
                fireEvent.click(screen.getByTestId(SheetQa.VEIL));
            },
            source: 'veil click',
        },
        {
            dismiss: async () => {
                swipePastThreshold();
            },
            source: 'swipe',
        },
    ])('legacy onClose-only sheet dismisses from $source', async ({dismiss}) => {
        const onClose = jest.fn();
        render(
            <Sheet visible onClose={onClose}>
                Content
            </Sheet>,
        );

        finishTransition();
        await dismiss();

        const veil = screen.getByTestId(SheetQa.VEIL);
        expect(veil).toHaveStyle({opacity: '0'});
        expect(onClose).not.toHaveBeenCalled();

        fireEvent.transitionEnd(veil);

        expect(onClose).toHaveBeenCalledTimes(1);
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    test('reopens a legacy sheet after visible changes from false to true', () => {
        render(<LegacyReopenSheet />);

        finishTransition();
        fireEvent.click(screen.getByTestId(SheetQa.VEIL));
        const veil = screen.getByTestId(SheetQa.VEIL);
        fireEvent.transitionEnd(veil);

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', {name: 'Set visible false'}));
        fireEvent.click(screen.getByRole('button', {name: 'Set visible true'}));

        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
});
