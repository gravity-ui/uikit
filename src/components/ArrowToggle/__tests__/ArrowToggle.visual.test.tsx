import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';

import {test} from '~playwright/core';

import type {ArrowToggleProps} from '../ArrowToggle';
import {ArrowToggle} from '../ArrowToggle';

import {directionCases, sizeCases} from './cases';

test.describe('ArrowToggle', {tag: '@ArrowToggle'}, () => {
    test('smoke smoke', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const defaultProps: ArrowToggleProps = {};

        const smokeScenarios = createSmokeScenarios(defaultProps, {
            size: sizeCases,
            direction: directionCases,
        });

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <ArrowToggle {...props} />
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
