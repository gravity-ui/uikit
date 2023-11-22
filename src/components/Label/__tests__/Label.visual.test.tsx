import React from 'react';

import {expect} from '@playwright/experimental-ct-react';

import {
    Close,
    Copy,
    Default,
    Icon,
    Interactive,
    LinkWrapper,
    ShowcaseStory,
    Size,
    Theme,
    Value,
} from './helpersPlaywright';

import {test} from '~playwright/core';

test.describe('Label', () => {
    test('render stories Default', async ({mount}) => {
        const component = await mount(<Default />);

        await expect(component).toHaveScreenshot();
    });

    test('render stories Theme', async ({mount}) => {
        const component = await mount(<Theme />);

        await expect(component).toHaveScreenshot();
    });

    test('render stories Size', async ({mount}) => {
        const component = await mount(<Size />);

        await expect(component).toHaveScreenshot();
    });

    test('render stories Icon', async ({mount}) => {
        const component = await mount(<Icon />);

        await expect(component).toHaveScreenshot();
    });

    test('render stories Interactive', async ({mount}) => {
        const component = await mount(<Interactive />);

        await expect(component).toHaveScreenshot();
    });

    test('render stories LinkWrapper', async ({mount}) => {
        const component = await mount(<LinkWrapper />);

        await expect(component).toHaveScreenshot();
    });

    test('render stories ShowcaseStory', async ({mount}) => {
        const component = await mount(<ShowcaseStory />);

        await expect(component).toHaveScreenshot();
    });

    test('render stories Value', async ({mount}) => {
        const component = await mount(<Value />);

        await expect(component).toHaveScreenshot();
    });

    test('render stories Copy', async ({mount}) => {
        const component = await mount(<Copy />);

        await expect(component).toHaveScreenshot();
    });

    test('render stories Close', async ({mount}) => {
        const component = await mount(<Close />);

        await expect(component).toHaveScreenshot();
    });
});
