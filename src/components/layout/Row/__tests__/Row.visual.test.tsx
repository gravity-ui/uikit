import React from 'react';

import {test} from '~playwright/core';

import {RowStories} from './stories';

test.describe('Flex', {tag: '@Flex'}, () => {
    test('render story <Default>', async ({mount, expectScreenshot}) => {
        await mount(<RowStories.Default />);

        await expectScreenshot();
    });

    test('render story <ZeroSpacings>', async ({mount, expectScreenshot}) => {
        await mount(<RowStories.ZeroSpacings />);

        await expectScreenshot();
    });
});
