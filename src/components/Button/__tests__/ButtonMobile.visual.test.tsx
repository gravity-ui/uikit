import React from 'react';

import {test} from '~playwright/core';

import {MobileProvider} from '../../../components/mobile';

import {ButtonStories} from './helpersPlaywright';

test.describe('Button Mobile', {tag: '@Button @Mobile'}, () => {
    test.use({
        viewport: {width: 390, height: 844},
        isMobile: true,
    });

    test('render story: <Default>', async ({mount, expectScreenshot}) => {
        await mount(
            <MobileProvider mobile={true}>
                <ButtonStories.Default />
            </MobileProvider>,
        );

        await expectScreenshot();
    });
});
