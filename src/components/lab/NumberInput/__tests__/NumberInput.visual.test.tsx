import React from 'react';

import {test} from '~playwright/core';

import {NumberInputStories} from './stories';

test.describe('NumberInput', () => {
    test('render story: <Default>', async ({mount, expectScreenshot}) => {
        await mount(<NumberInputStories.Default />);

        await expectScreenshot();
    });
});
