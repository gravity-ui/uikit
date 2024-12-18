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

    createSmokeScenarios<LabelProps>(defaultProps, {
        theme: themeCases,
        size: sizeCases,
        disabled: disabledCases,
    }).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(<Label {...props} />);

            await expectScreenshot();
        });
    });

    createSmokeScenarios<LabelProps>(
        defaultProps,
        {
            theme: themeCases,
            size: sizeCases,
        },
        {
            scenarioName: 'custom icon',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(<TestLabelWithIcon {...props} />);

            await expectScreenshot();
        });
    });

    createSmokeScenarios<LabelProps>(
        {
            ...defaultProps,
            interactive: true,
        },
        {
            theme: themeCases,
            size: sizeCases,
        },
        {
            scenarioName: 'interactive',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            const root = await mount(<Label {...props} />);

            await expectScreenshot({});

            await root.getByTestId(qa).focus();

            await expectScreenshot({
                nameSuffix: 'after hover',
            });
        });
    });

    createSmokeScenarios<LabelProps>(
        {
            ...defaultProps,
            type: 'copy',
            copyText: 'Copy text',
            onCopy: () => {},
        },
        {
            theme: themeCases,
            size: sizeCases,
        },
        {
            scenarioName: 'with copy',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            const root = await mount(<Label {...props} />);

            await expectScreenshot({});

            await expect(root.getByTestId(LabelQa.copyButton)).toBeVisible();
            await root.getByTestId(LabelQa.copyButton).focus();

            await expectScreenshot({
                nameSuffix: 'after hover',
            });

            await root.getByTestId(LabelQa.copyButton).click();

            await expectScreenshot({
                nameSuffix: 'after click',
            });
        });
    });

    createSmokeScenarios<LabelProps>(
        {
            ...defaultProps,
            type: 'default',
            onClick: () => {},
        },
        {
            theme: themeCases,
            size: sizeCases,
        },
        {
            scenarioName: 'clickable',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            const root = await mount(<Label {...props} />);

            await expectScreenshot({});

            await expect(root.getByTestId(LabelQa.mainButton)).toBeVisible();
            await root.getByTestId(LabelQa.mainButton).focus();

            await expectScreenshot({
                nameSuffix: 'after hover',
            });

            await root.getByTestId(LabelQa.mainButton).click();

            await expectScreenshot({
                nameSuffix: 'after click',
            });
        });
    });

    createSmokeScenarios<LabelProps>(
        {
            ...defaultProps,
            type: 'close',
            onCloseClick: () => {},
        },
        {
            theme: themeCases,
            size: sizeCases,
        },
        {
            scenarioName: 'closable',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            const root = await mount(<Label {...props} />);

            await expectScreenshot({});

            await expect(root.getByTestId(LabelQa.closeButton)).toBeVisible();
            await root.getByTestId(LabelQa.closeButton).focus();

            await expectScreenshot({
                nameSuffix: 'after hover',
            });

            await root.getByTestId(LabelQa.closeButton).click();

            await expectScreenshot({
                nameSuffix: 'after click',
            });
        });
    });
});
