import React from 'react';

import {expect, test} from '@playwright/experimental-ct-react';

import {ArrowToggle} from '../ArrowToggle';

test.describe('ArrowToggle', () => {
    test('render ArrowToggle by default', async ({mount}) => {
        const component = await mount(<ArrowToggle />);

        await expect(component).toHaveScreenshot();
    });

    test('render ArrowToggle by direction top ', async ({mount}) => {
        const component = await mount(<ArrowToggle direction="top" />);

        await expect(component).toHaveScreenshot();
    });

    test('render ArrowToggle by direction left ', async ({mount}) => {
        const component = await mount(<ArrowToggle direction="left" />);

        await expect(component).toHaveScreenshot();
    });

    test('render ArrowToggle by direction bottom ', async ({mount}) => {
        const component = await mount(<ArrowToggle direction="bottom" />);

        await expect(component).toHaveScreenshot();
    });

    test('render ArrowToggle by direction right ', async ({mount}) => {
        const component = await mount(<ArrowToggle direction="right" />);

        await expect(component).toHaveScreenshot();
    });
});
