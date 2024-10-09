import React from 'react';

import {test} from '~playwright/core';

import {ToastStories} from './helpersPlaywright';

test.describe('Toast', {tag: '@Toaster'}, () => {
    test('render story: <ToastSimpleNormal>', async ({mount, expectScreenshot}) => {
        await mount(<ToastStories.ToastSimpleNormal />, {width: 312});

        await expectScreenshot();
    });

    test('render story: <ToastSimpleInfo>', async ({mount, expectScreenshot}) => {
        await mount(<ToastStories.ToastSimpleInfo />, {width: 312});

        await expectScreenshot();
    });

    test('render story: <ToastSimpleSuccess>', async ({mount, expectScreenshot}) => {
        await mount(<ToastStories.ToastSimpleSuccess />, {width: 312});

        await expectScreenshot();
    });

    test('render story: <ToastSimpleWarning>', async ({mount, expectScreenshot}) => {
        await mount(<ToastStories.ToastSimpleWarning />, {width: 312});

        await expectScreenshot();
    });

    test('render story: <ToastSimpleDanger>', async ({mount, expectScreenshot}) => {
        await mount(<ToastStories.ToastSimpleDanger />, {width: 312});

        await expectScreenshot();
    });

    test('render story: <ToastSimpleUtility>', async ({mount, expectScreenshot}) => {
        await mount(<ToastStories.ToastSimpleUtility />, {width: 312});

        await expectScreenshot();
    });
});
