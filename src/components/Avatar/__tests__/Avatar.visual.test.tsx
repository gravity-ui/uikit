import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';

import {
    backgroundColorCases,
    borderColorCases,
    sizeCases,
    themeCases,
    titleCases,
    viewCases,
} from './cases';
import {TestAvatarWithIcon, TestAvatarWithImage, TestAvatarWithText} from './helpersPlaywright';
import type {TestAvatarProps} from './helpersPlaywright';
import {AvatarStories} from './stories';

test.describe('Avatar', {tag: '@Avatar'}, () => {
    test('render story: <Image>', async ({mount, expectScreenshot}) => {
        const component = await mount(<AvatarStories.Image />);
        await expectScreenshot({component});
    });

    test('render story: <ImageFallback>', async ({browserName, mount, expectScreenshot}) => {
        test.skip(browserName === 'webkit', 'Test is flaky for webkit');

        const component = await mount(<AvatarStories.ImageFallback />);
        await expectScreenshot({component});
    });

    test('render story: <Icon>', async ({mount, expectScreenshot}) => {
        const component = await mount(<AvatarStories.Icon />);
        await expectScreenshot({component});
    });

    test('render story: <Text>', async ({mount, expectScreenshot}) => {
        const component = await mount(<AvatarStories.Text />);
        await expectScreenshot({component});
    });

    test('render story: <TextInitials>', async ({mount, expectScreenshot}) => {
        const component = await mount(<AvatarStories.TextInitials />);
        await expectScreenshot({component});
    });

    test('render story: <WithBorder>', async ({mount, expectScreenshot}) => {
        const component = await mount(<AvatarStories.WithBorder />);
        await expectScreenshot({component});
    });

    test('render story: <Showcase>', async ({mount, expectScreenshot}) => {
        const component = await mount(<AvatarStories.AvatarShowcase />);
        await expectScreenshot({component});
    });

    const commonCases = {
        size: sizeCases,
        theme: themeCases,
        view: viewCases,
        backgroundColor: backgroundColorCases,
        borderColor: borderColorCases,
        title: titleCases,
    } as const;

    smokeTest('with image', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<TestAvatarProps>(
            {},
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
        const smokeScenarios = createSmokeScenarios<TestAvatarProps>(
            {},
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
        const smokeScenarios = createSmokeScenarios<TestAvatarProps>(
            {},
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
                            <TestAvatarWithText {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    test('should render default border for the image if withImageBorder=true', async ({
        mount,
        expectScreenshot,
    }) => {
        const component = await mount(<TestAvatarWithImage withImageBorder />);
        await expectScreenshot({component});
    });
});
