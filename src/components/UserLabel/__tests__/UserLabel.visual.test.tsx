import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {UserLabelProps} from '../types';

import {onClickCases, onCloseClickCases, sizeCases, textCases, typeCases, viewCases} from './cases';
import {TestUserLabel, TestUserLabelWithEmail, TestUserLabelWithPerson} from './helpers';
import {UserLabelStories} from './stories';

test.describe('UserLabel', {tag: '@UserLabel'}, () => {
    test('render story: <Default>', async ({mount, expectScreenshot}) => {
        const component = await mount(<UserLabelStories.Default />);
        await expectScreenshot({component});
    });

    test('render story: <Image>', async ({mount, expectScreenshot}) => {
        const component = await mount(<UserLabelStories.Image />);
        await expectScreenshot({component});
    });

    test('render story: <Email>', async ({mount, expectScreenshot}) => {
        const component = await mount(<UserLabelStories.Email />);
        await expectScreenshot({component});
    });

    test('render story: <Empty>', async ({mount, expectScreenshot}) => {
        const component = await mount(<UserLabelStories.Empty />);
        await expectScreenshot({component});
    });

    test('render story: <LongText>', async ({mount, expectScreenshot}) => {
        const component = await mount(<UserLabelStories.LongText />, {width: 300});
        await expectScreenshot({component});
    });

    test('render story: <Clickable>', async ({mount, expectScreenshot}) => {
        const component = await mount(<UserLabelStories.Clickable />);
        await expectScreenshot({component, nameSuffix: 'default'});

        await component.getByText('Charles Darwin').hover();
        await expectScreenshot({component, nameSuffix: 'hovered'});
    });

    test('render story: <Closable>', async ({mount, expectScreenshot}) => {
        const component = await mount(<UserLabelStories.Closable />);
        await expectScreenshot({component});
    });

    test('render story: <Showcase>', async ({mount, expectScreenshot}) => {
        const component = await mount(<UserLabelStories.UserLabelShowcase />);
        await expectScreenshot({component});
    });

    smokeTest('user', async ({mount, expectScreenshot}) => {
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

    smokeTest('person', async ({mount, expectScreenshot}) => {
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

    smokeTest('email', async ({mount, expectScreenshot}) => {
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
