import React from 'react';

import {test} from '~playwright/core';

import {TableStories} from './helpersPlaywright';

test.describe('Table', () => {
    test('render story: <Default>', async ({mount, expectScreenshot}) => {
        await mount(<TableStories.Default />);

        await expectScreenshot();
    });

    test('render story: <HOCWithTableSorting>', async ({mount, expectScreenshot}) => {
        await mount(<TableStories.HOCWithTableSorting />);

        await expectScreenshot();
    });
});
