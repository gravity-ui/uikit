import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';

import {test} from '~playwright/core';

import type {EllipsisProps} from '../Ellipsis';

import {offsetEndCases, offsetStartCases, positionCases, separatorCases} from './cases';
import {TestEllipsis} from './helpers';
import {EllipsisStories} from './stories';

test.describe('Ellipsis', {tag: '@Ellipsis'}, () => {
    test('render story: <Default>', async ({mount, expectScreenshot}) => {
        const component = await mount(<EllipsisStories.Default />);
        await expectScreenshot({locator: component});
    });

    test('render story: <Positions>', async ({mount, expectScreenshot}) => {
        const component = await mount(<EllipsisStories.Positions />);
        await expectScreenshot({locator: component});
    });

    test('render story: <WithSeparator>', async ({mount, expectScreenshot}) => {
        const component = await mount(<EllipsisStories.WithSeparator />);
        await expectScreenshot({locator: component});
    });

    test('smoke', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<Partial<EllipsisProps>>(
            {},
            {
                position: positionCases,
                offsetStart: offsetStartCases,
                offsetEnd: offsetEndCases,
                separator: separatorCases,
            },
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TestEllipsis {...props} />
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
