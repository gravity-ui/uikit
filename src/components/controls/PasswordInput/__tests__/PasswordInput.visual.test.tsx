import React from 'react';

import {test} from '~playwright/core';

import {PasswordInputStories} from './helpersPlaywright';

test.describe('PasswordInputStories', () => {
    test('render story: <Default>', async ({mount, expectScreenshot}) => {
        await mount(<PasswordInputStories.Default />);

        await expectScreenshot();
    });
});