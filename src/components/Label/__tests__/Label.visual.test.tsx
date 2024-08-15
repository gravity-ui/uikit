import React from 'react';

import {expect} from '@playwright/experimental-ct-react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {LabelProps} from '../Label';
import {Label} from '../Label';
import {LabelQa} from '../constants';

import {disabledCases, sizeCases, themeCases} from './cases';
import {LabelStories, TestLabelWithIcon} from './helpersPlaywright';

const qa = 'label';

test.describe('Label', {tag: '@Label'}, () => {
    test('render story: <Default>', async ({mount, expectScreenshot}) => {
        await mount(<LabelStories.Default />);

        await expectScreenshot();
    });

    test('render story: <Theme>', async ({mount, expectScreenshot}) => {
        await mount(<LabelStories.Theme />);

        await expectScreenshot();
    });

    test('render story: <Size>', async ({mount, expectScreenshot}) => {
        await mount(<LabelStories.Size />);

        await expectScreenshot();
    });

    test('render story: <Icon>', async ({mount, expectScreenshot}) => {
        await mount(<LabelStories.Icon />);

        await expectScreenshot();
    });

    test('render story: <Interactive>', async ({mount, expectScreenshot}) => {
        await mount(<LabelStories.Interactive />);

        await expectScreenshot();
    });

    test('render story: <LinkWrapper>', async ({mount, expectScreenshot}) => {
        await mount(<LabelStories.LinkWrapper />);

        await expectScreenshot();
    });

    test.skip('render story: <ShowcaseStory>', async ({mount, expectScreenshot}) => {
        await mount(<LabelStories.ShowcaseStory />);

        await expectScreenshot();
    });

    test('render story: <Value>', async ({mount, expectScreenshot}) => {
        await mount(<LabelStories.Value />);

        await expectScreenshot();
    });

    test('render story: <Copy>', async ({mount, expectScreenshot}) => {
        await mount(<LabelStories.Copy />);

        await expectScreenshot();
    });

    test('render story: <Close>', async ({mount, expectScreenshot}) => {
        await mount(<LabelStories.Close />);

        await expectScreenshot();
    });

    const defaultProps: LabelProps = {
        children: 'Label',
        qa,
        type: 'default',
    };

    createSmokeScenarios(defaultProps, {
        theme: themeCases,
        size: sizeCases,
        disabled: disabledCases,
    }).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(<Label {...props} />);

            await expectScreenshot();
        });
    });

    createSmokeScenarios(defaultProps, {
        theme: themeCases,
        size: sizeCases,
    }).forEach(([title, details, props]) => {
        test(`custom icon ${title}`, details, async ({mount, expectScreenshot}) => {
            await mount(<TestLabelWithIcon {...props} />);

            await expectScreenshot();
        });
    });

    createSmokeScenarios(
        {
            ...defaultProps,
            interactive: true,
        },
        {
            theme: themeCases,
            size: sizeCases,
        },
    ).forEach(([title, details, props]) => {
        test(`interactive ${title}`, details, async ({mount, expectScreenshot}) => {
            const root = await mount(<Label {...props} />);

            await expectScreenshot({
                screenshotPostfix: 'init',
            });

            await root.getByTestId(qa).focus();

            await expectScreenshot({
                screenshotPostfix: 'after hover',
            });
        });
    });

    createSmokeScenarios(
        {
            ...defaultProps,
            type: 'copy',
            copyTextCases: 'Copy text',
            onCopy: () => {},
        },
        {
            theme: themeCases,
            size: sizeCases,
        },
    ).forEach(([title, details, props]) => {
        test(`with copy ${title}`, details, async ({mount, expectScreenshot}) => {
            const root = await mount(<Label {...props} />);

            await expectScreenshot({
                screenshotPostfix: 'init',
            });

            await expect(root.getByTestId(LabelQa.copyButton)).toBeVisible();
            await root.getByTestId(LabelQa.copyButton).focus();

            await expectScreenshot({
                screenshotPostfix: 'after hover',
            });

            await root.getByTestId(LabelQa.copyButton).click();

            await expectScreenshot({
                screenshotPostfix: 'after click',
            });
        });
    });

    createSmokeScenarios(
        {
            ...defaultProps,
            type: 'default',
            onClick: () => {},
        },
        {
            theme: themeCases,
            size: sizeCases,
        },
    ).forEach(([title, details, props]) => {
        test(`clickable ${title}`, details, async ({mount, expectScreenshot}) => {
            const root = await mount(<Label {...props} />);

            await expectScreenshot({
                screenshotPostfix: 'init',
            });

            await expect(root.getByTestId(LabelQa.mainButton)).toBeVisible();
            await root.getByTestId(LabelQa.mainButton).focus();

            await expectScreenshot({
                screenshotPostfix: 'after hover',
            });

            await root.getByTestId(LabelQa.mainButton).click();

            await expectScreenshot({
                screenshotPostfix: 'after click',
            });
        });
    });

    createSmokeScenarios(
        {
            ...defaultProps,
            type: 'close',
            onCloseClick: () => {},
        },
        {
            theme: themeCases,
            size: sizeCases,
        },
    ).forEach(([title, details, props]) => {
        test(`closable ${title}`, details, async ({mount, expectScreenshot}) => {
            const root = await mount(<Label {...props} />);

            await expectScreenshot({
                screenshotPostfix: 'init',
            });

            await expect(root.getByTestId(LabelQa.closeButton)).toBeVisible();
            await root.getByTestId(LabelQa.closeButton).focus();

            await expectScreenshot({
                screenshotPostfix: 'after hover',
            });

            await root.getByTestId(LabelQa.closeButton).click();

            await expectScreenshot({
                screenshotPostfix: 'after click',
            });
        });
    });
});
