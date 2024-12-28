import {expect} from '@playwright/experimental-ct-react';

import {smokeTest, test} from '~playwright/core';

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

    smokeTest('with image', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios(
            defaultProps,
            {
                ...commonCases,
            },
            {
                scenarioName: 'image specific',
            },
        );

        await mount(
            <div style={{width: 400}}>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TestAvatarWithImage {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    smokeTest('with icon', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios(
            defaultProps,
            {
                ...commonCases,
            },
            {
                scenarioName: 'icon specific',
            },
        );

        await mount(
            <div style={{width: 400}}>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TestAvatarWithIcon {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    smokeTest('with text', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios(
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
        );

        await mount(
            <div style={{width: 400}}>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <Avatar {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });
});
