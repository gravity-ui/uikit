import {fireEvent, render, screen} from '../../../../test-utils/utils';

import {useResizeHandlers} from './useResizeHandlers';

const qa = 'resize-handle';

function ResizeHandle() {
    const {onPointerDown} = useResizeHandlers({
        onStart: jest.fn(),
        onMove: jest.fn(),
        onEnd: jest.fn(),
    });

    return <div data-qa={qa} onPointerDown={onPointerDown} />;
}

describe('useResizeHandlers', () => {
    test('should capture pointer on pointer down', () => {
        render(<ResizeHandle />);

        const handle = screen.getByTestId(qa);
        const pointerId = 1;
        const setPointerCapture = jest.fn();
        const pointerDownEvent = new Event('pointerdown', {bubbles: true, cancelable: true});

        Object.defineProperty(handle, 'setPointerCapture', {value: setPointerCapture});
        Object.defineProperty(pointerDownEvent, 'pointerId', {value: pointerId});

        fireEvent(handle, pointerDownEvent);

        expect(setPointerCapture).toHaveBeenCalledWith(pointerId);
    });
});
