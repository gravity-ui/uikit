import {act, fireEvent, render} from '@testing-library/react';
import React from 'react';
import {fireAnimationEndEvent} from '../fireAnimationEndEvent';
import {Toast} from '../../Toast/Toast';
import {getToast} from '../getToast';
import {tick} from '../tick';

const timeout = 1000;
function setup(removeCallback: VoidFunction) {
    render(
        <Toast
            name="foobar"
            removeCallback={removeCallback}
            title="Test Toast"
            timeout={timeout}
        />,
    );
}

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

test('should hide toast after timeout', async () => {
    const removeCallback = jest.fn();

    setup(removeCallback);
    const toast = getToast();

    expect(removeCallback).not.toHaveBeenCalled();

    tick(toast, timeout / 2);

    expect(removeCallback).not.toHaveBeenCalled();

    act(() => {
        jest.advanceTimersByTime(timeout / 2);
    });

    expect(removeCallback).not.toHaveBeenCalled();

    fireAnimationEndEvent(toast, 'toast-hide-end');

    expect(removeCallback).toHaveBeenCalled();
});

test('should preserve toast on hover', () => {
    const removeCallback = jest.fn();

    setup(removeCallback);
    const toast = getToast();

    fireEvent.mouseOver(toast);

    tick(toast, timeout * 2);

    expect(removeCallback).not.toHaveBeenCalled();

    fireEvent.mouseLeave(toast);
    fireAnimationEndEvent(toast, 'toast-hide-end');

    expect(removeCallback).not.toHaveBeenCalled();

    tick(toast, timeout / 2);

    expect(removeCallback).not.toHaveBeenCalled();

    tick(toast, timeout / 2);

    expect(removeCallback).toHaveBeenCalled();
});
