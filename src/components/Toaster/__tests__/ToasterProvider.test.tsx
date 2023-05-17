import {act, fireEvent, render, screen} from '@testing-library/react';
import React, {useEffect} from 'react';
import {useToaster} from '../hooks/useToaster';
import {ToasterComponent} from '../ToasterComponent/ToasterComponent';
import {ToasterProvider} from '../Provider/ToasterProvider';
import {ToasterPublicMethods} from '../types';
import {getToast} from '../__mocks__/getToast';
import {tick} from '../__mocks__/tick';
import {fireAnimationEndEvent} from '../__mocks__/fireAnimationEndEvent';

function ToastAPI({onMount}: {onMount: (api: ToasterPublicMethods) => void}) {
    const toaster = useToaster();

    useEffect(() => {
        onMount(toaster);
    }, []);

    return null;
}

function setup() {
    let providerAPI: undefined | ToasterPublicMethods;

    render(
        <ToasterProvider>
            <ToastAPI
                onMount={(api) => {
                    providerAPI = api;
                }}
            />
            <ToasterComponent />
        </ToasterProvider>,
    );

    if (!providerAPI) {
        throw new Error('Failed to setup test');
    }

    return providerAPI;
}

const toastTimeout = 1000;
const toastProps = {
    name: 'test',
    title: 'Test Toast',
};

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

describe('api.add', () => {
    // We test that after adding toast the next add will remove
    // previous toast from DOM and add it again
    it('should override already added toast', async function () {
        const providerAPI = setup();

        act(() => {
            providerAPI.add(toastProps);
        });

        let toast = getToast();

        expect(toast).toBeInTheDocument();

        jest.advanceTimersByTime(1);

        act(() => {
            providerAPI.add(toastProps);
        });
        fireAnimationEndEvent(toast, 'toast-hide-end');

        expect(toast).not.toBeInTheDocument();

        toast = await screen.findByText('Test Toast');

        expect(toast).toBeInTheDocument();
    });
});

describe('api.remove', () => {
    it('should remove toast', function () {
        const providerAPI = setup();

        act(() => {
            providerAPI.add({
                ...toastProps,
                autoHiding: toastTimeout,
            });
        });

        const toast = getToast();
        expect(toast).toBeInTheDocument();

        act(() => {
            providerAPI.remove(toastProps.name);
        });
        tick(toast, 0);

        // Immediately removed
        expect(toast).not.toBeInTheDocument();
    });
});

it('should remove toast after timeout', function () {
    const providerAPI = setup();

    act(() => {
        providerAPI.add({
            ...toastProps,
            autoHiding: toastTimeout,
        });
    });

    const toast = getToast();
    expect(toast).toBeInTheDocument();

    tick(toast, toastTimeout / 2);

    expect(toast).toBeInTheDocument();

    act(() => {
        jest.advanceTimersByTime(toastTimeout / 2);
    });

    expect(toast).toBeInTheDocument();

    fireAnimationEndEvent(toast, 'toast-hide-end');

    expect(toast).not.toBeInTheDocument();
});

it('should preserve toast on hover', function () {
    const providerAPI = setup();

    act(() => {
        providerAPI.add({
            ...toastProps,
            autoHiding: toastTimeout,
        });
    });

    const toast = getToast();

    fireEvent.mouseOver(toast);

    // Pretend that timeout long gone
    tick(toast, toastTimeout * 2);

    // But toast was not removed because we hover it
    expect(toast).toBeInTheDocument();

    fireEvent.mouseLeave(toast);
    tick(toast, 0);

    // After "unhovering" toast remain intact
    expect(toast).toBeInTheDocument();

    tick(toast, toastTimeout / 2);

    // After some time toast is still here, because timeout is not gone yet
    expect(toast).toBeInTheDocument();

    tick(toast, toastTimeout / 2);

    // Time is over, toast should be removed
    expect(toast).not.toBeInTheDocument();
});

describe('api.update', () => {
    it('should update toast', function () {
        const providerAPI = setup();

        act(() => {
            providerAPI.add({
                ...toastProps,
                autoHiding: toastTimeout,
            });
        });

        const toast = getToast();

        expect(screen.queryByText('Test Content of the toast')).not.toBeInTheDocument();
        expect(screen.queryByRole('button', {name: 'Toast Button'})).not.toBeInTheDocument();

        act(() => {
            providerAPI.update(toastProps.name, {
                content: 'Test Content of the toast',
                actions: [
                    {
                        label: 'Toast Button',
                        onClick() {},
                    },
                ],
            });
        });

        expect(screen.getByText('Test Content of the toast')).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Toast Button'})).toBeInTheDocument();
        expect(toast).toBeInTheDocument();
    });

    it('should bypass update of unexisted toasts', function () {
        const providerAPI = setup();

        act(() => {
            providerAPI.add({
                ...toastProps,
                autoHiding: toastTimeout,
            });
        });

        const toast = getToast();

        act(() => {
            providerAPI.update(`unexisted ${toastProps.name}`, {
                content: 'Test Content of the toast',
                actions: [
                    {
                        label: 'Toast Button',
                        onClick() {},
                    },
                ],
            });
        });

        expect(toast).toBeInTheDocument();
    });
});

describe('api.removeAll', () => {
    it('should remove all toasts', function () {
        const providerAPI = setup();

        act(() => {
            providerAPI.add(toastProps);
            providerAPI.add({
                ...toastProps,
                name: `${toastProps.name}2`,
                title: `${toastProps.title}2`,
            });
        });

        const toast1 = screen.getByRole('heading', {name: 'Test Toast'});
        const toast2 = screen.getByRole('heading', {name: 'Test Toast2'});

        expect(toast1).toBeInTheDocument();
        expect(toast2).toBeInTheDocument();

        act(() => {
            providerAPI.removeAll();
        });

        [toast1, toast2].forEach((toast) => fireAnimationEndEvent(toast, 'toast-hide-end'));

        expect(screen.queryByRole('heading', {name: 'Test Toast'})).not.toBeInTheDocument();
        expect(screen.queryByRole('heading', {name: 'Test Toast2'})).not.toBeInTheDocument();
    });
});

describe('api.has', () => {
    it('should return false when toast is not added', () => {
        const providerAPI = setup();
        expect(providerAPI.has('unexisted toasts')).toBe(false);
    });

    it('should return false when toast is removed by code', () => {
        const providerAPI = setup();

        act(() => {
            providerAPI.add({
                ...toastProps,
                autoHiding: toastTimeout,
            });
        });

        expect(providerAPI.has(toastProps.name)).toBe(true);

        act(() => {
            providerAPI.remove(toastProps.name);
        });

        expect(providerAPI.has(toastProps.name)).toBe(false);
    });

    it('should return false when toast is removed by timer', () => {
        const providerAPI = setup();

        act(() => {
            providerAPI.add({
                ...toastProps,
                autoHiding: toastTimeout,
            });
        });

        expect(providerAPI.has(toastProps.name)).toBe(true);

        act(() => {
            jest.advanceTimersByTime(toastTimeout);
        });
        expect(providerAPI.has(toastProps.name)).toBe(false);
    });
});
