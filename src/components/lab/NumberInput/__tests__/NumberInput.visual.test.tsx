import React from 'react';

import {test} from '~playwright/core';

import {NumberInputStories} from './stories';

test.describe('NumberInput', () => {
    test('render story: <Default>', async ({mount, expectScreenshot}) => {
        await mount(<NumberInputStories.Default />);

        await expectScreenshot();
    });

    test('render story: <Showcase>', async ({mount, expectScreenshot}) => {
        await mount(<NumberInputStories.Showcase />);

        await expectScreenshot();
    });

    test('render story: <Basic> view=normal', async ({mount, expectScreenshot}) => {
        await mount(<NumberInputStories.Basic view="normal" />);

        await expectScreenshot();
    });

    test('render story: <Basic> view=clear', async ({mount, expectScreenshot}) => {
        await mount(<NumberInputStories.Basic view="clear" />);

        await expectScreenshot();
    });

    test('render story: <WithErrors> with errorPlacement=inside', async ({
        mount,
        expectScreenshot,
    }) => {
        await mount(<NumberInputStories.WithErrors errorPlacement="inside" />);

        await expectScreenshot();
    });

    test('render story: <WithErrors> with errorPlacement=inside view=clear', async ({
        mount,
        expectScreenshot,
    }) => {
        await mount(<NumberInputStories.WithErrors errorPlacement="inside" view="clear" />);

        await expectScreenshot();
    });

    test('render story: <WithErrors> with errorPlacement=outside', async ({
        mount,
        expectScreenshot,
    }) => {
        await mount(<NumberInputStories.WithErrors errorPlacement="outside" />);

        await expectScreenshot();
    });
});
