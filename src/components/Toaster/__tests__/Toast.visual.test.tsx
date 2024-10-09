import React from 'react';

import {test} from '~playwright/core';

import {ToastStories} from './helpersPlaywright';

test.describe('Toast', {tag: '@Toaster'}, () => {
    test('render story: <ToastSimpleNormal>', async ({mount, expectScreenshot}) => {
        await mount(<ToastStories.ToastSimpleNormal />, {width: 312});

        await expectScreenshot();
    });
});
