import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';

import {test} from '~playwright/core';

import type {DividerProps} from '../Divider';

import {orientationCases} from './cases';
import {ListWithDivider} from './helpers';

test.describe('Divider', {tag: '@Divider'}, () => {
    test('smoke smoke', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const defaultProps: DividerProps = {};

        const smokeScenarios = createSmokeScenarios(defaultProps, {
            orientation: orientationCases,
        });

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <ListWithDivider {...props} />
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
