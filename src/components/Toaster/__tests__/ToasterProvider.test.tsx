import {act, render, screen} from '@testing-library/react';
import React, {useEffect} from 'react';
import {useToaster} from '../hooks/useToaster';
import {ToasterComponent} from '../ToasterComponent/ToasterComponent';
import {ToasterProvider} from '../Provider/ToasterProvider';
import {ToasterPublicMethods} from '../types';
import {getToast} from './getToast';

function ToastAPI({onMount}: {onMount: (api: ToasterPublicMethods) => void}) {
    const toaster = useToaster();

    useEffect(() => {
        onMount(toaster);
    }, []);

    return null;
}

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

// We test that after adding toast the next add will remove
// previous toast from DOM and add it again
it('should override already added toast', async function () {
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

    act(() => {
        providerAPI?.add({
            name: 'test',
            title: 'Test Toast',
        });
    });

    let toast = getToast();

    expect(toast).toBeInTheDocument();

    jest.advanceTimersByTime(1);

    act(() => {
        providerAPI?.add({
            name: 'test',
            title: 'Test Toast',
        });
    });

    expect(toast).not.toBeInTheDocument();

    toast = await screen.findByText('Test Toast');

    expect(toast).toBeInTheDocument();
});
