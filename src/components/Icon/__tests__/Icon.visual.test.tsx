import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {IconProps} from '../Icon';

import {colorCases, sizeCases, styleCases} from './cases';
import {TestIcon} from './helpersPlaywright';

test.describe('Icon', {tag: '@Icon'}, () => {
    smokeTest('smoke', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<Omit<IconProps, 'data'>>(
            {},
            {
                size: sizeCases,
                color: colorCases,
                style: styleCases,
            },
        );

        await mount(
            <div style={{width: 400}}>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TestIcon {...props} />
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
