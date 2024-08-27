import React from 'react';

import {test} from '~playwright/core';

import {ContainerStories} from './stories';

test.describe('Container', {tag: '@Container'}, () => {
    test('render story <Default>', async ({mount, expectScreenshot}) => {
        const props = {
            spaceRow: {m: '1'},
            maxWidth: 'l',
        } as const;

        await mount(<ContainerStories.Default {...props} />);

        await expectScreenshot();
    });
});
