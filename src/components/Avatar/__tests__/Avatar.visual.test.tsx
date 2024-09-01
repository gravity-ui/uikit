import React from 'react';

import {expect} from '@playwright/experimental-ct-react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import {Avatar} from '../Avatar';
import type {AvatarProps} from '../types/main';

import {
    backgroundColorCases,
    borderColorCases,
    sizeCases,
    themeCases,
    titleCases,
    viewCases,
} from './cases';
import {TestAvatarWithIcon, TestAvatarWithImage} from './helpersPlaywright';
import {AvatarStories} from './stories';

test.describe('Avatar', {tag: '@Avatar'}, () => {
    test('render story: <Image>', async ({mount}) => {
        const component = await mount(<AvatarStories.Image />);

        await expect(component).toHaveScreenshot();
    });

    test('render story: <ImageFallback>', async ({mount, browserName}) => {
        test.skip(browserName === 'webkit', 'Test is flaky for webkit');

        const component = await mount(<AvatarStories.ImageFallback />);

        await expect(component).toHaveScreenshot();
    });

    test('render story: <Icon>', async ({mount}) => {
        const component = await mount(<AvatarStories.Icon />);

        await expect(component).toHaveScreenshot();
    });

    test('render story: <Text>', async ({mount}) => {
        const component = await mount(<AvatarStories.Text />);

        await expect(component).toHaveScreenshot();
    });

    test('render story: <TextInitials>', async ({mount}) => {
        const component = await mount(<AvatarStories.TextInitials />);

        await expect(component).toHaveScreenshot();
    });

    test('render story: <WithBorder>', async ({mount}) => {
        const component = await mount(<AvatarStories.WithBorder />);

        await expect(component).toHaveScreenshot();
    });

    test('render story: <Showcase>', async ({mount}) => {
        const component = await mount(<AvatarStories.AvatarShowcase />);

        await expect(component).toHaveScreenshot();
    });

    const defaultProps: AvatarProps = {};

    const commonCases = {
        size: sizeCases,
        theme: themeCases,
        view: viewCases,
        backgroundColor: backgroundColorCases,
        borderColor: borderColorCases,
        title: titleCases,
    } as const;

    createSmokeScenarios(
        defaultProps,
        {
            ...commonCases,
        },
        {
            scenarioName: 'image specific',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(<TestAvatarWithImage {...props} />);

            await expectScreenshot();
        });
    });

    createSmokeScenarios(
        defaultProps,
        {
            ...commonCases,
        },
        {
            scenarioName: 'icon specific',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(<TestAvatarWithIcon {...props} />);

            await expectScreenshot();
        });
    });

    createSmokeScenarios(
        {
            ...defaultProps,
            text: 'Text',
            color: 'black',
        },
        {
            ...commonCases,
        },
        {
            scenarioName: 'text specific',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(<Avatar {...props} />);

            await expectScreenshot();
        });
    });
});
