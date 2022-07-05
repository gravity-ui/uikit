import {act, render, screen, waitForElementToBeRemoved} from '@testing-library/react';
import React, {useEffect} from 'react';
import {useToaster} from '../hooks/useToaster';
import {ToasterComponent} from '../ToasterComponent/ToasterComponent';
import {ToasterProvider} from '../ToasterProvider';
import {ToasterRef, ToastProps} from '../types';

function Toast(props: ToastProps & {onMount: (api: ToasterRef) => void}) {
    const toaster = useToaster();

    useEffect(() => {
        toaster.add(props);
    }, [props, toaster]);

    useEffect(() => {
        props.onMount(toaster);
    }, []);

    return null;
}

it('should override already added toast', async function () {
    let providerAPI: undefined | null | ToasterRef;

    render(
        <ToasterProvider>
            <Toast
                name="test"
                title="Test Toast"
                onMount={(api) => {
                    providerAPI = api;
                }}
            />
            <ToasterComponent />
        </ToasterProvider>,
    );

    let toast = await screen.findByText('Test Toast');

    expect(toast).toBeInTheDocument();

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
        providerAPI?.add({
            name: 'test',
            title: 'Test Toast',
        });

        await waitForElementToBeRemoved(toast);

        expect(toast).not.toBeInTheDocument();
    });

    toast = await screen.findByText('Test Toast');

    expect(toast).toBeInTheDocument();
});
