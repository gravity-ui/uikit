import {fireEvent, render, screen} from '../../../../test-utils/utils';
import {Sheet} from '../Sheet';
import {SheetQa} from '../constants';

const HIDE_THRESHOLD = 50;
const SHEET_HEIGHT = 300;
const TOUCH_START_POINT = 100;

describe('Sheet swipe area', () => {
    let getBoundingClientRectSpy: jest.SpyInstance;
    beforeEach(() => {
        getBoundingClientRectSpy = jest
            .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
            .mockReturnValue({height: SHEET_HEIGHT, width: 0, top: 0, left: 0} as DOMRect);
    });
    afterEach(() => {
        getBoundingClientRectSpy.mockRestore();
    });

    function swipeOnArea(area: Element, {from, to}: {from: number; to: number}) {
        fireEvent.touchStart(area, {touches: [{clientX: 0, clientY: from}]});
        fireEvent.touchMove(area, {touches: [{clientX: 0, clientY: to}]});
        fireEvent.touchEnd(area, {touches: [{clientX: 0, clientY: to}]});
    }

    test('closes the sheet only when the swipe-area movement exceeds the threshold', () => {
        const onClose = jest.fn();
        const onOpenChange = jest.fn();
        render(
            <Sheet visible onClose={onClose} onOpenChange={onOpenChange}>
                Content
            </Sheet>,
        );

        const swipeArea = screen.getByTestId(SheetQa.SWIPE_AREA);
        const sheet = screen.getByRole('dialog');
        const veil = screen.getByTestId(SheetQa.VEIL);

        // A short swipe (below the threshold) returns the sheet to the open position.
        swipeOnArea(swipeArea, {
            from: TOUCH_START_POINT,
            to: TOUCH_START_POINT + (HIDE_THRESHOLD - 20),
        });

        expect(onClose).not.toHaveBeenCalled();
        expect(onOpenChange).not.toHaveBeenCalled();

        // show() restores the fully opened state: full veil opacity and shifted-up transform.
        expect(veil.style.opacity).toBe('1');
        expect(sheet.style.transform).toBe(`translate3d(0, -${SHEET_HEIGHT}px, 0)`);

        // A swipe above the threshold starts the closing animation.
        swipeOnArea(swipeArea, {
            from: TOUCH_START_POINT,
            to: TOUCH_START_POINT + (HIDE_THRESHOLD + 20),
        });

        // hide() moves the sheet down and fades the veil out.
        expect(sheet.style.transform).toBe('translate3d(0, 0, 0)');
        expect(veil.style.opacity).toBe('0');
        // onClose fires only after the hiding transition finishes.
        expect(onClose).not.toHaveBeenCalled();
        expect(onOpenChange).toHaveBeenCalledWith(false, expect.any(Event), 'swipe');
        expect(onOpenChange).toHaveBeenCalledTimes(1);

        fireEvent.transitionEnd(veil);
        expect(onClose).toHaveBeenCalledTimes(1);
    });
});
