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
    test('render story: <Default>', async ({mount}) => {
        const component = await mount(<Default />);

        await expect(component).toHaveScreenshot();
    });

    test('render story: <Theme>', async ({mount}) => {
        const component = await mount(<Theme />);

        await expect(component).toHaveScreenshot();
    });

    test('render story: <Size>', async ({mount}) => {
        const component = await mount(<Size />);

        await expect(component).toHaveScreenshot();
    });

    test('render story: <Icon>', async ({mount}) => {
        const component = await mount(<Icon />);

        await expect(component).toHaveScreenshot();
    });

    test('render story: <Interactive>', async ({mount}) => {
        const component = await mount(<Interactive />);

        await expect(component).toHaveScreenshot();
    });

    test('render story: <LinkWrapper>', async ({mount}) => {
        const component = await mount(<LinkWrapper />);

        await expect(component).toHaveScreenshot();
    });

    test('render story: <ShowcaseStory>', async ({mount}) => {
        const component = await mount(<ShowcaseStory />);

        await expect(component).toHaveScreenshot();
    });

    test('render story: <Value>', async ({mount}) => {
        const component = await mount(<Value />);

        await expect(component).toHaveScreenshot();
    });

    test('render story: <Copy>', async ({mount}) => {
        const component = await mount(<Copy />);

        await expect(component).toHaveScreenshot();
    });

    test('render story: <Close>', async ({mount}) => {
        const component = await mount(<Close />);

        await expect(component).toHaveScreenshot();
    });
});
