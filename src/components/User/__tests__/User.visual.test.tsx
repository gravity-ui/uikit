import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';

import {smokeTest, test} from '~playwright/core';

import type {UserProps} from '../types';

import {avatarCases, descriptionCases, nameCases, sizeCases} from './cases';
import {TestUser} from './helpers';
import {UserStories} from './stories';

test.describe('User', {tag: '@User'}, () => {
    test('render story: <Default>', async ({mount, expectScreenshot}) => {
        const component = await mount(<UserStories.Default />);
        await expectScreenshot({locator: component});
    });

    test('render story: <Showcase>', async ({mount, expectScreenshot}) => {
        const component = await mount(<UserStories.UserShowcase />);
        await expectScreenshot({locator: component});
    });

    smokeTest('', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<Partial<UserProps>>(
            {},
            {
                avatar: avatarCases,
                description: descriptionCases,
                name: nameCases,
                size: sizeCases,
            },
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TestUser {...props} />
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
