import React from 'react';

import {test} from '~playwright/core';

import {TextAreaStories} from './helpersPlaywright';

test.describe('TextArea', () => {
    test('render story: <Showcase>', async ({mount, expectScreenshot}) => {
        await mount(<TextAreaStories.Showcase />);

        await expectScreenshot();
    });
});
