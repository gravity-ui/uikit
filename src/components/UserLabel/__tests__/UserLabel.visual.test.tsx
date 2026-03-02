import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';

import {test} from '~playwright/core';

import type {UserLabelProps} from '../types';

import {onClickCases, onCloseClickCases, sizeCases, textCases, typeCases, viewCases} from './cases';
import {TestUserLabel, TestUserLabelWithEmail, TestUserLabelWithPerson} from './helpers';
import {UserLabelStories} from './stories';

test.describe('UserLabel', {tag: '@UserLabel'}, () => {
    test('render story: <Default>', async ({mount, expectScreenshot}) => {
        const component = await mount(<UserLabelStories.Default />);
        await expectScreenshot({locator: component});
    });

    test('render story: <Image>', async ({mount, expectScreenshot}) => {
        const component = await mount(<UserLabelStories.Image />);
        await expectScreenshot({locator: component});
    });

    test('render story: <Email>', async ({mount, expectScreenshot}) => {
        const component = await mount(<UserLabelStories.Email />);
        await expectScreenshot({locator: component});
    });

    test('render story: <Empty>', async ({mount, expectScreenshot}) => {
        const component = await mount(<UserLabelStories.Empty />);
        await expectScreenshot({locator: component});
    });

    test('render story: <LongText>', async ({mount, expectScreenshot}) => {
        const component = await mount(<UserLabelStories.LongText />, {width: 300});
        await expectScreenshot({locator: component});
    });

    test('render story: <Clickable>', async ({mount, expectScreenshot}) => {
        const component = await mount(<UserLabelStories.Clickable />);
        await expectScreenshot({locator: component, name: 'default'});

        await component.getByText('Charles Darwin').hover();
        await expectScreenshot({locator: component, name: 'hovered'});
    });

    test('render story: <Closable>', async ({mount, expectScreenshot}) => {
        const component = await mount(<UserLabelStories.Closable />);
        await expectScreenshot({locator: component});
    });

    test('render story: <Showcase>', async ({mount, expectScreenshot}) => {
        const component = await mount(<UserLabelStories.UserLabelShowcase />);
        await expectScreenshot({locator: component});
    });

    test('smoke user', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<Partial<UserLabelProps>>(
            {},
            {
                size: sizeCases,
                view: viewCases,
                type: typeCases,
                text: textCases,
                onClick: onClickCases,
                onCloseClick: onCloseClickCases,
            },
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TestUserLabel {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    test('smoke person', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<Partial<UserLabelProps>>(
            {},
            {
                size: sizeCases,
                view: viewCases,
                text: textCases,
                onClick: onClickCases,
                onCloseClick: onCloseClickCases,
            },
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TestUserLabelWithPerson {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    test('smoke email', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<Partial<UserLabelProps>>(
            {},
            {
                size: sizeCases,
                view: viewCases,
                text: textCases,
                onClick: onClickCases,
                onCloseClick: onCloseClickCases,
            },
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TestUserLabelWithEmail {...props} />
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
