import type * as React from 'react';

import {expect, test} from '~playwright/core';

import type {Toast} from '../Toast/Toast';
import type {ToastAction} from '../types';

import {ToastWithInlinePopup} from './ToastWithInlinePopup';
import {ToastStories} from './helpersPlaywright';

const wrapperOptions = {
    width: 312,
};

function getToastActions({
    contrastButton = true,
    firstLabel = 'Action',
}: {
    contrastButton?: boolean;
    firstLabel?: string;
} = {}): ToastAction[] {
    return [
        {onClick() {}, label: firstLabel, view: contrastButton ? 'contrast-light' : 'normal'},
        {onClick() {}, label: 'Something More', view: 'outlined'},
    ];
}

const simpleToastProps: React.ComponentProps<typeof Toast> = {
    actions: getToastActions(),
    removeCallback: () => {},
    name: 'simple-toast',
    isClosable: true,
    title: 'Do some actions',
    content: 'We address you some concerns regarding your last actions in UI',
};

test.describe('Toast', {tag: '@Toaster'}, () => {
    test('render story: <ToastPlayground> (normal)', async ({mount, expectScreenshot}) => {
        await mount(
            <ToastStories.ToastPlayground
                {...simpleToastProps}
                actions={getToastActions({contrastButton: false})}
                theme="normal"
            />,
            wrapperOptions,
        );

        await expectScreenshot();
    });

    test('render story: <ToastPlayground> (info)', async ({mount, expectScreenshot}) => {
        await mount(
            <ToastStories.ToastPlayground {...simpleToastProps} theme="info" />,
            wrapperOptions,
        );

        await expectScreenshot();
    });

    test('render story: <ToastPlayground> (success)', async ({mount, expectScreenshot}) => {
        await mount(
            <ToastStories.ToastPlayground {...simpleToastProps} theme="success" />,
            wrapperOptions,
        );

        await expectScreenshot();
    });

    test('render story: <ToastPlayground> (warning)', async ({mount, expectScreenshot}) => {
        await mount(
            <ToastStories.ToastPlayground {...simpleToastProps} theme="warning" />,
            wrapperOptions,
        );

        await expectScreenshot();
    });

    test('render story: <ToastPlayground> (danger)', async ({mount, expectScreenshot}) => {
        await mount(
            <ToastStories.ToastPlayground {...simpleToastProps} theme="danger" />,
            wrapperOptions,
        );

        await expectScreenshot();
    });

    test('render story: <ToastPlayground> (utility)', async ({mount, expectScreenshot}) => {
        await mount(
            <ToastStories.ToastPlayground {...simpleToastProps} theme="utility" />,
            wrapperOptions,
        );

        await expectScreenshot();
    });

    test('actions wrap', async ({mount, expectScreenshot}) => {
        const actions = getToastActions({
            firstLabel: 'Really long button text that cause buttons to wrap',
        });

        await mount(
            <ToastStories.ToastPlayground
                {...simpleToastProps}
                actions={actions}
                theme="utility"
            />,
            wrapperOptions,
        );

        await expectScreenshot();
    });

    test('inline-popup remains visible outside the toast', async ({
        mount,
        page,
        expectScreenshot,
    }) => {
        await mount(<ToastWithInlinePopup />);

        const popup = page.locator('[data-toast]').getByTestId('inline-popup');
        await expect(popup).toBeVisible();
        await expect
            .poll(() =>
                popup.evaluate((element) => {
                    const toast = element.closest('[data-toast]');
                    return Boolean(
                        toast &&
                            element.getBoundingClientRect().top >
                                toast.getBoundingClientRect().bottom,
                    );
                }),
            )
            .toBe(true);
        await popup.getByRole('button', {name: 'Inline popup action'}).click({trial: true});

        await expectScreenshot();
    });
});
