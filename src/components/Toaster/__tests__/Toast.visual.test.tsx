import React from 'react';

import {test} from '~playwright/core';

import type {Toast} from '../Toast/Toast';

import {ToastStories} from './helpersPlaywright';

const wrapperOptions = {
    width: 312,
};

function getToastActions(contrastButton = true): React.ComponentProps<typeof Toast>['actions'] {
    return [
        {onClick() {}, label: 'Action', view: contrastButton ? 'normal-contrast' : 'normal'},
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
                actions={getToastActions(false)}
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
});
