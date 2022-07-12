import {act, createEvent, fireEvent, render, screen} from '@testing-library/react';
import React from 'react';
import {Toast} from '../../Toast/Toast';

function fireAnimationEndEvent(el: Node | Window, animationName: string) {
    const ev = createEvent.animationEnd(el, {animationName});
    Object.assign(ev, {
        animationName,
    });

    fireEvent(el, ev);
}

function setup(removeCallback: VoidFunction) {
    render(
        <Toast name="foobar" removeCallback={removeCallback} title="Test Toast" timeout={1000} />,
    );
}

function getToast() {
    const toastHeading = screen.getByRole('heading', {name: 'Test Toast'});
    // TODO Improve toast a11y to correctly select it
    // eslint-disable-next-line testing-library/no-node-access
    const toast = toastHeading.parentNode?.parentNode;

    if (!toast) {
        throw new Error('Toast expected to be in document.');
    }

    fireAnimationEndEvent(toast, 'toast-display-end');

    return toast;
}

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

test('should hide toast after timeout', async () => {
    const removeCallback = jest.fn();

    setup(removeCallback);
    const toast = getToast();

    expect(toast).toBeInTheDocument();

    jest.advanceTimersByTime(500);

    expect(toast).toBeInTheDocument();

    act(() => {
        jest.advanceTimersByTime(500);
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

    act(() => {
        jest.advanceTimersByTime(2000);
    });
    fireAnimationEndEvent(toast, 'toast-hide-end');

    expect(removeCallback).not.toHaveBeenCalled();

    fireEvent.mouseLeave(toast);
    fireAnimationEndEvent(toast, 'toast-hide-end');

    expect(removeCallback).not.toHaveBeenCalled();

    act(() => {
        jest.advanceTimersByTime(500);
    });
    fireAnimationEndEvent(toast, 'toast-hide-end');

    expect(removeCallback).not.toHaveBeenCalled();

    act(() => {
        jest.advanceTimersByTime(500);
    });
    fireAnimationEndEvent(toast, 'toast-hide-end');

    expect(removeCallback).toHaveBeenCalled();
});
